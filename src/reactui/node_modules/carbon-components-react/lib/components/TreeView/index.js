"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "TreeNode", {
  enumerable: true,
  get: function get() {
    return _TreeNode.default;
  }
});
exports.default = void 0;

var _TreeView = _interopRequireDefault(require("./TreeView"));

var _TreeNode = _interopRequireDefault(require("./TreeNode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
_TreeView.default.TreeNode = _TreeNode.default;
var _default = _TreeView.default;
exports.default = _default;