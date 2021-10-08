import React from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import storage from '../services/local.storage.service';

export default function Redirector() {

    const history = useHistory();

    useEffect(_ => {
        if (storage.get('playerNames')) {
            history.push('/darts/cricket/game');
        }
        history.push('/darts/options');
    },[ history ]);

    return (<React.Fragment/>);
}