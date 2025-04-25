import {
  Button,
  Checkbox,
  Datepicker,
  FileInput,
  Label,
  TextInput,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEyeSlash } from "react-icons/fa";
import { HiCake, HiMail, HiPhoneOutgoing } from "react-icons/hi";
import { HiMapPin, HiMiniLockClosed, HiMiniUserCircle } from "react-icons/hi2";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Link } from "react-router-dom";
import useCreateUser from "./customersHooks/useCreateUser";
import { fetchAddress, getCustomer } from "./customerState/customerSlice";
import { useDispatch, useSelector } from "react-redux";
import LoginWithGoogleBtn from "../../components/LoginWithGoogleBtn";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [imagePreview, setImagePreview] = useState({});
  const [file, setFile] = useState(null);
  const { createCustomer, isPending } = useCreateUser();
  const dispatch = useDispatch();

  const { signInUserWithGoogle, isSigningWithGoogle } = useSignInWithGoogle();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const handleFileChange = (e) => {
    const file = e?.target.files[0];

    setFile(file);
  };

  useEffect(() => {
    const urls = file ? URL.createObjectURL(file) : "";
    setImagePreview(urls);
  }, [file]);

  const customerAddress = useSelector(getCustomer);
  const {
    address: { city, county, country, town, continent, formatted },
  } = customerAddress;
  console.log(customerAddress);
  /* form submission funtion */
  const onSubmit = async (data = {}) => {
    const { email, password, lastName, firstName, userAddress, phoneNUmber } =
      data;

    const userDetails = {
      email: email,
      name: `${firstName} ${lastName}`,
      phone: phoneNUmber || "",
      address: {
        position: customerAddress?.position || "",
        city: city || userAddress,
        county: county || "",
        country: country || "",
        formatted: formatted || "",
        town: town || "",
        continent: continent || "",
      },
      orderHistory: [],
      reviews: [],
    };
    try {
      createCustomer({
        email: email,
        password: password,
        userDetails: userDetails,
        file: file,
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  return (
    <div>
      <section className="min-h-screen">
        <div className="pb-20">
          <main className="flex items-center justify-center px-4 pb-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="">
              <div className="relative block text-center">
                <Link
                  className="inline-flex size-16 items-center justify-center overflow-hidden rounded-full text-blue-600 sm:size-20"
                  to="/"
                >
                  <span className="sr-only">Home</span>
                  <img src="/edama-icon.jpg" alt="" />
                </Link>

                <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                  Welcome to MT CAFE ☕
                </h1>

                <p className="mt-4 leading-relaxed text-gray-500">
                  Create an account to enjoy all the services we offer. Stay
                  updated with our latest news and promotions!
                </p>
              </div>
              <form
                action="#"
                onSubmit={handleSubmit(onSubmit)}
                className="mt-8 grid grid-cols-6 gap-6"
              >
                <div className="col-span-6 sm:col-span-3">
                  <div className="w-full">
                    <div className="mb-2 block">
                      <Label
                        htmlFor="email"
                        color={errors?.email ? "failure" : "default"}
                        value={`Your email ${errors?.email ? "(required)*" : ""}`}
                      />
                    </div>
                    <TextInput
                      id="email"
                      color={errors?.email ? "failure" : ""}
                      type="email"
                      {...register("email", {
                        required: "Email address is required!",
                      })}
                      icon={HiMail}
                      placeholder="name@flowbite.com"
                    />
                  </div>
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <div className="w-full">
                    <div className="mb-2 block">
                      <Label
                        htmlFor="firstName"
                        color={errors?.firstName ? "failure" : "default"}
                        value={`First Name ${errors?.firstName ? "(required)*" : ""}`}
                      />
                    </div>
                    <TextInput
                      id="firstName"
                      {...register("firstName", {
                        required: true,
                      })}
                      color={errors?.firstName ? "failure" : ""}
                      type="text"
                      icon={HiMiniUserCircle}
                      placeholder="John"
                    />
                  </div>
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <div className="w-full">
                    <div className="mb-2 block">
                      <Label htmlFor="lastName" value="Last Name (optional)" />
                    </div>
                    <TextInput
                      id="lastName"
                      type="text"
                      icon={HiMiniUserCircle}
                      placeholder="Doe"
                      {...register("lastName")}
                    />
                  </div>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <div className="w-full">
                    <div className="mb-2 block">
                      <Label
                        htmlFor="phoneNUmber"
                        value="Phone NUmber (optional)"
                      />
                    </div>
                    <TextInput
                      id="phoneNUmber"
                      type="text"
                      icon={HiPhoneOutgoing}
                      placeholder="+123 45 678 5214"
                      {...register("phoneNUmber")}
                    />
                  </div>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <div className="relative w-full">
                    <div className="mb-2 block">
                      <Label
                        htmlFor="userAddress"
                        value="Your current location (optional)"
                      />
                    </div>
                    <TextInput
                      id="userAddress"
                      type="text"
                      {...register("userAddress")}
                      icon={HiMapPin}
                      placeholder="Enter address"
                      defaultValue={country && `${city}, ${county}, ${country}`}
                    />
                    {!country && (
                      <span
                        className="absolute right-1 top-[47%] cursor-pointer rounded-full bg-teal-500 px-3 py-2 text-sm text-gray-50"
                        onClick={() => dispatch(fetchAddress())}
                      >
                        Get Address
                      </span>
                    )}
                  </div>
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <div className="relative w-full">
                    <div className="mb-2 block">
                      <Label
                        htmlFor="password"
                        color={errors?.password ? "failure" : "default"}
                        value={`Password ${errors?.password ? "(required)*" : ""}`}
                      />
                    </div>
                    <TextInput
                      id="password"
                      type={showPassword ? "text" : "password"}
                      className=""
                      icon={HiMiniLockClosed}
                      placeholder="584gdhh#4"
                      color={errors?.password ? "failure" : ""}
                      {...register("password", { required: true })}
                    />
                    <span
                      className="absolute right-3 top-1/2 translate-y-1/2"
                      onClick={() => setShowPassword((password) => !password)}
                    >
                      {!showPassword && <FaRegEyeSlash />}
                      {showPassword && <MdOutlineRemoveRedEye />}
                    </span>
                  </div>
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <div className="w-full">
                    <div className="mb-2 block">
                      <Label
                        htmlFor="PasswordConfirmation"
                        color={
                          errors?.PasswordConfirmation ? "failure" : "default"
                        }
                        value={`${errors?.PasswordConfirmation ? (errors?.PasswordConfirmation.type === "validate" ? "(Password do not match 🚫!)" : "Password Confirmation (required)*") : "Password Confirmation"}`}
                      />
                    </div>
                    <TextInput
                      id="PasswordConfirmation"
                      type="password"
                      color={errors?.PasswordConfirmation ? "failure" : ""}
                      icon={HiMiniLockClosed}
                      placeholder="584gdhh#4"
                      {...register("PasswordConfirmation", {
                        required: true,
                        validate: (value) =>
                          value === getValues()?.password ||
                          "(Password do not match 🚫!)",
                      })}
                    />
                  </div>
                </div>

                <div className="col-span-6">
                  <div id="fileUpload" className="max-w-md">
                    <div className="mb-2 block">
                      <Label htmlFor="file" value="Upload file" />
                    </div>
                    <FileInput
                      id="file"
                      onChange={handleFileChange}
                      helperText={
                        imagePreview
                          ? ""
                          : "A profile picture is useful to confirm your are logged into your account"
                      }
                    />
                    {imagePreview && (
                      <div className="py-2">
                        <div>
                          <img
                            className="size-10 rounded-full object-cover"
                            src={imagePreview}
                            alt="profile-photo"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-span-6">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="accept"
                      color={errors?.accept ? "failure" : ""}
                      {...register("accept", { required: true })}
                    />
                    <Label
                      htmlFor="accept"
                      className="flex"
                      color={errors?.accept ? "failure" : ""}
                    >
                      I agree with the&nbsp;
                      <Link
                        to={""}
                        className={` ${errors?.accept ? "text-red-400 underline" : "text-cyan-600"} hover:underline dark:text-cyan-500`}
                      >
                        terms and conditions
                      </Link>
                    </Label>
                  </div>
                </div>

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <Button
                    disabled={isPending}
                    className="w-full sm:w-[60%]"
                    gradientDuoTone="purpleToBlue"
                    type="submit"
                    isProcessing={isPending}
                  >
                    Create an account
                  </Button>

                  <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                    Already have an account?
                    <Link
                      to="/login"
                      className="text-sm font-bold text-blue-700 underline"
                    >
                      {" "}
                      Log in
                    </Link>
                    .
                  </p>
                </div>
              </form>
              <div className="my-5 text-center">
                <span>OR</span>
              </div>
              <div className="">
                <LoginWithGoogleBtn
                  isDisable={isSigningWithGoogle}
                  onClick={() => signInUserWithGoogle()}
                />
              </div>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
};

export default SignUpForm;
