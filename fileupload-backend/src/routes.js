const router = require('express').Router();
const registrationController = require('./controllers/registrationController');
const loginController = require('./controllers/loginController');
const uploadController = require('./controllers/uploadController');

router.use(registrationController);
router.use(loginController);
router.use(uploadController);

module.exports = router;
