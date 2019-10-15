let validator = {}


validator.validatePrice = ( price ) => {
	if( price < 1 ) {
		let err = new Error( "Price cant be less than 1" );
		err.status = 406;
		throw err;
	}
}

validator.validateStock = ( stock ) => {
	if( stock > 100 || stock < 1 ) {
		let err = new Error( "Stock must be between 1 and 100" );
		err.status = 406;
		throw err;
	}
}

validator.validateName = ( name ) => {
	if( name === "" ) {
		let err = new Error( "Product name must not be empty" );
		err.status = 406;
		throw err;
	}
}

module.exports = validator;
