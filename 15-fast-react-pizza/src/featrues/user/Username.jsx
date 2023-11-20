import { useSelector } from 'react-redux';

function Username() {
  // Get state form redux in an react component "useSelectore"
  const username = useSelector((state) => state.user.username);
  if (!username) return null;

  return (
    <div className="hidden text-sm font-semibold md:block">
      <p>{username}</p>
    </div>
  );
}

export default Username;
