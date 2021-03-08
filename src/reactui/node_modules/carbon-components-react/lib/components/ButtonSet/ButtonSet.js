"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _carbonComponents = require("carbon-components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var prefix = _carbonComponents.settings.prefix;

var ButtonSet = /*#__PURE__*/_react.default.forwardRef(function ButtonSet(_ref, ref) {
  var children = _ref.children,
      className = _ref.className,
      stacked = _ref.stacked,
      rest = _objectWithoutProperties(_ref, ["children", "className", "stacked"]);

  var buttonSetClasses = (0, _classnames.default)(className, "".concat(prefix, "--btn-set"), _defineProperty({}, "".concat(prefix, "--btn-set--stacked"), stacked));
  return /*#__PURE__*/_react.default.createElement("div", _extends({}, rest, {
    className: buttonSetClasses,
    ref: ref
  }), children);
});

ButtonSet.displayName = 'ButtonSet';
ButtonSet.propTypes = {
  /**
   * Specify the content of your ButtonSet
   */
  children: _propTypes.default.node,

  /**
   * Specify an optional className to be added to your ButtonSet
   */
  className: _propTypes.default.string,

  /**
   * Specify the button arrangement of the set (vertically stacked or
   * horizontal)
   */
  stacked: _propTypes.default.bool
};
var _default = ButtonSet;
exports.default = _default;