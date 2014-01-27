/* lib/models/Customer.js */
Customers = new Meteor.Collection( "customers" );


Customer = function ( attr ) {
	
	_.extend( this, attr );
	
	_.extend( this,
		{
			orders : Order.prototype.load( attr.customer )
		} );
};

Customer.prototype.create = function ( name, address, phone, cell, email, website, contact, shipping, customer_type ) {
	
	var attr = {
		name : name, 
		address : address, 
		phone : phone,
		cell : cell,
		email : email,
		website : website,
		contact : contact,
		shipping : shipping,
		customer_type : customer_type
	};

	Customers.insert( attr );
	
	return new Customer( attr );
};

Customer.prototype.load = function ( name ) {
	
	var result = Customers.find( name ? { name : name } : {}, { name : 1 } );

	return result.map( function (record) { return new Customer( record ) } );
};


//Remove function
Customer.prototype.remove = function ( name ) {

    return Customers.remove( name );

}


if (Meteor.isClient) {
    Meteor.subscribe('customers');
}
customers = Customers

if (Meteor.isServer) {

    Meteor.publish('customers', function() {
        return customers.find();
   });

    customers.allow({

        insert: function (document) {
            return true;
        },
        update: function () {
            return true;
        },
        remove: function () {
            return true;
        }

    });

}