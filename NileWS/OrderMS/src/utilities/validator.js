var Validator = {}

Validator.validateAddress = function ( address ) {
	//    Your implementation goes here
	if( address.houseNo === '' || address.streetName === '' || address.landmark === '' || address.city === '' || address.pincode === '' ) {
		let err = new Error( "All address fields required" );
		err.status = 406;
		throw err;
	}
}

module.exports = Validator;
