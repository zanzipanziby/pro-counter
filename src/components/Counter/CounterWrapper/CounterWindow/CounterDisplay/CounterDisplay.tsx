import React, {useEffect, useState} from 'react';
import s from './CounterDisplay.module.css'


type CounterDisplayPropsType = {
    counterValue: number
    maxValue: number
    placeholder: boolean
    error: boolean
}


export const CounterDisplay = (props: CounterDisplayPropsType) => {
    let [counterValue, setCounterValue] = useState(props.counterValue)
    useEffect(()=> {
        setCounterValue(props.counterValue)
    },[props.counterValue])
    // В зависимости от пропсов отрисовываем либо счётчик, либо подсказку к настройкам, либо ошибку.
    let renderDisplay;
    // "Ифы" написаны по приоритету отрисовки
    if (props.error) {
        renderDisplay = <div className={s.error}>Incorrect value!</div>
    } else if (props.placeholder) {
        renderDisplay = <div className={s.placeholder}>enter values and press 'set'</div>
    } else {
        renderDisplay = <div
            className={props.counterValue < props.maxValue ? s.counterValue : s.counterValue + ' ' + s.maxValue}
        >
            {counterValue}
        </div>
    }
    return (
        <>
            {renderDisplay}
        </>

    );
};

