import React, { useState, useEffect, useReducer, useCallback } from "react";
import { fetchApi } from "./component/utils/api.utils";
import { cartReducer } from "./component/reducers/cart.reducer";
import { Navbar } from "./component/layout/Navbar";
import { MenuItemForm } from "./card/admin/MenuItemForm";
import { MenuPage } from "./card/MenuPage";
import { AuthForm } from "./component/auth/AuthForm";
import { CartPage } from "./card/cart/CartPage";
import { OrderHistory } from "./card/orders/OrderHistory";
import { AdminMenuManagement } from "./card/admin/AdminMenuManagement";
import { Toast } from "./component/components/ui/Toast";

const App = () => {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("menu");
  const [menu, setMenu] = useState([]);
  const [cart, dispatchCart] = useReducer(cartReducer, []);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [orders, setOrders] = useState([]);
  const [currentEditItem, setCurrentEditItem] = useState(null);

  const token = user?.token || null;
  const role = user?.role || "guest";
  const isAdmin = role === "admin";
  const isCustomer = role === "customer";
  const isLoggedIn = !!user;

  const showMessage = useCallback((type, text) => {
    setMessage({ type, text });
  }, []);

  // Persistence
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedCart = localStorage.getItem("cart");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem("user");
      }
    }
    if (storedCart) {
      try {
        dispatchCart({ type: "SET_CART", payload: JSON.parse(storedCart) });
      } catch (e) {
        localStorage.removeItem("cart");
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // API Functions
  const fetchMenu = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchApi("GET", "/menu", token);
      setMenu(data);
    } catch (error) {
      showMessage("error", `Failed to load menu: ${error.message}`);
      setMenu([]);
    } finally {
      setLoading(false);
    }
  }, [token, showMessage]);

  const fetchOrders = useCallback(async () => {
    if (!isLoggedIn) return;
    setLoading(true);
    try {
      const endpoint = isAdmin ? "/admin/orders" : "/orders";
      const data = await fetchApi("GET", endpoint, token);
      setOrders(data);
    } catch (error) {
      showMessage("error", `Failed to load orders: ${error.message}`);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, [token, isAdmin, isLoggedIn, showMessage]);

  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);

  useEffect(() => {
    if (
      (isLoggedIn && page === "order_history") ||
      (isAdmin && page === "admin_orders")
    ) {
      fetchOrders();
    }
  }, [page, isLoggedIn, isAdmin, fetchOrders]);

  // Auth Handlers
  const handleAuth = async (isRegister, formData) => {
    setLoading(true);
    try {
      const endpoint = isRegister ? "/auth/register" : "/auth/login";
      const result = await fetchApi("POST", endpoint, null, formData);

      setUser({
        token: result.token,
        role: result.role,
        name: result.name || formData.name,
      });
      setPage(result.role === "admin" ? "admin_orders" : "menu");
      showMessage("success", `Welcome, ${result.name || formData.name}!`);
    } catch (error) {
      showMessage("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    dispatchCart({ type: "CLEAR_CART" });
    setPage("menu");
    showMessage("success", "Logged out successfully");
  };

  // Cart Handlers
  const handleAddToCart = (item) => {
    dispatchCart({
      type: "ADD_ITEM",
      payload: {
        menuItemId: item._id,
        name: item.name,
        price: item.price,
      },
    });
    showMessage("success", `${item.name} added to cart`);
  };

  const handleUpdateQuantity = (item, action) => {
    if (action === "increase") {
      dispatchCart({ type: "ADD_ITEM", payload: item });
    } else {
      dispatchCart({ type: "REMOVE_ITEM", payload: item });
    }
  };

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      showMessage("error", "Your cart is empty!");
      return;
    }

    setLoading(true);
    try {
      const orderPayload = {
        items: cart.map((item) => ({
          menuItemId: item.menuItemId,
          quantity: item.quantity,
        })),
      };

      await fetchApi("POST", "/orders", token, orderPayload);
      dispatchCart({ type: "CLEAR_CART" });
      await fetchOrders();
      setPage("order_history");
      showMessage("success", "Order placed successfully!");
    } catch (error) {
      showMessage("error", `Order failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Admin Handlers
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    setLoading(true);
    try {
      await fetchApi("PATCH", `/admin/orders/${orderId}`, token, {
        status: newStatus,
      });
      await fetchOrders();
      showMessage("success", `Order status updated to ${newStatus}`);
    } catch (error) {
      showMessage("error", `Failed to update status: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveMenuItem = async (itemData) => {
    setLoading(true);
    try {
      if (itemData._id) {
        await fetchApi("PUT", `/menu/${itemData._id}`, token, itemData);
        showMessage("success", `${itemData.name} updated`);
      } else {
        await fetchApi("POST", "/menu", token, itemData);
        showMessage("success", `${itemData.name} added`);
      }
      setCurrentEditItem(null);
      await fetchMenu();
    } catch (error) {
      showMessage("error", `Failed to save item: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMenuItem = async (itemId, itemName) => {
    if (!window.confirm(`Delete "${itemName}"?`)) return;
    setLoading(true);
    try {
      await fetchApi("DELETE", `/menu/${itemId}`, token);
      await fetchMenu();
      showMessage("success", `${itemName} deleted`);
    } catch (error) {
      showMessage("error", `Failed to delete: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Page Routing
  const renderContent = () => {
    switch (page) {
      case "login":
      case "register":
        return (
          <AuthForm
            type={page}
            onAuth={handleAuth}
            loading={loading}
            onToggle={() => setPage(page === "login" ? "register" : "login")}
          />
        );
      case "menu":
        return (
          <MenuPage
            menu={menu}
            loading={loading}
            cart={cart}
            onAddToCart={handleAddToCart}
            isCustomer={isCustomer}
            onViewCart={() => setPage("cart")}
          />
        );
      case "cart":
        if (!isCustomer)
          return (
            <AuthForm
              type="login"
              onAuth={handleAuth}
              loading={loading}
              onToggle={() => setPage("register")}
            />
          );
        return (
          <CartPage
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onClearCart={() => dispatchCart({ type: "CLEAR_CART" })}
            onPlaceOrder={handlePlaceOrder}
            loading={loading}
          />
        );
      case "order_history":
        if (!isCustomer)
          return (
            <AuthForm
              type="login"
              onAuth={handleAuth}
              loading={loading}
              onToggle={() => setPage("register")}
            />
          );
        return (
          <OrderHistory orders={orders} loading={loading} isAdmin={false} />
        );
      case "admin_menu":
        if (!isAdmin)
          return (
            <AuthForm
              type="login"
              onAuth={handleAuth}
              loading={loading}
              onToggle={() => setPage("register")}
            />
          );
        return (
          <AdminMenuManagement
            menu={menu}
            loading={loading}
            onEdit={setCurrentEditItem}
            onDelete={handleDeleteMenuItem}
            onAdd={() => setCurrentEditItem({})}
          />
        );
      case "admin_orders":
        if (!isAdmin)
          return (
            <AuthForm
              type="login"
              onAuth={handleAuth}
              loading={loading}
              onToggle={() => setPage("register")}
            />
          );
        return (
          <OrderHistory
            orders={orders}
            loading={loading}
            isAdmin={true}
            onUpdateStatus={handleUpdateOrderStatus}
          />
        );
      default:
        return (
          <MenuPage
            menu={menu}
            loading={loading}
            cart={cart}
            onAddToCart={handleAddToCart}
            isCustomer={isCustomer}
            onViewCart={() => setPage("cart")}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar
        user={user}
        page={page}
        setPage={setPage}
        onLogout={handleLogout}
      />

      {message && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
          <Toast
            message={message.text}
            type={message.type}
            onClose={() => setMessage(null)}
          />
        </div>
      )}

      <main className="max-w-7xl mx-auto py-8">{renderContent()}</main>

      {currentEditItem && (
        <MenuItemForm
          item={currentEditItem}
          onSubmit={handleSaveMenuItem}
          onCancel={() => setCurrentEditItem(null)}
          loading={loading}
        />
      )}

      <footer className="bg-white border-t border-gray-200 py-6 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-600">
            © 2025 FoodApp. Built with React & Tailwind CSS
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Backend API: localhost:5000
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes slide-down {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scale-in {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default App;
