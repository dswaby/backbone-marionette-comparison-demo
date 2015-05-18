require.config({
  baseUrl: './..',
  paths: {
    "components": "bower_components",
    "jquery": "bower_components/jquery/dist/jquery",
    "underscore": "bower_components/underscore/underscore",
    "backbone": "bower_components/backbone/backbone",
    "hbs": "bower_components/require-handlebars-plugin/hbs",
    "localstorage": "bower_components/backbone.localStorage",
    "marionette": "bower_components/backbone.marionette/lib/backbone.marionette"
  },
  hbs: { // optional
    helpers: true,            // default: true
    i18n: false,              // default: false
    templateExtension: 'hbs', // default: 'hbs'
    partialsUrl: ''           // default: ''
  },
  shim: {
    backbone: {
      exports: 'Backbone',
      deps: ['underscore', 'jquery']
    },
    marionette: {
      deps: ["backbone"],
      exports: "Marionette"
    }
  }
});

requirejs(['js/app'], function (AppManager) {
  AppManager.start();
});