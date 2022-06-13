import React, { useEffect, useState } from 'react';
import Layout from './../components/Layout';
import { useSelector, useDispatch } from 'react-redux';
import { cartReducer } from './../redux/cartReducer';
import { FaTrash } from 'react-icons/fa';
import { Modal } from 'react-bootstrap';
import { addDoc, collection } from 'firebase/firestore';
import fireDB from './../fireconfig';
import { toast } from 'react-toastify';
function CartPage() {
  const { cartItems } = useSelector(state => state.cartReducer)
  const [TotalAmount, setTotalAmount] = useState(0)
  const dispatch = useDispatch()
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setname] = useState('')
  const [address, setaddress] = useState('')
  const [pincode, setpincode] = useState('')
  const [phonenumber, setphonenumber] = useState('')
  const [loading, setloading] = useState(false)


  useEffect(() => {

    let temp = 0;
    cartItems.forEach((cartItem) => {
      temp = Number(temp) + Number(cartItem.price)

    })
    setTotalAmount(temp)
  }, [cartItems])
  useEffect(() => {

    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems])

  const deletefromcart = (item) => {

    dispatch({ type: 'DELETE_FROM_CART', payload: item })
  }
  const placeOrder = async () => {
    const addressInfo = {
      name,
      address,
      pincode,
      phonenumber
    }
    console.log(addressInfo)

    const orderInfo = {
      cartItems,
      addressInfo,
      email: JSON.parse(localStorage.getItem("currentUser")).user.email,
      userid: JSON.parse(localStorage.getItem("currentUser")).user.uid
    }
    try {
      setloading(true)
      const result = await addDoc(collection(fireDB, "orders"), orderInfo)
      setloading(false)
      toast.success('Order placed successfully')
      handleClose()

    } catch (error) {
      setloading(false)
      toast.error('Order failed')
    }
  }

  return (
    <Layout loading={loading}>
      <div className='container-fluid'>
        <div className='row justify-content-center'>
          <div className='col-md-12'>
            <table className='table mt-3'>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => {
                  return (
                    <tr>
                      <td><img src={item.imageURL} width="80" height="80" /></td>
                      <td>{item.name}</td>
                      <td>{item.price} RS/-</td>
                      <td><FaTrash onClick={() => deletefromcart(item)} /></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div className='d-flex justify-content-end'>
              <h1 className='total-amount'>Total Amount = {TotalAmount} RS/-</h1>
            </div>
            <div className='d-flex justify-content-end mt-3'>
              <button onClick={handleShow}>PLACE ORDER</button>
            </div>
          </div>
        </div>

      </div>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add your address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="register-form">
            <input type="text" className="form-control" placeholder="name"
              value={name} onChange={(e) => { setname(e.target.value) }} required />
            <textarea type="text" className="form-control" placeholder="address"
              value={address} onChange={(e) => { setaddress(e.target.value) }} required />
            <input type="number" className="form-control" placeholder="pincode"
              value={pincode} onChange={(e) => { setpincode(e.target.value) }} required />
            <input type="number" className="form-control" placeholder="phonenumber"
              value={phonenumber} onChange={(e) => { setphonenumber(e.target.value) }} required />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>
            Close
          </button>
          <button onClick={placeOrder}>
            ORDER
          </button>
        </Modal.Footer>
      </Modal>

    </Layout>
  );
}

export default CartPage;
