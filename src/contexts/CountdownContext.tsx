import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { ChallengesContext } from './ChallengesContext';

export const CountdownContext = createContext({} as CountdownContextData);

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }: CountdownProviderProps) {
    const { startNewChallenge } = useContext(ChallengesContext);

    const [time, setTime] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [isDone, setIsDone] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function startCountdown() {
        setIsActive(true);
    }

    function stopCountdown() {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setIsDone(false);
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
        <CountdownContext.Provider 
            value={{
                minutes,
                seconds,
                isActive,
                isDone,
                startCountdown,
                stopCountdown
            }}>
            {children}
        </CountdownContext.Provider>
    )
}
interface CountdownProviderProps {
    children: ReactNode;
}

interface CountdownContextData {
    minutes: number;
    seconds: number;
    isActive: boolean;
    isDone: boolean;
    startCountdown: () => void;
    stopCountdown: () => void;
}