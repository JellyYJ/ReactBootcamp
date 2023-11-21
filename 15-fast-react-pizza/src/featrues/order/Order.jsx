import { useLoaderData } from 'react-router-dom';
import { getOrder } from '../../services/apiRestaurant';
import OrderItem from './OrderItem';

// Test ID: IIDSAT
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utils/helpers';

function Order() {
  const order = useLoaderData();

  // Everyone can search for all orders,
  // so for privacy reasons we're gonna gonna exclude names or address,
  // these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-col justify-between sm:flex-row sm:items-center">
        <h2 className="items-center text-xl"> Order #{id} Status</h2>

        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-sm uppercase tracking-wide text-green-50">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-2 py-1 text-sm uppercase tracking-wide text-green-50">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-col justify-between space-y-2 bg-stone-200 px-6 py-5 sm:flex-row sm:items-center">
        <p className="text-sm font-semibold text-stone-800">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p className="text-stone-600">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="space-y-2 divide-y divide-stone-200 border-b border-t border-stone-200">
        {cart.map((item) => (
          <OrderItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-semibold text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-semibold text-stone-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className=" font-bold ">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
    </div>
  );
}

// Get order form API
export async function loader({ params }) {
  // this orderId should be matching the one specified in the Route
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
