import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { useSelector } from 'react-redux';
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice';
import EmptyCart from '../cart/EmptyCart';
import store from '../../store';
import { formatCurrency } from '../../utils/helpers';
import { useState } from 'react';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const formErrors = useActionData(); // Get access to the errors while the action

  const cart = useSelector(getCart);
  const totoalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totoalCartPrice * 0.2 : 0;
  const totalPrice = totoalCartPrice + priorityPrice;
  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="customer"
              required
            />
          </div>
        </div>

        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-1.5 text-xs text-red-700">
                {formErrors?.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              required
            />
          </div>
        </div>

        <div className="mb-4 flex items-center gap-2">
          <input
            className="h-5 w-5 accent-yellow-400"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting
              ? 'Order Placed...'
              : `Order Now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

// Function for writting data
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  // console.log(data.cart);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };

  // Error Handling
  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone = 'Please provide correct phone number for us to contact you.';
  }
  if (Object.keys(errors).length > 0) return errors;

  // Creating new order
  const newOrder = await createOrder(order);
  // DO NOT OVERUSE: This approach can deactivate optimisation
  store.dispatch(clearCart());
  // NOTE: We cannot call hooks (navigate) inside this function, instead we use redirect() to direct to the order page
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
