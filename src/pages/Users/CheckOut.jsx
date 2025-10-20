
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/UserNavbar";
import api from "../../services/axios";
import PaymentMethod from "../../components/PaymentMethod";
import CartSummary from "../../components/CartSummary";
import DeliveryForm from "../../components/DeliveryForm";


const CheckOut = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [loadingCart, setLoadingCart] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoadingCart(true);
        const res = await api.get("/cart");
        const items = res.data.result || [];
        setCartItems(items);
        const s = items.reduce(
          (acc, item) => acc + (item.product_id?.price || 0) * item.quantity,
          0
        );
        setSubtotal(s);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      } finally {
        setLoadingCart(false);
      }
    };
    fetchCart();
  }, []);

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const buildAddress = () => ({
    line1: form.street,
    line2: `${form.firstName} ${form.lastName}`.trim(),
    city: form.city,
    state: form.state,
    postal_code: form.zipcode,
    country: form.country,
    phone: form.phone,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    const required = ["street", "city", "state", "zipcode", "country"];
    for (let k of required) {
      if (!form[k]) {
        alert("Please fill all required address fields.");
        return;
      }
    }
    setSubmitting(true);
    try {
      const address = buildAddress();
      const res = await api.post("/orders", { address });
      const order = res.data.orderdata;
      navigate("/order-success", { state: { order } });
    } catch (err) {
      console.error("Place order failed:", err);
      alert(err?.response?.data?.error || "Could not place order. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const shippingFee = 10;

  return (
    <>
      <Navbar />
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
        >
          <DeliveryForm form={form} handleChange={handleChange} />
          <div className="mt-8">
            <CartSummary
              subtotal={subtotal}
              shippingFee={shippingFee}
              loadingCart={loadingCart}
            />
            <PaymentMethod submitting={submitting} />
          </div>
        </form>
        <Footer />
      </div>
    </>
  );
};

export default CheckOut;
