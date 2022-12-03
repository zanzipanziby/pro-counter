import React from 'react';
import s from './CounterWrapper.module.css'

export const CounterWrapper = () => {
    return (
        <div className={s.counterWrapper + ' ' + s.borderStyle} >
            <div className={s.counterDisplay + ' ' + s.borderStyle + ' ' + s.flexCenter}>

            </div>
            <div className={s.buttonWrapper + ' ' + s.borderStyle + ' ' + s.flexCenter}>
                
            </div>
        </div>
    );
};