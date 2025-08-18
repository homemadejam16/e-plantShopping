import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total =0;
    cart.forEach(element => {
        total += parseFloat(element.cost.substring(1)) * element.quantity;
        
    });
    return total;
  }

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping();
   
  };

    const handleCheckout = (e) => {
        e.preventDefault(); // Prevent default button behavior
        alert("Coming Soon");

    };




  const handleIncrement = (item) => {
    dispatch(updateQuantity({name: item.name, quantity: item.quantity+1}));
  };

  const handleDecrement = (item) => {
    if(item.quantity>0){
        dispatch(updateQuantity({name: item.name, quantity: item.quantity-1}));
    }
   
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    let cost = parseFloat(item.cost.substring(1)) * item.quantity;
    return cost;

  };

    const calculateTotalQuantity = () => {
        return cart ? cart.reduce((total, item) => total + item.quantity, 0) : 0;
    };

      // Render an empty cart message if the cart is empty
    if (!cart.length) {
        return <h2 className="cart-empty">Your cart is empty. Add some products!</h2>;
    }




  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={(e) => handleCheckout(e)}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


