const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 5000;

// Enable CORS
app.use(cors());

// Set up multer for file storage
const storage = multer.diskStorage({
  destination: './uploads', // Just specify the folder path, multer will handle it
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Save file with a unique name
    /*
    1] Date.now(): Let's say the current timestamp is 1696203105000 (milliseconds since 1970).

    2]path.extname(file.originalname): The original file name is example.jpg, so path.extname() will return .jpg.

    3]Filename: The generated file name will be 1696203105000.jpg.

    This means the file will be saved on the server with the name 1696203105000.jpg, which ensures it is unique.
    */
  },
});

const upload = multer({ storage });

// Route to handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
  try {
    res.status(200).json({
      message: 'File uploaded successfully',
      filePath: `/uploads/${req.file.filename}`,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error uploading file' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
