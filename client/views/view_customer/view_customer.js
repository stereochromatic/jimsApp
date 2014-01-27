/*Template.view_customer.events(okCancelEvents('#create_customer', 
	{
		ok: function (value, event){ 
			if (event.type === 'keyup' && customer.value && address.value && phone.value && email.value
				&& Customer.prototype.create(customer.value, address.value, phone.value, email.value)) 
				alert('New customer added, thanks!');
			}
	}));*/

Template.view_customer.customers = function () {
	return Customer.prototype.load()
};

Template.view_customer.rendered = function () {
  $('#cust').dataTable({"bPaginate": false,"bAutoWidth": false,		
  		"sScrollX":       "100%",
		//"sScrollXInner":  "150%",
		"bScrollCollapse": false,});
};

//Form Submission
Template.view_customer.events = {
    'click input.delete': function () { 
    Customer.prototype.remove(this._id);
  },
	'click #submit' : function () {
		if ( customer.value && address.value && phone.value && cell.value && email.value && website.value && contact.value && shipping.value && customer_type.value
				&& Customer.prototype.create(customer.value, address.value, phone.value, cell.value, email.value, website.value, contact.value, shipping.value, customer_type.value)) 
				alert('New customer added, thanks!');
	}
};