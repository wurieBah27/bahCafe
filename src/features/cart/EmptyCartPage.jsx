const EmptyCartPage = () => {
  return (
    <div>
      <div className="flex min-h-[20rem] flex-col items-center">
        <div>
          <h3 className="text-center text-3xl text-black">
            Your cart is currently empty
          </h3>
        </div>
        <img src="/Shopping.svg" alt="" className="size-80" />
        <div>
          <p className="text-center text-sm text-black">
            You have not added anything. Browse our Menue to add some items in
            your cart!
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyCartPage;
