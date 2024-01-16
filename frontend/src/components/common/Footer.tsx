import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/Footer.module.scss";

import linkedInIcon from '@/images/icons/4518854_linkedin.svg';
import githubIcon from '@/images/icons/4519078_github.svg';
import slackIcon from '@/images/icons/4518826_slack.svg';
import anTirLogo from '@/images/an-tir_kingdom_160.webp';

const FOOTER_LINKS = [
  {header: "", content: [
    {text: "ABOUT", href:'/#about'},
    {text: "CONTACT", href:'/#contact'},
  ]},
  {header: "VIDEO CATEGORIES", content: [
    {text: "", href:'/#about'},
  ]},
  [],
  
]
const Footer = () => {

  return(
    <div className={styles.footer_wrapper}>
      <div className={styles.footer_branding_section}>
        <Link href="/">
          <Image src={anTirLogo} alt='An Tir Lion' height={175} width={175} />
        </Link>
        <div className={styles.branding_row} >
          <Link href='/#about' scroll={true}>
            ABOUT
          </Link>
          <Link href="/#contact" scroll={true}>
            CONTACT
          </Link>
        </div>
        <div className={styles.footer_socials}>
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
      <div className={styles.footer_nav_section}>
        <div className={styles.footer_nav_subsection}>
          <h3>Video Categories</h3>
          <br/>
          <div>Combat</div>
          <div className={styles.combat_links}>
            <Link href="/categories/heavy">Heavy</Link>
            <Link href='/categories/cut-and-thrust'>Cut & Thrust</Link>
            <Link href='/categories/rapier'>Rapier</Link>
          </div>
          <Link href="/categories/archery">Archery</Link>
          <Link href="/categories/thrown-weapons">Thrown Weapons</Link>
          <Link href="/categories/arts-and-sciences">Arts & Sciences</Link>
          <Link href="/categories/bardic">Bardic</Link>
          <Link href="/categories/court">Court</Link>
        </div>
        <div className={styles.footer_nav_subsection}>
          <h3>Tournaments</h3>
          <br/>
          <h4>2023</h4>
          {/* add months with link to /tournamets/[slug] */}
          <br/>
          <h4>2024</h4>
          {/* add months with link to /tournamets/[slug] */}
        </div>
      </div>
    </div>
  );
}
export default Footer;