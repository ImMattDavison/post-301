import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0/client";
import styles from '@/styles/Dashboard.module.css'
import { getSupabase } from '../utils/supabase'
import { useState, useEffect } from 'react'


const Dashboard = ({ subStatus, customers }) => {

    const { user, error, isLoading } = useUser();
    console.log(user)

    console.log(customers)

    const subDayPass = async () => {
        if(subStatus.length !== 0 && subStatus[0].is_subscribed == true) return(
            alert('You are already subscribed')
        )
    
        const supabase = getSupabase(user.accessToken)

        subStatus[0] && subStatus[0].is_subscribed == false ? (
            await supabase.from('is_subscribed').update([
                { is_subscribed: true }
            ]).eq('user_id', user.sub)
        ) : (
            await supabase.from('is_subscribed').insert([
                { 
                    user_id: user.sub, 
                    is_subscribed: true 
                }
        ]))

        window.location.reload()
    }

    const [address, setAddress] = useState({
        lineone: customers[0] ? customers[0].address.lineone : '',
        linetwo: customers[0] ? customers[0].address.linetwo : '',
        city: customers[0] ? customers[0].address.city : '',
        county: customers[0] ? customers[0].address.county : '',
        postcode: customers[0] ? customers[0].address.postcode : ''
    })

    const handleAddressChange = async (e) => {
        const { name, value } = e.target
        setAddress({ ...address, [name]: value })
    }

    const handleAddressSubmit = async (e) => {
        e.preventDefault()

        console.log('triggered')

        const supabase = getSupabase(user.accessToken)

        customers[0] ? (
            await supabase.from('customers').update([
                {
                    address: address
                }
            ]).eq('user_id', user.sub)
        ) : (
            await supabase.from('customers').insert([
                {
                    user_id: user.sub,
                    address: address,
                    card: {
                        cardNumber: '',
                        expiryDate: '',
                        cvv: ''
                    }
                }
            ])
        )
        alert('Address Updated')
    }

    const [card, setCard] = useState({
        cardNumber: customers[0] ? customers[0].card.cardNumber : '',
        expiryDate: customers[0] ? customers[0].card.expiryDate : '',
        cvv: customers[0] ? customers[0].card.cvv : ''
    })

    const handleCardChange = async (e) => {
        const { name, value } = e.target
        setCard({ ...card, [name]: value })
    }

    const handleCardSubmit = async (e) => {
        e.preventDefault()

        const supabase = getSupabase(user.accessToken)

        customers[0] ? (
            await supabase.from('customers').update([
                {
                    card: {
                        cardNumber: card.cardNumber,
                        expiryDate: card.expiryDate,
                        cvv: card.cvv
                    }
                }
            ]).eq('user_id', user.sub)
        ) : (
            await supabase.from('customers').insert([
                {
                    user_id: user.sub,
                    address: address,
                    card: {
                        cardNumber: card.cardNumber,
                        expiryDate: card.expiryDate,
                        cvv: card.cvv
                    }
                }
            ]))
        alert('Card Updated')
    }

        

    return (
        <main className={`${styles.main} container`}>
            {subStatus.length == 0 || subStatus[0].is_subscribed == false ? (
                <div className={styles.subStatus}>
                    <div>
                        <h1 className={styles.subStatusTitle}>You are not subscribed</h1>
                        <p className={styles.subStatusExplain}>You can purchase a day shipping pass here, or one will be added with your first purchase of the day.</p>
                    </div>
                    <div>
                        <button onClick={subDayPass} className={styles.subStatusButton}>Subscribe</button>
                    </div>
                </div>
            ) : (
                <div className={styles.subStatus}>
                    <div>
                        <h1 className={styles.subStatusTitle}>You are subscribed</h1>
                        <p className={styles.subStatusExplain}>You have access to a day shipping pass, all orders placed before 11pm GMT will be processed with this shipping pass.</p>
                    </div>
                </div>
            )}
            <section className={styles.customerDetails}>
                <div className={styles.customerDetailsManager}>
                    <h2 className={styles.customerDetailsTitle}>Your Details</h2>
                    <form>
                        <h3>Address</h3>
                        <label
                            htmlFor="lineone"
                        >
                            Address Line 1
                        </label>
                        <input
                            type="text"
                            name="lineone"
                            id="addressLine1"
                            value={address.lineone}
                            onChange={handleAddressChange}
                            required
                        >
                        </input>
                        <label
                            htmlFor="linetwo"
                        >
                            Address Line 2
                        </label>
                        <input
                            type="text"
                            name="linetwo"
                            id="linetwo"
                            value={address.linetwo}
                            onChange={handleAddressChange}
                        >
                        </input>
                        <label
                            htmlFor="city"
                        >
                            City
                        </label>
                        <input
                            type="text"
                            name="city"
                            id="city"
                            value={address.city}
                            onChange={handleAddressChange}
                            required
                        >
                        </input>
                        <label
                            htmlFor="county"
                        >
                            County
                        </label>
                        <input
                            type="text"
                            name="county"
                            id="county"
                            value={address.county}
                            onChange={handleAddressChange}
                            required
                        >
                        </input>
                        <label
                            htmlFor="postcode"
                        >
                            Postcode
                        </label>
                        <input
                            type="text"
                            name="postcode"
                            id="postcode"
                            value={address.postcode}
                            onChange={handleAddressChange}
                            required
                        >
                        </input>
                        <button type='submit' className={styles.detailsUpdateButton} onClick={handleAddressSubmit}>Update Address</button>
                    </form>
                    <form>
                        <h3>Payment</h3>
                        <label
                            htmlFor="cardNumber"
                        >
                            Card Number
                        </label>
                        <input
                            type="text"
                            name="cardNumber"
                            id="cardNumber"
                            value={card.cardNumber}
                            minLength="16"
                            maxLength="16"
                            required
                            onChange={handleCardChange}
                        >
                        </input>
                        <label
                            htmlFor="expiryDate"
                        >
                            Expiry Date
                        </label>
                        <input
                            type="text"
                            name="expiryDate"
                            id="expiryDate"
                            value = {card.expiry}
                            required
                            onChange={handleCardChange}
                        >
                        </input>
                        <label
                            htmlFor="cvv"
                        >
                            CVV
                        </label>
                        <input
                            type="text"
                            name="cvv"
                            id="cvv"
                            value = {card.cvv}
                            required
                            onChange={handleCardChange}
                        >
                        </input>
                        <button type='submit' onClick={handleCardSubmit} className={styles.detailsUpdateButton}>Update Payment</button>
                    </form>
                </div>
            </section>
        </main>
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

export default Dashboard;