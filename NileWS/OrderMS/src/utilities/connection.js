const{ Schema } = require( "mongoose" );
const Mongoose = require( "mongoose" )
Mongoose.Promise = global.Promise;
Mongoose.set( 'useCreateIndex', true )
const url = "mongodb://localhost:27017/OrderDb";

const orderSchema = Schema( {
	customerId: String,
	_id: String,
	status: { type: String, enum: ['Delivered', 'Cancelled', 'Placed'] },
	payAmount: Number,
	address: {
		type: {
			houseNo: { type: String },
			streetName: { type: String },
			landmark: { type: String },
			city: { type: String },
			pincode: { type: String },
			country: { type: String }
		}
	},
	payMethod: { type: String, enum: ['OnlinePaid', 'cod'] },
	purchase: [{ pid: String, count: Number }]
}, { collection: "Order" } );


const cartSchema = Schema( {
	_id: String,
	prod: [{ pid: String, count: Number }]
}, { collection: "Carts" } );


let collection = {};

collection.getOrderCollection = () => {
	return Mongoose.connect( url, { useNewUrlParser: true } ).then( ( database ) => {
		return database.model( 'Order', orderSchema )
	} ).catch( ( error ) => {
		let err = new Error( "Could not connect to Database" + error.message );
		err.status = 500;
		throw err;
	} )
}

collection.getCartCollection = () => {
	return Mongoose.connect( url, { useNewUrlParser: true } ).then( ( database ) => {
		return database.model( 'Carts', cartSchema )
	} ).catch( ( error ) => {
		let err = new Error( "Could not connect to Database" + error.message );
		err.status = 500;
		throw err;
	} )
}


module.exports = collection;
