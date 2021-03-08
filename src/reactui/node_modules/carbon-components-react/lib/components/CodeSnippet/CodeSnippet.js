"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _polyfilled = _interopRequireDefault(require("use-resize-observer/polyfilled"));

var _lodash = _interopRequireDefault(require("lodash.debounce"));

var _iconsReact = require("@carbon/icons-react");

var _carbonComponents = require("carbon-components");

var _Copy = _interopRequireDefault(require("../Copy"));

var _Button = _interopRequireDefault(require("../Button"));

var _CopyButton = _interopRequireDefault(require("../CopyButton"));

var _uniqueId = _interopRequireDefault(require("../../tools/uniqueId"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var prefix = _carbonComponents.settings.prefix;

function CodeSnippet(_ref) {
  var _classNames;

  var className = _ref.className,
      type = _ref.type,
      children = _ref.children,
      feedback = _ref.feedback,
      onClick = _ref.onClick,
      ariaLabel = _ref.ariaLabel,
      copyLabel = _ref.copyLabel,
      copyButtonDescription = _ref.copyButtonDescription,
      light = _ref.light,
      showMoreText = _ref.showMoreText,
      showLessText = _ref.showLessText,
      hideCopyButton = _ref.hideCopyButton,
      wrapText = _ref.wrapText,
      rest = _objectWithoutProperties(_ref, ["className", "type", "children", "feedback", "onClick", "ariaLabel", "copyLabel", "copyButtonDescription", "light", "showMoreText", "showLessText", "hideCopyButton", "wrapText"]);

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      expandedCode = _useState2[0],
      setExpandedCode = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      shouldShowMoreLessBtn = _useState4[0],
      setShouldShowMoreLessBtn = _useState4[1];

  var _useRef = (0, _react.useRef)((0, _uniqueId.default)()),
      uid = _useRef.current;

  var codeContentRef = (0, _react.useRef)();
  var codeContainerRef = (0, _react.useRef)();

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      hasLeftOverflow = _useState6[0],
      setHasLeftOverflow = _useState6[1];

  var _useState7 = (0, _react.useState)(false),
      _useState8 = _slicedToArray(_useState7, 2),
      hasRightOverflow = _useState8[0],
      setHasRightOverflow = _useState8[1];

  var getCodeRef = (0, _react.useCallback)(function () {
    if (type === 'single') {
      return codeContainerRef;
    }

    if (type === 'multi') {
      return codeContentRef;
    }
  }, [type]);
  var getCodeRefDimensions = (0, _react.useCallback)(function () {
    var _getCodeRef$current = getCodeRef().current,
        codeClientWidth = _getCodeRef$current.clientWidth,
        codeScrollLeft = _getCodeRef$current.scrollLeft,
        codeScrollWidth = _getCodeRef$current.scrollWidth;
    return {
      horizontalOverflow: codeScrollWidth > codeClientWidth,
      codeClientWidth: codeClientWidth,
      codeScrollWidth: codeScrollWidth,
      codeScrollLeft: codeScrollLeft
    };
  }, [getCodeRef]);
  var handleScroll = (0, _react.useCallback)(function () {
    if (type === 'inline' || type === 'single' && !(codeContainerRef === null || codeContainerRef === void 0 ? void 0 : codeContainerRef.current) || type === 'multi' && !(codeContentRef === null || codeContentRef === void 0 ? void 0 : codeContentRef.current)) {
      return;
    }

    var _getCodeRefDimensions = getCodeRefDimensions(),
        horizontalOverflow = _getCodeRefDimensions.horizontalOverflow,
        codeClientWidth = _getCodeRefDimensions.codeClientWidth,
        codeScrollWidth = _getCodeRefDimensions.codeScrollWidth,
        codeScrollLeft = _getCodeRefDimensions.codeScrollLeft;

    setHasLeftOverflow(horizontalOverflow && !!codeScrollLeft);
    setHasRightOverflow(horizontalOverflow && codeScrollLeft + codeClientWidth !== codeScrollWidth);
  }, [type, getCodeRefDimensions]);
  (0, _polyfilled.default)({
    ref: getCodeRef(),
    onResize: function onResize() {
      if ((codeContentRef === null || codeContentRef === void 0 ? void 0 : codeContentRef.current) && type === 'multi') {
        var _codeContentRef$curre = codeContentRef.current.getBoundingClientRect(),
            height = _codeContentRef$curre.height;

        setShouldShowMoreLessBtn(height > 255);
      }

      if ((codeContentRef === null || codeContentRef === void 0 ? void 0 : codeContentRef.current) && type === 'multi' || (codeContainerRef === null || codeContainerRef === void 0 ? void 0 : codeContainerRef.current) && type === 'single') {
        (0, _lodash.default)(handleScroll, 200);
      }
    }
  });
  (0, _react.useEffect)(function () {
    handleScroll();
  }, [handleScroll]);
  var codeSnippetClasses = (0, _classnames.default)(className, "".concat(prefix, "--snippet"), (_classNames = {}, _defineProperty(_classNames, "".concat(prefix, "--snippet--").concat(type), type), _defineProperty(_classNames, "".concat(prefix, "--snippet--expand"), expandedCode), _defineProperty(_classNames, "".concat(prefix, "--snippet--light"), light), _defineProperty(_classNames, "".concat(prefix, "--snippet--no-copy"), hideCopyButton), _defineProperty(_classNames, "".concat(prefix, "--snippet--wraptext"), wrapText), _classNames));
  var expandCodeBtnText = expandedCode ? showLessText : showMoreText;

  if (type === 'inline') {
    if (hideCopyButton) {
      return /*#__PURE__*/_react.default.createElement("span", {
        className: codeSnippetClasses
      }, /*#__PURE__*/_react.default.createElement("code", {
        id: uid
      }, children));
    }

    return /*#__PURE__*/_react.default.createElement(_Copy.default, _extends({}, rest, {
      onClick: onClick,
      "aria-label": copyLabel || ariaLabel,
      "aria-describedby": uid,
      className: codeSnippetClasses,
      feedback: feedback
    }), /*#__PURE__*/_react.default.createElement("code", {
      id: uid
    }, children));
  }

  return /*#__PURE__*/_react.default.createElement("div", _extends({}, rest, {
    className: codeSnippetClasses
  }), /*#__PURE__*/_react.default.createElement("div", {
    ref: codeContainerRef,
    role: type === 'single' ? 'textbox' : null,
    tabIndex: type === 'single' ? 0 : null,
    className: "".concat(prefix, "--snippet-container"),
    "aria-label": ariaLabel || copyLabel || 'code-snippet',
    onScroll: type === 'single' && handleScroll || null
  }, /*#__PURE__*/_react.default.createElement("code", null, /*#__PURE__*/_react.default.createElement("pre", {
    ref: codeContentRef,
    onScroll: type === 'multi' && handleScroll || null
  }, children))), hasLeftOverflow && /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(prefix, "--snippet__overflow-indicator--left")
  }), hasRightOverflow && /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(prefix, "--snippet__overflow-indicator--right")
  }), !hideCopyButton && /*#__PURE__*/_react.default.createElement(_CopyButton.default, {
    onClick: onClick,
    feedback: feedback,
    iconDescription: copyButtonDescription
  }), shouldShowMoreLessBtn && /*#__PURE__*/_react.default.createElement(_Button.default, {
    kind: "ghost",
    size: "small",
    className: "".concat(prefix, "--snippet-btn--expand"),
    onClick: function onClick() {
      return setExpandedCode(!expandedCode);
    }
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "".concat(prefix, "--snippet-btn--text")
  }, expandCodeBtnText), /*#__PURE__*/_react.default.createElement(_iconsReact.ChevronDown16, {
    "aria-label": expandCodeBtnText,
    className: "".concat(prefix, "--icon-chevron--down ").concat(prefix, "--snippet__icon"),
    name: "chevron--down",
    role: "img"
  })));
}

CodeSnippet.propTypes = {
  /**
   * Specify a label to be read by screen readers on the containing <textbox>
   * node
   */
  ariaLabel: _propTypes.default.string,

  /**
   * Provide the content of your CodeSnippet as a string
   */
  children: _propTypes.default.string,

  /**
   * Specify an optional className to be applied to the container node
   */
  className: _propTypes.default.string,

  /**
   * Specify the description for the Copy Button
   */
  copyButtonDescription: _propTypes.default.string,

  /**
   * Specify a label to be read by screen readers on the containing <textbox>
   * node
   */
  copyLabel: _propTypes.default.string,

  /**
   * Specify the string displayed when the snippet is copied
   */
  feedback: _propTypes.default.string,

  /**
   * Specify whether or not a copy button should be used/rendered.
   */
  hideCopyButton: _propTypes.default.bool,

  /**
   * Specify whether you are using the light variant of the Code Snippet,
   * typically used for inline snippet to display an alternate color
   */
  light: _propTypes.default.bool,

  /**
   * An optional handler to listen to the `onClick` even fired by the Copy
   * Button
   */
  onClick: _propTypes.default.func,

  /**
   * Specify a string that is displayed when the Code Snippet has been
   * interacted with to show more lines
   */
  showLessText: _propTypes.default.string,

  /**
   * Specify a string that is displayed when the Code Snippet text is more
   * than 15 lines
   */
  showMoreText: _propTypes.default.string,

  /**
   * Provide the type of Code Snippet
   */
  type: _propTypes.default.oneOf(['single', 'inline', 'multi']),

  /**
   * Specify whether or not to wrap the text.
   */
  wrapText: _propTypes.default.bool
};
CodeSnippet.defaultProps = {
  type: 'single',
  showMoreText: 'Show more',
  showLessText: 'Show less',
  wrapText: false
};
var _default = CodeSnippet;
exports.default = _default;