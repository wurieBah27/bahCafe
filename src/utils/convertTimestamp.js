import { Timestamp } from "firebase/firestore";

const convertTimestamp = (timestamp) => {
  if (timestamp instanceof Timestamp) {
    return timestamp.toDate();
  }
  return null;
};

export default convertTimestamp;
