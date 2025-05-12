import { DropdownItem } from "flowbite-react";
import { DarkModeSelect } from "./Dropdown";
import { useLocaleStorage } from "../helpers/useLocaleStorage";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { toggleTheme } from "../services/darkmodeReducer";
import { HiOutlineMoon } from "react-icons/hi2";
import { HiOutlineSun } from "react-icons/hi";
import { BsSunriseFill } from "react-icons/bs";

const DarkModeToggle = () => {
  const dispatch = useDispatch();

  const [isDark, setIsDarkMode] = useLocaleStorage(
    window.matchMedia("(prefers-color-scheme: dark)").matches,
    "isDarkMode",
  );

  function toggleDarkMode(dark) {
    setIsDarkMode(dark);
  }

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }

    dispatch(toggleTheme(isDark));
  }, [isDark, dispatch]);

  return (
    <DarkModeSelect isDarkMode={isDark}>
      <DropdownItem onClick={() => toggleDarkMode(true)}>
        <HiOutlineMoon className="mr-2 size-5" /> Dark
      </DropdownItem>
      <DropdownItem onClick={() => toggleDarkMode(false)}>
        <HiOutlineSun className="mr-2 size-5" />
        Light
      </DropdownItem>
      <DropdownItem
        onClick={() =>
          toggleDarkMode(
            window.matchMedia("(prefers-color-scheme: dark)").matches,
          )
        }
      >
        <BsSunriseFill className="mr-2 size-5" /> Device
      </DropdownItem>
    </DarkModeSelect>
  );
};

export default DarkModeToggle;
