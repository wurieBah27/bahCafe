import { Link } from "react-router-dom";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsMailbox,
  BsSnapchat,
  BsTiktok,
  BsTwitter,
  BsWhatsapp,
} from "react-icons/bs";
import { HiOutlineMail, HiOutlinePhoneOutgoing } from "react-icons/hi";
import { HiMapPin, HiOutlineMap, HiOutlineMapPin } from "react-icons/hi2";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 pb-28 pt-16 sm:px-6 lg:px-8 lg:pt-24">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <div className="flex justify-center gap-4 text-teal-600 sm:justify-start dark:text-teal-300">
              <img src="/edama-icon.jpg" alt="" className="h-8 rounded-full" />
              <div>
                <h1 className="text-2xl font-bold capitalize text-gray-900 dark:text-white">
                  Bah cafe
                </h1>
              </div>
            </div>

            <p className="mt-6 max-w-md text-center leading-relaxed text-gray-500 sm:text-left dark:text-gray-400">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt
              consequuntur amet culpa cum itaque neque.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 text-center sm:flex-row">
              <p>Follow us on our social media platforms.</p>
            </div>
            <ul className="mt-4 flex justify-center gap-6 md:gap-8">
              <li>
                <SocialMediaIcon
                  Icon={BsWhatsapp}
                  url="https://wa.me/message/7MOAKV5Y5G2LO1"
                />
              </li>

              <li>
                <SocialMediaIcon Icon={BsInstagram} />
              </li>

              <li>
                <SocialMediaIcon Icon={BsSnapchat} />
              </li>

              <li>
                <SocialMediaIcon Icon={BsFacebook} />
              </li>
              <li>
                <SocialMediaIcon Icon={BsTiktok} />
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-8 max-[360px]:grid-cols-1 sm:grid-cols-2 lg:col-span-2">
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
                      john@doe.com{" "}
                    </span>
                  </Link>
                </li>

                <li>
                  <Link className="flex items-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end">
                    <HiOutlinePhoneOutgoing className="size-5 shrink-0 text-gray-900 shadow-sm dark:text-white" />
                    <span className="text-gray-700 dark:text-gray-300">
                      0123456789
                    </span>
                  </Link>
                </li>

                <li className="flex items-start gap-1.5 ltr:sm:justify-start rtl:sm:justify-end">
                  <HiOutlineMapPin className="size-5 shrink-0 text-gray-900 shadow-sm dark:text-white" />

                  <address className="-mt-0.5 not-italic text-gray-700 dark:text-gray-300">
                    213 Lane, London, United Kingdom
                  </address>
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
