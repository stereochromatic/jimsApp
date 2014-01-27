/* lib/models/Station.js */
Stations = new Meteor.Collection( "stations" );

Station = function ( attr ) { _.extend( this, attr ) };

Station.prototype.create = function ( name ) {

	var attr = { name : name };

	Stations.insert( attr );

	return new Station( attr );
};

Station.prototype.load = function ( name ) {

	var result = Stations.find( name ? { name : name } : {}, { name : 1 } );

	return result.map( function ( record ) { return new Station( record ); } )
}

Station.prototype.scan = function ( order, last_qty ) {
			
	console.log( 'attempting to scan...' );
	console.log( 'order: ' + order );
	console.log( 'station: ' + this );
    console.log(last_qty);


	return order.update_station( this.name, last_qty );
};

Station.prototype.toString = function () {

	return JSON.stringify( this )
}


if (Meteor.isClient) {
    Meteor.subscribe('stations');
}
stations = Stations

if (Meteor.isServer) {

    Meteor.publish('stations', function() {
        return stations.find();
   });

    stations.allow({

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