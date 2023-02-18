import styles from '../styles/Home.module.css'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { getSupabase } from '../utils/supabase'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const Index = ({ user, error, isLoading }) => {
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    return(
        <>
            {user ? console.log(user) : console.log('no user')}
        </>
    )
}

export const getServerSideProps = withPageAuthRequired()

export default Index