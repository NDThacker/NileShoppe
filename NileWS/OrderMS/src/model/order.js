// Import necessary modules
const dbModel = require( '../utilities/connection' );

const orderDb = {};

//Fetch the order details based on customer Id
orderDb.getOrderByCustomerId = ( customerId ) => {
	return dbModel.getOrderCollection().then( ( model ) => {
		return model.find( { customerId: customerId } ).then( data => {
			if( data.length ) {
				return data;
			}
			else{
				return null;
			}
		} )
	} )
}

//Add cart for a new customer

orderDb.addCart = ( cid ) => {
	return dbModel.getCartCollection().then( model => {
		
		return model.create( { _id: cid, prod: [] } ).then( cdata => {
			
			if( Object.entries( cdata ).length ) {
				return[];
			}
			else{
				return null;
			}
		} )
	} )
}


//Fetch the cart details based on customer Id
orderDb.getCartByCustomerId = ( customerId ) => {
	return dbModel.getCartCollection().then( ( model ) => {
		return model.findOne( { _id: customerId } ).then( data => {
			
			if( data ) {
				return data;
			}
			else{
				return orderDb.addCart( customerId ).then( cdata => {
					if( cdata ) return {prod: []};
					else return null;
				} )
			}
		} )
	} )
}

//replace whole cart
orderDb.updateCartDoc = ( cartobj ) => {
	return dbModel.getCartCollection().then( model => {
		
		return model.replaceOne( { _id: cartobj._id }, cartobj ).then( status => {
			
			if( status.n === 1 ) {
				return true;
			}
			else{
				return false;
			}
		} )
	} )
}

//delete a cart doc
orderDb.removeCartDoc = ( cid ) => {
	return dbModel.getCartCollection().then( model => {
		return model.updateOne( { _id: cid }, { $set: { prod: [] } } ).then( status => {
			if( status.n === 1 ) {
				return true;
			}
			else{
				return false;
			}
		} )
	} )
}


orderDb.placeOrder = ( orderData ) => {
	const orderId = new Date().getTime().toString();
	orderData._id = orderId;
	orderData.status = "Placed";
	return dbModel.getOrderCollection().then( ( model ) => {
		return model.create( orderData ).then( data => {
			if( data ) {
				return orderDb.removeCartDoc( orderData.customerId ).then( status => {
					if( status ) return data;
					else return null;
				} )
			}
			else{
				return null;
			}
		} )
	} )
}

orderDb.updateAddr = ( customerId, address ) => {
	return dbModel.getOrderCollection().then( ( model ) => {
		return model.updateOne( { customerId: customerId }, { $set: { address: address } } ).then( data => {
			if( data.n ) {
				return true;
			}
			else{
				return null;
			}
		} )
	} )
}


orderDb.cancelOrder = ( order ) => {
	// orderData.status = "Cancelled";
	return dbModel.getOrderCollection().then( ( model ) => {
		return model.updateOne( { _id: order._id }, { $set: { status: "Cancelled" } } ).then( data => {
			if( data.n ) {
				return true;
				//change in stock
			}
			else{
				return null;
			}
		} )
	} )
}


orderDb.confirmation = ( orderId ) => {
	return dbModel.getOrderCollection().then( ( model ) => {
		return model.updateOne( { _id: orderId }, { $set: { status: "Delivered" } } ).then( data => {
			if( data.n ) {
				return true;
			}
			else{
				return null;
			}
		} )
	} )
}
//Export orderDb as module
module.exports = orderDb;
