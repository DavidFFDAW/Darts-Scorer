import React from 'react';
import ButtonGrid from './components/buttons/ButtonGrid';
import Scorer from './components/scorer/Scorer';
import useGames01Type from './hooks/useGames01Type';

export default function Games01() {
    const { darts } = useGames01Type();
    const click = value => console.log('click: ', value);

    return (
        <>
            <Scorer scorer={darts.scorer} />

            <div className="flex center column w100">
                <ButtonGrid onClick={click} />
            </div>
        </>
    );
}
