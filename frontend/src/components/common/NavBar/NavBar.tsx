import Link from "next/link";
import { useState } from "react";
import { tss } from 'tss-react';

import NavItem from "./NavItem";


const MENU_LIST = [
  {text: "Home", href:"/"},
  {text: "About", href: "/about"},
  {text: "Contact", href: "/contact"},
  {text: "Account", href: "/account"}
];

const NavBar = () => {
  const [active, setActive] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);

  const { cx, classes } = useStyles({active});

  return(
    <>
    <header>
      <nav className={classes.nav_bar_wrapper}>
    <Link href="/" onClick={() => setActiveIdx(0)}>
            <h1>TEMP LOGO</h1>
        </Link>
        <div onClick={() => setActive(!active)} className={classes.nav_burger}>
          <div className={classes.nav_burger_layer}/>
          <div className={classes.nav_burger_layer}/>
          <div className={classes.nav_burger_layer}/>
        </div>
        <div className={classes.nav_link_wrapper}>
          {MENU_LIST.map((menu, idx) => (
            <div onClick={() => {
              setActiveIdx(idx);
              setActive(false);
            }}
            key={menu.text}
            >
              <NavItem active={activeIdx === idx} {...menu} />
            </div>
          ))}

        </div>
      </nav>
    </header>
    </>
  )
}

const useStyles = tss.withParams<{active: boolean}>()
  .create(({active}) => ({
  nav_bar_wrapper:{
    display: 'flex',
    padding: '16px',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
  },
  nav_burger:{
    display: 'flex',
    flexDirection: 'column',
    gap:'6px',
    '@media (min-wdith:)':{
      display: 'none',
    }
  },
  nav_burger_layer: {
    width:'40px',
    height: '4px',
    backgroundColor: 'black',
    borderRadius: '2px',
  },
  nav_link_wrapper:{
    display:'flex',
    flexDirection: 'column',
    position: 'fixed',
    top: '60px',
    width:'228px',
    rowGap: '24px',
    right: active ? '0' : '-288px',
    padding: '24px 16px',
    transition: 'all 0.2s',
    minHeight: 'calc(100vh - 60px)',
    backgroundColor: '$f1f1f1',
    fontWeight: active ? 'bold':'normal',
    '@media (min-wdith:768px)':{
      position: 'unset',
      flexDirection: 'row',
      minHeight: 'fit-content',
      columnGap: '24px',
      alignItems: 'center',
    }
  },
}));

// const useStyles = tss.create({
//   nav_bar_wrapper:{
//     display: flex,
//     padding: 16px,
//     justify-content: space-between,
//     alignItems: center,
//     backgroundColor: #f1f1f1,
//   },
//   nav_burger:{

//   },
//   nav_burger_layer:{

//   },
//   nav_list:{

//   }
// });

export default NavBar;