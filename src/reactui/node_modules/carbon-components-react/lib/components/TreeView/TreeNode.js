"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TreeNode;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _iconsReact = require("@carbon/icons-react");

var _classnames = _interopRequireDefault(require("classnames"));

var _carbonComponents = require("carbon-components");

var _keyboard = require("../../internal/keyboard");

var _uniqueId = _interopRequireDefault(require("../../tools/uniqueId"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

function TreeNode(_ref) {
  var _classNames, _objectSpread2;

  var active = _ref.active,
      children = _ref.children,
      className = _ref.className,
      depth = _ref.depth,
      disabled = _ref.disabled,
      isExpanded = _ref.isExpanded,
      label = _ref.label,
      onNodeFocusEvent = _ref.onNodeFocusEvent,
      onNodeSelect = _ref.onSelect,
      onToggle = _ref.onToggle,
      onTreeSelect = _ref.onTreeSelect,
      Icon = _ref.renderIcon,
      selected = _ref.selected,
      value = _ref.value,
      rest = _objectWithoutProperties(_ref, ["active", "children", "className", "depth", "disabled", "isExpanded", "label", "onNodeFocusEvent", "onSelect", "onToggle", "onTreeSelect", "renderIcon", "selected", "value"]);

  var _useRef = (0, _react.useRef)(rest.id || (0, _uniqueId.default)()),
      id = _useRef.current;

  var _useState = (0, _react.useState)(isExpanded),
      _useState2 = _slicedToArray(_useState, 2),
      expanded = _useState2[0],
      setExpanded = _useState2[1];

  var currentNode = (0, _react.useRef)(null);
  var currentNodeLabel = (0, _react.useRef)(null);

  var nodesWithProps = _react.default.Children.map(children, function (node) {
    if ( /*#__PURE__*/_react.default.isValidElement(node)) {
      return /*#__PURE__*/_react.default.cloneElement(node, {
        active: active,
        depth: depth + 1,
        disabled: disabled,
        onTreeSelect: onTreeSelect,
        selected: selected,
        tabIndex: !node.props.disabled && -1 || null
      });
    }
  });

  var isActive = active === id;
  var isSelected = selected.includes(id);
  var treeNodeClasses = (0, _classnames.default)(className, "".concat(prefix, "--tree-node"), (_classNames = {}, _defineProperty(_classNames, "".concat(prefix, "--tree-node--active"), isActive), _defineProperty(_classNames, "".concat(prefix, "--tree-node--disabled"), disabled), _defineProperty(_classNames, "".concat(prefix, "--tree-node--selected"), isSelected), _defineProperty(_classNames, "".concat(prefix, "--tree-node--with-icon"), Icon), _defineProperty(_classNames, "".concat(prefix, "--tree-leaf-node"), !children), _defineProperty(_classNames, "".concat(prefix, "--tree-parent-node"), children), _classNames));
  var toggleClasses = (0, _classnames.default)("".concat(prefix, "--tree-parent-node__toggle-icon"), _defineProperty({}, "".concat(prefix, "--tree-parent-node__toggle-icon--expanded"), expanded));

  function handleToggleClick(event) {
    if (onToggle) {
      onToggle(event, {
        id: id,
        isExpanded: !expanded,
        label: label,
        value: value
      });
    }

    setExpanded(!expanded);
  }

  function handleClick(event) {
    event.stopPropagation();

    if (!disabled) {
      if (onTreeSelect) {
        onTreeSelect(event, {
          id: id,
          label: label,
          value: value
        });
      }

      if (onNodeSelect) {
        onNodeSelect(event, {
          id: id,
          label: label,
          value: value
        });
      }

      if (rest.onClick) {
        rest.onClick(event);
      }
    }
  }

  function handleKeyDown(event) {
    if ((0, _keyboard.matches)(event, [_keyboard.keys.ArrowLeft, _keyboard.keys.ArrowRight, _keyboard.keys.Enter])) {
      event.stopPropagation();
    }

    if ((0, _keyboard.match)(event, _keyboard.keys.ArrowLeft)) {
      var findParentTreeNode = function findParentTreeNode(node) {
        if (node.classList.contains("".concat(prefix, "--tree-parent-node"))) {
          return node;
        }

        if (node.classList.contains("".concat(prefix, "--tree"))) {
          return null;
        }

        return findParentTreeNode(node.parentNode);
      };

      if (children && expanded) {
        onToggle(event, {
          id: id,
          isExpanded: false,
          label: label,
          value: value
        });
        setExpanded(false);
      } else {
        var _findParentTreeNode;

        /**
         * When focus is on a leaf node or a closed parent node, move focus to
         * its parent node (unless its depth is level 1)
         */
        (_findParentTreeNode = findParentTreeNode(currentNode.current.parentNode)) === null || _findParentTreeNode === void 0 ? void 0 : _findParentTreeNode.focus();
      }
    }

    if (children && (0, _keyboard.match)(event, _keyboard.keys.ArrowRight)) {
      if (expanded) {
        /**
         * When focus is on an expanded parent node, move focus to the first
         * child node
         */
        currentNode.current.lastChild.firstChild.focus();
      } else {
        onToggle(event, {
          id: id,
          isExpanded: true,
          label: label,
          value: value
        });
        setExpanded(true);
      }
    }

    if ((0, _keyboard.matches)(event, [_keyboard.keys.Enter, _keyboard.keys.Space])) {
      event.preventDefault();
      handleClick(event);
    }

    if (rest.onKeyDown) {
      rest.onKeyDown(event);
    }
  }

  function handleFocusEvent(event) {
    if (event.type === 'blur' && rest.onBlur) {
      rest.onBlur(event);
    }

    if (event.type === 'focus' && rest.onFocus) {
      rest.onFocus(event);
    }

    onNodeFocusEvent && onNodeFocusEvent(event);
  }

  (0, _react.useEffect)(function () {
    /**
     * Negative margin shifts node to align with the left side boundary of the
     * tree
     * Dynamically calculate padding to recreate tree node indentation
     * - parent nodes have (depth + 1rem) left padding
     * - leaf nodes have (depth + 2.5rem) left padding without icons (because
     *   of expando icon + spacing)
     * - leaf nodes have (depth + 2rem) left padding with icons (because of
     *   reduced spacing between the expando icon and the node icon + label)
     */
    var calcOffset = function calcOffset() {
      // parent node
      if (children) {
        return depth + 1;
      } // leaf node with icon


      if (Icon) {
        return depth + 2;
      } // leaf node without icon


      return depth + 2.5;
    };

    if (currentNodeLabel.current) {
      currentNodeLabel.current.style.marginLeft = "-".concat(calcOffset(), "rem");
      currentNodeLabel.current.style.paddingLeft = "".concat(calcOffset(), "rem");
    } // sync props and state


    setExpanded(isExpanded);
  }, [children, depth, Icon, isExpanded]);

  var treeNodeProps = _objectSpread(_objectSpread({}, rest), {}, (_objectSpread2 = {}, _defineProperty(_objectSpread2, 'aria-current', isActive || null), _defineProperty(_objectSpread2, 'aria-selected', disabled ? null : isSelected), _defineProperty(_objectSpread2, 'aria-disabled', disabled), _defineProperty(_objectSpread2, "className", treeNodeClasses), _defineProperty(_objectSpread2, "id", id), _defineProperty(_objectSpread2, "onBlur", handleFocusEvent), _defineProperty(_objectSpread2, "onClick", handleClick), _defineProperty(_objectSpread2, "onFocus", handleFocusEvent), _defineProperty(_objectSpread2, "onKeyDown", handleKeyDown), _defineProperty(_objectSpread2, "ref", currentNode), _defineProperty(_objectSpread2, "role", 'treeitem'), _objectSpread2));

  if (!children) {
    return /*#__PURE__*/_react.default.createElement("li", treeNodeProps, /*#__PURE__*/_react.default.createElement("div", {
      className: "".concat(prefix, "--tree-node__label"),
      ref: currentNodeLabel
    }, Icon && /*#__PURE__*/_react.default.createElement(Icon, {
      className: "".concat(prefix, "--tree-node__icon")
    }), label));
  }

  return /*#__PURE__*/_react.default.createElement("li", _extends({}, treeNodeProps, {
    "aria-expanded": !!expanded
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(prefix, "--tree-node__label"),
    ref: currentNodeLabel
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "".concat(prefix, "--tree-parent-node__toggle"),
    disabled: disabled,
    onClick: handleToggleClick
  }, /*#__PURE__*/_react.default.createElement(_iconsReact.CaretDown16, {
    className: toggleClasses
  })), /*#__PURE__*/_react.default.createElement("span", {
    className: "".concat(prefix, "--tree-node__label__details")
  }, Icon && /*#__PURE__*/_react.default.createElement(Icon, {
    className: "".concat(prefix, "--tree-node__icon")
  }), label)), expanded && /*#__PURE__*/_react.default.createElement("ul", {
    role: "group",
    className: "".concat(prefix, "--tree-node__children")
  }, nodesWithProps));
}

TreeNode.propTypes = {
  /**
   * The value of the active node in the tree
   */
  active: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),

  /**
   * Specify the children of the TreeNode
   */
  children: _propTypes.default.node,

  /**
   * Specify an optional className to be applied to the TreeNode
   */
  className: _propTypes.default.string,

  /**
   * TreeNode depth to determine spacing, automatically calculated by default
   */
  depth: _propTypes.default.number,

  /**
   * Specify if the TreeNode is disabled
   */
  disabled: _propTypes.default.bool,

  /**
   * Specify if the TreeNode is expanded (only applicable to parent nodes)
   */
  isExpanded: _propTypes.default.bool,

  /**
   * Rendered label for the TreeNode
   */
  label: _propTypes.default.node,

  /**
   * Callback function for when the node receives or loses focus
   */
  onNodeFocusEvent: _propTypes.default.func,

  /**
   * Callback function for when the node is selected
   */
  onSelect: _propTypes.default.func,

  /**
   * Callback function for when a parent node is expanded or collapsed
   */
  onToggle: _propTypes.default.func,

  /**
   * Callback function for when any node in the tree is selected
   */
  onTreeSelect: _propTypes.default.func,

  /**
   * Optional prop to allow each node to have an associated icon.
   * Can be a React component class
   */
  renderIcon: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),

  /**
   * Array containing all selected node IDs in the tree
   */
  selected: _propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number])),

  /**
   * Specify the value of the TreeNode
   */
  value: _propTypes.default.string
};