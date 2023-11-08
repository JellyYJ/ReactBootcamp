import { Link } from 'react-router-dom';

function CartOverview() {
  return (
    <div className="bg-stone-800 p-4 uppercase text-stone-200">
      <p className="space-x-3 font-semibold text-stone-300">
        <span>23 pizzas</span>
        <span>$23.45</span>
      </p>
      <Link to="/cart">Go to Cart ~</Link>
    </div>
  );
}

export default CartOverview;
