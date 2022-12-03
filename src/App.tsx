import React, {useEffect, useState} from 'react';
import './App.css';
import {CounterWrapper} from "./components/Counter/CounterWrapper/CounterWrapper";

//Все комменты ниже посвящаются Игорю(Преподавателю IT-Incubator)
// Игорь! Спасибо за прекрассную подачу материала, за поясняющие рисунки в WhiteBoard
// и за "как говорил Теодор Драйзер..."(не все поймут)

// ОСТОРОЖНО!!! Очень странная реализация!!!


export type CounterWindowElemType = 'counter' | 'settings'

type CounterWindowType = {
    counter: CounterWindowElemType
    settings: CounterWindowElemType
}


export type SettingsType = {
    incValue: number
    startValue: number
    maxValue: number
}

// Начало функции
function App() {


    //Стейт настроек счётчика в виде объекта (Мне показалось это логичным)
    const [settings, setSettings] = useState<SettingsType>({
        maxValue: 5,
        startValue: 0,
        incValue: 1,
    })
    useEffect(() => {
        setSettings({
            maxValue: localStorage.getItem('maxValue') ? Number(localStorage.getItem('maxValue')) : 5,
            startValue: localStorage.getItem('maxValue') ? Number(localStorage.getItem('startValue')) : 0,
            incValue: localStorage.getItem('incValue') ? Number(localStorage.getItem('incValue')) : 1,
        })
    }, [])


    // Промежуточный стейт настроек(не смог решить по другому, т.к. Кнопка которая сетает значения инпутов
    // находится в этой компоненте, а инпуты в дочерней)
    const [preSettings, setPreSettings] = useState<SettingsType>({
        // Первоначальные значения берутся из основного стейта в <App/>
        maxValue: settings.maxValue,
        startValue: settings.startValue,
        incValue: settings.incValue
    })
    useEffect(() => {
        setPreSettings({
            maxValue: localStorage.getItem('maxValue') ? Number(localStorage.getItem('maxValue')) : settings.maxValue,
            startValue: localStorage.getItem('maxValue') ? Number(localStorage.getItem('startValue')) : settings.startValue,
            incValue: localStorage.getItem('incValue') ? Number(localStorage.getItem('incValue')) : settings.incValue,
        })
    }, [])


    // Обект типа окна счетчика (позже(ниже) объясню =) )
    const counterWindow: CounterWindowType = {
        counter: 'counter',
        settings: 'settings'
    }


    //Стейт значения счётчика
    const [counterValue, setCounterValue] = useState<number>(settings.startValue)

    useEffect(() => {
        setCounterValue(settings.startValue)
    }, [settings])

    // Логика тика
    const changeCounter = () => {
        setCounterValue(counterValue + settings.incValue)
    }

    // Логика сброса счётчика
    const resetCounter = () => {
        setCounterValue(settings.startValue)
    }

    // Изменение объекта настроек
    const changeSettings = (maxValue: number, startValue: number, incValue: number) => {
        localStorage.setItem('maxValue', JSON.stringify(maxValue))
        localStorage.setItem('startValue', JSON.stringify(startValue))
        localStorage.setItem('incValue', JSON.stringify(incValue))
        setSettings({maxValue, startValue, incValue})
        setCounterValue(startValue)

    }

    // Сброс настроек
    const resetSettings = ()=>{
        setSettings({
            maxValue: 5,
            startValue: 0,
            incValue: 1,
        })
        setPreSettings({
            maxValue: 5,
            startValue: 0,
            incValue: 1,
        })
        localStorage.clear()
    }



    const changeSettingHandler = () => {
        changeSettings(preSettings.maxValue, preSettings.startValue, preSettings.incValue)
        setPlaceholder(false)
    }

    //error для дисплея
    const [error, setError] = useState(false)
    const [placeholder, setPlaceholder] = useState(false)

    // Функции изменения промежуточного стейта которые будут вызваны через onChange
    // из дочерних инпутов, которые находятся в компоненте <CounterSettingsWindow/>
    const changeMaxValue = (maxValue: number) => {
        setPreSettings({...preSettings, maxValue})
        if (Number.isNaN(maxValue) || maxValue <= 0 || maxValue <= preSettings.startValue) {
            setError(true)
        } else {
            setError(false)
        }
        setPlaceholder(true)

    }


    const changeStartValue = (startValue: number) => {
        setPreSettings({...preSettings, startValue})
        if (Number.isNaN(startValue) || startValue < 0 || startValue >= preSettings.maxValue) {
            setError(true)
        } else {
            setError(false)
        }

        setPlaceholder(true)
    }


    const changeIncValue = (incValue: number) => {
        setPreSettings({...preSettings, incValue})
        if (Number.isNaN(incValue) || incValue <= 0 || (preSettings.maxValue - preSettings.startValue) / incValue < 1) {
            setError(true)
        } else {
            setError(false)
        }
    }
    // --------------------------------------------


    return (
        <div className="App">
            <div className={"appWrap"}>

                {/*
                Исходя из type отправленного в <CounterWrapper/> отрисуется либо окно счётчика,
                либо окно его настроек. Принял такое решение, т.к.  внешне окна эдентичны
                и много общей логики

                Ой как я пожалел об этом решении, проще было сделать две разные компоненты,
                просто содержимое в дивы с одинаковыми классами запихать, а может и неплохое решение(много общей логики)


                */}
                <CounterWrapper
                    type={counterWindow.settings}
                    counterValue={counterValue}
                    settings={settings}
                    preSettings={preSettings}
                    changeSettings={changeSettings}
                    error={error}
                    placeholder={placeholder}
                    changeCounter={changeCounter}
                    resetCounter={resetCounter}
                    changeMaxValue={changeMaxValue}
                    changeStartValue={changeStartValue}
                    changeIncValue={changeIncValue}
                    changeSettingHandler={changeSettingHandler}
                    resetSettings={resetSettings}


                />
                <CounterWrapper
                    type={counterWindow.counter}
                    counterValue={counterValue}
                    settings={settings}
                    preSettings={preSettings}
                    changeSettings={changeSettings}
                    error={error}
                    placeholder={placeholder}
                    changeCounter={changeCounter}
                    resetCounter={resetCounter}
                    changeMaxValue={changeMaxValue}
                    changeStartValue={changeStartValue}
                    changeIncValue={changeIncValue}
                    changeSettingHandler={changeSettingHandler}
                    resetSettings={resetSettings}

                />
            </div>
        </div>
    );
}

export default App;
