const he = require( 'hydra-express' );
const create = require( './model/dbsetup' );
const userRouter = require( './routes/user-routing' );
const sellerRouter = require( './routes/seller-routing' );
const express = he.getExpress();
const api = express.Router();
const cors = require( 'cors' )
const bodyParser = require( 'body-parser' );
const reqlogger = require( './utilities/requestLogger' );
const errlogger = require( './utilities/errorlogger' );
// const err_logger = require('./utilities/errorLogger');


api.use( cors() )

he.init( '../userConfig.json', () => {
    he.registerRoutes( { '/': api } );
    api.use( bodyParser.urlencoded( {
        extended: true
    } ) );
    api.use( reqlogger )
    api.use( '/user', userRouter )
    api.use( '/seller', sellerRouter )
    api.use( errlogger )
} )

userRouter.get( '/setupdb', ( req, res, next ) => {
    create.setupDb().then( ( data ) => {
        res.send( data )
    } ).catch( ( err ) => {
        next( err )
    } )
} )


