define([
  "marionette"
], 
function (Mn) {
  var AppManager = new Mn.Application();

  AppManager.addRegions({
    mainRegion: "#main-region",
    saleItemsRegion:"#sale-items-region"
  });

  AppManager.navigate = function(route,  options){
    options || (options = {});
    Backbone.history.navigate(route, options);
  };

  AppManager.getCurrentRoute = function(){
    return Backbone.history.fragment
  };

  AppManager.on("start", function(){
    if(Backbone.history){
      require(["js/apps/store/store"], function (store) {
        store.listProducts();
        Backbone.history.start();
        if(AppManager.getCurrentRoute() === ""){
          AppManager.trigger("products:list");
        }
      });
    }
  });

  AppManager.startSubApp = function(appName, args){
    var currentApp = appName ? AppManager.module(appName) : null;
    if (AppManager.currentApp === currentApp){ return; }

    if (AppManager.currentApp){
      AppManager.currentApp.stop();
    }

    AppManager.currentApp = currentApp;
    if(currentApp){
      currentApp.start(args);
    }
  };


  return AppManager;
});
