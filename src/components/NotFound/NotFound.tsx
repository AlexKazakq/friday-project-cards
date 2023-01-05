import React from "react";
import s from './NotFound.module.scss'
import error404 from '../../assets/images/404.svg'

export const NotFound = () => {

    return (
        <div className={s.block}>
            <div className={s.img}>
                <img src={error404}/>
            </div>
        </div>
    );
};
