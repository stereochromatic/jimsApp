Template.view_queue.orders = function () {
	return Order.prototype.load();
}

// Remove order handler
Template.view_queue.events = {
    'click .order_detail': function () { 
        //bootbox.alert('id was clicked');
        //console.log(part.value);
        //bootbox.alert("<h3>Order <b>#" + part_number + "</b></h3><br>QTY: " + quantity+ "<br>Customer: " + customer);
        //var orderArray = Orders.findOne({part_number: this.part_number});
        console.log(partNum.value);

        var logs = ScanLog.find({part_number:partNum.value});
        //console.log(logs.toSource());
        //console.log(logs.length);
// Materials.find({log_number: this.material_number}).forEach(function(doc,index,cursor){
       //   console.log(doc.supplier);
       // });
    },
  'click input.delete': function () {
    Order.prototype.remove(this._id);
  }
};

Template.view_queue.rendered = function () {
  $('#q').dataTable({"bPaginate": false, "bRetrieve" :true, "bFilter": false});
};