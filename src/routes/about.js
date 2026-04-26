const router = require('express').Router();
const protect = require('../middleware/auth');
const validate = require('../middleware/validate');
const { getAbout, updateAbout } = require('../controllers/aboutController');

router.get('/', getAbout);

router.put('/', protect, validate, updateAbout);

module.exports = router;
