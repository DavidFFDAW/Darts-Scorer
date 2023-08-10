import React from 'react';

export function Buttons({ item, onClick, toggle, triple }) {
    return (
        <div className="animate__animated animate__fadeIn animate__faster group-button flex around column w90">
            <button className="close" onClick={toggle}>
                &times;
            </button>
            <button className="btn" data-value={item} data-simple={item} data-times={1} onClick={onClick}>
                {item}
            </button>
            <button className="btn" data-value={item * 2} data-simple={item} data-times={2} onClick={onClick}>
                D{item}
            </button>
            {triple ? (
                <button className="btn" data-value={item * 3} data-simple={item} data-times={3} onClick={onClick}>
                    T{item}
                </button>
            ) : null}
        </div>
    );
}

export default function DoubleOrTripleButtons({ item, triple, onClick }) {
    const [active, setActive] = React.useState(false);
    const toggleActive = _ => setActive(!active);

    const clickHandler = e => {
        toggleActive();
        onClick(e);
    };

    return (
        <>
            <button className="btn" data-value={item} data-simple={item} data-times={1} onClick={toggleActive}>
                {item}
            </button>
            {active ? <Buttons item={item} toggle={toggleActive} onClick={clickHandler} triple={triple} /> : null}
        </>
    );
}
