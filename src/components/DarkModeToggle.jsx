import { DropdownItem } from "flowbite-react";
import { DarkModeSelect } from "./Dropdown";

const DarkModeToggle = () => {
  // const dispatch = useDispatch();

  // const [isDark, setIsDarkMode] = useLocaleStorage(
  //   window.matchMedia("(prefers-color-scheme: dark)").matches,
  //   "isDarkMode",
  // );

  // function toggleDarkMode(dark) {
  //   setIsDarkMode(dark);
  // }

  // useEffect(() => {
  //   if (isDark) {
  //     document.documentElement.classList.add("dark");
  //     document.documentElement.classList.remove("light");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //     document.documentElement.classList.add("light");
  //   }

  //   dispatch(toggleTheme(isDark));
  // }, [isDark, dispatch]);
  // onClick={() => toggleDarkMode(true)}
  // onClick={() => toggleDarkMode(false)}
  // onClick={() =>
  //     toggleDarkMode(
  //       window.matchMedia("(prefers-color-scheme: dark)").matches,
  //     )
  //   }

  return (
    <DarkModeSelect>
      <DropdownItem>Dark</DropdownItem>
      <DropdownItem>Light</DropdownItem>
      <DropdownItem>Device</DropdownItem>
    </DarkModeSelect>
  );
};

export default DarkModeToggle;
