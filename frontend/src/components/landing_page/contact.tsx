import Link from "next/link";
import Image from "next/image";

import styles from "@/styles/landing_page/Contact.module.scss";

import linkedInIcon from '@/images/icons/4518854_linkedin.svg';
import githubIcon from '@/images/icons/4519078_github.svg';
import slackIcon from '@/images/icons/4518826_slack.svg';

const ContactSection = () => {
  return(
    <div className={styles.contact_wrapper}>
      <div className={styles.contact_left}>
        <p>CONTACT</p>
        <p>FORM</p>
        <p>HERE</p>
      </div>
      <div className={styles.contact_right}>
        <p>To contact me with any questions or concerns, please fill out this form.</p>
        <p>Or you can reach me via Slack, LinkedIn, or GitHub</p>
        <br/>
        <div className={styles.socials_wrapper}>
          <div className={styles.socials_box}>
            <Link href=''>
              <Image 
                src={linkedInIcon}
                alt='LinkedIn'
                width={30}
                />
            </Link>
          </div>
          <div className={styles.socials_box}>
          <Link href=''>
              <Image
                src={githubIcon}
                alt='github'
                width={30}
              />
            </Link>
          </div>
          <div className={styles.socials_box}>
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

export default ContactSection;