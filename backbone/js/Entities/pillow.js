define["jquery", "underscore", "backbone", "./Entities", "./../app"], function ($, _, Backbone, Entities, App){

  Entities.Pillow = Backbone.Model.extend({
    urlRoot: "pillows",
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

  Entities.configureStorage("App.Entities.Pillow");

  Entities.PillowsCollection = Backbone.Collection.extend({
    urlRoot: "pillows",
    model: PillowModel,

  });

  Entities.configureStorage("App.Entities.Pillows");

  //private variables
  var pillowDefaults = [{
    "joke": "why did the js dev cross the road?",
    "punchline": "some hilarious punch line"
  }, {
    "joke": "A js dev waks into a bar, the bartender says......",
    "punchline": "some hilarious punchline including limits"
  }];
  // accessors we will expose via RequestResponse handler
  var API = {
    getExampleEntities: function() {
      var defer = $.Deferred();
      //set timeout just for example purposes
      setTimeout(function() {
        var jokesCollection = new Backbone.Collection(pillowDefaults);
        
        console.log("called after 3000ms");
        defer.resolve(jokesCollection);
      }, 3000);
      return defer.promise();
    },
    getExampleEntityById: function(entityId) {
      var jokeEntity = new JokeModel({id: entityId});
      var defer = $.Deferred();
      jokeEntity.fetch({
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