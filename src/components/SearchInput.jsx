import { Label, TextInput } from "flowbite-react";
import { HiAdjustments } from "react-icons/hi";
import { IoFilter } from "react-icons/io5";

const SearchInput = () => {
  return (
    <div className="mt-4 flex items-center gap-4 px-2 sm:px-6">
      <div className="max-w-full flex-1 text-xl font-semibold text-gray-900 dark:text-gray-100">
        <TextInput
          id="email4"
          className="text-xl"
          type="email"
          rightIcon={HiAdjustments}
          placeholder="How mai help you...."
          required
        />
      </div>
      <div>
        <IoFilter className="h-6 w-6 text-gray-500 sm:h-10 sm:w-10 dark:text-gray-400" />
      </div>
    </div>
  );
};

export default SearchInput;
