/* lib/models/Scan.js */

// Declare ScanLog collection and pub/sub
ScanLog = new Meteor.Collection("scanLog");

if (Meteor.isClient) {
	Meteor.subscribe('scanLog');
}

scanLog = ScanLog;

if (Meteor.isServer) {
	Meteor.publish('scanLog', function() {
		return scanLog.find();
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

//Scanner singleton
Scanner = (function () { 
	return {
		scan: function (part, station, quantity) {
			var orderId, partIndex, order, record;
			if (part && station) {

				// create the scanlog entry			
				var newScan = {
					scan_number: part.part_number,
					scan_station: station.name,
					qty: quantity,
					time: moment().format('LLLL'),
					name: Meteor.user().profile.name
				};	
				ScanLog.insert(newScan);
				
				/* note: 
					This depends on how we've elegantly set up part ids to be
						the order id w/ its index appended.
					This code is tightly coupled and should be refactored or
						at least covered by tests.
					Moving this piece of the feature to Order.js is likely
						the best option.
				*/
				orderId = part.id.substr(0, part.id.length-1);
				partIndex = part.id.charAt(part.id.length-1);
				order = Orders.findOne(orderId);
			
				//find the existing part in order.parts and update
				record = order.parts[partIndex];

				//TODO i think we should be using last_qty here
				if (quantity >= parseInt(part.quantity)) {
					console.log('not splitting parts');
					
					_.extend(record, {
						station: station.name,
						last_qty: quantity,
					});
				} else {
					console.log('splitting parts');

					//not sure what exact behavior you want for last_qty
					_.extend(record, {
						quantity: (part.quantity - quantity),
					});
				
					//part sent as parameter becomes result of split
					part.station = station.name;
					part.quantity = part.last_qty = quantity;
					part.id = order._id + order.parts.length;
					order.parts.push(part);
				}

				//update record
				Orders.update(orderId, {$set: {parts: order.parts}});
				alert("Item has been checked in. Thanks!");
			}
		}
	};
})();
