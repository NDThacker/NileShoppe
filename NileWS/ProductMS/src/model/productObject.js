class Product {
	
	constructor ( obj ) {
		this._id = new Date().getTime();
		this.sid = obj.sid;
		this.imgsrc = obj.imgsrc;
		this.price = obj.price;
		this.discount = obj.discount;
		this.stock = obj.stock;
		this.details = obj.details;
		this.pname = obj.pname;
		this.category = {};
		this.category["main"] = obj.main;
		this.category["sub"] = obj.sub
	}
}

module.exports = Product;
