import { Button } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

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
        rootMargin: "-88px 0px 0px 0px",
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
    <div className="h-20">
      <div ref={(el) => (btnsContainerRef.current = el)} className="observer">
        <motion.div
          className={` ${!classes ? "fixed left-0 right-0 top-0 px-2" : ""} z-50`}
        >
          <div className="mx-auto flex h-20 max-w-5xl items-center gap-2 overflow-x-auto text-nowrap rounded-md bg-gray-100 p-2 pb-4 transition-all dark:bg-gray-700 sm:gap-5">
            {Object.keys(groupedItems).map((item, index) => (
              <Button
                color="light"
                className="max-w-max text-nowrap capitalize transition-all"
                pill
                onClick={() => onClickBtn(item)}
                key={index}
              >
                {item}{" "}
              </Button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FilterCategoryBtns;
