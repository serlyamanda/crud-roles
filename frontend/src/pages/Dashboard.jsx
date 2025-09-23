import { useEffect, useState } from "react";
import API from "../api/api";
import useAuth from "../hooks/useAuth";
import "../styles/Dashboard.css";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState("");
  const user = useAuth(); // ambil token + role + email

  // ambil data produk dari backend
  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await API.get("/produk");

      // backend bungkus pakai { data: produk }
      if (Array.isArray(res.data.data)) {
        setProducts(res.data.data);
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setProducts([]);
    }
  };
  fetchProducts();
}, []);

  // tambah produk (hanya admin)
  const handleAdd = async () => {
    try {
      const res = await API.post("/produk", { name: newProduct });
      setProducts([...products, res.data]);
      setNewProduct("");
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };

  // hapus produk (hanya admin)
  const handleDelete = async (id) => {
    try {
      await API.delete(`/produk/${id}`);
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <p>Welcome, {user?.email} ({user?.role})</p>

      {/* form tambah produk, hanya admin */}
      {user?.role === "admin" && (
        <div>
          <input
            type="text"
            value={newProduct}
            onChange={(e) => setNewProduct(e.target.value)}
            placeholder="New product name"
          />
          <button onClick={handleAdd}>Add Product</button>
        </div>
      )}

      {/* daftar produk */}
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name}
            {user?.role === "admin" && (
              <button onClick={() => handleDelete(p.id)}>Delete</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
