import React from 'react'
import api from '../services/axios';



export const useCart = () => {

     const addToCart = (id) => {
    console.log(id);
     api.post(`/cart`,{
       product_id:id,
       quantity:1
     })
     .then((res) =>{
      console.log(res);
      alert("Item Added to Cart")
      
     })
     .catch((err) =>{
      console.log(err);
      alert("Login pls")
     })
  }

  return {addToCart}
}
