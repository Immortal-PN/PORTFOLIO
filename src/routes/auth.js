const router = require('express').Router();
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { login } = require('../controllers/authController');

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email required'),
    body('password').notEmpty().withMessage('Password required'),
  ],
  validate,
  login
);

module.exports = router;
