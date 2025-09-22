const { req, res } = require("express");
const { prisma } = require("../config/utils")
const {getCurrentUser} = require("../config/libs")


// CREATE Produk (khusus admin)
const createProduk = async (req, res) => {
  const { name, desc } = req.body;
  try {
    // Cari siapa user login
    const pengguna = await getCurrentUser(req.user);

    // Hanya admin yang boleh create
    if (pengguna.role !== "admin") {
      return res.status(403).json({ 
        data: null,
        message: "Access denied, only admin can create produk",
        status: "error"
      });
    }

    // Simpan produk baru
    const produk = await prisma.db_produk.create({
      data: {
        name,
        desc,
        userId: pengguna.id
      },
    });

    res.json({
      data: produk,
      message: "Produk was successfully created",
      status: "success",
    });
  } catch (err) {
    res.json({
      data: null,
      message: err.message,
      status: "error",
    });
  }
};

// READ Produk (semua user bisa)
const getAllProduk = async (req, res) => {
  try {
    const produk = await prisma.db_produk.findMany();
    res.json({
      data: produk,
      message: "Produk list retrieved",
      status: "success",
    });
  } catch (err) {
    res.json({
      data: null,
      message: err.message,
      status: "error",
    });
  }
};

// READ Produk by ID (semua user bisa)
const getProdukById = async (req, res) => {
  const { id } = req.params;      

  try {
    const produk = await prisma.db_produk.findUnique({
      where: { id: Number(id) },
    });

    if (!produk) {
      return res.status(404).json({
        data: null,
        message: "Produk not found",
        status: "error",
      });
    }

    res.json({
      data: produk,
      message: "Produk retrieved successfully",
      status: "success",
    });
  } catch (err) {
    res.json({
      data: null,
      message: err.message,
      status: "error",
    });
  }
};

// UPDATE Produk (khusus admin)
const updateProduk = async (req, res) => {
  const { id } = req.params;
  const { name, desc } = req.body;

  try {
    const pengguna = await getCurrentUser(req.user);

    if (pengguna.role !== "admin") {
      return res.status(403).json({ 
        data: null,
        message: "Access denied, only admin can update produk",
        status: "error"
      });
    }

    const produk = await prisma.db_produk.update({
      where: { id: Number(id) },
      data: { name, desc },
    });

    res.json({
      data: produk,
      message: "Produk was successfully updated",
      status: "success",
    });
  } catch (err) {
    res.json({
      data: null,
      message: err.message,
      status: "error",
    });
  }
};

// DELETE Produk (khusus admin)
const deleteProduk = async (req, res) => {
  const { id } = req.params;

  try {
    const pengguna = await getCurrentUser(req.user);

    if (pengguna.role !== "admin") {
      return res.status(403).json({ 
        data: null,
        message: "Access denied, only admin can delete produk",
        status: "error"
      });
    }

    await prisma.db_produk.delete({
      where: { id: Number(id) },
    });

    res.json({
      data: null,
      message: "Produk was successfully deleted",
      status: "success",
    });
  } catch (err) {
    res.json({
      data: null,
      message: err.message,
      status: "error",
    });
  }
};

module.exports = { createProduk, getAllProduk, getProdukById,updateProduk, deleteProduk };
