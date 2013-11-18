/* lib/models/Station.js */
Stations = new Meteor.Collection( "stations" );

Station = function ( attr ) {

	_.extend( this, attr );

	_.extend(this, {
		scan : function ( order ) {
			
			return order.update_station( this.name );
		}
	});
};

Station.prototype.create = function ( name ) {

	var attr = { name : name };

	Stations.upsert( Stations.maybeFindOne( attr )._id, attr );

	return new Station( attr );
};

Station.prototype.load = function ( name ) {

	var result = Stations.find( name ? { name : name } : {}, { name : 1 } );

	return result.map( function ( record ) { return new Station( record ); } )
}

Station.prototype.toString = function () {

	return JSON.stringify( this )
}