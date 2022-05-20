import { Link } from 'react-router-dom';

export default function Index() {
  return (
    <>
      <p>
        <Link to="/items">Go to /items</Link>
      </p>
    </>
  );
}
