import { FunctionComponent } from "react";
import styles from "@/styles/Nav.module.scss";
import Link from "next/link";


type Props = {
    text: string;
    href: string;
    active: boolean;
}

const NavItem: FunctionComponent<Props> = ({ text, href, active}) => {

    return(
         <Link className={[styles.nav_item, active? styles.active : ''].join(" ")} href={href}>
            {text}
         </Link>
        
    );
}

export default NavItem;