import { Dropdown } from "flowbite-react";
import { HiMiniMoon, HiMiniSun } from "react-icons/hi2";

export const DarkModeSelect = ({ children, isDarkMode }) => {
  return (
    <Dropdown
      label=""
      dismissOnClick={true}
      renderTrigger={() =>
        isDarkMode ? (
          <HiMiniMoon className="size-5 text-gray-50 dark:text-gray-400 sm:h-7 sm:w-7" />
        ) : (
          <HiMiniSun className="size-5 text-gray-50 dark:text-gray-400 sm:h-7 sm:w-7" />
        )
      }
    >
      {children}
    </Dropdown>
  );
};
