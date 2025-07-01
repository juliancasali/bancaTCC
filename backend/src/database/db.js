const mongoose = require('mongoose');
require('dotenv').config()
const User = require('../models/User')
const bcrypt = require('bcryptjs');


// Conexão com MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION_URL)
        console.log('MongoDB Connected')
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1); // Finaliza o processo caso haja erro crítico
    }

    const adminExists = await User.findOne({ email: process.env.ADMIN_EMAIL});
    if (adminExists) {
      console.log('Admin já existe');
    } else {
        const senhaCriptografada = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      await User.create({
        nome: process.env.NAME,
        email: process.env.ADMIN_EMAIL,
        password: senhaCriptografada,
        role: 'admin'
      });
      console.log('Admin criado com sucesso!');
    }
}
// Eventos para monitorar conexão
mongoose.connection.on('connected', () => console.log('MongoDB Connected'));
mongoose.connection.on('disconnected', () => console.warn('MongoDB disconnected'));

module.exports = connectDB;