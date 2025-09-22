const { prisma } = require("../config/utils");
const  bcrypt  = require("bcrypt")
const jwt = require("jsonwebtoken")

// REGISTER
const register = async (req, res) => {
  const { username, email, password, role } = req.body;

  
  try {
    // Cek user sudah ada atau belum
    const existingUser = await prisma.db_user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Enkripsi password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Default role = "user" jika tidak diisi
    const newUser = await prisma.db_user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role: role || "user",
      },
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// LOGIN
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.db_user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Cek password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT, include role
    const token = jwt.sign(
      {
         id: user.id, 
        email: user.email, 
        role: user.role 
    },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE User (Admin bisa hapus siapa saja, User hanya hapus dirinya sendiri)
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // jika user biasa, hanya bisa hapus dirinya sendiri
    if (req.user.role === "user" && req.user.id !== Number(id)) {
      return res.status(403).json({ message: "Tidak memiliki akses hapus akun orang lain" });
    }

    // hapus user
    const deleted = await prisma.db_user.delete({
      where: { id: Number(id) },
    });

    res.json({
      data: deleted,
      message: "deleted user successfully",
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: "error",
    });
  }
};

module.exports = { register, login, deleteUser };
