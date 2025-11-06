import React, { useCallback, useRef, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Removed unused 'replace'
import logo from "../assets/logo.png";
import { navbarStyles as styles } from "../assets/dummyStyles";
import {
  FaBars,
  FaSignInAlt,
  FaSignOutAlt,
  FaTimes,
  FaUser,
} from "react-icons/fa";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Standardized to lowercase 'isOpen'
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => !!localStorage.getItem("authToken")
  ); // Added setIsLoggedIn
  const location = useLocation();
  const navigate = useNavigate();

  const buttonRef = useRef(null);
  const menuRef = useRef(null);
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/cars", label: "Cars" },
    { to: "/contact", label: "Contact" },
  ];

  const handleLogout = useCallback(() => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false); // Fixed: Use setIsLoggedIn
    navigate("/", { replace: true });
    setIsOpen(false);
  }, [navigate, setIsLoggedIn]); // Added setIsLoggedIn to dependencies

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("authToken")); // Fixed: Use setIsLoggedIn
    setIsOpen(false);
  }, [location, setIsLoggedIn]); // Added setIsLoggedIn

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("authToken")); // Fixed: Use setIsLoggedIn
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [setIsLoggedIn]); // Added setIsLoggedIn

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen && // Standardized to lowercase
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav
      className={`${styles.nav.base} ${
        scrolled ? styles.nav.scrolled : styles.nav.notScrolled
      }`}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <div
            className={`${styles.floatingNav.base} ${
              scrolled
                ? styles.floatingNav.scrolled
                : styles.floatingNav.notScrolled
            }`}
            role="region"
            aria-description="navigation"
          >
            <div className="flex items-center justify-between gap-4">
              <Link to="/" className="flex items-center">
                <div className={styles.logoContainer}>
                  <img
                    src={logo}
                    alt="logo"
                    className="h-[1em] w-auto block"
                    style={{ display: "block", objectFit: "cover" }}
                  />
                  <span className={styles.logoText}>IMBESU</span>
                </div>
              </Link>

              <div className={styles.navLinksContainer}>
                <div className={styles.navLinksInner}>
                  {navLinks.map((link, index) => (
                    <React.Fragment key={link.to}>
                      <Link
                        to={link.to}
                        className={`${styles.navLink.base} ${
                          isActive(link.to)
                            ? styles.navLink.active
                            : styles.navLink.inactive
                        }`}
                      >
                        {link.label}
                      </Link>

                      {index < navLinks.length - 1 && (
                        <div className={styles.separator} aria-hidden="true" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <div className={styles.userActions}>
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className={styles.authButton}
                    aria-label="logout"
                  >
                    <FaSignOutAlt className="text-base" />
                    <span className={styles.authText}>LogOut</span>
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className={styles.authButton}
                    aria-label="login"
                  >
                    <FaUser />
                    <span className={styles.authText}>Login</span>
                  </Link>
                )}
              </div>
              <div className="md:hidden flex items-center">
                <button
                  ref={buttonRef}
                  onClick={() => setIsOpen((p) => !p)}
                  aria-label={isOpen ? "Close menu" : "Open menu"}
                  aria-expanded={isOpen}
                  aria-controls="mobile-menu"
                  className={styles.mobileAuthButton}
                >
                  {isOpen ? (
                    <FaTimes className="h-5 w-5" />
                  ) : (
                    <FaBars className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        id="mobile-menu"
        ref={menuRef}
        aria-hidden={!isOpen}
        className={`${styles.mobileMenu.container} ${
          isOpen ? styles.mobileMenu.open : styles.mobileMenu.closed
        }`}
      >
        <div className={styles.mobileMenuInner}>
          <div className="px-4 pt-3 pb-4 space-y-2">
            <div className={styles.mobileGrid}>
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={`${styles.mobileLink.base} ${
                    isActive(link.to)
                      ? styles.mobileLink.active
                      : styles.mobileLink.inactive
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className={styles.divider} />
            <div className="pt-1">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className={styles.mobileAuthButton}
                >
                  <FaSignOutAlt className="mr-3 text-base" />
                  LogOut
                </button>
              ) : (
                <Link
                  to="/login"
                  className={styles.mobileAuthButton}
                  onClick={() => setIsOpen(false)}
                >
                  <FaUser className="mr-3 text-base" />
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
