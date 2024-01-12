import styles from "@/styles/landing_page/Hero.module.scss";

const Hero = () => {
  return (
    <>
    <div className={styles.hero_image}>
      <div className={styles.hero_text_wrapper}>
        <h3 className={styles.hero_text}>WELCOME TO</h3>
        <h1 className={styles.hero_text}>The An Tir Video Archive</h1>
        <h3 className={styles.hero_text}>YOUR SPACE TO SHARE</h3>
      </div>
    </div>
    </>
  );
}

export default Hero;