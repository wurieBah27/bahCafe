import { Avatar, Button, Dropdown, DropdownItem } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import { useDispatch, useSelector } from "react-redux";
import { getTogglesidebar, toggleSideBar } from "../helpers/toggles";
import { getUser } from "../features/customers/customersHooks/useGetCurrentUser";
import { LogOutUser } from "../features/customers/customersHooks/LogInOutUser";
const Navbar = () => {
  const dispatch = useDispatch();
  const toggle = useSelector(getTogglesidebar);
  const handleClose = () => dispatch(toggleSideBar(!toggle));
  const { data = {}, uid } = getUser();
  const { signOut } = LogOutUser();
  const navigate = useNavigate();
  const { profileUrl = "", name, email, address } = data;
  const formatted = address?.formatted || ""; // Use optional chaining to safely access formatted

  return (
    <nav className="border-gray-200 bg-[#0d9488] shadow-xl dark:bg-gray-700">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between px-4 py-2 sm:px-5">
        <div>
          <Link
            to="/"
            className="relative flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="/edama-icon.jpg"
              alt=""
              className="h-8 w-8 rounded-full object-cover"
            />
            <span className="self-center whitespace-nowrap text-sm font-semibold uppercase text-gray-300 sm:text-2xl dark:text-white">
              bah CAFE
            </span>
          </Link>
        </div>
        <Dropdown label="Address" inline>
          <div className="flex flex-col gap-2 px-2 py-1 text-xs shadow-lg">
            <span className="">{formatted}</span>
            <Link
              to="/user/address"
              className="inline max-w-max rounded-full bg-teal-600 px-4 py-1 text-gray-100"
            >
              Edit Address
            </Link>
          </div>
        </Dropdown>

        <div className="flex items-center gap-2 md:order-2">
          {uid && (
            <Dropdown
              arrowIcon={false}
              inline
              placement="bottom"
              label={
                <Avatar
                  alt="User settings"
                  img={profileUrl ? profileUrl : ""}
                  rounded
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">{name || "No Name"}</span>
                <span className="block truncate text-sm font-medium">
                  {email || "No Email"}
                </span>
              </Dropdown.Header>

              <Link to="/user">
                <Dropdown.Item>Account</Dropdown.Item>
              </Link>
              <Dropdown.Item>Edit Account</Dropdown.Item>
              <Dropdown.Item>Delete Account</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => signOut()}>Sign out</Dropdown.Item>
            </Dropdown>
          )}
          {!uid && (
            <Button size="xs" onClick={() => navigate("/login")}>
              Sign in
            </Button>
          )}
          <DarkModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
