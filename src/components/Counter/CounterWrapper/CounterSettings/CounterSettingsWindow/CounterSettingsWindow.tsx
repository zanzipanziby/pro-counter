import React, {useState} from 'react';
import s from './CounterSettingsWindow.module.css'
import {Input} from "./Input/Input";

type CounterSettingsWindowPropsType = {
    maxValue: number
    startValue: number
    incValue: number
    error: boolean
    changeMaxValue: (maxValue: number) => void
    changeStartValue: (startValue: number) => void
    changeIncValue: (inc: number) => void

}


export const CounterSettingsWindow = (props: CounterSettingsWindowPropsType) => {

    //Каждому инпуту по колбеку, по значению и по ошибке)
    return (
        <div className={s.counterSettingsWindow}>
            <div className={s.settingBlock}>
                <div>
                    max value:
                </div>
                <Input
                    value={props.maxValue}
                    callback={props.changeMaxValue}
                    error={props.error}


                />
            </div>
            <div className={s.settingBlock}>
                <div>
                    start value:
                </div>
                <Input value={props.startValue}
                       callback={props.changeStartValue}
                       error={props.error}


                />
            </div>
            <div className={s.settingBlock}>
                <div>
                    inc value:
                </div>
                <Input value={props.incValue} callback={props.changeIncValue}
                       error={props.error}
                />
            </div>
        </div>
    );
};

