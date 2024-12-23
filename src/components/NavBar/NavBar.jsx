import { Link } from "react-router-dom";
import { AuthedUserContext } from "../../App";
import { useContext } from "react";
import styles from "./NavBar.module.css";
import Logo from "../../assets/images/logo.svg";

const NavBar = ({ handleSignout }) => {
  const user = useContext(AuthedUserContext);
  return (
    <>
      {user ? (
        <nav className={styles.container}>
          <Link to="/">Meet Me</Link>
          <ul>
            <li>Welcome, {user.username}</li>
            <li>
              <Link to="/posts">Home</Link>
            </li>
            <li>
              <Link to="/posts/new">NEW POST</Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
            <li className="signOutButton">
              <Link to="" onClick={handleSignout}>
                Sign Out
              </Link>
            </li>
          </ul>
        </nav>
      ) : (
        <nav>
          <ul>
            <li>
              <Link to="/signin">Sign In</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};
export default NavBar;
