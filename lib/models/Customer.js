/* lib/models/Customer.js */
Customers = new Meteor.Collection( "customers" );

Customer = function ( attr ) {
	
	_.extend( this, attr );
	
	_.extend( this,
		{
			orders : Order.prototype.load( attr.customer )
		} );
};

Customer.prototype.create = function ( name, address, phone ) {
	
	var attr = {
		name : name, 
		address : address, 
		phone : phone
	};

	Customers.upsert( Customers.maybeFindOne( attr )._id, attr );
	
	return new Customer( attr );
};

Customer.prototype.load = function ( name ) {
	
	var result = Customers.find( name ? { name : name } : {}, { name : 1 } );

	return result.map( function (record) { return new Customer( record ) } );
};