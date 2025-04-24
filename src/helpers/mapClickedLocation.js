const mapClickedLocation = (event) => {
  console.log(event);
  const lat = event?.latLng?.lat();
  const lng = event?.latLng?.lng();

  console.log(lat, lng);
  return { lat, lng };
};

export default mapClickedLocation;
