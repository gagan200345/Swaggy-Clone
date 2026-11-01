import { useCart } from "./useCart";

function AddButton({ info }) {
  const { cart, addToCart, decreaseQty } = useCart();

  const id = info?.id;
  const inCart = cart.find((item) => item.id === id);

  const handleAdd = () =>
    addToCart({
      id,
      name: info?.name,
      price: (info?.price ?? info?.defaultPrice ?? 0) / 100,
    });

  if (!inCart) {
    return (
      <button
        onClick={handleAdd}
        className="cursor-pointer rounded-lg border border-gray-200 bg-white px-8 py-1.5 text-sm font-bold text-green-600 shadow hover:bg-green-50 active:scale-95 transition"
      >
        ADD
      </button>
    );
  }

  return (
    <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-bold text-green-600 shadow">
      <button onClick={() => decreaseQty(id)} className="cursor-pointer px-1">
        −
      </button>
      <span>{inCart.qty}</span>
      <button onClick={handleAdd} className="cursor-pointer px-1">
        +
      </button>
    </div>
  );
}

export default AddButton;