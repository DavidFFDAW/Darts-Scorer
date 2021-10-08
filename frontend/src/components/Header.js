import sk from 'constants/storage.keys';
import { useHistory } from 'react-router';
import ls from 'services/local.storage.service';

export default function Header() {

    const history = useHistory();
    
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

    return (
        <div className="header">
            <div className="flex between">
                <div></div>
                <button className="" onClick={deleteCache}>Borrar Storage</button>
                <button className="" onClick={deleteJustNeeded}>Borrar Scores</button>
            </div>

        </div>
    )
}