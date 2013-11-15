/* lib/models/Order.js */
Orders = new Meteor.Collection("orders");

Order = function (attr) {
	_.extend(this, attr);
	_.extend(this, {
		update_station : function (station) {
			Orders.upsert(
				(findOne({
					part_number : this.part_number,
					due_date : this.due_date,
					quantity : this.quantity,
					customer : this.customer
				}) || {_id : undefined})._id,
				{
					part_number : this.part_number,
					due_date : this.due_date,
					quantity : this.quantity,
					customer : this.customer,
					station : station
				}, 
				function () {
					this.station = station;
				});
		}
	});
};

Order.prototype.create = function (part_number, due_date, quantity, customer) {
	var attr = {
		part_number : part_number, 
		due_date : due_date, 
		quantity : quantity, 
		customer : customer, 
		station : 'backlog'
	};
	Order.upsert(
		(Order.findOne(attr) || {_id : undefined})._id,
		attr);
	return new Order(attr);
};

Order.prototype.load = function () {
	return Orders.find({}, {station : 1, due_date : -1}).map(Order);
};