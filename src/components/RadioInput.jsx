import { HiOutlineExclamationCircle } from "react-icons/hi";

const RadioInput = ({ arrayObjs, name, isRequired, register, errors }) => {
  return (
    <fieldset className="space-y-2">
      <legend
        className={`text-primary flex w-full items-center justify-between dark:text-gray-100 ${errors?.[name] ? "bg-red-200" : ""} text-lg font-semibold`}
      >
        <span>
          {name} {errors?.[name] ? "is required" : ""}
        </span>{" "}
        {isRequired && (
          <span className="flex items-center gap-1 pr-4 text-red-300 dark:text-red-500">
            <HiOutlineExclamationCircle /> Required!
          </span>
        )}
      </legend>
      <div className="flex flex-col gap-2">
        {arrayObjs?.map((item) => (
          <label
            key={item?.id}
            htmlFor={item?.id}
            className="text-primary flex cursor-pointer items-center justify-between gap-4 rounded-md border px-4 py-2 text-sm font-medium shadow-sm has-[:checked]:border-[#755c11] has-[:checked]:ring-1 has-[:checked]:ring-[#755c11] dark:text-gray-100"
          >
            <p className="capitalize">{item?.name}</p>
            <div className="flex items-center gap-4">
              <span>AED {item?.price}</span>
              <input
                type={isRequired ? "radio" : "checkbox"}
                id={item?.id}
                value={`${item.name} = ${item?.price}`}
                {...register(name, { required: isRequired })}
                className="text-primary size-5"
              />
            </div>
          </label>
        ))}
      </div>
    </fieldset>
  );
};

export default RadioInput;
