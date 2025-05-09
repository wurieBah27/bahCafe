import { format } from "date-fns";
import { getUser } from "../features/customers/customersHooks/useGetCurrentUser";
import { Avatar, Button, Datepicker, Label, TextInput } from "flowbite-react";
import BackButton from "../components/BackButton";
import useUpdateUser from "../features/customers/customersHooks/useUpdateUser";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

const UserPersonalDetails = () => {
  const { data = {}, uid } = getUser();
  const [birthday, setBirthday] = useState(null); // Ensure birthday is initialized as null

  const { updateUserInformation } = useUpdateUser();

  const { profileUrl, createdAt, name = "", phone = "", dateOfBirth } = data; // Provide default values for name and phone
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: name,
      userPhone: phone,
      dateOfBirth: birthday,
    },
  });

  useEffect(() => {
    if (dateOfBirth) {
      const date = dateOfBirth?.toDate?.() || new Date(dateOfBirth); // Ensure it's a Date object
      setBirthday(date);
    }
  }, [dateOfBirth]);

  const date = createdAt?.toDate?.() || null; // Ensure valid Date object or null
  const formattedDate = date ? format(date, "PPpp") : ""; // Format only if valid
  const today = new Date();

  const onSubmit = (data) => {
    const updatedData = {
      name: data.username,
      phone: data.userPhone,
      dateOfBirth: birthday || new Date(), // Ensure a valid Date object
    };
    updateUserInformation({ id: uid, userObj: updatedData });
  };

  return (
    <div className="my-4 px-2 pb-20">
      <div>
        <BackButton />

        <form
          action=""
          className="flex flex-col gap-4 text-gray-800"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="relative flex items-center justify-between px-4 py-2 shadow-md dark:text-gray-100">
            <span>Profile Picture</span>
            <div>
              {profileUrl && (
                <img
                  src={profileUrl}
                  alt={name}
                  className="size-16 rounded-full"
                />
              )}
              {!profileUrl && <Avatar />}
            </div>
            <span className="absolute -top-2 right-4 text-blue-600">
              Change
            </span>
          </div>
          <div className="px-4 py-2 shadow-md">
            <div className="mb-1 block dark:text-gray-100">
              <Label
                htmlFor="username"
                value={
                  errors?.username
                    ? `${errors?.username.message} *`
                    : "Name (Required)"
                }
                color={errors?.username ? "failure" : ""}
              />
            </div>
            <TextInput
              id="username"
              placeholder="Bonnie Green"
              {...register("username", {
                required: "Name is required",
              })}
              defaultValue={name} // Ensure value is always defined
              color=""
            />
          </div>

          <div className="px-4 py-2 shadow-md">
            <div className="mb-1 block dark:text-gray-100">
              <Label
                htmlFor="userPhone"
                color={errors?.userPhone ? "failure" : ""}
                value={
                  errors?.userPhone
                    ? errors?.userPhone.message
                    : `Phone Number (Required)`
                }
              />
            </div>
            <TextInput
              id="userPhone"
              placeholder="+971 50 123 4567"
              {...register("userPhone", {
                required: "Phone number is required",
                pattern: {
                  value: /^\+?[0-9]{7,14}$/,
                  message: "Invalid phone number format",
                },
              })}
              defaultValue={phone} // Ensure value is always defined
              color=""
            />
          </div>
          <div className="px-4 py-2 shadow-md">
            <div className="mb-1 block dark:text-gray-100">
              <Label htmlFor="userBirthday" value="Birthday (Optional)" />
            </div>
            <TextInput
              id="userBirthday"
              placeholder="25 May 2025"
              {...register("userBirthday")}
              value={birthday ? format(birthday, "PPPP") : ""} // Format only if valid
              color=""
            />

            <Datepicker
              className=""
              autoHide={false}
              inline
              maxDate={today}
              onChange={(e) => setBirthday(new Date(e))} // Convert to Date object
            />
          </div>
          <div className="text-center dark:text-gray-100">
            {name && (
              <span className="text-xs sm:text-sm">
                {name || ""} joined on the {formattedDate}
              </span>
            )}
          </div>
          <div className="mt-5 flex justify-center">
            <Button
              disabled={false}
              onClick={handleSubmit}
              gradientDuoTone="purpleToBlue"
              type="submit"
              className="w-full sm:w-[50%]"
            >
              Save changes{" "}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserPersonalDetails;
