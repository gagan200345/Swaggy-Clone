import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "./useCart";

function Prohead() {
  const [open, setOpen] = useState(false);
  const { cart, addToCart, decreaseQty, removeFromCart, clearCart, totalItems, totalPrice } =
    useCart();

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between bg-gray-800 px-6 py-3 text-white">
      <Link to="/restuarent" className="text-xl font-bold">
        MyShop
      </Link>

      <nav className="hidden gap-5 sm:flex">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/restuarent" className="hover:underline">Restaurants</Link>
        <Link to="/search" className="hover:underline">Search</Link>
      </nav>

      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="relative cursor-pointer text-2xl"
        >
          🛒
          {totalItems > 0 && (
            <span className="absolute -right-2 -top-1.5 rounded-full bg-red-500 px-1.5 py-0.5 text-xs text-white">
              {totalItems}
            </span>
          )}
        </button>

        {open && (
          <div className="absolute right-0 top-11 w-80 rounded-lg bg-white p-4 text-gray-900 shadow-xl">
            <h3 className="mb-2 text-lg font-semibold">Your Cart</h3>

            {cart.length === 0 ? (
              <p className="text-gray-500">our cart is empty</p>
            ) : (
              <>
                <div className="max-h-64 overflow-y-auto">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between border-b border-gray-200 py-2"
                    >
                      <div className="flex flex-col">
                        <strong>{item.name}</strong>
                        <span className="text-sm text-gray-600">
                          ₹{item.price * item.qty}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => decreaseQty(item.id)}
                          className="h-6 w-6 cursor-pointer rounded border border-gray-300 bg-gray-50 hover:bg-gray-100"
                        >
                          −
                        </button>
                        <span className="w-5 text-center">{item.qty}</span>
                        <button
                          onClick={() => addToCart(item)}
                          className="h-6 w-6 cursor-pointer rounded border border-gray-300 bg-gray-50 hover:bg-gray-100"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="h-6 w-6 cursor-pointer rounded border border-gray-300 bg-gray-50 text-red-500 hover:bg-red-50"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="my-3 flex justify-between">
                  <span>Total</span>
                  <strong>₹{totalPrice}</strong>
                </div>

                <button
                  onClick={clearCart}
                  className="w-full cursor-pointer rounded-md bg-red-500 py-2 text-white hover:bg-red-600"
                >
                  Clear Cart
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Prohead;