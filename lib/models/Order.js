/* lib/models/Order.js */

//Creating the Orders collection
Orders = new Meteor.Collection( "orders" );


// Declare Scan Log collection
ScanLog = new Meteor.Collection("scanLog");

//order object and constructor
Order = function ( attr ) { _.extend( this, attr ) };

//Creates orders
Order.prototype.create = function ( purchase_order, part_number, due_date, quantity, customer, station) {
	
	var attr = {
        purchase_order : purchase_order,
		part_number : part_number, 
		due_date : moment().format(due_date), 
		quantity : quantity, 
		customer : customer,
		station : station,
        last_scan : moment().format('LLLL'),
        last_qty : quantity,
        name: Meteor.user().profile.name
	};

	//creates or updates
	Orders.insert( attr );
	
	var result = new Order( attr );

	//Passed "receiving" on create from the form handler
	result.update_station( 'Receiving' );
	return result;
};

Order.prototype.load = function ( customer ) {
	
	var result = Orders.find( customer ? { customer : customer } : {}, { customer : 1, due_date : -1 } );

	//Super l33t 
	return result.map( function ( record ) { return new Order( record ) } );
};

Order.prototype.update_station = function ( station, last_qty ) {

	var record = Orders.maybeFindOne( {
			part_number : this.part_number,
			due_date : this.due_date,
			quantity : this.quantity,
			customer : this.customer
		} );

    var last = this.last_scan;
    var current = moment().format('LLLL');

    var scan_name = Meteor.user().profile.name;

    //Moment TimeAgo
   //var timer = current.from(last);

    console.log(last);
    console.log(current);
    console.log(last_qty);

    //testing moment timeAgo
   // console.log(timer);



    //attempting to set last scan time - this works
    Orders.update({_id:record._id}, {$set: {last_scan: current}});
    Orders.update({_id:record._id}, {$set: {name : scan_name}});
    Orders.update({_id:record._id}, {$set: {last_qty: last_qty}});

    //May insert timeAgo rather than just stamp
    //Orders.update({_id:record._id}, {$set: {timer: timer}});

	return Orders.update({_id:record._id}, {$set: {station: station}});
};

Order.prototype.toString = function () {

	return JSON.stringify( this )
}

//Remove function
Order.prototype.remove = function ( purchase_order) {

    return Orders.remove( purchase_order );

}


if (Meteor.isClient) {
    Meteor.subscribe('orders');
    Meteor.subscribe('scanLog');
}

orders = Orders
scanLog = ScanLog

if (Meteor.isServer) {

    Meteor.publish('orders', function() {
        return orders.find();
   });

        Meteor.publish('scanLog', function() {
        return scanLog.find();
   });

    orders.allow({

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

       scanLog.allow({

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