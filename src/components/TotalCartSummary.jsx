const TotalCartSummary = ({ originalPrice = 0, deliveryCharge = 0 }) => {
  const amountBeforeTax = (originalPrice + deliveryCharge) / 1.05;
  const tax = amountBeforeTax * 0.05;
  return (
    <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
      <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6 dark:border-white dark:bg-gray-600">
        <p className="text-xl font-semibold text-gray-900 dark:text-white">
          Order summary
        </p>

        <div className="space-y-4">
          <div className="space-y-2">
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-500 dark:text-gray-200">
                Original price
              </dt>
              <dd className="text-base font-medium text-gray-900 dark:text-white">
                {originalPrice}
              </dd>
            </dl>
            {deliveryCharge > 0 && (
              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500 dark:text-gray-200">
                  Delivery Charge
                </dt>
                <dd className="text-base font-medium text-gray-900 dark:text-white">
                  {deliveryCharge}
                </dd>
              </dl>
            )}

            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-500 dark:text-gray-200">
                Total Before Tax
              </dt>
              <dd className="text-base font-medium text-gray-900 dark:text-white">
                {amountBeforeTax.toFixed(2)}
              </dd>
            </dl>

            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-500 dark:text-gray-200">
                Tax
              </dt>
              <dd className="text-base font-medium text-gray-900 dark:text-white">
                {tax.toFixed(2)}
              </dd>
            </dl>
          </div>

          <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
            <dt className="text-base font-bold text-gray-900 dark:text-white">
              Total with tax
            </dt>
            <dd className="text-base font-bold text-gray-900 dark:text-white">
              {originalPrice + deliveryCharge}
            </dd>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default TotalCartSummary;
