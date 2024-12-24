// backend/routes/imageRoutes.js
const express = require('express');
const router = express.Router();
const { mongoose, upload } = require('../utils/gridFsConfig');
const Grid = require('gridfs-stream');

// Khởi tạo GridFS stream
let gfs;
mongoose.connection.once('open', () => {
    gfs = Grid(mongoose.connection.db, mongoose.mongo);
    gfs.collection('uploads'); // Tên collection (bucket) bạn đã cấu hình trong gridFsConfig.js
});

// Route để lấy ảnh dựa vào _id
router.get('/:id', async (req, res) => {
    try {
        const fileId = new mongoose.Types.ObjectId(req.params.id);
        const file = await gfs.files.findOne({ _id: fileId });

        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exists'
            });
        }

        // Check if image
        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
            // Read output to browser
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        } else {
            res.status(404).json({
                err: 'Not an image'
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Internal server error' });
    }
});

module.exports = router;