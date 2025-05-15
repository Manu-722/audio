import { useEffect, useState } from "react";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import DarkModeToggle from "./DarkModeToggle";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <nav className="navbar">
      <h1>Music Explorer</h1>
      <div className="nav-links">
        <Link to="/">Home</Link> {/* Added Home Link */}
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link to="/favorites">Favorites</Link>
            <Link to="/playlist">Playlist</Link>
            <button onClick={() => signOut(auth)}>Logout</button>
          </>
        )}
      </div>
      <DarkModeToggle />
    </nav>
  );
};

export default Navbar;