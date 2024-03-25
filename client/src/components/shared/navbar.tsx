import { Link } from "react-router-dom";
import UserBtn from "../auth/user-btn";
import Logo from "../logo";

const NAV_LINKS = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Categories",
    path: "/categories",
  },
  {
    title: "Products",
    path: "/products",
  },
  {
    title: "About",
    path: "/about",
  },
];

const Navbar = () => {
  return (
    <nav className="py-4 border-b">
      <div className="container flex justify-between items-center">
        <Logo />

        <ul className="flex gap-4 items-center">
          {NAV_LINKS.map((link, index) => (
            <li key={index}>
              <Link to={link.path}>{link.title}</Link>
            </li>
          ))}
        </ul>

        <UserBtn />
      </div>
    </nav>
  );
};

export default Navbar;
