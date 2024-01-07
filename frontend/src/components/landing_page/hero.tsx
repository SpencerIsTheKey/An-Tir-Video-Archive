import { tss } from "tss-react";
import hero_bg from '@/images/archive_cropped_expanded.jpg';

const Hero = () => {
  const { cx, classes } = useStyles();
  return (
    <>
    <div className={classes.hero_image}>
      <div className={classes.hero_text_wrapper}>
        <h3 className={classes.hero_text}>WELCOME TO</h3>
        <h1 className={classes.hero_text}>The An Tir Video Archive</h1>
        <h3 className={classes.hero_text}>YOUR SPACE TO SHARE</h3>
      </div>
    </div>
    </>
  );
}

const useStyles = tss.create({
  hero_image:{
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),  url(${hero_bg.src})`,
    height: '600px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '25% 75%',
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center,'
  },
  hero_text_wrapper:{
    padding: '100px 0px',
    display:'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0px',
  },
  hero_text:{
    borderRadius:'10px',
    padding:'10px',
    backdropFilter: 'brightness(175%)',
    '&:first-child': {
      borderBottomLeftRadius: '0px',
      borderBottomRightRadius: '0px',
    },
    '&:last-child': {
      borderTopLeftRadius: '0px',
      borderTopRightRadius: '0px',
    },
    '&h1':{
      fontSize: '90px',
    },
    '&h3':{
      fontSize: '60px',
    }
  }

});

export default Hero;