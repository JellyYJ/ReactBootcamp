import { Link } from 'react-router-dom';

// Define the Button component
function Button({ children, disabled, to, type }) {
  const base =
    'inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800  ring-offset-1 transition-colors duration-300 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 disabled:cursor-not-allowed';

  const styles = {
    primary: base + ' px-4 py-3 md:px-6 md:py-3',
    small: base + ' px-3 py-2.5 md:px-4 md:py-2.5 text-xs',
    secondary:
      ' px-4 py-3 text-sm md:px-6 md:py-2.5 inline-block rounded-full border-2 border-stone-300 font-semibold uppercase tracking-wide text-stone-500  ring-offset-1 transition-colors duration-300 hover:bg-stone-300 focus:outline-none focus:ring focus:ring-stone-200 disabled:cursor-not-allowed',
  };

  // If it is a link
  if (to) {
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );
  }

  // If it is a button
  return (
    <button className={styles[type]} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
