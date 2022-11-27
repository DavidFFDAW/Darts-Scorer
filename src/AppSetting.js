export class AppSettings {
    static LOCAL_STORAGE_KEY = 'darts-23112022-v2';
    static DEVELOPER_MAIL = 'davidferflo2@gmail.com';
    static MAIL_SUBJECT_SEND = 'Soporte App Dardos';
    static MAIL_API_ENDPOINT = 'https://vps-f87b433e.vps.ovh.net/mail/mail.api.php';

    static AVAILABLE_GAMES = [301, 501, 701, 1001];
    static AVAILABLE_PLAYERS = [2, 3, 4, 5, 6];
    static AVAILABLE_TYPES = {
        game: 'game',
        players: 'players',
    };
}
