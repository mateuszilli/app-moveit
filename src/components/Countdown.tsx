import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';

import styles from '../styles/components/Countdown.module.css';

export function Countdown() {
    const { 
        minutes, 
        seconds, 
        isActive, 
        isDone, 
        startCountdown, 
        stopCountdown 
    } = useContext(CountdownContext);

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

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