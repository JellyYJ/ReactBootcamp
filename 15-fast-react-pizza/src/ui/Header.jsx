import { Link } from 'react-router-dom';
import SearchOrder from '../featrues/order/SearchOrder';
import Username from '../featrues/user/Username';

function Header() {
  return (
    <header className="flex justify-between border-b border-stone-200 bg-yellow-500 p-4 uppercase">
      <Link to="/" className="tracking-widest">
        Fast React Pizza Co.
      </Link>
      <SearchOrder />

      <Username />
    </header>
  );
}

export default Header;
