/* client/views/view_scan/view_scan.js */

var station_selected, order_selected;

Template.view_scan.orders = function () {

	return Order.prototype.load()
};

Template.view_scan.stations = function () {

	return Station.prototype.load()
};

Template.view_scan.events( _.extend( {
		'change #scanner' : function () {
			station_selected = new Station( JSON.parse( station.value ) );
			order_selected = new Order( JSON.parse( order.value ) );
		}
	}, 
	okCancelEvents( '#scanner', {
		ok: function ( value, event ) {
			if ( event.type === 'keyup' 
					&& station_selected && order_selected
					&& station_selected.scan( order_selected ) ) 
					alert( 'order created successfully' );
		}
	} ) ) );