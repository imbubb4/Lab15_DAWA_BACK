const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
// si tienes middlewares de auth/rol, los puedes meter aquí
// const { requireAuth, requireAdmin } = require('../middlewares/auth');

router.get('/', categoryController.getAllCategories);
// router.post('/', requireAuth, requireAdmin, categoryController.createCategory);
router.post('/', categoryController.createCategory);

module.exports = router;
