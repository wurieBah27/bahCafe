import { useState } from "react";
import { Avatar, Button, Dropdown } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";

import DarkModeToggle from "./DarkModeToggle";

import { getUser } from "../features/customers/customersHooks/useGetCurrentUser";
import { LogOutUser } from "../features/customers/customersHooks/LogInOutUser";
import ConfirmDeleteUserAccount from "./ConfirmDeleteUserAccount";
const Navbar = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(!openModal);

  const { data = {}, uid } = getUser();
  const { signOut } = LogOutUser();
  const navigate = useNavigate();
  const { profileUrl = "", name, email, address } = data;
  const formatted = address?.formatted || ""; // Use optional chaining to safely access formatted

  return (
    <nav className="border-gray-200 bg-[#0d9488] shadow-xl dark:bg-gray-700">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-4 py-2 sm:px-5">
        <div>
          <Link
            to="/"
            className="relative flex flex-wrap items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="/flowers.jpeg"
              alt=""
              className="h-8 w-8 rounded-full object-cover"
            />
            <span className="self-center whitespace-nowrap text-sm font-semibold uppercase text-gray-300 dark:text-white sm:text-2xl">
              Cafe
            </span>
          </Link>
        </div>
        <div className="max-[370px]:hidden">
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
        </div>

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
              <Link to="/user/details">
                <Dropdown.Item>Edit Account</Dropdown.Item>
              </Link>
              <Dropdown.Item onClick={handleOpenModal}>
                Delete Account
              </Dropdown.Item>
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
      <ConfirmDeleteUserAccount
        openModal={openModal}
        handleOpenModal={handleOpenModal}
      />
    </nav>
  );
};

export default Navbar;
