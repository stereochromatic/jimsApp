/* lib/models/Order.js */

Orders = new Meteor.Collection( "orders" );

Order = function ( attr ) { _.extend( this, attr ) };

Order.prototype.create = function ( part_number, due_date, quantity, customer ) {
	
	var attr = {
		part_number : part_number, 
		due_date : due_date, 
		quantity : quantity, 
		customer : customer, 
		station : 'backlog'
	};

	Orders.upsert( Orders.maybeFindOne( attr )._id, attr );
	
	return new Order( attr );
};

Order.prototype.load = function ( customer ) {
	
	var result = Orders.find( customer ? { customer : customer } : {}, { customer : 1, due_date : -1 } );

	return result.map( function ( record ) { return new Order( record ) } );
};

Order.prototype.update_station = function ( station ) {

	var record = Orders.maybeFindOne( {
			part_number : this.part_number,
			due_date : this.due_date,
			quantity : this.quantity,
			customer : this.customer 	
		} );

	return Orders.upsert( record._id, {
			part_number : this.part_number,
			due_date : this.due_date,
			quantity : this.quantity,
			customer : this.customer,
			station : station
		}, function () { this.station = station } );
};

Order.prototype.toString = function () {

	return JSON.stringify( this )
}