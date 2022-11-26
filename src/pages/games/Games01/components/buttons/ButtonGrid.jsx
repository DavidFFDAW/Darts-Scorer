import React from 'react';
import { Icon } from 'components/icon/Icon';
import DoubleOrTripleButtons from './Buttons';

export default function ButtonGrid({ onClick }) {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const indexes = [...Array.from({ length: 20 }, (_, i) => i + 1), 25];
    const maximumPages = Math.ceil(indexes.length / 9);

    const onClickHandler = e => {
        const { dataset } = e.target;
        const buttonValue = dataset.value;
        onClick(buttonValue);
    };

    return (
        <>
            <div className="flex between w90 down">
                <div style={{ letterSpacing: 4 }}>
                    {currentIndex + 1}/{maximumPages}
                </div>
                <div className="flex center">
                    {currentIndex !== 0 ? (
                        <button className="btn simple" onClick={ev => setCurrentIndex(curr => curr - 1)}>
                            <Icon icon={'navigate_before'}></Icon>
                        </button>
                    ) : null}
                    {currentIndex < maximumPages - 1 ? (
                        <button className="btn simple" onClick={ev => setCurrentIndex(curr => curr + 1)}>
                            <Icon icon={'navigate_next'}></Icon>
                        </button>
                    ) : null}
                </div>
            </div>

            <div className="grid btn-grid">
                {indexes
                    .slice(currentIndex * 9, currentIndex * 9 + 9)
                    .map((item, index) =>
                        item === 25 ? (
                            <DoubleOrTripleButtons key={index} item={item} onClick={onClickHandler} />
                        ) : (
                            <DoubleOrTripleButtons key={index} item={item} onClick={onClickHandler} triple />
                        ),
                    )}
            </div>
        </>
    );
}
