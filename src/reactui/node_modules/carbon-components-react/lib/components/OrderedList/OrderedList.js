"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _carbonComponents = require("carbon-components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var prefix = _carbonComponents.settings.prefix;

var OrderedList = function OrderedList(_ref) {
  var _classnames;

  var children = _ref.children,
      className = _ref.className,
      nested = _ref.nested,
      native = _ref.native,
      other = _objectWithoutProperties(_ref, ["children", "className", "nested", "native"]);

  var classNames = (0, _classnames2.default)((_classnames = {}, _defineProperty(_classnames, "".concat(prefix, "--list--ordered"), !native), _defineProperty(_classnames, "".concat(prefix, "--list--ordered--native"), native), _defineProperty(_classnames, "".concat(prefix, "--list--nested"), nested), _classnames), className);
  return /*#__PURE__*/_react.default.createElement("ol", _extends({
    className: classNames
  }, other), children);
};

OrderedList.propTypes = {
  /**
   * Provide list items to be rendered in the ordered list
   */
  children: _propTypes.default.node,

  /**
   * Provide an optional className to be applied to the containing <ol> node
   */
  className: _propTypes.default.string,

  /**
   * Specify whether this ordered list should use native list styles instead of custom counter
   */
  native: _propTypes.default.bool,

  /**
   * Specify whether this ordered list is nested inside of another nested list
   */
  nested: _propTypes.default.bool
};
OrderedList.defaultProps = {
  nested: false,
  native: false
};
var _default = OrderedList;
exports.default = _default;