import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { collection, addDoc, getDocs, setDoc, doc, deleteDoc } from "firebase/firestore";
import fireDB from './../fireconfig';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Modal, Tab, Tabs } from 'react-bootstrap';
import { toast } from 'react-toastify';

function AdminPage() {
    const [products, setproducts] = useState([])
    const [loading, setloading] = useState(false)
    const [product, setproduct] = useState({
        name: "",
        price: 0,
        imageURL: "",
        category: ""
    })
    const [orders, setorders] = useState([])

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [add, setadd] = useState(false)
    useEffect(() => {
        getdata()
    }, []);

    async function getdata() {

        try {
            setloading(true)
            const productsData = await getDocs(collection(fireDB, "products"))
            const productsArray = []
            productsData.forEach((doc) => {

                const obj = {
                    id: doc.id,
                    ...doc.data()
                }
                productsArray.push(obj)

            });
            setproducts(productsArray)
            setloading(false)

        } catch (error) {
            console.log(error)
            setloading(false)
        }


    }
    useEffect(() => {
        getOrdersdata()
    }, []);

    async function getOrdersdata() {

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
    const editHandler = (item) => {
        setproduct(item);
        setShow(true);
    };
    const updateProduct = async () => {

        try {
            setloading(true)
            await setDoc(doc(fireDB, "products", product.id), product)
            handleClose()
            toast.success('Product updated successfully')
            window.location.reload()

        } catch (error) {
            toast.error('Product update failed')
            setloading(false)
        }

    }
    const addProduct = async () => {

        try {
            setloading(true)
            await addDoc(collection(fireDB, "products"), product)
            handleClose()
            toast.success('Product added successfully')
            window.location.reload()

        } catch (error) {
            toast.error('Product add failed')
            setloading(false)
        }

    }

    const addHandler = () => {
        setadd(true)
        handleShow()

    }

    const deleteProduct = async (item) => {
        try {
            setloading(true)
            await deleteDoc(doc(fireDB, "products", item.id));
            toast.success('Product deleted successfully')
            getdata()
            setloading(false)
        } catch (error) {
            toast.error('Product delete failed')
            setloading(false)
        }

    }
    return (
        <Layout loading={loading}>

            <Tabs defaultActiveKey="products" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="products" title="Products">
                    <div className='d-flex justify-content-between'>
                        <h3 className='mx-2'>Products List</h3>
                        <button className='mx-2' onClick={addHandler}>ADD PRODUCT</button>
                    </div>
                    <table className='table mt-3'>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((item) => {
                                return (
                                    <tr>
                                        <td><img src={item.imageURL} width="80" height="80" alt="" /></td>
                                        <td>{item.name}</td>
                                        <td>{item.category}</td>
                                        <td>{item.price} RS/-</td>
                                        <td><FaTrash className='mx-3 icn' color="red" size={20} onClick={() => { deleteProduct(item) }} />
                                            <FaEdit className='icn' onClick={() => { editHandler(item) }} color="blue" size={20} />
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>{add === true ? 'Add a product' : 'Edit Product'}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {" "}
                            <div className="register-form">
                                <input type="text" className="form-control" placeholder="name"
                                    value={product.name} onChange={(e) => { setproduct({ ...product, name: e.target.value }) }} />
                                <input type="text" className="form-control" placeholder="imageURL"
                                    value={product.imageURL} onChange={(e) => { setproduct({ ...product, imageURL: e.target.value }) }} />
                                <input type="text" className="form-control" placeholder="price"
                                    value={product.price} onChange={(e) => { setproduct({ ...product, price: e.target.value }) }} />
                                <input type="text" className="form-control" placeholder="category"
                                    value={product.category} onChange={(e) => { setproduct({ ...product, category: e.target.value }) }} />


                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <button onClick={handleClose}>
                                Close
                            </button>
                            {add ? (<button onClick={addProduct}>Save</button>) : (<button onClick={updateProduct}>Save</button>)}
                        </Modal.Footer>
                    </Modal>
                </Tab>
                <Tab eventKey="orders" title="Orders">
                    <h3 className='mx-2'>Orders List</h3>
                    {orders.map((order) => {
                        return (
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
                        )
                    })}
                </Tab>

            </Tabs>


        </Layout>

    );
}

export default AdminPage;
