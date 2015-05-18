define(["jquery", "underscore", "backbone"], function ($, _, Backbone){
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

  return viewManager;
});