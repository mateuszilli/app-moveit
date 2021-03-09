
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox() {
    const hasChallenge = true;

    return (
        <div className={styles.containerChallengeBox}>
            { hasChallenge ? (
                <div className={styles.challengeBoxActive}>
                    <header>Get 400 xp</header>
                    <main>
                        <img src="icons/body.svg"/>
                        <strong>New challenge</strong>
                        <p>Get up and take a three minutes walk</p>
                    </main>
                    <footer>
                        <button 
                            type="button" 
                            className={styles.buttonChallengeBoxFail}>
                            Fail
                        </button>
                        <button 
                            type="button" 
                            className={styles.buttonChallengeBoxSuccess}>
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