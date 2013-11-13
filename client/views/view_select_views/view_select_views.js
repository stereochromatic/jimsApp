Template.select_view.helpers({
	is_selected_view : function (view) {
		return Session.get('selected_view') === view ? 'class="active"' : '';
	}
});
  
Template.select_view.events({
	'click #select_queue' : function () {
		console.log('setting view queue');
		Session.set('select_view', 'queue');
	},
	'click #select_order' : function () {
		console.log('setting view order');
		Session.set('select_view', 'order');
	},
	'click #select_customer' : function () {
		console.log('setting view customer');
		Session.set('select_view', 'customer');
	},
	'click #select_scan' : function () {
		console.log('setting view scan');
		Session.set('select_view', 'scan');
	}
});