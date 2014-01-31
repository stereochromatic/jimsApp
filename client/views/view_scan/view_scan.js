/* client/views/view_scan/view_scan.js */

var order_selected, station_selected;

Template.view_scan.orders = function () {
	return Orders.find();
};

Template.view_scan.stations = function () {

	return Station.prototype.load()
};

Template.view_scan.parts = function () {
	var result = [];
	Orders.find({parts: {$ne: void 0}}).forEach(function (order) {
		result = result.concat(order.parts);
	});
	return result;
}

Template.view_scan.part = function () {
	   console.log('part updated');
	if (Template.view_scan.is_rendered()) {
	    var parts = Template.view_scan.parts();
	    var part = _.filter(parts, function (part) {
		    return part.id == order.value;
	    })[0];
	    return part; 
	}
	return void 0;
}

Template.view_scan.btnClass = function (part) {
	console.log('btnClass called');
	console.log('looking up part...');
	console.log(part); 
	        
	if (part) {
    	if (scan_qty.value < Number(part.quantity)) {
		    return 'btn-default';
	    } else if (scan_qty === part.quantity) {
		    return 'btn-success';
	   	}
	} 
	return 'btn-danger';
};

// Declare client scanLog collection
//ScanLog = new Meteor.Collection("scanLog");

// Bind viewScan to Scanlog collection
Template.view_scan.scanLog = function () {
    return ScanLog.find();
};

var is_rendered = false;
Template.view_scan.rendered = function () {
    console.log('rendered');
    is_rendered = true; 
    $('#sclog').dataTable({"bPaginate": false,"bAutoWidth": false,		
  		"sScrollX":       "100%",
		"sScrollXInner":  "150%",
		"bScrollCollapse": false,});
};

Template.view_scan.is_rendered = function () {
  return is_rendered;  
};

Template.view_scan.events( {

	'change #scanner' : function () {
		if ( station.value ) {
			station_selected = new Station( Stations.findOne( { name : station.value } ) );
		} else if ( station ) {
			station_selected = new Station( Stations.findOne( { name : station } ) );
		} else {
			station_selected = undefined;
		}
		console.log( 'scanner options changed:' );
		console.log( Template.view_scan.part() );
		console.log( station_selected );
	},

	'click #submit' : function () {
		var partNumber = order.value;
		//clickonsole.log(order.part_number);
		//var orderPart = order[4];
		//console.log(orderPart);
		//console.log( partNumber );
		//console.log( Order.part_number );

		// create the scanlog entry
       	var newScan = {
       	    scan_number: partNumber,
       	    scan_station: station.value,
       	    qty: scan_qty.value,
       	    time: moment().format('LLLL'),
       	    name: Meteor.user().profile.name
       	};
       	console.log( newScan.scan_number);
        console.log( newScan.scan_station );
        if ( station_selected && station_selected._id && order_selected ) {
			station_selected.scan( order_selected, newScan.qty );
			station_selected = order_selected = undefined;
			order.value = 'Select an Order';
			station.value = 'Select a Station';
			//alert( 'Check-in successful' );
		}	

		//Insert into scan log
		ScanLog.insert(newScan);
		//Update Order with last scan 'time'
			
        alert("Item has been checked in. Thanks!");
	}
} );
