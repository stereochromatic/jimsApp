Template.view_order.orders = function () {

	return Order.prototype.load();
};

Template.view_order.customers = function () {
	return Customer.prototype.load()
};

//Bind viewOrders to Materials collection
Template.view_order.materials = function () {
    return Materials.find();
};

// Bind viewOrders to MaterialsLog collection
Template.view_order.materialsLog = function () {
    return MaterialsLog.find();
};

Template.view_order.isNotFirstPart = function () {
    //TODO do this, maybe?
    return true;
};

/*Template.view_order.rendered = function () {
  $('#ord').dataTable({"bPaginate": false, "bRetrieve" :true});
};*/

Template.view_order.events( {
	'click input.delete': function () {
    	Order.prototype.remove(this._id);
  	},
	'click .raw': function () {
	    //do something here
	},
	
	'click #submit' : function () {
		var rawQty = raw_qty.value;

		if ( purchase.value && part.value && due.value && lot.value && customer.value
			&& Order.prototype.create( purchase.value, part.value, due.value, lot.value, customer.value, 'Prepping' ) )
			alert( 'Order created successfully' );

		//outputting what we need just to check
		console.log(raw.value);
		console.log(rawQty);

		//ok lets try updating

		//Gets the quantity before addition/subtraction
        var qty = Materials.findOne({material_number: raw.value}, {fields: {material_qty: 1}});
        console.log(qty.material_qty);

        //Calculate new total	
        var total = Number(rawQty) + Number(qty.material_qty);
        console.log(total);
        //Grab the docid for the item we are updating
        var docid = Materials.findOne({material_number: raw.value});
        console.log(docid._id);

        // create the log
        var newLog = {
            log_number: docid. purchase_order,
            qty_added: rawQty,
            comment: 'Used for Order# ' + part.value,
            time: moment().format('LLLL'),
            supplier: customer.value,
            name: Meteor.user().profile.name
        };

        //and finally update the damn entry
        Materials.update({_id:docid._id},{$set: {material_qty: total}});

        //try adding to log
        MaterialsLog.insert(newLog);
	}
});