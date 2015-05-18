define(function(require) {
  var $ = require('jquery');
  var $mainSection = $("#main-content-section");
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
      $mainSection.animate({"opacity":0}, 300, function() {
        _disposeView(view);
        return callback();
      });


      function _disposeView(view) {
        view.subviews && view.subviews.forEach(function(subview) {
          _disposeView(subview);
        });

        view.remove();
      }
    }

    function render(view) { 
      currentView = view;
      if (typeof currentView.onInitialize == 'function') {
        currentView.onInitialize();
      }
      $mainSection.html(currentView.el);
      currentView.render();
      $mainSection.animate({"opacity": 1}, 300);
    }

    return {
      show: showView
    };
  })();

  return viewManager;
});