import { useEffect, useState } from "react";
import api from "../../services/axios";
import ProductItem from "../../components/ProductItem";
import Navbar from "../../components/UserNavbar";
import Footer from "../../components/Footer";

function Products() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  ////////////  Fetch categories and products (separately)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const prodRes = await api.get("/products");
        setProducts(prodRes.data || []);
        setFiltered(prodRes.data || []);

        const catRes = await api.get("/category");
        setCategories(catRes.data || []);
        // console.log(catRes.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load data");
      } 
      finally {
          setLoading(false);
      }
    };
    fetchData();
  }, []);

  ////////////////  Search filter
  useEffect(() => {
    if (!products.length) return;

    let result = [...products];

    // Search filter
    if (search.trim()) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(result);
  }, [search, products]);

  //////////// Category filter (calls backend)
  async function findByCategory(value) {
    setSelectedCategory(value);

    if (value === "All") {
      setFiltered(products);
      return;
    }

    try {
      const res = await api.get(`/category/find/${value}`);
      if (res.data && res.data.products) {
        setFiltered(res.data.products);
      } else {
        setFiltered([]);
      }
    } catch (error) {
      console.error("Error fetching category products:", error);
      setFiltered([]);
    }
  }

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold text-amber-600">
        Loading products...
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold text-red-500">
        {error}
      </div>
    );

  return (
    <>
      <Navbar />

      <div className="min-h-screen py-12 bg-gradient-to-br from-white via-amber-50 to-amber-100">
        <div className="px-6 mx-auto max-w-7xl">
          {/* Header Section */}
          <div className="flex flex-col items-center justify-between mb-10 md:flex-row">
            <h1 className="text-3xl font-bold text-amber-700">
              🛍️ Browse Our Products
            </h1>

            {/* Filters */}
            <div className="flex flex-col items-center gap-3 mt-4 md:flex-row md:gap-4 md:mt-0">
              {/* Search */}
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-4 py-2 text-sm border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              />

              {/* Category Dropdown */}
              <select
                value={selectedCategory}
                onChange={(e) => findByCategory(e.target.value)}
                className="px-4 py-2 text-sm border rounded-full shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <option value="All">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filtered.map((product) => (
                <ProductItem
                  key={product._id}
                  id={product._id}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500">No products found</div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Products;
