// src/controllers/category.controller.js
const { Category } = require('../models');

// GET /categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      order: [['nombre', 'ASC']],
    });

    res.json({
      success: true,
      message: 'Categorías obtenidas correctamente',
      data: categories,
    });
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener categorías',
      data: null,
    });
  }
};

// POST /categories
exports.createCategory = async (req, res) => {
  try {
    const { nombre } = req.body;

    if (!nombre) {
      return res.status(400).json({
        success: false,
        message: 'El nombre de la categoría es requerido',
        data: null,
      });
    }

    const category = await Category.create({ nombre });

    res.status(201).json({
      success: true,
      message: 'Categoría creada correctamente',
      data: category,
    });
  } catch (error) {
    console.error('Error al crear categoría:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear categoría',
      data: null,
    });
  }
};
