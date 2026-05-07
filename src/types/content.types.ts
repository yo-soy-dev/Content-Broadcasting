export type FileType = 'jpg' | 'jpeg' | 'png' | 'gif';

export type ContentStatus = 'pending' | 'approved' | 'rejected';

export interface Content {
  _id: string;
  title: string;
  subject: string;
  description?: string;

  fileUrl: string;
  filePublicId: string;
  fileType: FileType;
  fileSize?: number;

  startTime: string; 
  endTime: string;   
  rotationDuration: number;

  status: ContentStatus;
  rejectionReason?: string;
  screen: string;

  uploadedBy: {
    _id: string;
    name: string;
    email: string;
  };

  approvedBy?: {
    _id: string;
    name: string;
  };

  createdAt: string;
  updatedAt: string;
}

export interface PaginatedContent {
  contents: Content[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export interface ContentStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}
