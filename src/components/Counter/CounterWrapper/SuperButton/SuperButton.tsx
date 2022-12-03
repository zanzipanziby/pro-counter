import React from 'react';
import s from './SuperButton.module.css'


type SuperButtonPropsType = {
    title: string
    callback: () => void
    disabled: boolean
}

export const SuperButton = (props: SuperButtonPropsType) => {


    return (
        <div>
            <button
                disabled={props.disabled}
                className={s.supperButton}
                onClick={props.callback}
            >
                {props.title}
            </button>
        </div>
    );
};

