const router = require('express').Router();
const { body } = require('express-validator');
const protect = require('../middleware/auth');
const validate = require('../middleware/validate');
const {
  getMedia,
  createMedia,
  updateMedia,
  deleteMedia,
} = require('../controllers/mediaController');

const mediaValidation = [
  body('type').isIn(['video', 'image']).withMessage("type must be 'video' or 'image'"),
  body('url').isURL().withMessage('url must be a valid URL'),
  body('platform')
    .isIn(['instagram', 'youtube', 'local'])
    .withMessage("platform must be 'instagram', 'youtube', or 'local'"),
  body('metrics').optional().isObject().withMessage('metrics must be an object'),
];

router.get('/', getMedia);
router.post('/', protect, mediaValidation, validate, createMedia);
router.put('/:id', protect, mediaValidation, validate, updateMedia);
router.delete('/:id', protect, deleteMedia);

module.exports = router;
