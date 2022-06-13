import React, { useState, useEffect } from 'react';
import Layout from './../components/Layout';
import { useDispatch, useSelector } from 'react-redux'
import { getDoc, doc } from "firebase/firestore";
import fireDB from './../fireconfig';
import { useParams } from 'react-router-dom';

function ProductInfo() {

  const [product, setproduct] = useState()
  const { cartItems } = useSelector(state => state.cartReducer)
  const [loading, setloading] = useState(false)
  const dispatch = useDispatch()
  const params = useParams()

  useEffect(() => {
    getdata()
  }, []);

  async function getdata() {
    try {
      setloading(true)
      const productTemp = await getDoc(doc(fireDB, 'products', params.productid))
      setproduct(productTemp.data())
      setloading(false)

    } catch (error) {
      console.log(error)
      setloading(false)
    }


  }

  const addToCart = (product) => {

    dispatch({ type: 'ADD_TO_CART', payload: product })
  }
  useEffect(() => {

    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems])
  return (
    <Layout loading={loading}>

      <div className='container'>
        <div className='row justify-content-center'>

          <div className='col-md-8'>
            {product && (<div><h3><b>{product.name}</b></h3>
              <img src={product.imageURL} className='product-info-img' />
              <hr />
              <p>{product.description}</p>
              <div className='d-flex justify-content-end my-3'>
                <button onClick={() => { addToCart(product) }}>ADD TO CART</button>
              </div>
            </div>)}
          </div>
        </div>

      </div>
    </Layout>
  );
}

export default ProductInfo;
