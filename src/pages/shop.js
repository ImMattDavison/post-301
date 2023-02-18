import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { getSupabase } from "../utils/supabase";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useState, useEffect } from "react";
import styles from "@/styles/Shop.module.css";

const Shop = ({ subStatus, customers }) => {

    if(!customers[0]){
        return(
            <div className={`${styles.noCustomer} container`}>
                <h1>You must supply an address and payment method to shop with Post301</h1>
                <Link className={styles.button} href="/dashboard">
                    Add address and payment method
                </Link>
            </div>
        )
    }

    return (
        <>
        
        </>
    )
}

export const getServerSideProps = withPageAuthRequired(({
    async getServerSideProps({ req, res }) { 

        const {
            user: { accessToken },
          } = await getSession(req, res)
      
          const supabase = getSupabase(accessToken)
      
          const { data: subStatus } = await supabase.from('is_subscribed').select('*')
          const { data: customers } = await supabase.from('customers').select('*')

        return {
            props: { 
                subStatus, 
                customers 
            },
        }
    },
}))

export default Shop;