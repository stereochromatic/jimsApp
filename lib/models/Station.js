/* lib/models/Station.js */
var Stations = new Meteor.Collection("stations");

var Station = function (attr) {
	extend(this, attr);
	extend(this, {
		scan : function (order) {
			order.update_station(this.name);
		}
	});
};

Station.prototype.create = function (name) {
	var attr = {name : name};
	Stations.upsert(
		(Stations.findOne(attr) || {_id : undefined})._id,
		attr);
	return new Station(attr);
};

Station.prototype.load_all = function () {
	return Stations.find({}, {name : 1}).map(Station);
};