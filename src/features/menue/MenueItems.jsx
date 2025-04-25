import SingleMenueItems from "./SingleMenueItems";

const MenueItems = ({ items }) => {
  return (
    <div className="py-7 sm:px-4">
      <div className="">
        {items?.map((item) => (
          <SingleMenueItems data={item} key={item?.id} />
        ))}
      </div>
    </div>
  );
};

export default MenueItems;
