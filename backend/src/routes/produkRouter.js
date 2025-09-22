const express = require('express')
const {prisma} = require("../config/utils")
const produkRouter = express.Router()
const { createProduk, getAllProduk, getProdukById, updateProduk, deleteProduk} = require("../controllers/produkController");

const {authenticateJWT, roleAuthorization, } = require("../middleware/authMiddleware")


// 📌 Semua route produk harus login dulu

produkRouter.get("/", authenticateJWT, getAllProduk);
produkRouter.get("/:id", authenticateJWT, getProdukById);
produkRouter.post("/", authenticateJWT, roleAuthorization(["admin"]), createProduk);
produkRouter.put("/:id", authenticateJWT, roleAuthorization(["admin"]), updateProduk);
produkRouter.delete("/:id", authenticateJWT, roleAuthorization(["admin"]), deleteProduk);

module.exports = produkRouter;

