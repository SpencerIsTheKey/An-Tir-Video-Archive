import Link from "next/link";
import Image from "next/image";
import { tss } from 'tss-react';

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
  const { cx, classes } = useStyles();

  return(
    <div className={classes.footer_wrapper}>
      <div className={classes.footer_branding_section}>
        <Link href="/">
          <Image src={anTirLogo} alt='An Tir Lion' height={175} width={175} />
        </Link>
        <div className={classes.branding_row} >
          <Link href={'/#about'}>
            ABOUT
          </Link>
          <Link href="/$contact">
            CONTACT
          </Link>
        </div>
        <div className={classes.footer_socials}>
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
      <div className={classes.footer_nav_section}>
        <div className={classes.footer_nav_subsection}>
          <h3>Video Categories</h3>
          <br/>
          <div>Combat</div>
          <div className={classes.combat_links}>
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
        <div className={classes.footer_nav_subsection}>
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

const useStyles = tss.create({
  footer_wrapper:{
    height: 'fit-content',
    backgroundColor: '#212121',
    color: '#bfbfbf',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'flex-start',
    padding: '20px 50px',
  },
  footer_branding_section: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '15px',
  },
  branding_row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  footer_socials: {
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
  footer_nav_section: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: '50px',
    justifyContent: 'space-between',
    alignContent: 'flex-start',
  },
  footer_nav_subsection: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    alignContent: 'flex-start',
    gap: '5px',
  },
  combat_links: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignContent: 'flex-start',
    paddingLeft: '25px',
  },
});

export default Footer;