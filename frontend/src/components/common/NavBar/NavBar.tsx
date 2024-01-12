import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import styles from "@/styles/Nav.module.scss";
import { tss } from 'tss-react';

import NavItem from "./NavItem";
import { usePathname } from "next/navigation";

import anTirLogo from '@/images/an-tir_kingdom_160.webp';


const MENU_LIST = [
  {text: "HOME", href:"/"},
  {text: "EVENTS", href:"/events"},
  {text: "TOURNAMENTS", href:"/tournaments"},
];

function getRoute():number {
  const location = usePathname();
  return MENU_LIST.findIndex(obj => obj.href == location);
} 

const NavBar = () => {
  const [active, setActive] = useState(false);
  const [activeIdx, setActiveIdx] = useState(getRoute());
  const [logged_in, setLoggedIn] = useState(false);

  const { cx, classes } = useStyles({active, logged_in});

  return(
    <>
    <header>
      <nav className={styles.nav_bar_wrapper}>
        <Link href="/" onClick={() => setActiveIdx(0)}>
        <Image src={anTirLogo} alt='An Tir Lion' height={75} width={75} />
        </Link>
        <div
          onClick={() => {setActive((active) => !active)}}
          className={[
            styles.nav_burger,
            active ? styles.active: '']
            .join(" ")}
        >
          <div className={styles.nav_burger_layer}/>
          <div className={styles.nav_burger_layer}/>
          <div className={styles.nav_burger_layer}/>
        </div>
        <div className={[
          styles.nav_link_wrapper,
          active ? styles.active : ''
          ].join("")}
        >
          <div onClick={() => {setActive((active) => !active)}} className={styles.nav_exit}/>
          {MENU_LIST.map((menu, idx) => (
            <div onClick={(e) => {
              setActiveIdx(idx);
              setActive(false);
            }}
            key={menu.text}
            >
              <NavItem active={activeIdx === idx} {...menu} />
            </div>
          ))}
          <Link className={styles.account_btn} href="/account">
            {logged_in ? 'ACCOUNT' : 'LOG IN'}
          </Link>
        </div>
      </nav>
    </header>
    </>
  )
}

const useStyles = tss.withParams<{active: boolean, logged_in: boolean}>()
  .create(({active, logged_in}) => ({
  nav_bar_wrapper:{
    display: 'flex',
    padding: '16px',
    margin:'0px',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E4BB16',
  },
  nav_burger:{
    display: active ? 'none' : 'flex',
    flexDirection: 'column',
    gap:'6px',
    padding:'6px',
    borderStyle:'solid',
    borderRadius:'3px',
    '@media (min-width:768px)':{
      display: 'none',
    },
  },
  nav_burger_layer: {
    width:'40px',
    height: '4px',
    backgroundColor: 'black',
    borderRadius: '2px',
  },
  nav_exit:{
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    height: '50px',
    width: '50px',
    borderRadius: '3px',
    backgroundColor: '#E4BB16',
    '&:hover': {
      backgroundColor: '#b59512',
    },
    '&:after':{
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      content: '"\u00d7"',
      fontSize: '40px',
      fontWeight:'300',
      fontColor: '#FFF',
      textAlign: 'center',
    },
    '@media (min-width:768px)':{
      display: 'none',
    },
  },
  nav_link_wrapper:{
    fontSize: '20px',
    display:'flex',
    flexDirection: 'column',
    position: 'fixed',
    top: '0px',
    width:'228px',
    rowGap: '24px',
    right: active ? '0' : '-288px',
    padding: '24px 16px',
    //transition: 'all 0.2s',
    minHeight: 'calc(100vh - 60px)',
    backgroundColor: '#f1f1f1',
    '@media (min-width:768px)':{
      position: 'unset',
      flexDirection: 'row',
      justifyContent: 'space-between',
      minHeight: 'fit-content',
      minWidth: 'fit-content',
      columnGap: '24px',
      alignItems: 'center',
      right: '0px',
      backgroundColor: '#E4BB16',
    }
  },
  account_btn: {
    backgroundColor: "#f1f1f1",
    borderRadius: '3px',
    padding: '10px'
  }
}));
export default NavBar;