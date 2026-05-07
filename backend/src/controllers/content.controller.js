import Content from '../models/Content.model.js';
import { ApiResponse, ApiError } from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import cloudinary from '../config/cloudinary.js';
import fs from 'fs';


export const uploadContent = asyncHandler(async (req, res) => {
  if (!req.file) throw new ApiError(400, 'File is required');


  const { title, subject, description, startTime, endTime, rotationDuration, screen } = req.body;

  if (!title || !subject || !startTime || !endTime || !screen) {
    throw new ApiError(400, 'Title, subject, Screen, startTime and endTime are required');
  }

  if (new Date(endTime) <= new Date(startTime)) {
    throw new ApiError(400, 'End time must be after start time');
  }

  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: 'content-broadcasting',
    resource_type: 'auto',
  });
  
  try {
    fs.unlinkSync(req.file.path);
  } catch (err) {
    console.log("File cleanup failed:", err.message);
  }
  const fileExt = req.file.originalname.split('.').pop().toLowerCase();
  
  // const content = await Content.create({
  //   title,
  //   subject,
  //   description: description || '',
  //   fileUrl: req.file.path,
  //   filePublicId: req.file.filename,
  //   fileType: fileExt,
  //   startTime: new Date(startTime),
  //   endTime: new Date(endTime),
  //   rotationDuration: rotationDuration ? Number(rotationDuration) : 30,
  //   uploadedBy: req.user._id,
  // });

   const content = await Content.create({
  title,
  subject,
  description: description || '',
  fileUrl: result.secure_url,
  filePublicId: result.public_id,
  fileType: fileExt,
  fileSize: req.file.size,
  startTime: new Date(startTime),
  endTime: new Date(endTime),
  rotationDuration: rotationDuration ? Number(rotationDuration) : 30,
  uploadedBy: req.user._id,
  screen,
});

  res.status(201).json(new ApiResponse(201, content, 'Content uploaded successfully'));
});

export const getMyContent = asyncHandler(async (req, res) => {
  const { status, search, page = 1, limit = 20 } = req.query;

  const filter = { uploadedBy: req.user._id };
  if (status) filter.status = status;
  if (search) filter.title = { $regex: search, $options: 'i' };

  const skip = (Number(page) - 1) * Number(limit);

  const [contents, total] = await Promise.all([
    Content.find(filter)
    .populate('uploadedBy', 'name')
    // .populate('screen', 'name')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit)),
    Content.countDocuments(filter),
  ]);

  res.json(new ApiResponse(200, {
    contents,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      pages: Math.ceil(total / Number(limit)),
    },
  }));
});

export const getTeacherStats = asyncHandler(async (req, res) => {
  const stats = await Content.aggregate([
    { $match: { uploadedBy: req.user._id } },
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);

  const result = { total: 0, pending: 0, approved: 0, rejected: 0 };
  stats.forEach(({ _id, count }) => {
    result[_id] = count;
    result.total += count;
  });

  res.json(new ApiResponse(200, result));
});

export const getLiveContent = asyncHandler(async (req, res) => {
  const { teacherId } = req.params;
  const now = new Date();

  if (!teacherId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.json(new ApiResponse(200, []));
  }


  const content = await Content.find({
    uploadedBy: teacherId,
    status: 'approved',
    startTime: { $lte: now },
    endTime: { $gte: now },
  })
    .sort({ startTime: -1 })
    .populate('uploadedBy', 'name');

  res.json(new ApiResponse(200, content));
});

export const deleteContent = asyncHandler(async (req, res) => {
  const content = await Content.findOne({
    _id: req.params.id,
    uploadedBy: req.user._id,
  });

  if (!content) throw new ApiError(404, 'Content not found');
  if (content.status !== 'pending') {
    throw new ApiError(400, 'Only pending content can be deleted');
  }

  await cloudinary.uploader.destroy(content.filePublicId);
  await content.deleteOne();

  res.json(new ApiResponse(200, null, 'Content deleted'));
});



