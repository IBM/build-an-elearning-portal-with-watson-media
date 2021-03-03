"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TreeView;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _carbonComponents = require("carbon-components");

var _keyboard = require("../../internal/keyboard");

var _uniqueId = _interopRequireDefault(require("../../tools/uniqueId"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var prefix = _carbonComponents.settings.prefix;

function TreeView(_ref) {
  var prespecifiedActive = _ref.active,
      children = _ref.children,
      className = _ref.className,
      _ref$hideLabel = _ref.hideLabel,
      hideLabel = _ref$hideLabel === void 0 ? false : _ref$hideLabel,
      label = _ref.label,
      multiselect = _ref.multiselect,
      onSelect = _ref.onSelect,
      _ref$selected = _ref.selected,
      preselected = _ref$selected === void 0 ? [] : _ref$selected,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? 'default' : _ref$size,
      rest = _objectWithoutProperties(_ref, ["active", "children", "className", "hideLabel", "label", "multiselect", "onSelect", "selected", "size"]);

  var _useRef = (0, _react.useRef)(rest.id || (0, _uniqueId.default)()),
      treeId = _useRef.current;

  var treeClasses = (0, _classnames.default)(className, "".concat(prefix, "--tree"), _defineProperty({}, "".concat(prefix, "--tree--").concat(size), size !== 'default'));
  var treeRootRef = (0, _react.useRef)(null);
  var treeWalker = (0, _react.useRef)(treeRootRef === null || treeRootRef === void 0 ? void 0 : treeRootRef.current);

  var _useState = (0, _react.useState)(preselected),
      _useState2 = _slicedToArray(_useState, 2),
      selected = _useState2[0],
      setSelected = _useState2[1];

  var _useState3 = (0, _react.useState)(prespecifiedActive),
      _useState4 = _slicedToArray(_useState3, 2),
      active = _useState4[0],
      setActive = _useState4[1];

  function resetNodeTabIndices() {
    var _treeRootRef$current$, _treeRootRef$current;

    Array.prototype.forEach.call((_treeRootRef$current$ = treeRootRef === null || treeRootRef === void 0 ? void 0 : (_treeRootRef$current = treeRootRef.current) === null || _treeRootRef$current === void 0 ? void 0 : _treeRootRef$current.querySelectorAll('[tabIndex="0"]')) !== null && _treeRootRef$current$ !== void 0 ? _treeRootRef$current$ : [], function (item) {
      item.tabIndex = -1;
    });
  }

  function handleTreeSelect(event) {
    var node = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var nodeId = node.id;

    if (multiselect && (event.metaKey || event.ctrlKey)) {
      if (!selected.includes(nodeId)) {
        setSelected(selected.concat(nodeId));
      } else {
        setSelected(selected.filter(function (selectedId) {
          return selectedId !== nodeId;
        }));
      }
    } else {
      setSelected([nodeId]);
      setActive(nodeId);
    }

    if (onSelect) {
      onSelect(event, node);
    }
  }

  function handleFocusEvent(event) {
    if (event.type === 'blur') {
      var _treeRootRef$current2;

      var currentFocusedNode = event.relatedTarget,
          prevFocusedNode = event.target;

      if (treeRootRef === null || treeRootRef === void 0 ? void 0 : (_treeRootRef$current2 = treeRootRef.current) === null || _treeRootRef$current2 === void 0 ? void 0 : _treeRootRef$current2.contains(currentFocusedNode)) {
        prevFocusedNode.tabIndex = -1;
      }
    }

    if (event.type === 'focus') {
      var _treeRootRef$current3;

      resetNodeTabIndices();
      var _prevFocusedNode = event.relatedTarget,
          _currentFocusedNode = event.target;

      if (treeRootRef === null || treeRootRef === void 0 ? void 0 : (_treeRootRef$current3 = treeRootRef.current) === null || _treeRootRef$current3 === void 0 ? void 0 : _treeRootRef$current3.contains(_prevFocusedNode)) {
        _prevFocusedNode.tabIndex = -1;
      }

      _currentFocusedNode.tabIndex = 0;
    }
  }

  var focusTarget = false;

  var nodesWithProps = _react.default.Children.map(children, function (node) {
    var sharedNodeProps = {
      active: active,
      depth: 0,
      onNodeFocusEvent: handleFocusEvent,
      onTreeSelect: handleTreeSelect,
      selected: selected,
      tabIndex: !node.props.disabled && -1 || null
    };

    if (!focusTarget && !node.props.disabled) {
      sharedNodeProps.tabIndex = 0;
      focusTarget = true;
    }

    if ( /*#__PURE__*/_react.default.isValidElement(node)) {
      return /*#__PURE__*/_react.default.cloneElement(node, sharedNodeProps);
    }
  });

  function handleKeyDown(event) {
    event.stopPropagation();

    if ((0, _keyboard.matches)(event, [_keyboard.keys.ArrowUp, _keyboard.keys.ArrowDown])) {
      event.preventDefault();
    }

    treeWalker.current.currentNode = event.target;
    var nextFocusNode;

    if ((0, _keyboard.match)(event, _keyboard.keys.ArrowUp)) {
      nextFocusNode = treeWalker.current.previousNode();
    }

    if ((0, _keyboard.match)(event, _keyboard.keys.ArrowDown)) {
      nextFocusNode = treeWalker.current.nextNode();
    }

    if (nextFocusNode && nextFocusNode !== event.target) {
      resetNodeTabIndices();
      nextFocusNode.tabIndex = 0;
      nextFocusNode.focus();
    }

    if (rest.onKeyDown) {
      rest.onKeyDown(event);
    }
  }

  (0, _react.useEffect)(function () {
    var _treeWalker$current;

    treeWalker.current = (_treeWalker$current = treeWalker.current) !== null && _treeWalker$current !== void 0 ? _treeWalker$current : document.createTreeWalker(treeRootRef === null || treeRootRef === void 0 ? void 0 : treeRootRef.current, NodeFilter.SHOW_ELEMENT, {
      acceptNode: function acceptNode(node) {
        if (node.classList.contains("".concat(prefix, "--tree-node--disabled"))) {
          return NodeFilter.FILTER_REJECT;
        }

        if (node.matches("li.".concat(prefix, "--tree-node"))) {
          return NodeFilter.FILTER_ACCEPT;
        }

        return NodeFilter.FILTER_SKIP;
      }
    });
  }, []);
  (0, _react.useEffect)(function () {
    if (preselected.length) {
      setSelected(preselected);
    }

    if (prespecifiedActive) {
      setActive(prespecifiedActive);
    }
  }, [preselected, prespecifiedActive]);
  var labelId = "".concat(treeId, "__label");

  var TreeLabel = function TreeLabel() {
    return !hideLabel && /*#__PURE__*/_react.default.createElement("label", {
      id: labelId,
      className: "".concat(prefix, "--label")
    }, label);
  };

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(TreeLabel, null), /*#__PURE__*/_react.default.createElement("ul", _extends({}, rest, {
    "aria-label": hideLabel ? label : null,
    "aria-labelledby": !hideLabel ? labelId : null,
    "aria-multiselectable": multiselect || null,
    className: treeClasses,
    onKeyDown: handleKeyDown,
    ref: treeRootRef,
    role: "tree"
  }), nodesWithProps));
}

TreeView.propTypes = {
  /**
   * Mark the active node in the tree, represented by its value
   */
  active: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),

  /**
   * Specify the children of the TreeView
   */
  children: _propTypes.default.node,

  /**
   * Specify an optional className to be applied to the TreeView
   */
  className: _propTypes.default.string,

  /**
   * Specify whether or not the label should be hidden
   */
  hideLabel: _propTypes.default.bool,

  /**
   * Provide the label text that will be read by a screen reader
   */
  label: _propTypes.default.string.isRequired,

  /**
   * Specify the selection mode of the tree.
   * If `multiselect` is `false` then only one node can be selected at a time
   */
  multiselect: _propTypes.default.bool,

  /**
   * Callback function that is called when any node is seleected
   */
  onSelect: _propTypes.default.func,

  /**
   * Array representing all selected node IDs in the tree
   */
  selected: _propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number])),

  /**
   * Specify the size of the tree from a list of available sizes.
   */
  size: _propTypes.default.oneOf(['default', 'compact'])
};