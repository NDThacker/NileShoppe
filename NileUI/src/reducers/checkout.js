import { ADD_CART_PRODDETAILS } from '../actions';

export function cardProDetailsReducer(state = { cartDetails: [], grandTotal: 0 }, action) {
    switch (action.type) {
        case ADD_CART_PRODDETAILS:
            let totalSum = 0;
            let dcount = 0;
            let prods = action.prodData.map((product, key) => {
                dcount = 0  
                
                if(product.discount) dcount = product.discount;
                totalSum += product.price * action.cartData[key].count * (1 - (dcount/100))

                return { ...product, costInOrder: product.price * action.cartData[key].count * (1 - (dcount/100)), count: action.cartData[key].count }
            });
            return {
                cartDetails: prods,
                grandTotal: totalSum
            };
        default:
            return state
    }
}
