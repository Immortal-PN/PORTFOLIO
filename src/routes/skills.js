const router = require('express').Router();
const { body } = require('express-validator');
const protect = require('../middleware/auth');
const validate = require('../middleware/validate');
const { getSkills, upsertSkill } = require('../controllers/skillController');

router.get('/', getSkills);

router.put(
  '/',
  protect,
  [
    body('category')
      .isIn(['design', 'dev', 'tools'])
      .withMessage("category must be 'design', 'dev', or 'tools'"),
    body('items').isArray({ min: 1 }).withMessage('items must be a non-empty array'),
    body('items.*').isString().withMessage('Each item must be a string'),
  ],
  validate,
  upsertSkill
);

module.exports = router;
