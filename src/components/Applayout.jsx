import { Outlet } from "react-router";
import Header from "./Header";
import BottomNav from "./BottomNav";
import SidebarContainer from "./Sidebar";

const Applayout = () => {
  return (
    <div className="mx-auto max-w-5xl bg-gray-100 dark:bg-gray-700">
      <main className="bg-primary min-h-screen dark:bg-gray-800">
        <div>
          <Header />
        </div>

        <div>
          <SidebarContainer />
        </div>

        <div>
          <Outlet />
        </div>
        <BottomNav />
      </main>
      s
    </div>
  );
};

export default Applayout;
