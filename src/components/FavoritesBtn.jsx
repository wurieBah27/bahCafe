import React from "react";
import useAddToFavorites from "../features/menue/menueHooks/useAddToFavorites";
import useRemoveFromFavorites from "../features/menue/menueHooks/useRemoveFromFavorites";
import getFavorites from "../features/menue/menueHooks/getFavorites";
import useGetCurrentUser from "../features/customers/customersHooks/useGetCurrentUser";
import toast from "react-hot-toast";
import { Spinner } from "flowbite-react";

const FavoritesBtn = ({ id = "", data = {} }) => {
  const { addItemToFavorite, isAddingToFavorites } = useAddToFavorites();
  const { deleteFromFavorites, isDeletingFavorite } = useRemoveFromFavorites();
  const { uid } = useGetCurrentUser();
  const { favorites } = getFavorites();

  const isFavorite = favorites?.some((item) => item?.id === id);

  /* add to favorites functions */

  const handleAddToFavorites = () => {
    if (!uid) {
      toast.error("Please log in to add items to favorites.");
      return;
    }
    if (isFavorite) {
      deleteFromFavorites({ uid: uid, itemId: id });
    } else {
      addItemToFavorite({ uid: uid, item: data });
    }
  };
  return (
    <div className="absolute -top-2 left-2 flex flex-col gap-2.5">
      <div className="relative ml-1.5">
        <button
          className=""
          style={{
            visibility: "visible",
            pointerEvents: "auto",
            filter: "drop-shadow(0 0 5px #0003)",
            backgroundColor: "#fff",
            borderRadius: "6px",
            flexShrink: 0,
            justifyContent: "center",
            alignItems: "center",
            width: "clamp(1.5rem, .5814vw + 1.40116rem, 2rem)",
            height: "clamp(1.5rem, .5814vw + 1.40116rem, 2rem)",
            display: "flex",
          }}
          onClick={handleAddToFavorites}
        >
          {isAddingToFavorites || isDeletingFavorite ? (
            <Spinner />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon eDnIKc icon-tabler icon-tabler-heart"
              width="18"
              height="32"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke={isFavorite ? "#0077ff" : "#000000"}
              fill={isFavorite ? "#0077ff" : "none"}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path>
            </svg>
          )}
        </button>{" "}
      </div>
    </div>
  );
};

export default FavoritesBtn;
