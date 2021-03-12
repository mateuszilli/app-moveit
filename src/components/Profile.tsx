import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/Profile.module.css'

export function Profile() {
    const { level } = useContext(ChallengesContext);
    return (
        <div className={styles.containerProfile}>
            <img src="https://github.com/mateuszilli.png" alt="Mateus Zilli Polli" />
            <div>
                <strong>Mateus Zilli Polli</strong>
                <p>
                    <img src="/icons/level.svg" alt="Level" />
                    Level {level}
                </p>
            </div>
        </div>
    )
}