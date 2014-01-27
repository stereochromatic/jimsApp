/* server/server.js */

if(Station.prototype.load()==0){
	Station.prototype.create( 'Prepping' );
	Station.prototype.create( 'Molding' );
	Station.prototype.create( 'Curing' );
	Station.prototype.create( 'Finishing' );
	Station.prototype.create( 'Inspection' );
	Station.prototype.create( 'Shipping' );
}

if(Customer.prototype.load()==0){
	
}

if(Order.prototype.load()==0){

}


//Materials = new Meteor.Collection("materials");


// Declare server Materials Log collection
//MaterialsLog = new Meteor.Collection("materialsLog");

// Declare Scan Log collection
//ScanLog = new Meteor.Collection("scanLog");
 
// Seed the materials database with a few Materials
Meteor.startup(function () {
    if (Materials.find().count() == 0) {
      
    }
    if (this.userId){
        console.log(this.userId);
    }
});

//Accounts.ui.config({ passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL' });

 
// Seed the materials log
Meteor.startup(function () {
   if (MaterialsLog.find().count() == 0) {
      
    }
});

//Roles.addUsersToRoles(Meteor.user().userId, 'admin');

//Add users to roles 
/*
var users = [
      {name:"Brian Back",email:"bib@htei.com",roles:['admin']}
    ];

  _.each(users, function (user) {
    var id;

    id = Accounts.createUser({
      email: user.email,
      password: "password",
      profile: { name: user.name }
    });

    if (user.roles.length > 0) {
      Roles.addUsersToRoles(id, user.roles);
    }

  });*/

//Prevent non-authorized users from creating new users
   Accounts.validateNewUser(function (user) {
    var loggedInUser = Meteor.user();

    if (Roles.userIsInRole(loggedInUser, ['admin','manage-users'])) {
      return true;
    }

    throw new Meteor.Error(403, "Not authorized to create new users");
  });
