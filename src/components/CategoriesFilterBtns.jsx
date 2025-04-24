const CategoriesFilterBtns = ({ url, title, onClick }) => {
  return (
    <div className="filter_buttons" id="${id}" onClick={onClick}>
      <button
        type="button"
        className="animate-fadeInDown filter_btns flex w-[104px] flex-col items-center justify-between gap-y-1 rounded-md"
      >
        <img
          alt=""
          className="border-highlight_color h-[78px] max-h-[78px] w-[104px] max-w-[104px] rounded-md border-2 border-solid object-cover"
          src={url}
        />
        <span className="line-clamp-1 break-all text-sm font-bold capitalize text-teal-700">
          {title}
        </span>
      </button>
    </div>
  );
};

export default CategoriesFilterBtns;
