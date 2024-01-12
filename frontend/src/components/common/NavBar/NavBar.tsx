import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import styles from "@/styles/Nav.module.scss";

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

export default NavBar;