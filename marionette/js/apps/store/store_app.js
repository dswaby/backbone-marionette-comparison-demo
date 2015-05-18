define(["app"], function(AppManager){
  AppManager.module("StoreApp", function(StoreApp, AppManager, Backbone, Marionette, $, _){
    StoreApp.startWithParent = false;

    StoreApp.onStart = function(){
      console.log("starting StoreApp");
    };

    StoreApp.onStop = function(){
      console.log("stopping StoreApp");
    };

  AppManager.module("Routers.StoreApp", function(StoreAppRouter, AppManager, Backbone, Marionette, $, _){
    StoreAppRouter.Router = Marionette.AppRouter.extend({
      appRoutes: {
        "store": "listProducts"
      }
    });

    var executeAction = function(action, arg){
      AppManager.startSubApp("StoreApp");
      action(arg);
    };

    var API = {
      listProducts: function(){
        require(["apps/store/store_app"], function (Store){
          executeAction(Store.listProducts);
        });
      }
    };

    AppManager.on("products:list", function(){
      AppManager.navigate("store");
      API.listProducts();
    });

    AppManager.addInitializer(function(){
      new StoreAppRouter.Router({
        controller: API
      });
    });
  });

  return AppManager.StoreAppRouter;
  });

});