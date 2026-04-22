import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

// Importar inline a função de hash
function hashPassword(password) {
  return bcryptjs.hashSync(password, 10);
}

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio";

// Schema de usuário
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

async function createAdminUser() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Conectado ao MongoDB");

    // Verifica se admin já existe
    let admin = await User.findOne({ username: "admin" });

    if (admin) {
      console.log("✅ Usuário admin já existe");
      process.exit(0);
    }

    // Cria novo admin
    const password = process.argv[2] || "admin123";

    admin = new User({
      username: "admin",
      password: hashPassword(password),
    });

    await admin.save();

    console.log("✅ Usuário admin criado com sucesso!");
    console.log(`Username: admin`);
    console.log(`Password: ${password}`);
    console.log("⚠️  Mude a senha após o primeiro login!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Erro ao criar usuário admin:", error.message);
    process.exit(1);
  }
}

createAdminUser();