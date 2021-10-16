import { useState } from 'react';
import { FaHome } from 'react-icons/fa';
import { MdDarkMode, MdLightMode } from 'react-icons/md'
import ls from 'services/local.storage.service';

export default function HeadMenu ({ isOpen, goToMenu, closeMenu, history }) {
    
    const iconsSize = 20;
    const [ isLightMode, setLightMode ] = useState(false);

    const saveThemePreference = _ => {
        const savedPreference = ls.get('theme');
        const newPreference = savedPreference === 'light' ? 'dark' : 'light';
        ls.store('theme', newPreference);
    }

    const handleColorTheme = _ => {
        setLightMode(!isLightMode);
        document.body.classList.toggle('light');
        saveThemePreference();
        closeMenu();
    }

    const getColorThemeButton = _ => {
        if (!isLightMode){
            return (
                <button className="link flex between" onClick={ _ => handleColorTheme() }>
                    <MdDarkMode size={iconsSize}/>
                    <span>Claro</span>
                </button>
            );
        }
        return (
            <button className="link flex between" onClick={ _ => handleColorTheme() }>
                <MdLightMode size={iconsSize}/>
                <span>Oscuro</span>
            </button>
        );
    }
    
    return (
        <>
            { isOpen && <div className="head-menu">
                <div className="head-link">
                    <button onClick={ goToMenu } className="link flex between">
                            <FaHome size={iconsSize}/>
                            <span>Home</span>
                    </button>
                </div>
                <div className="head-link">
                    { getColorThemeButton() }
                </div>
            </div> }
        </>
    );
}