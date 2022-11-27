import React from 'react';
import { Icon } from 'components/icon/Icon';
import DoubleOrTripleButtons from './Buttons';

export default function ButtonGrid({ onClick }) {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const indexes = [...Array.from({ length: 20 }, (_, i) => i + 1), 25, '0', '0', '0', '0', '0', '0'];
    const maximumPages = Math.ceil(indexes.length / 9);

    const onClickHandler = e => {
        const { dataset } = e.target;
        const buttonValue = dataset.value;
        onClick(Number(buttonValue));
    };

    return (
        <>
            <div className="flex between w90 down">
                <div style={{ letterSpacing: 4 }}>
                    {currentIndex + 1}/{maximumPages}
                </div>
                <div className="flex center">
                    <button
                        className="btn simple"
                        onClick={_ =>
                            setCurrentIndex(curr => {
                                if (curr - 1 < 0) return maximumPages - 1;
                                return curr - 1;
                            })
                        }
                    >
                        <Icon icon={'navigate_before'}></Icon>
                    </button>
                    <button
                        className="btn simple"
                        onClick={_ =>
                            setCurrentIndex(curr => {
                                if (curr + 1 >= maximumPages) return 0;
                                return curr + 1;
                            })
                        }
                    >
                        <Icon icon={'navigate_next'}></Icon>
                    </button>
                </div>
            </div>

            <div className="grid btn-grid">
                {indexes.slice(currentIndex * 9, currentIndex * 9 + 9).map((item, index) => {
                    if (item === 25) {
                        return <DoubleOrTripleButtons key={index} item={item} onClick={onClickHandler} />;
                    }
                    if (item === '0') {
                        return (
                            <button className="btn empty" key={index}>
                                {item}
                            </button>
                        );
                    }
                    return <DoubleOrTripleButtons key={index} item={item} onClick={onClickHandler} triple />;
                })}
            </div>
        </>
    );
}
