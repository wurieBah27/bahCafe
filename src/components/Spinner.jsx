const Spinner = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 flex items-center">
      <span className="loader mx-auto h-32 w-32 animate-spin rounded-full border-8 border-t-8 border-gray-100 border-t-teal-500"></span>
    </div>
  );
};

export default Spinner;
