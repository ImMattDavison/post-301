import styles from '../styles/Home.module.css'
import { getSupabase } from '../utils/supabase'
import Link from 'next/link'
import { useUser } from '@auth0/nextjs-auth0/client';
import { useState, useEffect } from 'react'

export default function Index() {
    const { user, error, isLoading } = useUser();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    if (user) {
        return (
        <div>
            Welcome {user.name}! <a href="/api/auth/logout">Logout</a>
        </div>
        );
    }

    return <a href="/api/auth/login">Login</a>;
}