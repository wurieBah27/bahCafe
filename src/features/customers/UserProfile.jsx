import { HiCog, HiMiniHome, HiOutlineChevronRight } from "react-icons/hi2";
import { FaCartPlus, FaHeart } from "react-icons/fa";
import { Avatar, Button } from "flowbite-react";
import { RiLogoutCircleLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { getUser } from "./customersHooks/useGetCurrentUser";
import { format } from "date-fns";
import { LogOutUser } from "./customersHooks/LogInOutUser";
import { MdFastfood } from "react-icons/md";

const UserProfile = () => {
  const { data } = getUser();
  const { profileUrl, createdAt, name, email } = data;

  const date = createdAt?.toDate();
  const formattedDate = date ? format(date, "PPpp") : "";
  const { signOut } = LogOutUser();
  const userFirstName = name?.split(" ")[0];

  return (
    <div>
      <div>
        <div className="flex min-h-screen flex-col pb-10">
          <Link to="/user/details">
            <div className="mb-8 w-full">
              <div className="flex items-center justify-between bg-gray-100 px-4 dark:bg-gray-600">
                <div className="flex items-center gap-4 py-2">
                  {profileUrl ? (
                    <img
                      alt="Bonnie image"
                      src={profileUrl}
                      className="h-10 w-10 rounded-full object-cover shadow-lg"
                    />
                  ) : (
                    <Avatar />
                  )}
                  <h5 className="text-xl font-medium text-gray-900 dark:text-white max-[370px]:text-sm">
                    {userFirstName || "No name"}
                  </h5>
                </div>
                <HiOutlineChevronRight className="size-8 font-bold dark:text-gray-100" />
              </div>
            </div>
          </Link>
          <Link to={"/order"}>
            <div className="mb-2 flex w-full items-center justify-between rounded-md bg-gray-100 px-4 dark:bg-gray-600">
              <div className="flex items-center gap-4 py-2">
                <MdFastfood className="size-5 font-bold text-gray-500 dark:text-gray-100" />

                <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                  orders{" "}
                </h5>
              </div>
              <HiOutlineChevronRight className="size-8 font-bold dark:text-gray-100" />
            </div>
          </Link>
          <Link to="/favorites-items">
            <div className="mb-2 flex w-full items-center justify-between bg-gray-100 px-4 dark:bg-gray-600">
              <div className="flex items-center gap-4 py-2">
                <FaHeart className="size-5 font-bold text-gray-500 dark:text-gray-100" />

                <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                  favorites
                </h5>
              </div>
              <HiOutlineChevronRight className="size-8 font-bold dark:text-gray-100" />
            </div>
          </Link>
          <Link to="/cart">
            <div className="mb-2 flex w-full items-center justify-between bg-gray-100 px-4 dark:bg-gray-600">
              <div className="flex items-center gap-4 py-2">
                <FaCartPlus className="size-5 font-bold text-gray-500 dark:text-gray-100" />

                <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                  cart
                </h5>
              </div>
              <HiOutlineChevronRight className="size-8 font-bold dark:text-gray-100" />
            </div>
          </Link>

          <Link to="/user/address">
            <div className="mb-2 flex w-full items-center justify-between bg-gray-100 px-4 dark:bg-gray-600">
              <div className="flex items-center gap-4 py-2">
                <HiMiniHome className="size-5 font-bold text-gray-500 dark:text-gray-100" />

                <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                  Address
                </h5>
              </div>
              <HiOutlineChevronRight className="size-8 font-bold dark:text-gray-100" />
            </div>
          </Link>

          <span className="my-4 text-sm text-gray-500 dark:text-gray-400">
            Joined on {formattedDate} as {email}
          </span>
          <div className="flex w-full items-center justify-center text-center lg:mt-6">
            <Button
              gradientDuoTone="pinkToOrange"
              className="w-[40%]"
              onClick={() => signOut()}
            >
              <RiLogoutCircleLine className="mr-3 size-5" />
              <span>Log out</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
