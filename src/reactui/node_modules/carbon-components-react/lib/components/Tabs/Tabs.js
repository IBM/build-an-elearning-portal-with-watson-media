"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _carbonComponents = require("carbon-components");

var _iconsReact = require("@carbon/icons-react");

var _lodash = _interopRequireDefault(require("lodash.debounce"));

var _keyboard = require("../../internal/keyboard");

var _TabContent = _interopRequireDefault(require("../TabContent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var prefix = _carbonComponents.settings.prefix;

var Tabs = /*#__PURE__*/function (_React$Component) {
  _inherits(Tabs, _React$Component);

  var _super = _createSuper(Tabs);

  function Tabs() {
    var _this;

    _classCallCheck(this, Tabs);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      horizontalOverflow: false
    });

    _defineProperty(_assertThisInitialized(_this), "tablist", /*#__PURE__*/_react.default.createRef());

    _defineProperty(_assertThisInitialized(_this), "leftOverflowNavButton", /*#__PURE__*/_react.default.createRef());

    _defineProperty(_assertThisInitialized(_this), "rightOverflowNavButton", /*#__PURE__*/_react.default.createRef());

    _defineProperty(_assertThisInitialized(_this), "OVERFLOW_BUTTON_OFFSET", 40);

    _defineProperty(_assertThisInitialized(_this), "handleScroll", function () {
      var _this$tablist;

      if (!((_this$tablist = _this.tablist) === null || _this$tablist === void 0 ? void 0 : _this$tablist.current)) {
        return;
      }

      var _this$tablist$current = _this.tablist.current,
          tablistClientWidth = _this$tablist$current.clientWidth,
          tablistScrollLeft = _this$tablist$current.scrollLeft,
          tablistScrollWidth = _this$tablist$current.scrollWidth;

      _this.setState({
        tablistClientWidth: tablistClientWidth,
        horizontalOverflow: tablistScrollWidth > tablistClientWidth,
        tablistScrollWidth: tablistScrollWidth,
        tablistScrollLeft: tablistScrollLeft
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_debouncedHandleWindowResize", null);

    _defineProperty(_assertThisInitialized(_this), "_handleWindowResize", _this.handleScroll);

    _defineProperty(_assertThisInitialized(_this), "getEnabledTabs", function () {
      return _react.default.Children.toArray(_this.props.children).reduce(function (enabledTabs, tab, index) {
        return !tab.props.disabled ? enabledTabs.concat(index) : enabledTabs;
      }, []);
    });

    _defineProperty(_assertThisInitialized(_this), "getNextIndex", function (index, direction) {
      var enabledTabs = _this.getEnabledTabs();

      var nextIndex = Math.max(enabledTabs.indexOf(index) + direction, // For `tab` not found in `enabledTabs`
      -1);
      var nextIndexLooped = nextIndex >= 0 && nextIndex < enabledTabs.length ? nextIndex : nextIndex - Math.sign(nextIndex) * enabledTabs.length;
      return enabledTabs[nextIndexLooped];
    });

    _defineProperty(_assertThisInitialized(_this), "getDirection", function (evt) {
      if ((0, _keyboard.match)(evt, _keyboard.keys.ArrowLeft)) {
        return -1;
      }

      if ((0, _keyboard.match)(evt, _keyboard.keys.ArrowRight)) {
        return 1;
      }

      return 0;
    });

    _defineProperty(_assertThisInitialized(_this), "getTabAt", function (index, useFresh) {
      return !useFresh && _this["tab".concat(index)] || _react.default.Children.toArray(_this.props.children)[index];
    });

    _defineProperty(_assertThisInitialized(_this), "scrollTabIntoView", function (event, _ref) {
      var index = _ref.index;

      var tab = _this.getTabAt(index);

      if ((0, _keyboard.matches)(event, [_keyboard.keys.ArrowLeft, _keyboard.keys.ArrowRight]) || event.type === 'click') {
        var _tab$tabAnchor;

        var currentScrollLeft = _this.state.tablistScrollLeft;
        tab === null || tab === void 0 ? void 0 : (_tab$tabAnchor = tab.tabAnchor) === null || _tab$tabAnchor === void 0 ? void 0 : _tab$tabAnchor.scrollIntoView({
          block: 'nearest',
          inline: 'nearest'
        });
        var newScrollLeft = _this.tablist.current.scrollLeft;

        if (newScrollLeft > currentScrollLeft) {
          _this.tablist.current.scrollLeft += _this.OVERFLOW_BUTTON_OFFSET;
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "selectTabAt", function (event, _ref2) {
      var index = _ref2.index,
          onSelectionChange = _ref2.onSelectionChange;

      _this.scrollTabIntoView(event, {
        index: index
      });

      if (_this.state.selected !== index) {
        _this.setState({
          selected: index
        });

        if (typeof onSelectionChange === 'function') {
          onSelectionChange(index);
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleTabKeyDown", function (onSelectionChange) {
      return function (index, evt) {
        if ((0, _keyboard.matches)(evt, [_keyboard.keys.Enter, _keyboard.keys.Space])) {
          _this.selectTabAt(evt, {
            index: index,
            onSelectionChange: onSelectionChange
          });
        }

        var nextIndex = function () {
          if ((0, _keyboard.matches)(evt, [_keyboard.keys.ArrowLeft, _keyboard.keys.ArrowRight])) {
            return _this.getNextIndex(index, _this.getDirection(evt));
          }

          if ((0, _keyboard.match)(evt, _keyboard.keys.Home)) {
            return 0;
          }

          if ((0, _keyboard.match)(evt, _keyboard.keys.End)) {
            return _this.getEnabledTabs().pop();
          }
        }();

        var tab = _this.getTabAt(nextIndex);

        if ((0, _keyboard.matches)(evt, [_keyboard.keys.ArrowLeft, _keyboard.keys.ArrowRight, _keyboard.keys.Home, _keyboard.keys.End])) {
          var _tab$tabAnchor2;

          evt.preventDefault();

          if (_this.props.selectionMode !== 'manual') {
            _this.selectTabAt(evt, {
              index: nextIndex,
              onSelectionChange: onSelectionChange
            });
          } else {
            _this.scrollTabIntoView(evt, {
              index: nextIndex
            });
          }

          tab === null || tab === void 0 ? void 0 : (_tab$tabAnchor2 = tab.tabAnchor) === null || _tab$tabAnchor2 === void 0 ? void 0 : _tab$tabAnchor2.focus();
        }
      };
    });

    _defineProperty(_assertThisInitialized(_this), "getTabs", function () {
      return _react.default.Children.map(_this.props.children, function (tab) {
        return tab;
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleTabClick", function (onSelectionChange) {
      return function (index, evt) {
        evt.preventDefault();

        _this.selectTabAt(evt, {
          index: index,
          onSelectionChange: onSelectionChange
        });
      };
    });

    _defineProperty(_assertThisInitialized(_this), "setTabAt", function (index, tabRef) {
      _this["tab".concat(index)] = tabRef;
    });

    _defineProperty(_assertThisInitialized(_this), "overflowNavInterval", null);

    _defineProperty(_assertThisInitialized(_this), "handleOverflowNavClick", function (_, _ref3) {
      var _this$tablist2;

      var direction = _ref3.direction,
          _ref3$multiplier = _ref3.multiplier,
          multiplier = _ref3$multiplier === void 0 ? 10 : _ref3$multiplier;

      // account for overflow button appearing and causing tablist width change
      var _this$tablist$current2 = (_this$tablist2 = _this.tablist) === null || _this$tablist2 === void 0 ? void 0 : _this$tablist2.current,
          clientWidth = _this$tablist$current2.clientWidth,
          scrollLeft = _this$tablist$current2.scrollLeft,
          scrollWidth = _this$tablist$current2.scrollWidth;

      if (direction === 1 && !scrollLeft) {
        _this.tablist.current.scrollLeft += _this.OVERFLOW_BUTTON_OFFSET;
      }

      _this.tablist.current.scrollLeft += direction * multiplier;
      var leftEdgeReached = direction === -1 && scrollLeft < _this.OVERFLOW_BUTTON_OFFSET;
      var rightEdgeReached = direction === 1 && scrollLeft + clientWidth >= scrollWidth - _this.OVERFLOW_BUTTON_OFFSET;

      if (leftEdgeReached || rightEdgeReached) {
        if (leftEdgeReached) {
          var _this$rightOverflowNa, _this$rightOverflowNa2;

          (_this$rightOverflowNa = _this.rightOverflowNavButton) === null || _this$rightOverflowNa === void 0 ? void 0 : (_this$rightOverflowNa2 = _this$rightOverflowNa.current) === null || _this$rightOverflowNa2 === void 0 ? void 0 : _this$rightOverflowNa2.focus();
        }

        if (rightEdgeReached) {
          var _this$leftOverflowNav, _this$leftOverflowNav2;

          (_this$leftOverflowNav = _this.leftOverflowNavButton) === null || _this$leftOverflowNav === void 0 ? void 0 : (_this$leftOverflowNav2 = _this$leftOverflowNav.current) === null || _this$leftOverflowNav2 === void 0 ? void 0 : _this$leftOverflowNav2.focus();
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleOverflowNavMouseDown", function (event, _ref4) {
      var direction = _ref4.direction;

      // disregard mouse buttons aside from LMB
      if (event.buttons !== 1) {
        return;
      }

      _this.overflowNavInterval = setInterval(function () {
        var _this$tablist3;

        var _this$tablist$current3 = (_this$tablist3 = _this.tablist) === null || _this$tablist3 === void 0 ? void 0 : _this$tablist3.current,
            clientWidth = _this$tablist$current3.clientWidth,
            scrollLeft = _this$tablist$current3.scrollLeft,
            scrollWidth = _this$tablist$current3.scrollWidth; // clear interval if scroll reaches left or right edge


        var leftEdgeReached = direction === -1 && scrollLeft < _this.OVERFLOW_BUTTON_OFFSET;
        var rightEdgeReached = direction === 1 && scrollLeft + clientWidth >= scrollWidth - _this.OVERFLOW_BUTTON_OFFSET;

        if (leftEdgeReached || rightEdgeReached) {
          clearInterval(_this.overflowNavInterval);
        } // account for overflow button appearing and causing tablist width change


        _this.handleOverflowNavClick(event, {
          direction: direction
        });
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleOverflowNavMouseUp", function () {
      clearInterval(_this.overflowNavInterval);
    });

    return _this;
  }

  _createClass(Tabs, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$tablist4;

      if (!this._debouncedHandleWindowResize) {
        this._debouncedHandleWindowResize = (0, _lodash.default)(this._handleWindowResize, 200);
      }

      this._handleWindowResize();

      window.addEventListener('resize', this._debouncedHandleWindowResize); // scroll selected tab into view on mount

      var _ref5 = ((_this$tablist4 = this.tablist) === null || _this$tablist4 === void 0 ? void 0 : _this$tablist4.current) || {},
          tablistClientWidth = _ref5.clientWidth,
          tablistScrollLeft = _ref5.scrollLeft,
          tablistScrollWidth = _ref5.scrollWidth;

      var tab = this.getTabAt(this.state.selected);
      var horizontalOverflow = tablistScrollWidth > tablistClientWidth;

      if (horizontalOverflow) {
        var _tab$tabAnchor3, _tab$tabAnchor4, _tab$tabAnchor5;

        var leftOverflowNavButtonHidden = (tab === null || tab === void 0 ? void 0 : (_tab$tabAnchor3 = tab.tabAnchor) === null || _tab$tabAnchor3 === void 0 ? void 0 : _tab$tabAnchor3.getBoundingClientRect().right) < (tab === null || tab === void 0 ? void 0 : (_tab$tabAnchor4 = tab.tabAnchor) === null || _tab$tabAnchor4 === void 0 ? void 0 : _tab$tabAnchor4.offsetParent.getBoundingClientRect().right);
        var rightOverflowNavButtonHidden = tablistScrollLeft + tablistClientWidth === tablistScrollWidth;
        tab === null || tab === void 0 ? void 0 : (_tab$tabAnchor5 = tab.tabAnchor) === null || _tab$tabAnchor5 === void 0 ? void 0 : _tab$tabAnchor5.scrollIntoView({
          block: 'nearest',
          inline: 'nearest'
        }); // account for overflow buttons in scroll position on mount

        if (!leftOverflowNavButtonHidden && !rightOverflowNavButtonHidden) {
          this.tablist.current.scrollLeft += this.OVERFLOW_BUTTON_OFFSET * 2;
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this._debouncedHandleWindowResize) {
        this._debouncedHandleWindowResize.cancel();
      }

      window.removeEventListener('resize', this._debouncedHandleWindowResize);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(_, prevState) {
      // compare current tablist properties to current state
      var _this$tablist$current4 = this.tablist.current,
          tablistClientWidth = _this$tablist$current4.clientWidth,
          tablistScrollLeft = _this$tablist$current4.scrollLeft,
          tablistScrollWidth = _this$tablist$current4.scrollWidth;
      var _this$state = this.state,
          currentStateClientWidth = _this$state.tablistClientWidth,
          currentStateScrollLeft = _this$state.tablistScrollLeft,
          currentStateScrollWidth = _this$state.tablistScrollWidth,
          selected = _this$state.selected;

      if (tablistClientWidth !== currentStateClientWidth || tablistScrollLeft !== currentStateScrollLeft || tablistScrollWidth !== currentStateScrollWidth) {
        this.setState({
          horizontalOverflow: tablistScrollWidth > tablistClientWidth,
          tablistClientWidth: tablistClientWidth,
          tablistScrollLeft: tablistScrollLeft,
          tablistScrollWidth: tablistScrollWidth
        });
      }

      if (prevState.selected !== selected) {
        var _this$getTabAt, _this$getTabAt$tabAnc;

        (_this$getTabAt = this.getTabAt(selected)) === null || _this$getTabAt === void 0 ? void 0 : (_this$getTabAt$tabAnc = _this$getTabAt.tabAnchor) === null || _this$getTabAt$tabAnc === void 0 ? void 0 : _this$getTabAt$tabAnc.scrollIntoView({
          block: 'nearest',
          inline: 'nearest'
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this,
          _classNames,
          _classNames2,
          _classNames3;

      var _this$props = this.props,
          className = _this$props.className,
          type = _this$props.type,
          light = _this$props.light,
          onSelectionChange = _this$props.onSelectionChange,
          selectionMode = _this$props.selectionMode,
          tabContentClassName = _this$props.tabContentClassName,
          other = _objectWithoutProperties(_this$props, ["className", "type", "light", "onSelectionChange", "selectionMode", "tabContentClassName"]);
      /**
       * The tab panel acts like a tab panel when the screen is wider, but acts
       * like a select list when the screen is narrow.  In the wide case we want
       * to allow the user to use the tab key to set the focus in the tab panel
       * and then use the left and right arrow keys to navigate the tabs.  In the
       * narrow case we want to use the tab key to select different options in
       * the list.
       *
       * We set the tab index based on the different states so the browser will treat
       * the whole tab panel as a single focus component when it looks like a tab
       * panel and separate components when it looks like a select list.
       */


      var tabsWithProps = this.getTabs().map(function (tab, index) {
        var tabIndex = index === _this2.state.selected ? 0 : -1;

        var newTab = /*#__PURE__*/_react.default.cloneElement(tab, {
          index: index,
          selected: index === _this2.state.selected,
          handleTabClick: _this2.handleTabClick(onSelectionChange),
          tabIndex: tabIndex,
          ref: function ref(e) {
            _this2.setTabAt(index, e);
          },
          handleTabKeyDown: _this2.handleTabKeyDown(onSelectionChange)
        });

        return newTab;
      });

      var tabContentWithProps = _react.default.Children.map(tabsWithProps, function (tab) {
        var _tab$props = tab.props,
            tabId = _tab$props.id,
            children = _tab$props.children,
            selected = _tab$props.selected,
            _tab$props$renderCont = _tab$props.renderContent,
            Content = _tab$props$renderCont === void 0 ? _TabContent.default : _tab$props$renderCont;
        return /*#__PURE__*/_react.default.createElement(Content, {
          id: tabId && "".concat(tabId, "__panel"),
          className: tabContentClassName,
          hidden: !selected,
          selected: selected,
          "aria-labelledby": tabId
        }, children);
      });

      var leftOverflowNavButtonHidden = !this.state.horizontalOverflow || !this.state.tablistScrollLeft;
      var rightOverflowNavButtonHidden = !this.state.horizontalOverflow || this.state.tablistScrollLeft + this.state.tablistClientWidth === this.state.tablistScrollWidth;
      var classes = {
        // TODO: remove scrollable from classnames in next major release and uncomment classnames that don't contain scrollable
        tabs: (0, _classnames.default)(className, // `${prefix}--tabs`,
        "".concat(prefix, "--tabs--scrollable"), (_classNames = {}, _defineProperty(_classNames, "".concat(prefix, "--tabs--scrollable--container"), type === 'container'), _defineProperty(_classNames, "".concat(prefix, "--tabs--scrollable--light"), light), _classNames)),
        // TODO: remove scrollable from classnames in next major release and uncomment classnames that don't contain scrollable
        tablist: (0, _classnames.default)( // `${prefix}--tabs__nav`,
        "".concat(prefix, "--tabs--scrollable__nav")),
        leftOverflowButtonClasses: (0, _classnames.default)((_classNames2 = {}, _defineProperty(_classNames2, "".concat(prefix, "--tab--overflow-nav-button"), this.state.horizontalOverflow), _defineProperty(_classNames2, "".concat(prefix, "--tab--overflow-nav-button--hidden"), leftOverflowNavButtonHidden), _classNames2)),
        rightOverflowButtonClasses: (0, _classnames.default)((_classNames3 = {}, _defineProperty(_classNames3, "".concat(prefix, "--tab--overflow-nav-button"), this.state.horizontalOverflow), _defineProperty(_classNames3, "".concat(prefix, "--tab--overflow-nav-button--hidden"), rightOverflowNavButtonHidden), _classNames3))
      };
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", _extends({}, other, {
        className: classes.tabs,
        onScroll: this.handleScroll
      }), /*#__PURE__*/_react.default.createElement("button", {
        "aria-hidden": "true",
        className: classes.leftOverflowButtonClasses,
        onClick: function onClick(_) {
          return _this2.handleOverflowNavClick(_, {
            direction: -1
          });
        },
        onMouseDown: function onMouseDown(event) {
          return _this2.handleOverflowNavMouseDown(event, {
            direction: -1
          });
        },
        onMouseUp: this.handleOverflowNavMouseUp,
        ref: this.leftOverflowNavButton,
        tabIndex: "-1",
        type: "button"
      }, /*#__PURE__*/_react.default.createElement(_iconsReact.ChevronLeft16, null)), !leftOverflowNavButtonHidden && /*#__PURE__*/_react.default.createElement("div", {
        className: "".concat(prefix, "--tabs__overflow-indicator--left")
      }), /*#__PURE__*/_react.default.createElement("ul", {
        role: "tablist",
        tabIndex: -1,
        className: classes.tablist,
        ref: this.tablist
      }, tabsWithProps), !rightOverflowNavButtonHidden && /*#__PURE__*/_react.default.createElement("div", {
        className: "".concat(prefix, "--tabs__overflow-indicator--right")
      }), /*#__PURE__*/_react.default.createElement("button", {
        "aria-hidden": "true",
        className: classes.rightOverflowButtonClasses,
        onClick: function onClick(_) {
          return _this2.handleOverflowNavClick(_, {
            direction: 1
          });
        },
        onMouseDown: function onMouseDown(event) {
          return _this2.handleOverflowNavMouseDown(event, {
            direction: 1
          });
        },
        onMouseUp: this.handleOverflowNavMouseUp,
        ref: this.rightOverflowNavButton,
        tabIndex: "-1",
        type: "button"
      }, /*#__PURE__*/_react.default.createElement(_iconsReact.ChevronRight16, null))), tabContentWithProps);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(_ref6, state) {
      var selected = _ref6.selected;
      var prevSelected = state.prevSelected;
      return prevSelected === selected ? null : {
        selected: selected,
        prevSelected: selected
      };
    }
    /**
     * `scroll` event handler to save tablist clientWidth, scrollWidth, and
     * scrollLeft
     */

  }]);

  return Tabs;
}(_react.default.Component);

exports.default = Tabs;

_defineProperty(Tabs, "propTypes", {
  /**
   * Pass in a collection of <Tab> children to be rendered depending on the
   * currently selected tab
   */
  children: _propTypes.default.node,

  /**
   * Provide a className that is applied to the root <div> component for the
   * <Tabs>
   */
  className: _propTypes.default.string,

  /**
   * Specify whether the Tab content is hidden
   */
  hidden: _propTypes.default.bool,

  /**
   * Specify whether or not to use the light component variant
   */
  light: _propTypes.default.bool,

  /**
   * Optionally provide an `onClick` handler that is invoked when a <Tab> is
   * clicked
   */
  onClick: _propTypes.default.func,

  /**
   * Optionally provide an `onKeyDown` handler that is invoked when keyed
   * navigation is triggered
   */
  onKeyDown: _propTypes.default.func,

  /**
   * Provide an optional handler that is called whenever the selection
   * changes. This method is called with the index of the tab that was
   * selected
   */
  onSelectionChange: _propTypes.default.func,

  /**
   * Optionally provide an index for the currently selected <Tab>
   */
  selected: _propTypes.default.number,

  /**
   * Choose whether or not to automatically change selection on focus
   */
  selectionMode: _propTypes.default.oneOf(['automatic', 'manual']),

  /**
   * Provide a className that is applied to the <TabContent> components
   */
  tabContentClassName: _propTypes.default.string,

  /**
   * Provide the type of Tab
   */
  type: _propTypes.default.oneOf(['default', 'container'])
});

_defineProperty(Tabs, "defaultProps", {
  type: 'default',
  selected: 0,
  selectionMode: 'automatic'
});