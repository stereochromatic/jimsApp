/* from todos examle */
var activateInput = function (input) {
  input.focus();
  input.select();
};

Template.view_customer.events(okCancelEvents('#create_customer', 
	{
		ok: function (value, event){ 
			if (event.type === 'keyup' &&
				customer.value && address.value && phone.value && 
				Customer.prototype.create(customer.value, address.value, phone.value)) 
				alert('customer created successfully');
			}
	}));