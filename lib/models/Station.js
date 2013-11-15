/* lib/models/Station.js */
Stations = new Meteor.Collection("stations");

Station = function (attr) {
	_.extend(this, attr);
	_.extend(this, {
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