import DarkModeToggle from "./DarkModeToggle";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Music Explorer</h1>
      <DarkModeToggle />
    </nav>
  );
};

export default Navbar;