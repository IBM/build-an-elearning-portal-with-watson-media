"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _carbonComponents = require("carbon-components");

var _deprecate = _interopRequireDefault(require("../../prop-types/deprecate"));

var _ListBox = require("../ListBox");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var prefix = _carbonComponents.settings.prefix;

var DropdownSkeleton = function DropdownSkeleton(_ref) {
  var _cx;

  var className = _ref.className,
      size = _ref.size,
      inline = _ref.inline,
      rest = _objectWithoutProperties(_ref, ["className", "size", "inline"]);

  var wrapperClasses = (0, _classnames.default)(className, (_cx = {}, _defineProperty(_cx, "".concat(prefix, "--skeleton"), true), _defineProperty(_cx, "".concat(prefix, "--dropdown-v2"), true), _defineProperty(_cx, "".concat(prefix, "--list-box"), true), _defineProperty(_cx, "".concat(prefix, "--form-item"), true), _defineProperty(_cx, "".concat(prefix, "--list-box--").concat(size), size), _cx));
  return /*#__PURE__*/_react.default.createElement("div", _extends({
    className: wrapperClasses
  }, rest), /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(prefix, "--list-box__field")
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "".concat(prefix, "--list-box__label")
  })));
};

DropdownSkeleton.propTypes = {
  /**
   * Specify an optional className to add.
   */
  className: _propTypes.default.string,

  /**
   * Specify whether you want the inline version of this control
   */
  inline: (0, _deprecate.default)(_propTypes.default.bool, "The `inline` prop has been deprecated and will\n    be removed in the next major release. To specify the inline variant of Dropdown, please use the `type` prop."),

  /**
   * Specify the size of the ListBox. Currently supports either `sm`, `lg` or `xl` as an option.
   */
  size: _ListBox.PropTypes.ListBoxSize
};
var _default = DropdownSkeleton;
exports.default = _default;