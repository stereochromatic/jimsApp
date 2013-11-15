/* lib/models/Customer.js */
Customers = new Meteor.Collection("customers");

Customer = function (attr) {
	_.extend(this, attr);
};

Customer.prototype.create = function(name, address, phone) {
	var attr = {
		name : name, 
		address : address, 
		phone : phone
	};
	Customers.upsert(
		(Customers.findOne(attr) || {_id : undefined})._id,
		attr);
	return new Customer(attr);
};

Customer.prototype.load_all = function () {
	return Customers.find({}, {name : 1}).map(Customer);
};