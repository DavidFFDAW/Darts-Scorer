import sk from 'constants/storage.keys';
import { useHistory } from 'react-router';
import ls from 'services/local.storage.service';
import pl from 'services/player.service';
import { Divide as Hamburger } from 'hamburger-react'
import { useState } from 'react';
import { FaHome, FaTrashAlt } from 'react-icons/fa';
import { GiDart } from 'react-icons/gi';

export default function Header() {

    const history = useHistory();

    const [ isOpen, setOpen ] = useState(false);
    
    const deleteCache = _ => {
        Object.values(sk).forEach(key => {
            ls.removeByKey(key);
        });
        history.push('/darts/options');
    }
    
    const deleteJustNeeded = _ => {
        ls.removeByKey(sk.scoreboard);
        ls.removeByKey('round');
        ls.removeByKey('shot');
    }

    const goToMenu = _ => {
        pl.setPlayersCurrentCounter(0);
        deleteCache();
        history.push('/');
    }

    return (
        <div className="header">
            <div className="flex between">
                <div></div>
                <Hamburger toggled={ isOpen } color={'#fff'} toggle={ setOpen } size={20} label="Show Menu" hideOutline={true} rounded />
            </div>

            { isOpen && <div className="head-menu">
                <div className="down flex center vertical">
                    <button onClick={ goToMenu } className="link flex between">
                            <FaHome size={40}/>
                            <span>Home</span>
                    </button>
                    <button className="link flex between">
                            <GiDart size={40}/>
                            <span>Cricket</span>
                    </button>
                    <button className="link flex between">
                            <FaTrashAlt size={40}/>
                            <span>Storage</span>
                    </button>
                    <button className="link flex between">
                            <FaTrashAlt size={40}/>
                            <span>Scores</span>
                    </button>
                </div>
            </div> }

        </div>
    )
}