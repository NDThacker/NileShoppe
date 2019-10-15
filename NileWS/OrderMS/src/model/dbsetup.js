const collection = require( '../utilities/connection' );

const orderDb = [
	{
		_id: 542121242411,
		customerId: "C1001",
		status: "Cancelled",
		payAmount: 3000,
		address: {
			houseNo: 53,
			streetName: "hebbal area",
			landmark: "infy mysore",
			city: "Mysore",
			pincode: 570026,
			country: "India"
		},
		payMethod: "cod",
		purchase: [{ pid: "P1001", count: 2 }, { pid: "P1002", count: 1 }]
	},
	{
		_id: 54855454665455,
		customerId: "C1002",
		status: "Placed",
		payAmount: 2500,
		address: {
			houseNo: 53,
			streetName: "hebbal area",
			landmark: "infy mysore",
			city: "Mysore",
			pincode: 570026,
			country: "India"
		},
		payMethod: "cod",
		purchase: [{ pid: "P1002", count: 1 }, { pid: "P1001", count: 3 }]
	},
	{
		_id: 4548745454555,
		customerId: "C1003",
		status: "Delivered",
		payAmount: 2500,
		address: {
			houseNo: 53,
			streetName: "hebbal area",
			landmark: "infy mysore",
			city: "Mysore",
			pincode: 570026,
			country: "India"
		},
		payMethod: "cod",
		purchase: [{ pid: "P1003", count: 1 }, { pid: "P1005", count: 3 }]
	}
]

const cartDb = [
	{
		_id: "C1001",
		prod: [{ pid: "P1001", count: 2 }, { pid: "P1002", count: 1 }]
	},
	{
		_id: "C1002",
		prod: [{ pid: "P1003", count: 2 }, { pid: "P1004", count: 1 }]
	}

]

exports.setupDb = () => {
	return collection.getOrderCollection().then( ( data ) => {
		return data.deleteMany().then( () => {
			return data.insertMany( orderDb ).then( ( data ) => {
				if( data.length ) return"Insertion of order data is successfull"
				else{
					let err = new Error( "Insertion failed" );
					err.status = 400;
					throw err;
				}
			} )
		} )
	} )
}

exports.setupCartDb = () => {
	return collection.getCartCollection().then( ( data ) => {
		return data.deleteMany().then( () => {
			return data.insertMany( cartDb ).then( ( data ) => {
				if( data.length ) return"Insertion of cart data is successfull"
				else{
					let err = new Error( "Insertion failed" );
					err.status = 400;
					throw err;
				}
			} )
		} )
	} )
}
