const router = require('express').Router();
const {
  createUser,
  login,
  logout,
  getCurrentUser,
  isAuthenticated
} = require('../../controllers/user-controllers');

router.route('/').post(createUser);
router.route('/check').get(isAuthenticated);
router.route('/me').get(getCurrentUser);
router.route('/login').post(login);
router.route('/logout').post(logout);

module.exports = router;
