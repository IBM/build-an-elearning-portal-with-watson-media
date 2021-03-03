"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _carbonComponents = require("carbon-components");

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var prefix = _carbonComponents.settings.prefix;

function Accordion(_ref) {
  var _cx;

  var align = _ref.align,
      children = _ref.children,
      customClassName = _ref.className,
      disabled = _ref.disabled,
      size = _ref.size,
      rest = _objectWithoutProperties(_ref, ["align", "children", "className", "disabled", "size"]);

  var className = (0, _classnames.default)("".concat(prefix, "--accordion"), customClassName, (_cx = {}, _defineProperty(_cx, "".concat(prefix, "--accordion--").concat(align), align), _defineProperty(_cx, "".concat(prefix, "--accordion--").concat(size), size), _cx));
  return /*#__PURE__*/_react.default.createElement("ul", _extends({
    className: className
  }, rest), disabled ? _react.default.Children.toArray(children).map(function (child) {
    return /*#__PURE__*/_react.default.cloneElement(child, {
      disabled: disabled
    });
  }) : children);
}

Accordion.defaultProps = {
  align: 'end'
};
Accordion.propTypes = {
  /**
   * Specify the alignment of the accordion heading title and chevron.
   */
  align: _propTypes.default.oneOf(['start', 'end']),

  /**
   * Pass in the children that will be rendered within the Accordion
   */
  children: _propTypes.default.node,

  /**
   * Specify an optional className to be applied to the container node
   */
  className: _propTypes.default.string,

  /**
   * Specify whether an individual AccordionItem should be disabled
   */
  disabled: _propTypes.default.bool,

  /**
   * Specify the size of the Accordion. Currently supports either `sm` or `xl` as an option.
   */
  size: _propTypes.default.oneOf(['sm', 'xl'])
};
var _default = Accordion;
exports.default = _default;