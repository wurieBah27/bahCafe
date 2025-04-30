import { Link } from "react-router-dom";
import {
  BsFacebook,
  BsInstagram,
  BsSnapchat,
  BsTiktok,
  BsWhatsapp,
} from "react-icons/bs";
import { HiOutlineMail, HiOutlinePhoneOutgoing } from "react-icons/hi";
import { HiOutlineMapPin } from "react-icons/hi2";
import useSettings from "../helpers/useSettings";

const Footer = () => {
  const { settingsData } = useSettings();
  const {
    Email,
    companyName,
    companyDescription,
    phoneNumber,
    socialMediaLinks = {},
  } = settingsData || {};
  const {
    facebookLink,
    instagramLink,
    whatsappLink,
    snapChatLink,
    tiktokLink,
    linkedInLink,
  } = socialMediaLinks;
  console.log(settingsData);
  return (
    <footer className="rounded-xl bg-white dark:bg-gray-700">
      <div className="mx-auto max-w-screen-xl px-4 pb-28 pt-16 sm:px-6 lg:px-8 lg:pt-24">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div>
            <div className="flex justify-center gap-4 text-teal-600 sm:justify-start dark:text-teal-300">
              <img src="/edama-icon.jpg" alt="" className="h-8 rounded-full" />
              <div>
                <h1 className="text-2xl font-bold capitalize text-gray-900 dark:text-white">
                  {companyName || "Company Name"}
                </h1>
              </div>
            </div>

            <p className="mt-6 max-w-md text-center leading-relaxed text-gray-500 sm:text-left dark:text-gray-400">
              {companyDescription || "Company description goes here."}
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 text-center sm:flex-row">
              <p>Follow us on our social media platforms.</p>
            </div>
            <ul className="mt-4 flex justify-center gap-6 md:gap-8">
              <li>
                <SocialMediaIcon Icon={BsWhatsapp} url={whatsappLink} />
              </li>

              {instagramLink && (
                <li>
                  <SocialMediaIcon Icon={BsInstagram} url={instagramLink} />
                </li>
              )}

              {snapChatLink && (
                <li>
                  <SocialMediaIcon Icon={BsSnapchat} url={snapChatLink} />
                </li>
              )}

              {facebookLink && (
                <li>
                  <SocialMediaIcon Icon={BsFacebook} url={facebookLink} />
                </li>
              )}
              {tiktokLink && (
                <li>
                  <SocialMediaIcon Icon={BsTiktok} url={tiktokLink} />
                </li>
              )}
            </ul>
          </div>

          <div>
            <div className="sm:text-left">
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                Contact Us
              </p>

              <ul className="mt-8 space-y-4 text-sm">
                <li>
                  <Link className="flex items-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end">
                    <HiOutlineMail className="size-5 shrink-0 text-gray-900 shadow-sm dark:text-white" />

                    <span className="text-gray-700 dark:text-gray-300">
                      {" "}
                      {Email || "Not available"}
                    </span>
                  </Link>
                </li>

                <li>
                  <Link className="flex items-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end">
                    <HiOutlinePhoneOutgoing className="size-5 shrink-0 text-gray-900 shadow-sm dark:text-white" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {phoneNumber || "Not available"}
                    </span>
                  </Link>
                </li>

                <li className="flex items-start gap-1.5 ltr:sm:justify-start rtl:sm:justify-end">
                  <Link
                    to={
                      "https://www.google.com/maps/place/24%C2%B005'55.8%22N+53%C2%B029'49.2%22E/@24.0988293,53.4944153,17z/data=!3m1!4b1!4m4!3m3!8m2!3d24.0988293!4d53.4969902?entry=ttu&g_ep=EgoyMDI1MDQyNy4xIKXMDSoJLDEwMjExNDUzSAFQAw%3D%3D"
                    }
                    target="_blank"
                    className="flex items-center gap-1.5 underline ltr:sm:justify-start rtl:sm:justify-end"
                    rel="noreferrer"
                  >
                    <HiOutlineMapPin className="size-5 shrink-0 text-gray-900 shadow-sm dark:text-white" />

                    <address className="-mt-0.5 not-italic text-gray-700 dark:text-gray-300">
                      213 Lane, London, United Kingdom
                    </address>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-100 pt-6 dark:border-gray-800">
          <div className="sm:flex sm:justify-between sm:text-left">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              <span className="block sm:inline">All rights reserved.</span>

              <Link className="inline-block text-teal-600 underline transition hover:text-teal-600/75 dark:text-teal-500 dark:hover:text-teal-500/75">
                Terms & Conditions
              </Link>

              <span>&middot;</span>

              <Link className="inline-block text-teal-600 underline transition hover:text-teal-600/75 dark:text-teal-500 dark:hover:text-teal-500/75">
                Privacy Policy
              </Link>
            </p>

            <p className="mt-4 text-sm text-gray-500 sm:order-first sm:mt-0 dark:text-gray-400">
              &copy; 2025 Wurie Bah
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

function SocialMediaIcon({ Icon, url }) {
  return (
    <Link
      rel="noreferrer"
      to={url}
      target="_blank"
      className="text-teal-700 transition hover:text-teal-700/75 dark:text-teal-500 dark:hover:text-teal-500/75"
    >
      <span className="sr-only">Facebook</span>
      <Icon className="size-6" />
    </Link>
  );
}
