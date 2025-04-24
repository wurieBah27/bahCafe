import { Button } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";

const FilterCategoryBtns = ({ groupedItems }) => {
  const btnRef = useRef([]);
  const [classes, setClasses] = useState(null);

  const btnsContainerRef = useRef("");
  const location = useLocation(); // Get the current location object

  const [searchParams] = useSearchParams();

  const currentParams = searchParams.get("category");
  // const linkTo = currentParams ? `/?${currentParams}#${item}` : `/#${item}`;

  useEffect(() => {
    const btnSelectObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // btnsContainerRef.current.classList.remove("fixeds");
            setClasses(entry.isIntersecting);
          }
          if (!entry.isIntersecting) {
            // btnsContainerRef.current.classList.add("fixeds");
            setClasses(entry.isIntersecting);
          }
        });
      },
      {
        rootMargin: "-80px 0px 0px 0px",
      },
    );

    if (btnsContainerRef.current)
      btnSelectObserver.observe(btnsContainerRef.current);

    // Cleanup observer on component unmount
    return () => {
      btnSelectObserver.disconnect();
    };
  }, []);
  useEffect(() => {
    // Check if there is a hash in the URL (e.g., #section-features)
    if (location.hash) {
      // Get the ID from the hash (remove the leading #)
      const elementId = location.hash.substring(1);

      // Find the corresponding element in the DOM
      const targetElement = document.getElementById(elementId);

      // If the element exists, scroll it into view
      if (targetElement) {
        // This is often necessary because the DOM update might be slightly delayed
        targetElement.scrollIntoView({ behavior: "smooth" }); // Use smooth behavior for animation
      }
    } else {
      // If no hash, optionally scroll to the top of the page
      window.scrollTo(0, 0);
    }
  }, [location]); // Re-run this effect whenever the location object changes (including the hash)

  return (
    <div ref={(el) => (btnsContainerRef.current = el)} className={`observer`}>
      <div
        className={` ${!classes ? "fixed left-0 right-0 top-0" : ""} z-50 px-2`}
      >
        <div className="mx-auto my-4 flex h-20 max-w-5xl items-center gap-5 overflow-x-auto rounded-md bg-gray-100 p-2 pb-4 transition-all dark:bg-gray-700">
          {Object.keys(groupedItems).map((item, index) => (
            <Link
              key={item}
              to={
                currentParams
                  ? `/?category=${currentParams}#${item}`
                  : `/#${item}`
              }
            >
              <Button
                color="light"
                className="bg w-28 capitalize transition-all"
                pill
                ref={(e) => (btnRef.current[index] = e)}
                onClick={(e) => {
                  btnRef.current.forEach((item) => {
                    item.classList.remove("observer-btns");
                  });
                  btnRef.current[index].classList.add("observer-btns");
                }}
              >
                {item}{" "}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterCategoryBtns;
