const{ Schema } = require( "mongoose" );
const Mongoose = require( "mongoose" )
Mongoose.Promise = global.Promise;
Mongoose.set( 'useCreateIndex', true )
const userUrl = "mongodb://localhost:27017/User_DB";
const sellerUrl = "mongodb://localhost:27017/Seller_DB";

const tanPattern = /(AAAA)([0-9]{5})([A-Z])/gi
const gstPattern = /([0-9]{2})([a-z]{5})([0-9]{4})([a-z]{1})([0-9]{1})([a-z]{1})([0-9]{1})/gi

const sellerSchema = new Schema( {
    id: { type: String, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: {
        type: String, validate: {
            validator: function () {
                if( this.password.length < 8 ) {
                    let err = new Error( 'Password must have atleast 8 characters' )
                    err.status = 406
                    throw err
                }
            }
        }, required: true
    },
    phoneNumber: {
        type: Number, validate: {
            validator: function () {
                if( this.phoneNumber.toString().length < 10 || this.phoneNumber.toString().length > 10 ) {
                    let err = new Error( 'Phone Number must have only 10 characters' )
                    err.status = 406
                    throw err
                }
            }
        }, required: true
    },
    accountNumber: {
        type: Number, required: true, validate: {
            validator: function () {
                if( this.accountNumber.toString().length < 9 || this.accountNumber.toString().length > 18 ) {
                    let err = new Error( 'Account Number must have atleast 9 and atmost 18 characters' )
                    err.status = 406
                    throw err
                }
            }
        }
    },
    tan: {
        type: String, required: true, validate: {
            validator: function () {
                let valid = tanPattern.test( this.tan )
                
                if( !valid ) {
                   
                    let err = new Error( 'Invalid TAN' )
                    err.status = 406
                    throw err
                }
            }
        }
    },
    gst: {
        type: String, required: true, validate: {
            validator: function () {
                let valid = gstPattern.test( this.gst )
               
                if( !valid ) {
                   
                    let err = new Error( 'Invalid GST' )
                    err.status = 406
                    throw err
                }
            }
        }
    }
} )

const userSchema = new Schema( {
    id: { type: String, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: {
        type: String, validate: {
            validator: function () {
                if( this.password.length < 8 ) {
                    let err = new Error( 'Password must have atleast 8 characters' )
                    err.status = 406
                    throw err
                }
            }
        }, required: true
    },
    phoneNumber: {
        type: Number, validate: {
            validator: function () {
                if( this.phoneNumber.toString().length < 10 || this.phoneNumber.toString().length > 10 ) {
                    let err = new Error( 'Phone Number must have only 10 characters' )
                    err.status = 406
                    throw err
                }
            }
        }, required: true
    },
    address: {
        type: {
            houseNo: { type: String },
            streetName: { type: String },
            landmark: { type: String },
            city: { type: String },
            pincode: { type: String },
            country: { type: String }
        }
    }
} )

let collection = {};

collection.getUserCollection = () => {
    return Mongoose.connect( userUrl, { useNewUrlParser: true } ).then( ( database ) => {
        return database.model( 'User', userSchema )
    } ).catch( ( error ) => {
        let err = new Error( "Could not connect to Database ", error.message );
        err.status = 500;
        throw err;
    } )
}

collection.getSellerCollection = () => {
    return Mongoose.connect( sellerUrl, { useNewUrlParser: true } ).then( ( database ) => {
        return database.model( 'Seller', sellerSchema )
    } ).catch( ( error ) => {
        let err = new Error( "Could not connect to Database", error.message );
        err.status = 500;
        throw err;
    } )
}

module.exports = collection;
