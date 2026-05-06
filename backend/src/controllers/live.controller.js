import Content from '../models/Content.model.js';
import { ApiResponse } from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

export const getLiveContentByScreen = asyncHandler(async (req, res) => {
  const { screenId } = req.params;
  const now = new Date();

  const screenName = decodeURIComponent(screenId);

  const content = await Content.find({
    screen: screenName,
    status: 'approved',
    startTime: { $lte: now },
    endTime: { $gte: now },
  })
    .sort({ createdAt: -1 })
    .populate('uploadedBy', 'name');

  res.json(new ApiResponse(200, content));
});