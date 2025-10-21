import React, { useEffect, useState } from "react";
import CartTotals from "../../components/CartTotals";
import api from "../../services/axios";
import Navbar from "../../components/UserNavbar";
import Footer from "../../components/Footer";
import CartItem from "../../components/CartItem";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cart items on load
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await api.get("/cart");
        setCartItems(res.data.result);
        // console.log(res.data.result);
        
      } catch (err) {
        console.error("Error fetching cart:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  // Increase quantity
  const handleIncrease = async (id) => {
    try {
      await api.put(`/cart/${id}`,{ action: "increase" });
      setCartItems((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
      
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  const handleDecrease = async (id) => {
    try {
      await api.put(`/cart/${id}`, { action: "decrease" });
      setCartItems((prev) =>
        prev.map((item) =>
          item._id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
      
    } catch (err) {
      console.error("Error decreasing quantity:", err);
    }
  };

  // Delete item
  const handleDelete = async (id) => {
    try {
      await api.delete(`/cart/${id}`);
      setCartItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  // Calculate totals
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product_id.price * item.quantity,
    0
  );

  if (loading) return <p className="py-10 text-center">Loading...</p>;

  return (
    <div className="flex flex-col justify-between h-screen">
    <div>
       <Navbar />
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <div className="border-t pt-14">
          <div className="inline-flex items-center gap-2 mb-6">
            <p className="text-2xl text-gray-500">
              your <span className="font-medium text-gray-700">CART</span>
            </p>
            <div className="w-8 sm:w-12 h-[2px] bg-gray-700"></div>
          </div>

          {cartItems.length === 0 ? (
            <p className="py-20 text-center text-gray-500">
              Your cart is empty.
            </p>
          ) : (
            <>
              {cartItems.map((item) => (
                <CartItem
                  key={item._id}
                  item={item}
                  onIncrease={handleIncrease}
                  onDecrease={handleDecrease}
                  onDelete={handleDelete}
                />
              ))}

              <CartTotals subtotal={subtotal} />
            </>
          )}
        </div>
      </div>
    </div>
      <Footer />
    </div>
  );
};

export default CartPage;