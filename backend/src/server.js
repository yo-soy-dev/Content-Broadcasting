import 'dotenv/config';
import app from './app.js';
import connectDB from './config/db.js';
import fs from 'fs';


const PORT = process.env.PORT || 5000;

const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});