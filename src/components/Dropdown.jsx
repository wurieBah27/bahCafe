import { Dropdown } from "flowbite-react";
import { HiMiniMoon, HiMiniSun } from "react-icons/hi2";

export const DarkModeSelect = ({ children }) => {
  const isDarkMode = false;

  return (
    <Dropdown
      label=""
      dismissOnClick={true}
      renderTrigger={() =>
        isDarkMode ? (
          <HiMiniSun className="h-5 w-5 text-gray-50 sm:h-7 sm:w-7 dark:text-gray-400" />
        ) : (
          <HiMiniMoon className="h-5 w-5 text-gray-50 sm:h-7 sm:w-7 dark:text-gray-400" />
        )
      }
    >
      {children}
    </Dropdown>
  );
};
