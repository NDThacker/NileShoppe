const{ Schema } = require( "mongoose" );
const Mongoose = require( "mongoose" )
Mongoose.Promise = global.Promise;
Mongoose.set( 'useCreateIndex', true )
const url = "mongodb://localhost:27017/productdb";


const categorySchema = Schema(
	{
		main: String,
		sub: [String]
	}
, {collections: "categories"} )


const reviewSchema = Schema( {
	cname: String,
	comment: {type: String, default: ""},
	rating: {type: Number, min: 0, max: 5}
} );

const productSchema = Schema( {
	_id: String,
	pname: String,
	category: {
		main: String,
		sub: String
	},
	sid: String,
	imgsrc: String,
	price: {type: Number, min: 1},
	discount: {type: Number, default: 0},
	stock: {type: Number, max: 100, min: 1},
	details: String,
	reviews: {type: [reviewSchema], default: []}

}, {collection: "products"} );

let collection = {};
collection.getProductColl = () => {
	return Mongoose.connect( url, { useNewUrlParser: true} ).then( database => {
		return database.model( "products", productSchema );
	} ).catch( e => {
		let err = new Error( "Could not connect to db ", e.message );
		err.status = 500;
		throw err;
	} )
}

collection.getCategoriesColl = () => {
	return Mongoose.connect( url, { useNewUrlParser: true} ).then( database => {
		return database.model( "categories", categorySchema );
	} ).catch( e => {
		let err = new Error( "Could not connect to db ", e.message );
		err.status = 500;
		throw err;
	} )
}

module.exports = collection;


