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
    changeMaxValue: (maxValue: number) => void
    changeStartValue: (startValue: number) => void
    changeIncValue: (incValue: number) => void
    changeSettingHandler: () => void
    resetSettings: () => void

    //Приход функций в пропсах решил оставить опциональным для каждого из окон счётчика
}


export const CounterWrapper = (props: CounterWrapperPropsType) => {

    // Стейты для подсказки и ошибки на экране счётчика

    //Логика дизейблов кнопок счётчика(отправлены в пропсах для каждой кнопки, т.к. )
    const disabledButtonReset = props.counterValue === props.settings.startValue
    const disabledButtonInc = props.error || props.settings.maxValue <= props.counterValue



    //Исходя из типа пришедшего в пропсах, отрисует окно счетчика либо окно его настроек
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
                <SuperButton title={"inc"} callback={props.changeCounter} disabled={disabledButtonInc}/>
                <SuperButton title={"reset"} callback={props.resetCounter} disabled={disabledButtonReset}/>
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
                    <SuperButton title={"reset"} callback={props.resetSettings} disabled={false}/>
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