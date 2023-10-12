import React, {useState, createContext, useEffect} from 'react';
//  create context
import PropTypes from 'prop-types'; // Import PropTypes
export const CartContext = createContext(); 

const CartProvider = ({children}) => {
  
  // cart state
  const [cart, setCart] = useState(() => {
    // Load the cart from localStorage on component initialization
    const initialCart = JSON.parse(localStorage.getItem('cart')) || [];
    return initialCart;
  });
   useEffect(() => {
    // Save the cart to localStorage whenever it changes
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  // items amount state
  const  [itemAmount , setItemAmount] = useState(0);
  // update amount cart
  useEffect(() => {
    if(cart) {
      const amount = cart.reduce((acamulator , currenItem) => {
        return acamulator + currenItem.amount
      }, 0);
      setItemAmount(amount);
    }
  },[cart]);
  // add to cart 
  const addToCart = (product, id) => {
    const newItem  = {...product , amount : 1}
    const cartItem = cart.find(item => {
      return item.id === id;
    });
    //  check cart 
    if (cartItem) {
      const newCart = [...cart].map(item => {
        if(item.id === id){
          return {...item , amount: cartItem.amount + 1}
        }
        else {
          return item;
        }
      });
      setCart(newCart)
    }else {
      setCart([...cart , newItem])
    }
  };
  // console.log(cart)

  // remove items cart
  const removeFromCart = (id) => {
    const newCart = cart.filter(item => {
      return item.id !== id;
    })
    setCart(newCart);
  };
  // plus amount items
  const plusAmountItems = (id) =>{
    const item = cart.find(item => item.id === id)
    addToCart(item , id)
  }
  // minus  amout items
  const minusAmountItems = (id) => {
    const cartItem = cart.find(item => {
      return item.id === id;
    });
    if(cartItem) {
      const newCart = cart.map(item => {
        if(item.id === id) {
          return {...item, amount: cartItem.amount - 1}
        }else {
          return item;
        }
      });
      setCart(newCart);
    }
      if(cartItem.amount < 2){
        removeFromCart(id);
      }
    
  }
  // deleteAll cart
  const deleteAllCart = () => {
    setCart([]);
  }
  //  total cart state
  const [total , setTotal] = useState(0);

  useEffect(() => {
    const total = cart.reduce((acamulator , currenItem) => {
      return acamulator + currenItem.price * currenItem.amount;   
    }, 0)
    setTotal(total);
  })
  return <CartContext.Provider value={{cart, addToCart, removeFromCart, deleteAllCart, plusAmountItems, minusAmountItems, itemAmount, setItemAmount, total}}>{children}</CartContext.Provider>;
};
CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default CartProvider;
