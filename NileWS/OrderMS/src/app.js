const he = require( 'hydra-express' );
const express = he.getExpress()
const app = express.Router()
//const hydra=he.getHydra()
const create = require( './model/dbsetup' );
const router = require( './routes/routing' );
const error = require( './utilities/errorLogger' );
const request = require( './utilities/requestLogger' );
const bodyParser = require( 'body-parser' );


he.init( './order-config.json', () => {
	he.registerRoutes( { "/": app } )
	app.use( bodyParser.json() );
	app.use( request );
	app.use( '/', router );
	app.use( error );
} )


router.get( '/setupDb', ( req, res, next ) => {
	create.setupDb().then( ( data ) => {
		res.send( data )
	} ).catch( ( err ) => {
		next( err )
	} )
} )


router.get( '/setupCartDb', ( req, res, next ) => {
	create.setupCartDb().then( ( data ) => {
		res.send( data )
	} ).catch( ( err ) => {
		next( err )
	} )
} )


