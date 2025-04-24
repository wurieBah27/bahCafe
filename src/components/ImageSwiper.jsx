import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css/navigation"; // Import navigation styles
import styles from "./ImageSwiper.module.css"; // Import CSS module

const ImageSwiper = ({ imageArray }) => {
  return (
    <Swiper
      pagination={{
        type: "fraction",
      }}
      navigation={true}
      modules={[Navigation]}
      className={styles.mySwiper} // Apply CSS module class
      style={{ width: "100%", height: "100%" }} // Ensure Swiper takes full width and height
    >
      {imageArray?.map((image, index) => {
        return (
          <SwiperSlide key={index}>
            <div className="overflow-hidden">
              <img
                src={image}
                alt="Coffee"
                className="h-full w-full object-cover" // Ensure image covers the container
                style={{ filter: "brightness(1)", transform: "none" }}
              />
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default ImageSwiper;
