import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

if (!MONGODB_URI || !ADMIN_PASSWORD) {
  console.error("Missing env vars: MONGODB_URI and ADMIN_PASSWORD are required.");
  process.exit(1);
}

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

async function createAdminUser() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ MongoDB conectado");

    const exists = await User.findOne({ username: ADMIN_USERNAME });

    if (exists) {
      console.log("⚠️ Admin já existe");
      process.exit(0);
    }

    const hashed = await bcrypt.hash(ADMIN_PASSWORD, 10);

    await User.create({
      username: ADMIN_USERNAME,
      password: hashed,
    });

    console.log("🔥 Admin criado!");
    console.log("Username:", ADMIN_USERNAME);
    console.log("Password: [hidden]");

    process.exit(0);
  } catch (err) {
    console.error("❌ ERRO:", err?.message || err);
    process.exit(1);
  }
}

createAdminUser();