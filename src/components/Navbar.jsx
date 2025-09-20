import {Link} from 'react-router-dom';
import './Navbar.css';
import {NavLink} from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          {' '}
          PizzaApp
        </Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <NavLink
            to="/menu"
            className={({isActive}) => (isActive ? 'active-link' : '')}
          >
            Menu
          </NavLink>
          <Link to="/cart">Cart</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </div>
      </div>
    </nav>
  );
}
