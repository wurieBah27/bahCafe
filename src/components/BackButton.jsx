import { HiChevronLeft } from "react-icons/hi";
import { useMoveBack } from "../helpers/moveBack";

const BackButton = () => {
  const moveBack = useMoveBack(); // Call the hook here

  return (
    <span
      onClick={moveBack}
      className="mb-1 inline-block cursor-pointer dark:bg-gray-600"
    >
      <HiChevronLeft className="size-10 font-bold text-gray-800 dark:text-gray-100" />
    </span>
  );
};

export default BackButton;
