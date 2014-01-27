
// Bind materialsTemplate to Materials collection
Template.view_materials.materials = function () {
    return Materials.find();
};

// Bind materialsTemplate to MaterialsLog collection
Template.view_materials.materialsLog = function () {
    return MaterialsLog.find();
};


Template.view_materials.customers = function () {
    return Customer.prototype.load()
};





/* Remove material function
Template.view_materials.events = {
  'click input.delete': function () { // <-- here it is
    Materials.remove(this._id);
  }
};*/

/* Remove Log function
Template.view_materials.events = {
  'click input.delete': function () { // <-- here it is
    MaterialsLog.remove(this._id);
  }
};
*/


//Validation
Validation = {
  material_exists: function(material_number) {
    return Materials.findOne({material_number: material_number});
  }
};

/*$('#pageLog').dataTable({}
);*/


// Handle materials Form events
Template.view_materials.events = {

    //Delete materials
    'click input.delete2': function () { 
        Materials.remove(this._id);
    },
    //Materials detail
    'click .detail': function () { 
        var jjj = MaterialsLog.find({log_number: this.material_number});
        console.log('id was clicked');
        console.log(this._id);
        console.log(this.material_qty);
        bootbox.alert("<h3>Part <b>#" + this.material_number + "</b></h3><br>On-Hand: " +this.material_qty+ "<br>Entered by: " +this.name+ "<br>Time: <i>" +this.time+"</i><br>");
        //var logs = MaterialsLog.find({log_number: this.material_number});
        //console.log(logs.length);
// Materials.find({log_number: this.material_number}).forEach(function(doc,index,cursor){
       //   console.log(doc.supplier);
       // });
    },
    'click input.delete': function () { 
    MaterialsLog.remove(this._id);
    },
    'submit': function (e, tmpl) {
        // Don't postback
        e.preventDefault();
 
        // create the new material
        var newMaterial = {
            material_number: tmpl.find("#material_number").value,
            material_qty: tmpl.find("#material_qty").value,
            supplier: tmpl.find("#supplier").value,
            material_type: tmpl.find("#type").value,
            comment: tmpl.find("#comment").value,
            name: Meteor.user().profile.name,
            time: moment().format('LLLL')
        };

        //Attempt to trim whitespace
        newMaterial.material_number = jQuery.trim(newMaterial.material_number);
        console.log(newMaterial.material_number);

        // create the log
        var newLog = {
            log_number: tmpl.find("#material_number").value,
            qty_added: tmpl.find("#material_qty").value,
            comment: tmpl.find("#comment").value,
            time: moment().format('LLLL'),
            supplier: tmpl.find("#supplier").value,
            type: tmpl.find("#type").value,
            name: Meteor.user().profile.name
        };

        //Check to see if its there already
        if(Validation.material_exists(newMaterial.material_number)){
            //console.log('Hey there.  Im already here.. you should just add me using the update function for collections!');

           // var qty = Materials.find({material_qty: Session.get('myUserId')}).fetch();

            //Stores the amount to added/subtracted
            var added = Number(newMaterial.material_qty);
            //console.log(added);
            //console.log(Materials.findOne({material_qty: newMaterial.material_qty}));

            //Gets the quantity before addition/subtraction
            var qty = Materials.findOne({material_number: newMaterial.material_number}, {fields: {material_qty: 1}});
            //console.log(qty.material_qty);

            //Stores the new total to update
            var total = Number(added)+Number(qty.material_qty);


            var docid = Materials.findOne({material_number: newMaterial.material_number});
            console.log(docid._id);
            Materials.update({_id:docid._id},{$set: {material_qty: total}});
        }
        else{
            // add the material to the db
            Materials.insert(newMaterial);
        }
        
        //update log
        MaterialsLog.insert(newLog);
        alert("New Material has been added. Thanks!");
    }
};