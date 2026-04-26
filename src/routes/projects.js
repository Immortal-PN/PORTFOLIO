const router = require('express').Router();
const { body } = require('express-validator');
const protect = require('../middleware/auth');
const validate = require('../middleware/validate');
const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');

const projectValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('tech_stack').optional().isArray().withMessage('tech_stack must be an array'),
  body('images').optional().isArray().withMessage('images must be an array'),
  body('video_url').optional().isURL().withMessage('video_url must be a valid URL'),
  body('live_link').optional().isURL().withMessage('live_link must be a valid URL'),
  body('featured').optional().isBoolean().withMessage('featured must be boolean'),
];

router.get('/', getProjects);
router.get('/:id', getProject);
router.post('/', protect, projectValidation, validate, createProject);
router.put('/:id', protect, projectValidation, validate, updateProject);
router.delete('/:id', protect, deleteProject);

module.exports = router;
