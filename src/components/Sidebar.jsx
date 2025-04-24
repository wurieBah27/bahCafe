import { Button, Drawer, Sidebar, TextInput } from "flowbite-react";
import {
  HiChartPie,
  HiClipboard,
  HiCollection,
  HiInformationCircle,
  HiLogin,
  HiPencil,
  HiSearch,
  HiShoppingBag,
  HiUserCircle,
  HiUsers,
} from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { getTogglesidebar, toggleSideBar } from "../helpers/toggles";
import { Link } from "react-router-dom";
import { IoIosLogIn } from "react-icons/io";
import SideBarItem from "./SideBarItem";

const SidebarContainer = () => {
  const dispatch = useDispatch();
  const toggle = useSelector(getTogglesidebar);
  const handleClose = () => dispatch(toggleSideBar(!toggle));

  return (
    <div>
      <>
        <Drawer open={toggle} onClose={handleClose}>
          <Drawer.Header title="MT CAFE" titleIcon={() => <></>} />
          <Drawer.Items>
            <Sidebar
              aria-label="Sidebar with multi-level dropdown example"
              className="[&>div]:bg-transparent [&>div]:p-0"
            >
              <div className="flex h-full flex-col justify-between py-2">
                <div>
                  <form className="pb-3 md:hidden">
                    <TextInput
                      icon={HiSearch}
                      type="search"
                      placeholder="Search"
                      required
                      size={32}
                    />
                  </form>
                  <Sidebar.Items>
                    <Sidebar.ItemGroup>
                      <Sidebar.Item href="/" icon={HiChartPie}>
                        Dashboard
                      </Sidebar.Item>
                      <Sidebar.Item
                        href="/e-commerce/products"
                        icon={HiShoppingBag}
                      >
                        Products
                      </Sidebar.Item>
                      <SideBarItem
                        title="Sign In"
                        icon={IoIosLogIn}
                        url="/login"
                      />
                      <SideBarItem
                        title="Create Accont"
                        icon={HiUserCircle}
                        url="/signin"
                      />
                    </Sidebar.ItemGroup>
                    <Sidebar.ItemGroup>
                      <Sidebar.Item
                        href="https://github.com/themesberg/flowbite-react/"
                        icon={HiClipboard}
                      >
                        Docs
                      </Sidebar.Item>
                      <Sidebar.Item
                        href="https://flowbite-react.com/"
                        icon={HiCollection}
                      >
                        Components
                      </Sidebar.Item>
                      <Sidebar.Item
                        href="https://github.com/themesberg/flowbite-react/issues"
                        icon={HiInformationCircle}
                      >
                        Help
                      </Sidebar.Item>
                    </Sidebar.ItemGroup>
                  </Sidebar.Items>
                </div>
              </div>
            </Sidebar>
          </Drawer.Items>
        </Drawer>
      </>
    </div>
  );
};

export default SidebarContainer;
