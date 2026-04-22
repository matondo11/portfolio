

const { hashPassword } = require('./lib/auth');
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

async function createAdminUser() {
  try {
    await mongoose.connect(MONGODB_URI);
    const User = require('./models/User').default;
    
    // Verifica se admin já existe
    let admin = await User.findOne({ username: 'admin' });
    if (admin) {
      console.log('Usuário admin já existe');
      process.exit(0);
    }

    // Cria novo admin
    const password = process.argv[2] || 'admin123';
    admin = new User({
      username: 'admin',
      password: hashPassword(password),
    });

    await admin.save();
    console.log('✅ Usuário admin criado com sucesso!');
    console.log(`Username: admin`);
    console.log(`Password: ${password}`);
    console.log('⚠️  Mude a senha após o primeiro login!');

    process.exit(0);
  } catch (error) {
    console.error('Erro ao criar usuário admin:', error);
    process.exit(1);
  }
}

createAdminUser();
