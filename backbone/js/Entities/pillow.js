define["jquery", "underscore", "backbone", "./Entities", "./../app"], function ($, _, Backbone, Entities, App){

  Entities.SaleItem = Backbone.Model.extend({
    urlRoot: "saleitems",
    defaults: {
      distributer: "",
      brand:"",
      height: 0,
      width: 0,
      depth: 0,
      color: "",
      threadCount: ""
    },
    validate: function(attrs, options) {
      var errors = {}
      if (! attrs.color) {
        errors.firstName = "can't be blank";
      }
      if (! attrs.threadCount) {
        errors.lastName = "can't be blank";
      }
      else{
        if (attrs.lastName.length < 2) {
          errors.lastName = "is too short";
        }
      }
      if( ! _.isEmpty(errors)){
        return errors;
      }
    }
  });

  Entities.configureStorage("App.Entities.SaleItem");

  Entities.SaleItemsCollection = Backbone.Collection.extend({
    urlRoot: "saleitems",
    model: SaleItem
  });

  Entities.configureStorage("App.Entities.SaleItems");

  //private variables
  // accessors we will expose via RequestResponse handler
  var API = {
    getExampleEntities: function() {
      var defer = $.Deferred();
      //set timeout just for example purposes
      // setTimeout(function() {
        
      var jokesCollection = new Backbone.Collection(pillowDefaults);
      
      console.log("called after 3000ms");
      defer.resolve(jokesCollection);
      // }, 3000);
      return defer.promise();
    },
    getExampleEntityById: function(entityId) {
      var SaleItem = new SaleItem({id: entityId});
      var defer = $.Deferred();
      SaleItem.fetch({
        success: function(joke) {
          defer.resolve(joke);
        },
        error: function(joke) {
          defer.resolve(undefined);
        }
      });
    }
  };
  //set our request response handler for returning our public API methods
  app.reqres.setHandler("jokes:entities", function() {
    return API.getExampleEntities();
  });




};