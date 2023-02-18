import { useUser } from '@auth0/nextjs-auth0/client';
import styles from '@/styles/components/Hero.module.css'

export default function Hero() {
    const { user, error, isLoading } = useUser();

    return(
        <section className={styles.hero}>
            <div className={`${styles.heroContent} container`}>
                <h1 className={styles.heroTitle}>Shop all the brands you love with one flat postage fee.</h1>
                <div>
                    {user ? (
                        <a href="/api/auth/logout" className={styles.heroButton}>To the Dashboard</a>
                    ) : (
                        <a href="/api/auth/login" className={styles.heroButton}>Get Started</a>
                    )}
                </div>
            </div>
        </section>
    )
}
