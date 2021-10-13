import { FaHome, FaTrashAlt } from 'react-icons/fa';
import { GiDart } from 'react-icons/gi';

export default function HeadMenu ({ isOpen, goToMenu }) {
    return (
        <>
            { isOpen && <div className="head-menu">
                <div className="down">
                    <div className="flex center head-link">
                        <button onClick={ goToMenu } className="link flex between">
                                <FaHome size={40}/>
                                <span>Home</span>
                        </button>
                    </div>
                    <div className="flex center head-link">
                        <button className="link flex between">
                                <GiDart size={40}/>
                                <span>Cricket</span>
                        </button>
                    </div>
                    <div className="flex center head-link">
                        <button className="link flex between">
                                <FaTrashAlt size={40}/>
                                <span>Storage</span>
                        </button>
                    </div>
                    <div className="flex center head-link">
                        <button className="link flex between">
                                <FaTrashAlt size={40}/>
                                <span>Scores</span>
                        </button>
                    </div>
                </div>
            </div> }
        </>
    );
}