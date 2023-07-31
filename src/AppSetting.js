export class AppSettings {
    static LOCAL_STORAGE_KEY = 'darts-23112022-v2';
    static DEVELOPER_MAIL = 'davidferflo2@gmail.com';
    static MAIL_SUBJECT_SEND = 'Soporte App Dardos';
    static MAIL_API_ENDPOINT = 'https://vps-f87b433e.vps.ovh.net/mail/mail.api.php';

    static AVAILABLE_GAMES = [301, 501, 701, 1001, 'cricket'];
    static AVAILABLE_PLAYERS = [2, 3, 4, 5, 6];
    static AVAILABLE_TYPES = {
        game: 'game',
        players: 'players',
    };
}

export const APP_ROUTES = {
    HOME: '/',
    ABOUT: '/about',
    CHANGELOG: '/changelog',
    CONTACT: '/contact',
    SETTINGS: '/settings',
    OPTIONS: {
        INDEX: '/options',
        PARENT: '/options/*',
        GAME: {
            NAVIGATION: '/options/game',
            ROUTE: '/game',
        },
        PLAYERS: 'players/:num/game/:game',
    },
    GAMES: {
        PARENT: '/games/*',
        X01: '/type/X01/game/:game/board',
        CRICKET: '/type/cricket/game/:game/board',
    },
};
