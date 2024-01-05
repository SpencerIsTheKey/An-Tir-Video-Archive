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

const useStyles = tss.withParams<{active: boolean}>()
  .create(({active}) => ({
    nav_item: {
        padding: '10px',
        position: 'relative',
        fontWeight: active ? 'bold' : 'normal',
        transition: 'all 0.2s',

        '@media (min-width:768px)':{
            '&:hover':{
                '&:before': {
                    width: '100%'
                }
            },
            '&:before':{
                content:'""',
                position:'absolute',
                width: active ? '100%' : '0%',
                height: '6px',
                bottom: '-2px',
                left: 0,
                backgroundColor: 'black',
                transition: 'all 0.2s',
            }
            }
      }
  }));

export default NavItem;