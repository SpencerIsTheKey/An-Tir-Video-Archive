'use client'
import styles from "@/styles/landing_page/About.module.scss";

import {Swiper, SwiperSlide} from 'swiper/react';
import { Navigation, Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const AboutSection = () => {

  return(
    <Swiper
      navigation={true}
      pagination={true}
      modules={[Navigation, Pagination]}
      className={styles.swiper_custom_wrapper}
      id="about"
      >
      <SwiperSlide className={styles.swiper_slide}>
        <p>Want to post your videos but don't want to manage a Youtube channel?</p>
      </SwiperSlide>
      <SwiperSlide className={styles.swiper_slide}>
        <p>The An Tir Video Archive is a space for those event videos that you take and don't know where to post!</p>
      </SwiperSlide>
      <SwiperSlide className={styles.swiper_slide}>
        <p>Intuitive categorization system makes it easy to find the videos you want!</p>
       </SwiperSlide>
    </Swiper>
  );
}

export default AboutSection;