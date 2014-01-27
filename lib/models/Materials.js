/** 
* Models
*/

// Declare client materials collection
Materials = new Meteor.Collection("materials");
// Declare client materialsLog collection
MaterialsLog = new Meteor.Collection("materialsLog");

materials = Materials
materialsLog = MaterialsLog

if (Meteor.isClient) {

    Meteor.subscribe('materials');
    Meteor.subscribe('materialsLog');


}

if (Meteor.isServer) {

    Meteor.publish('materials', function() {
        return materials.find();
   });
    Meteor.publish('materialsLog', function() {
        return materialsLog.find();
   });


    materials.allow({

        insert: function (document) {
            return true;
        },
        update: function () {
            return true;
        },
        remove: function () {
            return false;
        }

    });

    materialsLog.allow({

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