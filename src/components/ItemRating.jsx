const ItemRating = ({ reviewCounts, averageRating = 0 }) => {
  return (
    <div className="relative flex items-center justify-center gap-1 rounded-3xl bg-white px-2 py-[1px]">
      <div className="flex h-full items-center justify-center text-sm font-semibold drop-shadow-md">
        {averageRating}
      </div>
      <div className="flex items-baseline justify-center gap-1.5">
        <div className="pt-[2px]">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 10"
            fill="#82AE04"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6.25333 8.28568C6.09679 8.19352 5.90258 8.19352 5.74604 8.28568L3.31597 9.71618C2.93433 9.94084 2.47058 9.59509 2.57696 9.16519L3.22394 6.55064C3.27013 6.36399 3.20519 6.16739 3.05692 6.04497L0.955287 4.30981C0.608396 4.02341 0.786618 3.46036 1.23513 3.42573L4.03001 3.20991C4.21511 3.19561 4.37705 3.07994 4.4506 2.90948L5.5406 0.383314C5.71429 -0.0192352 6.28508 -0.019235 6.45877 0.383315L7.54877 2.90948C7.62232 3.07994 7.78426 3.19561 7.96936 3.2099L10.7647 3.42573C11.2132 3.46036 11.3914 4.02346 11.0445 4.30984L8.9425 6.04497C8.7942 6.16739 8.72924 6.36401 8.77543 6.55068L9.42241 9.16519C9.52879 9.59508 9.06504 9.94084 8.6834 9.71618L6.25333 8.28568Z"></path>
          </svg>
        </div>
        <div className="flex items-center justify-center gap-[2px] whitespace-nowrap text-sm text-[#9ba0b1] drop-shadow-md">
          <svg
            width="3"
            height="10"
            viewBox="0 0 3 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.17635 9.26182C1.46726 7.88727 1.0309 6.63273 1.0309 4.82182C1.0309 3 1.46726 1.75636 2.17635 0.370909L1.67453 0C0.692716 1.35273 0.136353 3.06545 0.136353 4.82182C0.136353 6.57818 0.692716 8.29091 1.67453 9.64364L2.17635 9.26182Z"
              fill="currentColor"
            ></path>
          </svg>{" "}
          <span>{reviewCounts}</span>
          <svg
            width="3"
            height="10"
            viewBox="0 0 3 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: "scaleX(-1)" }}
          >
            <path
              d="M2.17635 9.26182C1.46726 7.88727 1.0309 6.63273 1.0309 4.82182C1.0309 3 1.46726 1.75636 2.17635 0.370909L1.67453 0C0.692716 1.35273 0.136353 3.06545 0.136353 4.82182C0.136353 6.57818 0.692716 8.29091 1.67453 9.64364L2.17635 9.26182Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ItemRating;
