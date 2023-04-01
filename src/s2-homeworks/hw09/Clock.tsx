import React, {useState} from 'react'
import SuperButton from '../hw04/common/c2-SuperButton/SuperButton'
import {restoreState} from '../hw06/localStorage/localStorage'
import s from './Clock.module.css'

function Clock() {
    const [timerId, setTimerId] = useState<number | undefined>(undefined)
    const [date, setDate] = useState<Date>(new Date(restoreState('hw9-date', Date.now())))
    const [show, setShow] = useState<boolean>(false)
    const [stateButtons, setStateButtons] = useState<boolean>(false)

    const start = () => {
        stop()
        const id: number = window.setInterval(() => {
            // setDate

            setDate(new Date())
        }, 1000)
        setTimerId(id)
        setStateButtons(!stateButtons)
    }


    const stop = () => {
        clearInterval(timerId)
        setStateButtons(!stateButtons)
    }

    const onMouseEnter = () => {
        setShow(true)
    }
    const onMouseLeave = () => {
        setShow(false)
    }

    const hours = (date.getHours() < 10) ? "0" + date.getHours() : date.getHours()
    const minutes = (date.getMinutes() < 10) ? "0" + date.getMinutes() : date.getMinutes()
    const seconds = (date.getSeconds() < 10) ? "0" + date.getSeconds() : date.getSeconds()

    const stringTime = (hours + ":" + minutes + ":" + seconds)
    const stringDate = (new Date().toLocaleDateString())


    let formatterWeekday = new Intl.DateTimeFormat("en", {
        weekday: "long"
    });
    let formatterMonth = new Intl.DateTimeFormat("en", {
        month: "long",
    });

    const stringDay = formatterWeekday.format(date) || <br/> // пишут студенты
    const stringMonth = formatterMonth.format(date) || <br/> // пишут студенты

    return (
        <div className={s.clock}>
            <div
                id={'hw9-watch'}
                className={s.watch}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <span id={'hw9-day'}>{stringDay}</span>,{' '}
                <span id={'hw9-time'}>
                    <strong>{stringTime}</strong>
                </span>
            </div>

            <div id={'hw9-more'}>
                <div className={s.more}>
                    {show ? (
                        <>
                            <span id={'hw9-month'}>{stringMonth}</span>,{' '}
                            <span id={'hw9-date'}>{stringDate}</span>
                        </>
                    ) : (
                        <>
                            <br/>
                        </>
                    )}
                </div>
            </div>

            <div className={s.buttonsContainer}>
                <SuperButton
                    id={'hw9-button-start'}
                    disabled={stateButtons}
                    onClick={start}

                >
                    start
                </SuperButton>
                <SuperButton
                    id={'hw9-button-stop'}
                    disabled={stateButtons}
                    onClick={stop}
                >
                    stop
                </SuperButton>
            </div>
        </div>
    )
}

export default Clock
