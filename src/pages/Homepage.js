import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { collection, getDocs } from "firebase/firestore";
import fireDB from './../fireconfig';
import { useNavigate } from 'react-router-dom'
// import { ecommerceproducts } from './../ecommerce-products';
// import { async } from '@firebase/util';
import { useDispatch, useSelector } from 'react-redux'
// import { cartReducer } from './../redux/cartReducer';
function Homepage() {

  const [products, setproducts] = useState([])
  const { cartItems } = useSelector(state => state.cartReducer)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setloading] = useState(false)
  const [searchKey, setsearchKey] = useState('')
  const [filterType, setfilterType] = useState('')

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

    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product) => {

    dispatch({ type: 'ADD_TO_CART', payload: product })
  }

  return (
    <Layout loading={loading}>

      <div className='container'>
        <div className='d-flex w-50 my-3'>
          <input type="text" className='form-control mx-2 mt-3' placeholder='search items' value={searchKey}
            onChange={(e) => { setsearchKey(e.target.value) }} />
          <select className='form-control mt-3' value={filterType}
            onChange={(e) => { setfilterType(e.target.value) }}>
            <option value="">All</option>
            <option value="electronics">Electronics</option>
            <option value="mobiles">Mobiles</option>
            <option value="fashion">Fashion</option>
          </select>
        </div>
        <div className='row'>

          {products.filter(obj => obj.name.toLowerCase().includes(searchKey))
            .filter(obj => obj.category.toLowerCase().includes(filterType))
            .map((product) => {

              return (
                <div className='col-md-4'>

                  <div className='m-2 p-2 product position-relative'>
                    <div className='product-content'>
                      <p>{product.name}</p>
                      <div className='text-center'>
                        <img src={product.imageURL} className='product-img' alt="" />
                      </div>
                    </div>
                    <div className='product-actions'>
                      <h2>{product.price} RS/-</h2>
                      <div className='d-flex'>
                        <button className='mx-2' onClick={() => { addToCart(product) }}>ADD TO CART</button>
                        <button onClick={() => { navigate(`/productinfo/${product.id}`) }}>VIEW</button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      </div>

    </Layout>


  );
}

export default Homepage;
