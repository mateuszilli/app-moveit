import { createContext, useState, ReactNode, useEffect } from 'react';
import cookies from 'js-cookie';
import challenges from './challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children, ...indexProps }: ChallengesProviderProps) {
    const [level, setLevel] = useState(indexProps.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(indexProps.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(indexProps.challengesCompleted ?? 0);
    const [activeChallenge, setActiveChallenge] = useState(null);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    function levelUp() {
        setLevel(level + 1);
        setIsLevelUpModalOpen(true);
    }

    function closeLevelUpModal() {
        setIsLevelUpModalOpen(false);
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];
        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play();

        if (Notification.permission === 'granted') {
            new Notification('New challenge 🎉', {
                body: `Win ${challenge.amount} xp!`
            })
        }
    }

    function failChallenge() {
        setActiveChallenge(null);
    }

    function successChallenge() {
        if (!activeChallenge) {
            return;
        }

        const { amount } = activeChallenge;
        let finalExperience = currentExperience + amount;

        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }

    useEffect(() => {
        cookies.set('level', String(level));
        cookies.set('currentExperience', String(currentExperience));
        cookies.set('challengesCompleted', String(challengesCompleted));
    }, [level, currentExperience, challengesCompleted]);

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    return (
        <ChallengesContext.Provider 
            value={{ 
                level, 
                currentExperience,
                experienceToNextLevel,
                challengesCompleted,
                activeChallenge,
                levelUp,
                startNewChallenge,
                failChallenge,
                successChallenge,
                closeLevelUpModal
            }}>
            {children}

            { isLevelUpModalOpen && <LevelUpModal/> }
        </ChallengesContext.Provider>
    )
}

interface ChallengesProviderProps {
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number
}

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number;
    currentExperience: number;
    experienceToNextLevel: number;
    challengesCompleted: number;
    activeChallenge: Challenge;
    levelUp: () => void;
    startNewChallenge: () => void;
    failChallenge: () => void;
    successChallenge: () => void;
    closeLevelUpModal: () => void;
}