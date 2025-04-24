export function getRemainingTime(deliveryDate) {
  const now = new Date();
  const delivery = new Date(deliveryDate);
  const diffInMs = delivery - now;

  if (diffInMs <= 0) {
    return "Delivery time has passed";
  }

  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes remaining`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hours remaining`;
  } else {
    return `${diffInDays} days remaining`;
  }
}
