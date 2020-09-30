"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Fruit =
/*#__PURE__*/
function () {
  function Fruit(xPos, yPos) {
    _classCallCheck(this, Fruit);

    this.xPos = xPos;
    this.yPos = yPos;
  }

  _createClass(Fruit, [{
    key: "render",
    value: function render() {
      return "\n        <div class=fruit style=\"display: inline-block; background-color: red; width: 20px; height: 20px; position: relative; top: ".concat(this.yPos, "; left: ").concat(this.xPos, "\"></div>\n        ");
    }
  }, {
    key: "xCoordinate",
    set: function set(xCoord) {
      this.xPos = xCoord;
    }
  }, {
    key: "yCoordinate",
    set: function set(yCoord) {
      this.yPos = yCoord;
    }
  }]);

  return Fruit;
}();

var _default = Fruit;
exports["default"] = _default;