import React, {useState} from 'react'
import SuperButton from '../hw04/common/c2-SuperButton/SuperButton'
import {restoreState} from '../hw06/localStorage/localStorage'
import s from './Clock.module.css'

function Clock() {
    const [timerId, setTimerId] = useState<number | undefined>(undefined)
    const [date, setDate] = useState<Date>(new Date(restoreState('hw9-date', Date.now())))
    const [show, setShow] = useState<boolean>(false)
    const [state, setButtons] = useState<boolean>(false)

    const start = () => {
        stop()
        const id: number = window.setInterval(() => {
            // setDate

            setDate(new Date())
        }, 1000)
        setTimerId(id)
        setButtons(!state)
    }


    const stop = () => {
        clearInterval(timerId)
        setButtons(!state)
    }

    const onMouseEnter = () => {
        setShow(true)
    }
    const onMouseLeave = () => {
        setShow(false)
    }

   let timeFormat = new Intl.DateTimeFormat("ru",{
       hour:"numeric",
       minute:"numeric",
       second:"numeric"
   });

    let dayFormat = new Intl.DateTimeFormat("en",{weekday:"long"});
    let dataFormat = new Intl.DateTimeFormat("ru");
    let monthFormat = new Intl.DateTimeFormat("en",{month:"long"});

    const stringTime = `${timeFormat.format(date)}`|| <br/>
    const stringDate = `${dataFormat.format(date)}` || <br/>

    const stringDay = `${dayFormat.format(date)}` || <br/>
    const stringMonth= `${monthFormat.format(date)}` || <br/>



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
                    disabled={state}
                    onClick={start}

                >
                    start
                </SuperButton>
                <SuperButton
                    id={'hw9-button-stop'}
                    disabled={!state}
                    onClick={stop}
                >
                    stop
                </SuperButton>
            </div>
        </div>
    )
}

export default Clock
