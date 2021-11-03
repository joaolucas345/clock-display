import React, { useContext } from 'react'
import { WiWindy, FaTemperatureHigh } from 'react-icons/all'
import { info } from '../../../Contexts/Info'
import style from './style.module.scss'

function WeatherTab() {

    const { weather } = useContext(info)

    return (
        <div className={style.tabOuter}>
            <div className={style.tabInside}>
                <div className={style.div}>
                    <WiWindy  />
                    <p>{weather.wind}</p>
                </div>
                <div className={style.div}>
                    <FaTemperatureHigh  />
                    <p>{weather.temperature?.substring(1)}</p>
                </div>
                <div className={style.div}>
                    <p>{weather.description}</p>
                </div>
            </div>
        </div>
    )
}

export default WeatherTab
