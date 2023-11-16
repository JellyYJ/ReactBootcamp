import { Link, useNavigate } from 'react-router-dom';

function LinkButton({ children, to }) {
  const navigate = useNavigate();
  if (to === '-1') {
    return <button onClick={() => navigate(-1)}>{children}</button>;
  }

  return (
    <Link
      className="text-sm hover:text-blue-700 hover:underline
    "
      to={to}
    >
      {children}
    </Link>
  );
}

export default LinkButton;
