Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function () {
  this.route('home', {
    path: '/',
    template: 'view_select_views'
  });

  this.route('customer', {
    path: '/customer',
    template: 'view_customer'
  });

  this.route('order', {
    path: '/order',
    template: 'view_order'
  });

  this.route('queue', {
    path: '/queue',
    template: 'view_queue'
  });

  this.route('scan', {path: '/scan',
    template: 'view_scan'
  });
});