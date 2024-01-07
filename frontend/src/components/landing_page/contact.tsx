import Link from "next/link";
import Image from "next/image";
import { tss } from "tss-react";

import linkedInIcon from '@/images/icons/4518854_linkedin.svg';
import githubIcon from '@/images/icons/4519078_github.svg';
import slackIcon from '@/images/icons/4518826_slack.svg';

const ContactSection = () => {
  const {cx, classes} = useStyles();
  return(
    <div className={classes.contact_wrapper}>
      <div className={classes.contact_left}>
        <p>CONTACT</p>
        <p>FORM</p>
        <p>HERE</p>
      </div>
      <div className={classes.contact_right}>
        <p>To contact me with any questions or concerns, please fill out this form.</p>
        <p>Or you can reach me via Slack, LinkedIn, or GitHub</p>
        <br/>
        <div className={classes.socials_wrapper}>
          <div className={classes.socials_box}>
            <Link href=''>
              <Image 
                src={linkedInIcon}
                alt='LinkedIn'
                width={30}
                />
            </Link>
          </div>
          <div className={classes.socials_box}>
          <Link href=''>
              <Image
                src={githubIcon}
                alt='github'
                width={30}
              />
            </Link>
          </div>
          <div className={classes.socials_box}>
          <Link href=''>
              <Image 
                src={slackIcon}
                alt='Slack'
                width={30}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const useStyles = tss.create({
  contact_wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: '20px',
    padding: '20px'
  },
  contact_left: {
    margin: '5px',
    padding: '50px',
    borderRadius: '15px',
    backgroundColor: '#FFFFFF',
  },
  contact_right: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  socials_wrapper: {
    width: '50%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  socials_box: {
    borderColor: '#bfbfbf',
    backgroundColor: '#787878',
    borderRadius: '6px',
    border: 'solid',
    padding: '5px',
  },
});

export default ContactSection;