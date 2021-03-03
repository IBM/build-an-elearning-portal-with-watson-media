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

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var prefix = _carbonComponents.settings.prefix;
/**
 * The AspectRatio component provides a `ratio` prop that will be used to
 * specify the aspect ratio that the children you provide will be displayed in.
 * This is often useful alongside our grid components, or for media assets like
 * images or videos.
 */

function AspectRatio(_ref) {
  var _ref$as = _ref.as,
      BaseComponent = _ref$as === void 0 ? 'div' : _ref$as,
      containerClassName = _ref.className,
      children = _ref.children,
      _ref$ratio = _ref.ratio,
      ratio = _ref$ratio === void 0 ? '1x1' : _ref$ratio,
      rest = _objectWithoutProperties(_ref, ["as", "className", "children", "ratio"]);

  var className = (0, _classnames.default)(containerClassName, "".concat(prefix, "--aspect-ratio"), "".concat(prefix, "--aspect-ratio--").concat(ratio));
  return /*#__PURE__*/_react.default.createElement(BaseComponent, _extends({
    className: className
  }, rest), children);
}

AspectRatio.propTypes = {
  /**
   * Provide a custom component or string to be rendered as the outermost node
   * of the component. This is useful if you want to deviate from the default
   * `div` tag, where you could specify `section` or `article` instead.
   *
   * ```jsx
   * <AspectRatio as="article">My content</AspectRatio>
   * ```
   */
  as: _propTypes.default.elementType,

  /**
   * Specify the content that will be placed in the aspect ratio
   */
  children: _propTypes.default.node,

  /**
   * Specify a class name for the outermost node of the component
   */
  className: _propTypes.default.string,

  /**
   * Specify the ratio to be used by the aspect ratio container. This will
   * determine what aspect ratio your content will be displayed in.
   */
  ratio: _propTypes.default.oneOf(['16x9', '9x16', '2x1', '1x2', '4x3', '3x4', '1x1'])
};
var _default = AspectRatio;
exports.default = _default;