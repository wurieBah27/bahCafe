// import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// import 'swiper/css';
import "swiper/css/virtual";
import SingleHeroItem from "./SingleHeroItem";

const HeroSection = () => {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 25000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={false}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      <SwiperSlide>
        <SingleHeroItem />
      </SwiperSlide>
      <SwiperSlide>
        <SingleHeroItem />
      </SwiperSlide>
    </Swiper>
  );
};

export default HeroSection;
