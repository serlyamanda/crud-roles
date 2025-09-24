import { useEffect, useState } from "react";
import API from "../api/api";
import useAuth from "../hooks/useAuth";
import "../styles/Dashboard.css";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState("");

  const [loading, setLoading] = useState(false); // State untuk loading
  const [error, setError] = useState(null); 
  const user = useAuth();

  // Ambil data produk dari backend saat komponen dimuat
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Mulai loading
      setError(null); // Reset error
      try {
        const res = await API.get("/produk");
        if (Array.isArray(res.data.data)) {
          setProducts(res.data.data);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false); // Selesai loading
      }
    };
    fetchProducts();
  }, []);

  // Tambah produk (hanya admin)
  const handleAdd = async () => {
    if (newProduct.trim() === "") {
      setError("Product name cannot be empty.");
      return;
    }

    setLoading(true); // Mulai loading
    setError(null); // Reset error
    try {
      const res = await API.post("/produk", { name: newProduct });
      setProducts([...products, res.data]);
      setNewProduct("");
    } catch (err) {
      console.error("Error adding product:", err);
      setError("Failed to add product.");
    } finally {
      setLoading(false); // Selesai loading
    }
  };

  // Hapus produk (hanya admin)
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    setLoading(true); // Mulai loading
    setError(null); // Reset error
    try {
      await API.delete(`/produk/${id}`);
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
      setError("Failed to delete product.");
    } finally {
      setLoading(false); // Selesai loading
    }
  };

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <h1>Dashboard</h1>
        <br />
        <h3 style={{ color: "white" }}>List Produk</h3>
        <p>Welcome, {user?.email} ({user?.role})</p>

        {/* Tampilkan pesan loading atau error */}
        {loading && <p>Loading...</p>}
        {error && <p className="error-message">{error}</p>}

        {/* Form tambah produk, hanya admin */}
        {user?.role === "admin" && (
          <div className="add-product-form">
            <input
              type="text"
              value={newProduct}
              onChange={(e) => setNewProduct(e.target.value)}
              placeholder="New product name"
              disabled={loading}
            />
            {/* Input deskripsi dihapus karena tidak digunakan di fungsi handleAdd */}
            <button onClick={handleAdd} disabled={loading || newProduct.trim() === ""}>
              Add Product
            </button>
          </div>
        )}

        {/* Daftar produk */}
        <ul>
          {products.length > 0 ? (
            products.map((p) => (
              <li key={p.id}>
                {p.name}
                {user?.role === "admin" && (
                  <button onClick={() => handleDelete(p.id)} disabled={loading}>
                    Delete
                  </button>
                )}
              </li>
            ))
          ) : (
            !loading && <p>No products available.</p>
          )}
        </ul>
      </div>
    </>
  );
}

export default Dashboard;