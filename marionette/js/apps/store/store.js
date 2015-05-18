define(
  ["js/app",
  "jquery", 
  "underscore", 
  "backbone",
  "marionette",
  "hbs!templates/SalesItemView",
  "hbs!templates/AboutView",
  "hbs!templates/ViewPickerView"
  ], function (AppManager, $, _, Backbone, Mn, saleItemTpl, aboutTpl, viewPickerTpl){

    var SaleItemView = Mn.ItemView.extend({
      template: saleItemTpl,
      events: {
        'click .js-show-price': 'revealPrice'
      },
      revealPrice: function() {
        this.$(".show-price-button").slideToggle(300);
        this.$(".price").slideToggle(300);
      }
    });

    var AboutView = Mn.ItemView.extend({
      template: aboutTpl,
      render: function() {
        this.$el.html(this.template());
        return this;
      }
    });

    var SalesCollection = Backbone.Collection.extend({
      url: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/94518/data.json"
    });

    var SaleCollectionView = Mn.CollectionView.extend({
      className: "large-12 columns",
      childView: SaleItemView
    });

    var ViewPicker = Mn.ItemView.extend({
      template: viewPickerTpl,
      events: {
        "click #about-button": "showAboutView",
        "click #fetch-button": "showCollectionView"
      },
      showAboutView: function(){
        AppManager.saleItemsRegion.show(new AboutView());
      },
      showCollectionView: function(){
        var sales = new SalesCollection();
        sales.fetch({
          success: function(collection){
            AppManager.saleItemsRegion.show(new SaleCollectionView({ collection: collection }));
          }
        });
      }
    });


    var Store = {
      listProducts: function() {
        AppManager.mainRegion.show(new ViewPicker());
      }
    };
    return Store
  });
