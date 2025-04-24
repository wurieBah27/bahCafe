import { format } from "date-fns";
import { getUser } from "../features/customers/customersHooks/useGetCurrentUser";
import { Avatar, Button, Label, TextInput } from "flowbite-react";
import BackButton from "../components/BackButton";

const UserPersonalDetails = () => {
  const { data = {} } = getUser();

  const { profileUrl, createdAt, name, email, phone, dateOfBirth } = data;
  const date = createdAt?.toDate();
  const formattedDate = date ? format(date, "PPpp") : "";

  console.log(date);

  console.log(data);
  return (
    <div className="my-4 px-2 pb-20">
      <div>
        <BackButton />

        <form action="" className="flex flex-col gap-4 text-gray-800">
          <div className="flex items-center justify-between px-4 py-2 shadow-md">
            <span>Profile Picture</span>
            {profileUrl && (
              <img
                src={profileUrl}
                alt={name}
                className="size-16 rounded-full"
              />
            )}
            {!profileUrl && <Avatar />}
          </div>
          <div className="px-4 py-2 shadow-md">
            <div className="mb-1 block">
              <Label htmlFor="username" color="" value="Name" />
            </div>
            <TextInput
              id="username"
              placeholder="Bonnie Green"
              required
              color=""
              defaultValue={name || ""}
            />
          </div>
          <div className="px-4 py-2 shadow-md">
            <div className="mb-1 block">
              <Label htmlFor="userEmail" color="" value="Email" />
            </div>
            <TextInput
              id="userEmail"
              placeholder="example@gmail.com"
              required
              color=""
              defaultValue={email || ""}
            />
          </div>
          <div className="px-4 py-2 shadow-md">
            <div className="mb-1 block">
              <Label htmlFor="userPhone" color="" value="Phone Number" />
            </div>
            <TextInput
              id="userPhone"
              placeholder="example@gmail.com"
              required
              color=""
              defaultValue={phone || ""}
            />
          </div>
          <div className="px-4 py-2 shadow-md">
            <div className="mb-1 block">
              <Label htmlFor="userBirthday" color="" value="Birthday" />
            </div>
            <TextInput
              id="userBirthday"
              placeholder="25 - May - 2025"
              required
              color=""
              defaultValue={dateOfBirth || ""}
            />
          </div>
          <div>
            {name && (
              <span className="text-xs sm:text-sm">
                {name || ""} joined on the {formattedDate}
              </span>
            )}
          </div>
          <div className="mt-5 flex justify-center">
            <Button
              disabled={false}
              gradientDuoTone="purpleToBlue"
              type="submit"
              className="w-full sm:w-[50%]"
              // isProcessing={isPending}
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
