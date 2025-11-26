const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Role = require('../models/Role');

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';
const JWT_EXPIRES_IN = '1d';

exports.register = async (req, res) => {
  try {
    const { email, password, role = 'CUSTOMER' } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email y password son requeridos',
        data: null,
      });
    }

    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Ya existe un usuario con ese email',
        data: null,
      });
    }

    // buscar o crear el rol
    const [roleInstance] = await Role.findOrCreate({
      where: { name: role },
      defaults: { name: role },
    });

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      passwordHash,
      roleId: roleInstance.id,
    });

    return res.status(201).json({
      success: true,
      message: 'Usuario registrado correctamente',
      data: { id: user.id, email: user.email, role: roleInstance.name },
    });
  } catch (error) {
    console.error('Error en register:', error);
    res.status(500).json({
      success: false,
      message: 'Error al registrar usuario',
      data: null,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
      include: { model: Role, as: 'role' },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas',
        data: null,
      });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas',
        data: null,
      });
    }

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role.name,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.json({
      success: true,
      message: 'Login correcto',
      data: {
        token,
        user: payload,
      },
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({
      success: false,
      message: 'Error al iniciar sesión',
      data: null,
    });
  }
};

exports.me = async (req, res) => {
  // req.user viene del middleware authenticate
  res.json({
    success: true,
    message: 'Usuario autenticado',
    data: req.user,
  });
};
