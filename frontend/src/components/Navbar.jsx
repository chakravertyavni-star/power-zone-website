import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { token, isAdmin, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let lastScroll = 0;

    const onScroll = () => {
      const current = window.scrollY;
      setHidden(current > lastScroll && current > 80);
      lastScroll = current;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [token]);

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/");
  };

  return (
    <nav className={`navbar ${hidden ? "hide" : ""}`}>
      <div className="logo">
        <Link to="/" onClick={() => setOpen(false)}>Power Zone</Link>
      </div>

      <button
        className={`hamburger ${open ? "active" : ""}`}
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
        <span />
      </button>

      <ul className={`nav-links ${open ? "active" : ""}`}>
        <li><NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink></li>
        <li><NavLink to="/amenities" onClick={() => setOpen(false)}>Amenities</NavLink></li>
        <li><NavLink to="/contact" onClick={() => setOpen(false)}>Contact</NavLink></li>
        {token && (
          <>
            <li><NavLink to="/services" onClick={() => setOpen(false)}>Services</NavLink></li>
            <li><NavLink to="/dashboard" onClick={() => setOpen(false)}>Dashboard</NavLink></li>
          </>
        )}
        {isAdmin && (
          <li><NavLink to="/admin" onClick={() => setOpen(false)}>Admin</NavLink></li>
        )}
        {!token ? (
          <li><NavLink to="/login" onClick={() => setOpen(false)}>Login</NavLink></li>
        ) : (
          <li><button className="nav-logout" onClick={handleLogout}>Logout</button></li>
        )}
      </ul>
    </nav>
  );
}
