import BackButton from "../components/BackButton";
import FavoritesPage from "../features/favorites/FavoritesPage";
import getFavorites from "../features/menue/menueHooks/getFavorites";

const Favorites = () => {
  const { favorites = [] } = getFavorites();
  const tottalFavoritesItems = favorites?.length || 0;
  return (
    <div>
      <div className="mx-auto py-4 pb-32">
        <div className="px-4">
          <BackButton />
        </div>
        <div className="flex justify-between">
          <div className="mx-auto my-0 flex min-w-0 flex-1 flex-col gap-4">
            <div className="w-full px-7 max-[500px]:px-3">
              <div className="mb-6 flex items-center justify-start">
                <div className="hmbfbA flex items-center gap-3">
                  <strong className="title text-gray-500 dark:text-gray-300">
                    Favorites
                  </strong>
                  <p className="text-gray-400">
                    ({tottalFavoritesItems} Items)
                  </p>
                </div>
              </div>
              <div>
                {favorites.map((item) => (
                  <FavoritesPage data={item} key={item?.id} />
                ))}
              </div>
              <div className="flex flex-col items-center justify-center gap-6">
                {tottalFavoritesItems === 0 && (
                  <div className="flex flex-col items-center justify-center gap-6">
                    <h1 className="text-2xl font-semibold text-gray-500 dark:text-gray-400">
                      No favorites found
                    </h1>
                    <img
                      src="/noProductFound.avif"
                      alt="no product was foound image."
                      className="w-40 sm:w-52"
                    />
                    <div>
                      <h1 className="mb-5 text-center text-lg font-semibold text-gray-500 sm:text-2xl dark:text-gray-400">
                        Add your favorite items to the list
                      </h1>
                      <p className="text-center text-sm text-gray-400 sm:text-xl dark:text-gray-300">
                        Start adding items you love to your favorites list by
                        clicking the heart icon.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default Favorites;
