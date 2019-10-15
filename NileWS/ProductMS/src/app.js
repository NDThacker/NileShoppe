const hydraExpress = require( 'hydra-express' );
const express = hydraExpress.getExpress();
const app = express.Router();
const router = require( './routes/routing' );
const reqlogger = require( './utilities/requestlogger' );
const errlogger = require( './utilities/errorlogger' );
const create = require( './model/dbsetup' );
const bdp = require( 'body-parser' );

hydraExpress.init( './product-config.json', () => {
	hydraExpress.registerRoutes( { "/": app } )
	app.use( bdp.json() )
	app.use( bdp.urlencoded( {extended: true} ) );
	app.use( reqlogger );
	app.use( "/products", router );
	app.use( errlogger );
} )

router.get( '/setupdb', ( req, res, next ) => {
	create.setupDb().then( msg => {
		res.json( { "message": msg} );
	} ).catch( ( err ) => {
        next( err )
    } )
} )

router.get( '/setupcategoriesdb', ( req, res, next ) => {
	create.setupCategoriesDb().then( msg => {
		res.json( { "message": msg} );
	} ).catch( ( err ) => {
        next( err )
    } )
} )

