/* client/views/view_scan/view_scan.js */

Template.view_scan.orders = function () {
	return Orders.find();
};

Template.view_scan.stations = function () {
	return Stations.find();
};

var is_rendered = false;
Template.view_scan.rendered = function () {
	is_rendered = true;
	$('#sclog').dataTable({"bPaginate": false,"bAutoWidth": false,		
		"sScrollX":       "100%",
		"sScrollXInner":  "150%",
		"bScrollCollapse": false,});
};

Template.view_scan.parts = function () {
	var result = [];
	Orders.find({parts: {$ne: void 0}}).forEach(function (order) {
		result = result.concat(order.parts);
	});
	return result;
}

Template.view_scan.part = function () {
	if (is_rendered) {
		return (_.filter(Template.view_scan.parts(), function (part) {
					return part.id == order.value;
				}))[0];
	}
	return void 0;
}

Template.view_scan.station = function () {
	if (is_rendered && station.value) {
		var record = Stations.findOne({ name : station.value });
		return new Station(record);
	}
	return void 0;
};

Template.view_scan.events({
	'click #submit' : function () {
		var part = Template.view_scan.part(),
			station = Template.view_scan.station(),
			quantity = parseInt(scan_qty.value);

		Scanner.scan(part, station, quantity);
		
		order.value = 'Select an Order';
		station.value = 'Select a Station';
	}
});
