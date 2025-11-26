const Product = require('../models/Product');

// GET /products
exports.getAllProducts = async (req, res) => {
  try {
    const where = {};

    // 🔹 filtro opcional por categoría
    if (req.query.categoryId) {
      where.categoryId = req.query.categoryId;
    }

    const products = await Product.findAll({ where });

    res.json({
      success: true,
      message: 'Productos obtenidos correctamente',
      data: products,
    });
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener productos',
      data: null,
    });
  }
};

// GET /products/:id
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado',
        data: null,
      });
    }

    res.json({
      success: true,
      message: 'Producto obtenido correctamente',
      data: product,
    });
  } catch (error) {
    console.error('Error al obtener producto:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener producto',
      data: null,
    });
  }
};

// POST /products
exports.createProduct = async (req, res) => {
  try {
    const { nombre, precio, descripcion, categoryId, imageUrl } = req.body;

    if (!nombre || !precio) {
      return res.status(400).json({
        success: false,
        message: 'Nombre y precio son requeridos',
        data: null,
      });
    }

    if (precio <= 0) {
      return res.status(400).json({
        success: false,
        message: 'El precio debe ser mayor a 0',
        data: null,
      });
    }

    const product = await Product.create({
      nombre,
      precio,
      descripcion,
      // 🔹 nuevos campos (opcionales)
      categoryId: categoryId || null,
      imageUrl: imageUrl || null,
    });

    res.status(201).json({
      success: true,
      message: 'Producto creado correctamente',
      data: product,
    });
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear producto',
      data: null,
    });
  }
};

// PUT /products/:id
exports.updateProduct = async (req, res) => {
  try {
    const { nombre, precio, descripcion, categoryId, imageUrl } = req.body;
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado',
        data: null,
      });
    }

    if (precio && precio <= 0) {
      return res.status(400).json({
        success: false,
        message: 'El precio debe ser mayor a 0',
        data: null,
      });
    }

    await product.update({
      // si no mandas algo, se queda lo anterior
      nombre: nombre ?? product.nombre,
      precio: precio ?? product.precio,
      descripcion: descripcion ?? product.descripcion,
      categoryId: categoryId ?? product.categoryId,
      imageUrl: imageUrl ?? product.imageUrl,
    });

    res.json({
      success: true,
      message: 'Producto actualizado correctamente',
      data: product,
    });
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar producto',
      data: null,
    });
  }
};

// DELETE /products/:id
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado',
        data: null,
      });
    }

    await product.destroy();

    res.json({
      success: true,
      message: 'Producto eliminado correctamente',
      data: null,
    });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar producto',
      data: null,
    });
  }
};
