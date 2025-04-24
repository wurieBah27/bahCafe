import { HiOutlineExclamationCircle } from "react-icons/hi";

const CheckBox = ({ arrayObjs, name, isRequired }) => {
  console.log(isRequired);
  return (
    <fieldset className="space-y-2">
      <legend className="text-primary flex w-full items-center justify-between text-lg font-semibold">
        <span>{name}</span>{" "}
        {isRequired && (
          <span className="flex items-center gap-1 pr-4 text-red-300">
            <HiOutlineExclamationCircle /> Required!
          </span>
        )}
      </legend>
      <div>
        {arrayObjs?.map((item) => (
          <label
            key={item?.id}
            htmlFor={item?.id}
            className="text-primary flex cursor-pointer items-center justify-between gap-4 rounded-md border px-4 py-2 text-sm font-medium shadow-sm has-[:checked]:border-[#755c11] has-[:checked]:ring-1 has-[:checked]:ring-[#755c11]"
          >
            <p className="capitalize">{item?.name}</p>
            <div className="flex items-center gap-4">
              <span>AED {item?.price}</span>
              <input
                type="radio"
                required
                name={name?.split(" ")?.join("")}
                value={`${item?.name}=${item?.price}`}
                id={item?.id}
                className="text-primary size-5"
                onChange={(e) => console.log(e.target.value)}
              />
            </div>
          </label>
        ))}
      </div>
    </fieldset>
  );
};

export default CheckBox;
