import { HiChevronLeft } from "react-icons/hi";
import { useMoveBack } from "../helpers/moveBack";

const BackButton = () => {
  const moveBack = useMoveBack(); // Call the hook here

  return (
    <span onClick={moveBack} className="mb-1 inline-block cursor-pointer">
      <HiChevronLeft className="size-10 font-bold text-gray-800" />
    </span>
  );
};

export default BackButton;
