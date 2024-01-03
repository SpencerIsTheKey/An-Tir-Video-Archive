import { FunctionComponent } from "react";
import Link from "next/link";
import { tss } from "tss-react";


type Props = {
    text: string;
    href: string;
    active: boolean;
}

const NavItem: FunctionComponent<Props> = ({ text, href, active}) => {

    const {classes} = useStyles({active});
    return(

         <Link className={classes.nav_item} href={href}>
            {text}
         </Link>
        
    );
}

const useStyles = tss.create({

      nav_item: {
        '@media (min-wdith:768px)':{
           '&:before':{
            content:'""',
            position:'absolute',
            width: '0%',
            height: '6px',
            bottom: '-16px',
            left: 0,
            backgroundColor: 'black',
            transition: 'all 0.2s'
           }
        }
      }
});

export default NavItem;