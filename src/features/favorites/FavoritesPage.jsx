import getFavorites from "../menue/menueHooks/getFavorites";
import SingleMenueItems from "../menue/SingleMenueItems";

const FavoritesPage = ({ data = [] }) => {
  return (
    <div>
      <SingleMenueItems data={data} />
    </div>
  );
};

export default FavoritesPage;
