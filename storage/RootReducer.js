/* const initialState={
   cart:{}
}
function RootReducer(state=initialState,action)
{
  switch(action.type)
  {
  case "ADD_CART":
      const newCart = {
        ...state.cart,
        [action.payload[0]]: action.payload[1]
      }
      console.log("CART:", newCart)
      return { cart: newCart }
  case "DELETE_CART":
      const { [action.payload[0]]: removed, ...remainingCart } = state.cart
      console.log("CART:", remainingCart)
      return { cart: remainingCart }
  default:
    return state
  }
}

export default RootReducer
 */

const initailState={
   cart:{},
   user:{}
}
function RootReducer(state=initailState,action)
{  
  switch(action.type)
  {
  case "ADD_CART":
      state.cart[action.payload[0]]=action.payload[1]
      console.log("CART:",state.cart)
      return {cart:state.cart}
  case "DELETE_CART":
      delete state.cart[action.payload[0]]
      console.log("CART:",state.cart)
      return {cart:state.cart}    
  default:
    return {cart:state.cart}
  }
}

export default RootReducer