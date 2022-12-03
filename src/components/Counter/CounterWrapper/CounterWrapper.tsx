import React, {useEffect, useState} from 'react';
import s from './CounterWrapper.module.css'
import {CounterDisplay} from "./CounterWindow/CounterDisplay/CounterDisplay";
import {CounterWindowElemType, SettingsType} from "../../../App";
import {CounterSettingsWindow} from "./CounterSettings/CounterSettingsWindow/CounterSettingsWindow";
import {SuperButton} from "./SuperButton/SuperButton";


type CounterWrapperPropsType = {
    type: CounterWindowElemType
    counterValue: number   //Нужны в обоих компонентах, для проверки дизейблов
    settings: SettingsType
    preSettings: SettingsType
    error: boolean
    placeholder: boolean
    changeCounter: () => void
    resetCounter: () => void
    changeSettings: (maxValue: number, startValue: number, inc: number) => void
    changeMaxValue: (maxValue: number)=> void
    changeStartValue: (startValue: number)=> void
    changeIncValue: (incValue: number)=> void
    changeSettingHandler: () => void

    //Приход функций в пропсах решил оставить опциональным для каждого из окон счётчика
}


export const CounterWrapper = (props: CounterWrapperPropsType) => {

    // Стейты для подсказки и ошибки на экране счётчика

    //Логика дизейблов кнопок счётчика(отправлены в пропсах для каждой кнопки, т.к. )
    const disabledButtonReset = props.counterValue === props.settings.startValue
    const disabledButtonInc = props.settings.maxValue <= props.counterValue


    // Проверка на то, что функция в пропсах пришла (костыль, а может и нет=))
    const changeCounterHandler = () => {
        props.changeCounter && props.changeCounter()
    }

    // Проверка на то, что функция в пропсах пришла (костыль, а может и нет=))
    const resetCounterHandler = () => {
        props.resetCounter && props.resetCounter()
    }


    //Исходя из типа пришедшего в пропсах, отрисует окно счетчика либо его настроек
    let counterDisplay;
    if (props.type === 'counter') {
        counterDisplay = <>
            <div className={s.counterDisplay + ' ' + s.borderStyle + ' ' + s.flexCenter}>
                <CounterDisplay
                    counterValue={props.counterValue}
                    maxValue={props.settings.maxValue}
                    placeholder={props.placeholder}
                    error={props.error}
                />
            </div>

            <div className={s.buttonWrapper + ' ' + s.borderStyle + ' ' + s.flexCenter}>
                <SuperButton title={"inc"} callback={changeCounterHandler} disabled={disabledButtonInc}/>
                <SuperButton title={"reset"} callback={resetCounterHandler} disabled={disabledButtonReset}/>
            </div>
        </>
    }
    if (props.type === 'settings') {
        counterDisplay =
    <>
        <div className={s.counterDisplay + ' ' + s.borderStyle + ' ' + s.flexCenter}>
            <CounterSettingsWindow
                maxValue={props.preSettings.maxValue}
                startValue={props.preSettings.startValue}
                incValue={props.preSettings.incValue}
                changeMaxValue={props.changeMaxValue}
                changeStartValue={props.changeStartValue}
                changeIncValue={props.changeIncValue}
                error={props.error}

            />
        </div>

        <div className={s.buttonWrapper + ' ' + s.borderStyle + ' ' + s.flexCenter}>
            <SuperButton title={"set"} callback={props.changeSettingHandler} disabled={props.error}/>
        </div>
    </>
}
    // ----------------------------------


    return (
        <div className={s.counterWrapper + ' ' + s.borderStyle}>
            {counterDisplay}
        </div>
    )

};