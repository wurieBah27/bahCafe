// import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// import 'swiper/css';
import "swiper/css/virtual";
import SingleHeroItem from "./SingleHeroItem";
import useGetFeaturedProducts from "../features/menue/menueHooks/useGetFeaturedProducts";

const HeroSection = () => {
  const { featuredItems, isFecthingItems } = useGetFeaturedProducts();

  console.log(featuredItems);
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 7000,
        disableOnInteraction: true,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={false}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      {featuredItems?.map((item) => (
        <SwiperSlide key={item?.id}>
          <SingleHeroItem data={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSection;
