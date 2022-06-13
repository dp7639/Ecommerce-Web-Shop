import React, { useState, useEffect } from 'react';
import Layout from './../components/Layout';
import { collection, getDocs } from "firebase/firestore";
import fireDB from './../fireconfig';

function OrdersPage() {
    const [orders, setorders] = useState([])
    const [loading, setloading] = useState(false)
    const userid = JSON.parse(localStorage.getItem('currentUser')).user.uid
    useEffect(() => {
        getdata()
    }, []);

    async function getdata() {

        try {
            setloading(true)
            const result = await getDocs(collection(fireDB, "orders"))
            const ordersArray = []
            result.forEach((doc) => {
                ordersArray.push(doc.data());

            });
            console.log(ordersArray)
            setorders(ordersArray)
            setloading(false)

        } catch (error) {
            console.log(error)
            setloading(false)
        }


    }
    return (
        <Layout loading={loading}>
            <div className='p-2'>
            <h2 className='pb-3'>My Orders</h2>
                {orders.filter(obj => obj.userid === userid).map((order) => {
                    return (
                        <div>
                            <table className='table mt-3 order'>
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Price</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {order.cartItems.map((item) => {
                                        return (
                                            <tr>
                                                <td><img src={item.imageURL} width="80" height="80" alt="" /></td>
                                                <td>{item.name}</td>
                                                <td>{item.price} RS/-</td>

                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )
                })}
            </div>
        </Layout>
    );
}

export default OrdersPage;
