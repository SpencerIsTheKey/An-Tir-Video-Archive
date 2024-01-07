import { tss } from "tss-react";
import {Swiper, SwiperSlide} from 'swiper/react';
import { Navigation, Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const AboutSection = () => {
  const { cx, classes } = useStyles();

  return(
    <Swiper
      navigation={true}
      pagination={true}
      modules={[Navigation, Pagination]}
      className={classes.swiper}
      id="about"
      >
      <SwiperSlide className={classes.swiper_slide}>
        <p>Want to post your videos but don't want to manage a Youtube channel?</p>
      </SwiperSlide>
      <SwiperSlide className={classes.swiper_slide}>
        <p>The An Tir Video Archive is a space for those event videos that you take and don't know where to post!</p>
      </SwiperSlide>
      <SwiperSlide className={classes.swiper_slide}>
        <p>Intuitive categorization system makes it easy to find the videos you want!</p>
       </SwiperSlide>
    </Swiper>
  );
}

const useStyles = tss.create({
  about_wrapper: {

  },
  swiper:{
    minHeight: '400px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  swiper_slide: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default AboutSection;