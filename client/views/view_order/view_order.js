Template.view_order.customers = function () {
	return Customer.prototype.load();
};

Template.view_order.events(okCancelEvents('#create_order', {
	ok: function (value, event){ 
			if (event.type === 'keyup' && part.value && due.value && lot.value && customer.value
				&& Order.prototype.create(part.value, due.value, lot.value, customer.value)) 
				alert('order created successfully');
			}
	}));