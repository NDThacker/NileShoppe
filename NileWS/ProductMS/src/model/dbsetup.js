const dbmodel = require( '../utilities/connection' );

let cats = [{
	main: "Electronics",
	sub: ["AC", "Smartphone", "Washing Machine"]
},
{
	main: "Clothes",
	sub: ["Men Casual", "Women Casual", "Kids Funky"]
},
{
	main: "Furniture",
	sub: ["Table", "Almirah", "Dining Table"]
}]


let prods = [{
	_id: "P1002",
	category: {
		main: "electronics",
		sub: "smartphone"
	},
	pname: "Mi SmartPhone",
	sid: "S1001",
	imgsrc: "assets/p1001img1.jpg",
	price: 3000,
	discount: 11,
	stock: 9,
	details: "Quad core Processor",
	reviews: [
		{
			cname: "C1001",
			comment: "Nice product",
			rating: 4.2
		},
		{
			cname: "C1005",
			comment: "",
			rating: 4.0
		}
	]
},
{
	_id: "P1001",
	category: {
		main: "furniture",
		sub: "table"
	},
	pname: "four legged table",
	sid: "S1004",
	imgsrc: "assets/p2001img1.jpg",
	price: 2000,
	discount: 10,
	stock: 9,
	details: "Brown colored table",
	reviews: [
		{
			cname: "C2001",
			comment: "good product",
			rating: 4.2
		},
		{
			cname: "C1005",
			comment: "",
			rating: 4.0
		}
	]
}, {
	_id: "P1003",
	category: {
		main: "electronics",
		sub: "smartphone"
	},
	pname: "Samsung SmartPhone",
	sid: "S1001",
	imgsrc: "assets/p1001img1.jpg",
	price: 3000,
	discount: 11,
	stock: 9,
	details: "Quad Processor",
	reviews: [
		{
			cname: "C1001",
			comment: "Nice product",
			rating: 4.2
		},
		{
			cname: "C1005",
			comment: "",
			rating: 4.0
		}
	]
}
]

exports.setupDb = () => {
	return dbmodel.getProductColl().then( model => {
		return model.deleteMany().then( () => {
			return model.insertMany( prods ).then( ( data ) => {
				if( Object.entries( data ).length ) return"Insertion of prod db is successfull"
				else{
					let err = new Error( "Insertion failed" );
					err.status = 400;
					throw err;
				}
			} )
		} )
	} )

}

exports.setupCategoriesDb = () => {
	return dbmodel.getCategoriesColl().then( model => {
		return model.deleteMany().then( () => {
			return model.insertMany( cats ).then( data => {
				if( Object.entries( data ).length ) return"Insertion of categories successfull"
				else{
					let err = new Error( "Insertion failed" );
					err.status = 400;
					throw err;
				}

			} )
		} )
	} )
}
