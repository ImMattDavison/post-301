import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { getSupabase } from "../utils/supabase";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useState, useEffect } from "react";
import styles from "@/styles/Shop.module.css";
import products from "../../public/products.json";

const Shop = ({ subStatus, customers }) => {

    const { user, error, isLoading } = useUser();

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

    const [ordered, setOrdered] = useState([])

    useEffect(() => {
        setOrdered(customers[0].ordered ? customers[0].ordered : [])
    }, [])

    const placeOrder = (productId) => {

        return async () => {

            const newOrder = ( 
                {
                    id: productId.id,
                    name: productId.name,
                    price: productId.price,
                    image: productId.image,
                    description: productId.description,
                    price: productId.price,
                    status: 'pending',
                    date: new Date().toDateString(),
                    ordnum: Math.floor(Date.now() / 1000)
                }
            )

            console.log(ordered)

            ordered.push(newOrder)

            console.log(ordered)

            const supabase = getSupabase(user.accessToken);

            if(subStatus.length == 0 || subStatus[0].is_subscribed == false){
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
            }

            const { data, error } = await supabase
                .from('customers')
                .update({
                    ordered: ordered
                }).eq('user_id', user.sub)

            window.location.reload()
        }
    }

    return (
        <>
            <div className={`${styles.shop} container`}>
                <h1>Shop</h1>
                <div>
                    <h2>Top Picks at IKEA</h2>
                    <div className={styles.products}>
                        {products.slice(0,3).map((product) => (
                            <div className={styles.product}>
                                <img src={product.image} alt={product.name} />
                                <span className={styles.price}>
                                    <h3>{product.name}</h3>
                                    <p>£{product.price}</p>
                                </span>
                                <p>{product.description}</p>
                                <button className={styles.orderButton} onClick={placeOrder(product)}>ORDER</button>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h2>Top Picks at Nike</h2>
                    <div className={styles.products}>
                        {products.slice(3,6).map((product) => (
                            <div className={styles.product}>
                                <img src={product.image} alt={product.name} />
                                <span className={styles.price}>
                                    <h3>{product.name}</h3>
                                    <p>£{product.price}</p>
                                </span>
                                <p>{product.description}</p>
                                <button className={styles.orderButton} onClick={placeOrder(product)}>ORDER</button>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h2>Top Picks at Tesco</h2>
                    <div className={styles.products}>
                        {products.slice(6,9).map((product) => (
                            <div className={styles.product}>
                                <img src={product.image} alt={product.name} />
                                <span className={styles.price}>
                                    <h3>{product.name}</h3>
                                    <p>£{product.price}</p>
                                </span>
                                <p>{product.description}</p>
                                <button className={styles.orderButton} onClick={placeOrder(product)}>ORDER</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
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