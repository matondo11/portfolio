import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const MONGODB_URI = "mongodb+srv://Matondo:junilsonn@cluster0.uogv3ss.mongodb.net/?appName=Cluster0";

// Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Evita redefinir model em hot reload
const User = mongoose.models.User || mongoose.model("User", userSchema);

async function createAdminUser() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ MongoDB conectado");

    const exists = await User.findOne({ username: "admin" });

    if (exists) {
      console.log("⚠️ Admin já existe");
      process.exit(0);
    }

    const password = "Catarin@2";
    const hashed = await bcrypt.hash(password, 10);

    await User.create({
      username: "admin",
      password: hashed,
    });

    console.log("🔥 Admin criado!");
    console.log("Username: admin");
    console.log("Password:", password);

    process.exit(0);
  } catch (err) {
    console.error("❌ ERRO:", err.message);
    process.exit(1);
  }
}

createAdminUser();