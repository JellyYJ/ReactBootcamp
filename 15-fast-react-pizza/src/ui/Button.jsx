import { Link } from 'react-router-dom';

// Define the Button component
function Button({ children, disabled, to }) {
  const className =
    'inline-block rounded-full bg-yellow-400 p-3 py-4 font-semibold uppercase tracking-wide text-stone-800  ring-offset-1 transition-colors duration-300 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 disabled:cursor-not-allowed md:px-6';

  // If it is a link
  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }

  // If it is a button
  return (
    <button className={className} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
