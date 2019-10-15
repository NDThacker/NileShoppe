const collection = require( '../utilities/connection' );

const userData = [
	{
		_id: 'Sharukh',
		email: 'sharukh@gmail.com',
		password: 'sharukh',
		phoneNumber: 8585858585,
		address: 'India'
	},
	{
		_id: 'Naman',
		email: 'naman@gmail.com',
		password: 'naman',
		phoneNumber: 8585858585,
		address: 'India'
	},
	{
		_id: 'Palash',
		email: 'palash@gmail.com',
		password: 'palash',
		phoneNumber: 8585858585,
		address: 'India'
	}
]

exports.setupDb = () => {
	return collection.getUserCollection().then( ( userDb ) => {
		return userDb.deleteMany().then( () => {
			return userDb.insertMany( userData ).then( ( data ) => {
				if( data ) return"Insertion of user db is successfull"
				else{
					let err = new Error( "Insertion failed" );
					err.status = 400;
					throw err;
				}
			} )
		} )
	} )
}
