import { useState, useEffect, useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';

import styles from '../styles/components/Countdown.module.css';

let countdownTimeout: NodeJS.Timeout;

export function Countdown() {
    const { startNewChallenge } = useContext(ChallengesContext);

    const [time, setTime] = useState(0.05 * 60);
    const [isActive, setIsActive] = useState(false);
    const [isDone, setIsDone] = useState(false);


    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    function startCountdown() {
        setIsActive(true);
    }

    function stopCountdown() {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setTime(0.05 * 60);
    }

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000)
        } else if (isActive && time === 0) {
            setIsDone(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time])

    return (
        <div>
            <div className={styles.containerCountdown}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            { isDone ? (
                <button 
                    disabled
                    className={styles.buttonCountdown}>
                    Cycle done
                </button>
            ) : (
                <>
                    { isActive ? (
                        <button 
                            type="button" 
                            className={`${styles.buttonCountdown} ${styles.buttonCountdownActive}`}
                            onClick={stopCountdown}>
                            Stop the cycle
                        </button>
                    ) : (
                        <button 
                            type="button" 
                            className={styles.buttonCountdown}
                            onClick={startCountdown}>
                            Start the cycle
                        </button>
                    ) }
                </>
            ) }
        </div>
    )
}