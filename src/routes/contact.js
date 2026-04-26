const router = require('express').Router();
const { body } = require('express-validator');
const protect = require('../middleware/auth');
const validate = require('../middleware/validate');
const { getContact, updateContact } = require('../controllers/contactController');

router.get('/', getContact);

router.put(
  '/',
  protect,
  [
    body('email').optional().isEmail().withMessage('email must be valid'),
    body('instagram').optional().isString(),
    body('github').optional().isString(),
    body('linkedin').optional().isString(),
  ],
  validate,
  updateContact
);

module.exports = router;
