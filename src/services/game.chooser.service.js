import { initialGameObject } from 'pages/games/Games01/service/games.01.service';
import { initialGameObject as cricketInitialState } from 'pages/games/Cricket/services/games.cricket.service';

export function getInitialGameStateByGame(game) {
    if (game === 'cricket') {
        return cricketInitialState;
    }
    return initialGameObject;
}
