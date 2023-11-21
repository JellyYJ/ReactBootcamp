import { useDispatch, useSelector } from 'react-redux';
import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import CartItem from './CartItem';
import { getCart, clearCart } from './cartSlice';
import EmptyCart from './EmptyCart';

function Cart() {
  const username = useSelector((state) => state.user.username);
  const cart = useSelector(getCart);
  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;

  function handleClearCart() {
    dispatch(clearCart());
  }

  return (
    <div className="px-3 py-4">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-8 text-lg font-semibold">{username}'s cart </h2>

      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className="mt-6 space-x-3">
        <Button type="primary" to="/order/new">
          Order pizzas
        </Button>
        <Button onClick={handleClearCart} type="secondary">
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
