import styles from '@/styles/Home.module.css'
import { getSupabase } from '../utils/supabase'
import Link from 'next/link'
import Hero from '@/components/Hero'
import { useUser } from '@auth0/nextjs-auth0/client';
import { useState, useEffect } from 'react'

export default function Index() {
    const { user, error, isLoading } = useUser();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    return (
        <>
            <Hero/>
            <main className={`${styles.main} container`}>
                <h1 className={styles.title}>
                    Welcome to Post301
                </h1>
                <p className={styles.description}>
                    The postal redirection service that makes shipping cheaper than chips!
                </p>
                <h2 className={styles.subtitle}>
                    How it Works!
                </h2>
                <section className={styles.section}>
                    <div className={styles.sectionText}>
                        <h3>1. Signup</h3>
                        <p>Sign up for an account and fill out your details so that we can send you your shopping!</p>
                    </div>
                    <img className={styles.sectionImage} src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q"/>
                </section>
                <section className={styles.section}>
                    <div className={styles.sectionText}>
                        <h3>2. Shop</h3>
                        <p>Shop a wide range of products from our partners, don't worry about shipping prices ;)</p>
                    </div>
                    <img className={styles.sectionImage} src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"/>
                </section>
                <section className={styles.section}>
                    <div className={styles.sectionText}>
                        <h3>3. Save</h3>
                        <p>Enjoy ordering from an unlimited amount of retailers an unlimited number of times with no additional shipping fees!</p>
                    </div>
                    <img className={styles.sectionImage} src="https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"/>
                </section>
            </main>
        </>
    )
}