goog.provide('os.ui.node.AreaNodeUICtrl');
goog.provide('os.ui.node.areaNodeUIDirective');

goog.require('os.ui.Module');
goog.require('os.ui.query.cmd.AreaRemove');
goog.require('os.ui.slick.AbstractNodeUICtrl');


/**
 * The selected/highlighted node UI directive for areas
 * @return {angular.Directive}
 */
os.ui.node.areaNodeUIDirective = function() {
  return {
    restrict: 'AE',
    replace: true,
    template: '<span class="glyphs pull-right slick-node-ui" ng-if="nodeUi.show()">' +
        '<span ng-click="nodeUi.edit()">' +
        '<i class="fa fa-fw glyph" ng-class="nodeUi.getTemp() ? \'fa-save\' : \'fa-pencil\'" ' +
            'title="{{nodeUi.getTemp() ? \'Save\' : \'Edit\'}}"></i></span>' +
        '<span ng-click="nodeUi.remove()">' +
        '<i class="fa fa-times fa-fw glyph glyph-remove" title="Remove the area"></i></span>' +
        '</span>',
    controller: os.ui.node.AreaNodeUICtrl,
    controllerAs: 'nodeUi'
  };
};


/**
 * Add the directive to the module
 */
os.ui.Module.directive('areanodeui', [os.ui.node.areaNodeUIDirective]);



/**
 * Controller for selected/highlighted node UI
 * @param {!angular.Scope} $scope
 * @param {!angular.JQLite} $element
 * @extends {os.ui.slick.AbstractNodeUICtrl}
 * @constructor
 * @ngInject
 */
os.ui.node.AreaNodeUICtrl = function($scope, $element) {
  os.ui.node.AreaNodeUICtrl.base(this, 'constructor', $scope, $element);
};
goog.inherits(os.ui.node.AreaNodeUICtrl, os.ui.slick.AbstractNodeUICtrl);


/**
 * @protected
 * @return {boolean} Whether or not the item is temporary
 */
os.ui.node.AreaNodeUICtrl.prototype.getTemp = function() {
  var area = /** @type {os.data.AreaNode} */ (this.scope['item']).getArea();
  return /** @type {boolean} */ (area.get('temp'));
};
goog.exportProperty(os.ui.node.AreaNodeUICtrl.prototype, 'getTemp', os.ui.node.AreaNodeUICtrl.prototype.getTemp);


/**
 * Removes the area
 */
os.ui.node.AreaNodeUICtrl.prototype.remove = function() {
  var area = /** @type {os.data.AreaNode} */ (this.scope['item']).getArea();

  if (area) {
    var cmd = new os.ui.query.cmd.AreaRemove(area);
    os.command.CommandProcessor.getInstance().addCommand(cmd);
  }
};
goog.exportProperty(os.ui.node.AreaNodeUICtrl.prototype, 'remove', os.ui.node.AreaNodeUICtrl.prototype.remove);


/**
 * Edits the filter
 */
os.ui.node.AreaNodeUICtrl.prototype.edit = function() {
  var area = /** @type {os.data.AreaNode} */ (this.scope['item']).getArea();

  if (area) {
    os.ui.query.AreaManager.save(area);
  }
};
goog.exportProperty(os.ui.node.AreaNodeUICtrl.prototype, 'edit', os.ui.node.AreaNodeUICtrl.prototype.edit);
