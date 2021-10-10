import React from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import storage from '../services/local.storage.service';

export default function Redirector() {

    const history = useHistory();

    useEffect(_ => {
        if (storage.get('scoreboard')){
            return history.push(`/darts/game/${ storage.get('gameType') }/${ storage.get('numPlayers') }`);
        }
        return history.push('/darts/options');
    },[ history ]);

    return (<React.Fragment/>);
}