var Validator = {}

Validator.validateEmail = function ( email ) {
    //    Your implementation goes here
    if( !email.match( /^[A-Za-z0-9.]+[@]([a-zA-Z]+\.[a-zA-Z]{2,3})$/ ) ){
        let err = new Error( "Invalid Email!!Valid email example: abys123@gmail.com" );
        err.status = 406;
        throw err;
    }
}

Validator.validatePass = function ( pass ) {
    //    Your implementation goes here
    if( !pass.match( /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#*!$%]).{8,20}/ ) ){
        let err = new Error( "Invalid Password !! It should contain at least one uppercase, at least one lowercase, at least one digit. It should also contain a special character amongst - !, @, #, $, %, ^, &, *" );
        err.status = 406;
        throw err;
    }
}

Validator.validatePhoneNo = function ( phone ) {
    //    Your implementation goes here
    const ph = phone.toString()
    if( !ph.match( /^[0-9]{10}$/ ) ){
        let err = new Error( "Invalid phone number!! It can contain only digits and length should be 10" );
        err.status = 406;
        throw err;
    }
}


Validator.validateName = function ( name ) {
    //    Your implementation goes here
    if( !name.match( /^[a-zA-Z]+(\s[a-zA-Z]+)*$/ ) ){
        let err = new Error( "Invalid Name!!! all must alphabetical" );
        err.status = 406;
        throw err;
    }
}


Validator.validateTan = function ( tan ) {
    //    Your implementation goes here
    if( !tan.match( /(AAAA)([0-9]{5})([A-Z])/gi ) ){
        let err = new Error( "Invalid tan number!!" );
        err.status = 406;
        throw err;
    }
}

Validator.validateGst = function ( gst ) {
    //    Your implementation goes here
    if( !gst.match( /([0-9]{2})([a-z]{5})([0-9]{4})([a-z]{1})([0-9]{1})([a-z]{1})([0-9]{1})/gi ) ){
        let err = new Error( "Invalid GST number!!" );
        err.status = 406;
        throw err;
    }
}

Validator.validAccount = function ( accountNumber ) {
    //    Your implementation goes here
    if( accountNumber.toString().length < 9 || accountNumber.toString().length > 18 ){
        let err = new Error( 'Account Number must have atleast 9 and atmost 18 characters' )
        err.status = 406;
        throw err
    }
}

module.exports = Validator;
