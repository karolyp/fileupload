const router = require('express').Router();
const registrationController = require('./controllers/registrationController');
const loginController = require('./controllers/loginController');

router.use(registrationController);
router.use(loginController);

module.exports = router;
