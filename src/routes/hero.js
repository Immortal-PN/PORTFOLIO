const router = require('express').Router();
const { body } = require('express-validator');
const protect = require('../middleware/auth');
const validate = require('../middleware/validate');
const { getHero, updateHero } = require('../controllers/heroController');

router.get('/', getHero);

router.put(
  '/',
  protect,
  [
    body('name').optional().notEmpty().withMessage('Name cannot be empty'),
    body('avatar_url').optional().isURL().withMessage('avatar_url must be a valid URL'),
  ],
  validate,
  updateHero
);

module.exports = router;
