import React from 'react';
import { Link } from 'react-router-dom';

const EmptyCart = () => {
  return (
    <div className="px-4 py-3">
      <Link to="/menu" className="text-blue-500 hover:underline">
        &larr; Back to menu
      </Link>

      <div className="mt-6 text-center text-lg">
        Your cart is still empty. Start adding some pizzas 😊
      </div>
    </div>
  );
};

export default EmptyCart;
