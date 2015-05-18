define(
  ["jquery", 
  "underscore", 
  "backbone",
  "hbs!templates/SalesItemView",
  "hbs!templates/AboutView",
  "hbs!templates/ViewPickerView",
  "hbs!templates/SalesCollectionView"
  ], function ($, _, Backbone, saleItemTpl, aboutTpl, viewPickerTpl, salesCollectionTpl){
  // for unbinding events and removing html from view and subviews before rendering new view
  var viewManager = (function() {
    var currentView;
    function showView(view) {
      disposeView(currentView, function() {
        render(view);
      });
    }
    function disposeView(view, callback) {
      if (!view) {
        return callback();
      }
      _disposeView(view);
      return callback();
      function _disposeView(view) {
        view.subviews && view.subviews.forEach(function(subview) {
          _disposeView(subview);
        });
        view.remove();
      }
    }
    function render(view) {
      currentView = view;
      $("#sale-items-region").html(currentView.el);
      currentView.render();
    }
    return {
      show: showView
    };
  })();

  var App = {
    Models: {},
    Views: {},
    Collections: {}
  };

  App.Collections.SalesCollection = Backbone.Collection.extend({
    url: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/94518/data.json"
  });

  App.Views.AboutView = Backbone.View.extend({
    template: aboutTpl,
    render: function() {
      this.$el.html(this.template());
      return this;
    }
  });

  App.Views.SaleItemView = Backbone.View.extend({
    events: {
      'click .js-show-price': 'revealPrice'
    },
    template: saleItemTpl,
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },
    revealPrice: function() {
      this.$(".show-price-button").slideToggle(300);
      this.$(".price").slideToggle(300);
    }
  });

  App.Views.SaleCollectionView = Backbone.View.extend({
    template: salesCollectionTpl,
    initialize: function() {
      this.subviews = [];
    },
    className: "large-12 columns",
    render: function() {
      this.$el.html(this.template());
      var saleItems = this.$("#sale-items-append-target");
      this.collection.forEach(function(saleItem) {
        var view = new App.Views.SaleItemView({
          model: saleItem
        });
        saleItems.append(view.render().el);
        this.subviews.push(view);
      }, this);
      return this;
    }
  });

  App.Views.ViewPicker = Backbone.View.extend({
    events: {
      "click #about-button": "showAboutView",
      "click #fetch-button": "showCollectionView"
    },
    render: function(){
      this.$el.html(this.template());
      return this;
    },
    template: viewPickerTpl,
    showAboutView: function(){
      viewManager.show(new App.Views.AboutView());
    },
    showCollectionView: function(){
      var sales = new App.Collections.SalesCollection();
      sales.fetch({
        success: function(data){
          viewManager.show(new App.Views.SaleCollectionView({ collection: data }));
        }
      });
    }
  });

  App.init = function(){
    $("#main-region").html(new App.Views.ViewPicker().render().el);
  };

  return App;

});

