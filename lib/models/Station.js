/* lib/models/Station.js */
Stations = new Meteor.Collection('stations');

if (Meteor.isClient) {
    Meteor.subscribe('stations');
}

stations = Stations;

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

Station = function ( attr ) { 
    _.extend( this, attr );
};

Station.prototype.load = function ( name ) {
	var result = Stations.find( name ? { name : name } : {}, { name : 1 } );
	return result.map( function ( record ) { return new Station( record ); } )
};

Station.prototype.toString = function () {
	return JSON.stringify(this);
};
