import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTotalCartQuantity, getTotalCartPrice } from './cartSlice';

function CartOverview() {
  // optimisation for large project "reselect" (not included in this lecture)
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const totalCartPrice = useSelector(getTotalCartPrice);
  if (!totalCartQuantity) return null;

  return (
    // Breakpoint prefix: "sm:px-16", when screen is bigger than this(640px), other styles would be applied
    <div
      className="flex items-start justify-between
     bg-stone-800 p-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base"
    >
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>{totalCartQuantity} pizzas</span>
        <span>${totalCartPrice}</span>
      </p>
      <Link to="/cart">Go to Cart</Link>
    </div>
  );
}

export default CartOverview;
