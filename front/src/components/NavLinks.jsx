import { Link } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";
import Button from "./Button.jsx";

const NavLinks = () => {
  const { user, logout } = useAuth();

  return (
    <>
      <nav className="flex justify-around items-center bg-slate-600 text-white fixed w-full">
        <div>
          <Link to="/">
            <Button buttonType={"navlinks"}>Home</Button>
          </Link>
          {user && user.roles.includes("ROLE_ADMIN") && (
            <>
              <Link to="/item-creation-form">
                <Button buttonType={"navlinks"}>Ad Creation Form</Button>
              </Link>
            </>
          )}
        </div>
        <div>
          {user ? (
            <>
              <div className="flex items-center font-bold">
                <p className="pr-5">You are logged in as {user.username}</p>
                <Link to="/">
                  <Button buttonType={"navlinks"} onClick={logout}>
                    Log out
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <div>
              <Link to="/login">
                <Button buttonType={"navlinks"}>Log In</Button>
              </Link>
              <Link to="/signup">
                <Button buttonType={"navlinks"}>Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default NavLinks;
