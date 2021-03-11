
import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';

import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox() {
    const { activeChallenge, failChallenge, successChallenge } = useContext(ChallengesContext);
    const { stopCountdown } = useContext(CountdownContext);

    function handleChallengeFail() {
        failChallenge();
        stopCountdown();
    }

    function handleChallengeSuccess() {
        successChallenge();
        stopCountdown();
    }

    return (
        <div className={styles.containerChallengeBox}>
            { activeChallenge ? (
                <div className={styles.challengeBoxActive}>
                    <header>Get {activeChallenge.amount} xp</header>
                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`}/>
                        <strong>New challenge</strong>
                        <p>{activeChallenge.description}</p>
                    </main>
                    <footer>
                        <button 
                            type="button" 
                            className={styles.buttonChallengeBoxFail}
                            onClick={handleChallengeFail}>
                            Fail
                        </button>
                        <button
                            type="button" 
                            className={styles.buttonChallengeBoxSuccess}
                            onClick={handleChallengeSuccess}>
                            Success
                        </button>
                    </footer>
                </div>
            ) : (
                <div className={styles.challengeBoxNotActive}>
                    <strong>Complete a cycle to receive a challenge</strong>
                    <p>
                        <img src="icons/level-up.svg" alt="Level up"/>
                        Level up by completing challenges
                    </p>
                </div>
            ) }
        </div>
    )
}