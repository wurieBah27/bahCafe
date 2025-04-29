import { Button } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";

const FilterCategoryBtns = ({ groupedItems, onClickBtn }) => {
  const [classes, setClasses] = useState(null);

  const btnsContainerRef = useRef("");

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

  return (
    <div ref={(el) => (btnsContainerRef.current = el)} className={`observer`}>
      <div
        className={` ${!classes ? "fixed left-0 right-0 top-0" : ""} z-50 px-2`}
      >
        <div className="mx-auto my-4 flex h-20 max-w-5xl items-center gap-5 overflow-x-auto rounded-md bg-gray-100 p-2 pb-4 transition-all dark:bg-gray-700">
          {Object.keys(groupedItems).map((item, index) => (
            <Button
              color="light"
              className="w-max text-nowrap capitalize transition-all"
              pill
              onClick={() => onClickBtn(item)}
              key={index}
            >
              {item}{" "}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterCategoryBtns;
