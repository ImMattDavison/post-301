import styles from '../styles/Home.module.css'
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
            <main className={styles.main}>

            </main>
        </>
    )
}