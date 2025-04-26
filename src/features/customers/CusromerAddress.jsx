import { format } from "date-fns";
import { getUser } from "./customersHooks/useGetCurrentUser";
import {
  Autocomplete,
  GoogleMap,
  Marker,
  OverlayView,
  useJsApiLoader,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { Avatar, Button, Label, TextInput } from "flowbite-react";
import { HiMapPin } from "react-icons/hi2";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddress, getCustomer } from "./customerState/customerSlice";
import useUpdateUser from "./customersHooks/useUpdateUser";
import Spinner from "../../components/Spinner";

const libraries = ["places"]; // Define libraries as a constant outside the component
const shopLocation = { lat: 24.0987521, lng: 53.4969862 };

const CusromerAddress = () => {
  const { uid, data } = getUser();
  const dispatch = useDispatch();
  const customerAddress = useSelector(getCustomer);

  const { updateUserInformation, isUpdatingUser } = useUpdateUser();

  const {
    address: { city, county, country, town, continent, formatted },
  } = customerAddress;

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries, // Use the constant here
  });
  const [directions, setDirections] = useState(null);
  const [distance, setDistance] = useState({});
  const [clickedCords, setClickedCords] = useState(null);

  const calcualteRoute = async (origin, destination) => {
    if (!origin || !destination) return;

    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin,
      destination,
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirections(results);
    setDistance((item) => ({
      ...item,
      distance: results?.routes[0]?.legs[0]?.distance.text,
      durations: results?.routes[0]?.legs[0]?.duration?.text,
    }));
  };

  useEffect(() => {
    dispatch(fetchAddress(clickedCords));
    if (clickedCords)
      updateUserInformation({
        id: uid,
        userObj: {
          ...data,
          address: {
            position: clickedCords || "",
            city: city || "",
            county: county || "",
            country: country || "",
            formatted: formatted || "",
            town: town || "",
            continent: continent || "",
          },
        },
      });
    calcualteRoute(clickedCords, shopLocation);
  }, [clickedCords, dispatch]);

  const { createdAt, name, address, profileUrl } = data;
  const date = createdAt?.toDate();
  const formattedDate = date ? format(date, "PPpp") : "";

  if (!address) return;

  const { position } = address;
  const latitude = position?.lat;
  const longitude = position?.lng;
  const latLng = { lat: latitude, lng: longitude };

  const mapClickedLocation = (event) => {
    const lat = event?.latLng?.lat();
    const lng = event?.latLng?.lng();
    setClickedCords({ lat, lng });
  };

  useEffect(() => {
    if (!latitude && !longitude) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setClickedCords({ lat, lng });
      });

      updateUserInformation({
        id: uid,
        userObj: {
          ...data,
          address: {
            position: clickedCords || "",
            city: city || "",
            county: county || "",
            country: country || "",
            formatted: formatted || "",
            town: town || "",
            continent: continent || "",
          },
        },
      });
    }
  }, []);

  const trial = async () => {
    try {
      await dispatch(fetchAddress());

      await updateUserInformation({
        id: uid,
        userObj: {
          ...data,
          address: {
            position: customerAddress?.position || "",
            city: city || "",
            county: county || "",
            country: country || "",
            formatted: formatted || "",
            town: town || "",
            continent: continent || "",
          },
        },
      });
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching address");
    }
  };

  if (!isLoaded || isUpdatingUser) return <Spinner />;

  const CustomMarker = ({ position, profileUrl, address }) => (
    <OverlayView
      position={position}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
    >
      <div className="flex w-20 flex-col items-center gap-1 rounded-md bg-gray-50 px-2 py-1">
        {profileUrl ? (
          <img
            src={profileUrl}
            alt="Profile"
            className="h-8 w-8 rounded-full"
          />
        ) : (
          <Avatar />
        )}
        <div className="text-[8px] text-gray-700">{address?.formatted}</div>
      </div>
    </OverlayView>
  );

  return (
    <div>
      <div className="px-4 py-2 shadow-md">
        <div className="mb-1 block">
          <Label htmlFor="username" color="" value="Current Address" />
        </div>
        <TextInput
          id="username"
          placeholder="Bonnie Green"
          color=""
          icon={HiMapPin}
          defaultValue={address?.formatted || "Add new address"}
        />
      </div>{" "}
      <div className="mt-6 flex flex-col gap-2">
        {latLng.lat && (
          <span>
            <Button
              gradientDuoTone="purpleToBlue"
              onClick={() => calcualteRoute(latLng, shopLocation)}
            >
              {" "}
              Show directions
            </Button>
          </span>
        )}
        {!latLng.lat && (
          <span>
            <Button gradientDuoTone="purpleToBlue" onClick={() => trial()}>
              Get current Address
            </Button>
          </span>
        )}

        <div className="flex items-center gap-10">
          <span>Distance in (km) </span>
          <span>{distance?.distance || 0}</span>
        </div>
        <div className="flex items-center gap-10">
          <span>Durations in (min) </span>
          <span>{distance?.durations || 0}</span>
        </div>
      </div>
      <div>
        {!position && (
          <div>
            <div className=" ">
              <div className="relative w-full">
                <div className="mb-2 block">
                  <Label
                    htmlFor="userAddress2"
                    value="Enter current location"
                  />
                </div>
                <Autocomplete>
                  <TextInput
                    id="userAddress2"
                    type="text"
                    icon={HiMapPin}
                    placeholder="Enter address"
                    defaultValue={""}
                  />
                </Autocomplete>
              </div>
            </div>
          </div>
        )}
        <span>Your Location</span>
        <div className="h-screen pb-20">
          {latitude && longitude && (
            <GoogleMap
              center={latLng}
              zoom={13}
              mapContainerStyle={{
                width: "100%",
                height: "100%",
                borderRadius: "20px",
              }}
              onClick={mapClickedLocation}
            >
              <Marker position={latLng}>
                <CustomMarker
                  position={latLng}
                  profileUrl={profileUrl}
                  address={address}
                />
              </Marker>
              - {clickedCords?.lat && <Marker position={clickedCords}></Marker>}{" "}
              {directions && <DirectionsRenderer directions={directions} />}
            </GoogleMap>
          )}
        </div>
      </div>
    </div>
  );
};

export default CusromerAddress;
