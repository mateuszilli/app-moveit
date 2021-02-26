import styles from '../styles/components/Profile.module.css'

export function Profile() {
    return (
        <div className={styles.containerProfile}>
            <img src="https://github.com/mateuszilli.png" alt="Mateus Zilli Polli" />
            <div>
                <strong>Mateus Zilli Polli</strong>
                <p>
                    <img src="icons/level.svg" alt="Level" />
                    Level 1
                </p>
            </div>
        </div>
    )
}