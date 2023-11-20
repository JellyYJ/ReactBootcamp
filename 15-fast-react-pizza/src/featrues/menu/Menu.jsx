import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurant';
import MenuItem from './MenuItem';

function Menu() {
  const menu = useLoaderData(); // Step3: Recive data from loader
  console.log(menu);
  return (
    <ul className='divide-y divide-stone-200'>
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

// Step1: Create the loader
export async function loader() {
  const menu = await getMenu();
  return menu;
}
export default Menu;
