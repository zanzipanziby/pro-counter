import React, {ChangeEvent, useEffect, useState} from 'react';


type InputPropsType = {
    value: number
    error: boolean
    callback: (value: number) => void
}

export const Input = (props: InputPropsType) => {




    const [style, setStyle] = useState({
        backgroundColor: "white",
        width: "10em"

    })
    const [click, setClick] = useState<boolean>(false)

    useEffect(()=> {
        props.error
            ? setStyle({backgroundColor: "red", width: "10em"})
            : setStyle({backgroundColor: "white", width: "10em"})
    }, [click])


    //сетаем в локальный стейт click противоположное значение для отрабатывания useEffect
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.callback(parseInt(e.currentTarget.value))
        setClick(!click)
    }


    return (
        <input style={style} value={props.value.toString()} type="number" onChange={onChangeHandler}/>
    );
};

