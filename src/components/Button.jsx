const ActionButton = ({ icon: Icon }) => {
  return (
    <button
      type="button"
      class="inline-flex items-center rounded-full border border-teal-700 p-2.5 text-center text-sm font-medium text-teal-700 hover:bg-teal-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-teal-300 dark:border-teal-500 dark:text-teal-500 dark:hover:bg-teal-500 dark:hover:text-white dark:focus:ring-teal-800"
    >
      {<Icon class="h-4 w-4" />}
      <span class="sr-only">Icon description</span>
    </button>
  );
};

export default ActionButton;
