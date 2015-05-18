define([
  'jquery',
  'underscore',
  'backbone',
  './index'
],
function ($, _, Backbone, index) {
  var Router = Backbone.Router.extend({
    routes: {
      '': 'loadIndex',
      '*default': 'logError'
    },

    loadIndex: function() {
      index.init();
    },
    logError: function(other) {
      console.log("Invalid. You attempted to reach:" + other);
    }

  });

  return Router;
});
