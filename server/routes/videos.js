import express from 'express';
import {
  addVideo,
  addView,
  deleteVideo,
  getByTag,
  getVideo,
  getAllVideos,
  random,
  search,
  sub,
  trend,
  updateVideo,
} from '../controllers/video.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

//CREATE A VIDEO
router.post('/', verifyToken, addVideo);

//UPDATE VIDEO
router.put('/:id', verifyToken, updateVideo);

//DELETE VIDEO
router.delete('/:id', verifyToken, deleteVideo);

//GET VIDEO
router.get('/find/:id', getVideo);
router.get('/all', getAllVideos);
router.put('/view/:id', addView);

router.get('/trend', trend);

router.get('/random', random);

router.get('/sub', verifyToken, sub);
router.get('/tags', getByTag);
router.get('/search', search);

export default router;
