import 'dotenv/config';
import connectDB from './config/db.js';
import User from './models/User.model.js';
import Content from './models/Content.model.js';
import Screen from "./models/Screen.model.js";


const seed = async () => {
  await connectDB();

  await User.deleteMany({});
  await Content.deleteMany({});
  await Screen.deleteMany({});

  const principal = await User.create({
    name: 'Principal Sharma',
    email: 'principal@school.com',
    password: 'password123',
    role: 'principal',
  });

  const teacher1 = await User.create({
    name: 'Teacher Raj',
    email: 'teacher@school.com',
    password: 'password123',
    role: 'teacher',
  });

  const teacher2 = await User.create({
    name: 'Teacher Priya',
    email: 'priya@school.com',
    password: 'password123',
    role: 'teacher',
  });

  const now = new Date();

  await Content.create([
    {
      title: 'Introduction to Algebra',
      subject: 'Mathematics',
      description: 'Basic algebra concepts for class 8',
      fileUrl: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
      filePublicId: 'sample_1',
      fileType: 'jpg',
      startTime: new Date(now.getTime() - 60 * 60 * 1000),
      endTime: new Date(now.getTime() + 60 * 60 * 1000),
      rotationDuration: 30,
      status: 'approved',
      uploadedBy: teacher1._id,
      approvedBy: principal._id,
    },
    {
      title: 'World War II Timeline',
      subject: 'History',
      description: 'Key events of WWII',
      fileUrl: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
      filePublicId: 'sample_2',
      fileType: 'jpg',
      startTime: new Date(now.getTime() + 2 * 60 * 60 * 1000),
      endTime: new Date(now.getTime() + 5 * 60 * 60 * 1000),
      rotationDuration: 45,
      status: 'pending',
      uploadedBy: teacher1._id,
    },
    {
      title: 'Photosynthesis Diagram',
      subject: 'Biology',
      description: 'Process of photosynthesis',
      fileUrl: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
      filePublicId: 'sample_3',
      fileType: 'png',
      startTime: new Date(now.getTime() - 30 * 60 * 1000),
      endTime: new Date(now.getTime() + 30 * 60 * 1000),
      rotationDuration: 20,
      status: 'rejected',
      rejectionReason: 'Image quality is too low, please re-upload',
      uploadedBy: teacher2._id,
    },
  ]);

  await Screen.create([
  {
    name: "classroom-1",
    teacher: teacher1._id,
  },
  {
    name: "lobby",
    teacher: teacher2._id,
  },
]);

  console.log('✅ Seed complete!');
  console.log('Principal → principal@school.com / password123');
  console.log('Teacher 1 → teacher@school.com   / password123');
  console.log('Teacher 2 → priya@school.com     / password123');

  process.exit(0);
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});