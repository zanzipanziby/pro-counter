import React from 'react';
import s from './CounterDisplay.module.css'



type CounterDisplayPropsType ={
    counterValue: number
    maxValue: number
}



export const CounterDisplay = (props: CounterDisplayPropsType) => {
    return (
        <div className={props.counterValue !== props.maxValue ? s.counterValue : s.counterValue + ' ' + s.maxValue}>
            {props.counterValue}
        </div>
    );
};

