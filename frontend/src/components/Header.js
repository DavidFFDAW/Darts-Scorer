import sk from 'constants/storage.keys';
import { useHistory } from 'react-router';
import ls from 'services/local.storage.service';
import pl from 'services/player.service';
import { Divide as Hamburger } from 'hamburger-react'
import { useState } from 'react';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import HeadMenu from './HeadMenu';

export default function Header() {

    const history = useHistory();

    const arrowStyle = { paddingLeft: '10px' };
    const [ isOpen, setOpen ] = useState(false);
    
    const deleteCache = _ => {
        Object.values(sk).forEach(key => {
            ls.removeByKey(key);
        });
        history.push('/darts/options');
    }

    const closeMenuOnClick = _ => {
        setOpen(false);
    }

    const goToMenu = _ => {
        pl.setPlayersCurrentCounter(0);
        deleteCache();
        closeMenuOnClick();
    }

    return (
        <div className="header">
            <div className="flex between">
                <FaLongArrowAltLeft style={ arrowStyle } color={'#fff'} size={25} label="Go Back" onClick={ _ => history.goBack() }/>
                <Hamburger toggled={ isOpen } color={'#fff'} toggle={ setOpen } size={20} label="Show Menu" hideOutline={true} rounded />
            </div>

            <HeadMenu 
                isOpen={ isOpen } history={history} 
                goToMenu={goToMenu} closeMenu={closeMenuOnClick}
            />

        </div>
    )
}