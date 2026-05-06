import Content from '../models/Content.model.js';
import { ApiResponse, ApiError } from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

export const getAllContent = asyncHandler(async (req, res) => {
  const { status, search, page = 1, limit = 20 } = req.query;

  const filter = {};
  if (status) filter.status = status;
  if (search) filter.title = { $regex: search, $options: 'i' };

  const skip = (Number(page) - 1) * Number(limit);

  const [contents, total] = await Promise.all([
    Content.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .populate('uploadedBy', 'name email'),
      // .populate('screen', 'name'),
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

export const getPendingContent = asyncHandler(async (req, res) => {
  const contents = await Content.find({ status: 'pending' })
    .sort({ createdAt: -1 })
    .populate('uploadedBy', 'name email');
    // .populate('screen', 'name');

  res.json(new ApiResponse(200, contents));
});

export const approveContent = asyncHandler(async (req, res) => {
  const content = await Content.findById(req.params.id);
  if (!content) throw new ApiError(404, 'Content not found');
  if (content.status !== 'pending') {
    throw new ApiError(400, 'Only pending content can be approved');
  }

  content.status = 'approved';
  content.approvedBy = req.user._id;
  content.rejectionReason = null;
  await content.save();

  res.json(new ApiResponse(200, content, 'Content approved'));
});

export const rejectContent = asyncHandler(async (req, res) => {
  const { reason } = req.body;
  if (!reason?.trim()) throw new ApiError(400, 'Rejection reason is required');

  const content = await Content.findById(req.params.id);
  if (!content) throw new ApiError(404, 'Content not found');
  if (content.status !== 'pending') {
    throw new ApiError(400, 'Only pending content can be rejected');
  }

  content.status = 'rejected';
  content.rejectionReason = reason.trim();
  await content.save();

  res.json(new ApiResponse(200, content, 'Content rejected'));
});

export const getPrincipalStats = asyncHandler(async (req, res) => {
  const stats = await Content.aggregate([
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);

  const result = { total: 0, pending: 0, approved: 0, rejected: 0 };
  stats.forEach(({ _id, count }) => {
    result[_id] = count;
    result.total += count;
  });

  res.json(new ApiResponse(200, result));
});