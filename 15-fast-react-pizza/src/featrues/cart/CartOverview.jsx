import { Link } from 'react-router-dom';

function CartOverview() {
  return (
    // Breakpoint prefix: "sm:px-16", when screen is bigger than this(640px), other styles would be applied
    <div
      className="flex items-start justify-between
     bg-stone-800 p-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base"
    >
      <p className="space-x-3 font-semibold text-stone-300 sm:space-x-6">
        <span>23 pizzas</span>
        <span>$23.45</span>
      </p>
      <Link to="/cart">Go to Cart ~</Link>
    </div>
  );
}

export default CartOverview;
