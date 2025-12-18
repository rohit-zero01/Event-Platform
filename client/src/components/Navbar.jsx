import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [location.pathname]);

  const showDashboard = location.pathname.startsWith("/event/");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setToken(null);
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          Mini Event Platform
        </Link>

        <div className="collapse navbar-collapse show">
          <ul className="navbar-nav ms-auto align-items-center">

            {showDashboard && (
              <li className="nav-item">
                <Link className="btn btn-outline-light me-2" to="/">
                  Dashboard
                </Link>
              </li>
            )}

            {/* CREATE EVENT — always visible */}
            <li className="nav-item">
              <Link className="btn btn-outline-light me-2" to="/create">
                Create Event
              </Link>
            </li>

            {!token ? (
              <>
                <li className="nav-item">
                  <Link className="btn btn-outline-light me-2" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-outline-light ms-2" to="/register">
                    Sign Up
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button
                  className="btn btn-danger"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
