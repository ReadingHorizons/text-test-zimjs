var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TimerEvent = (function (_super) {
    __extends(TimerEvent, _super);
    function TimerEvent(type, data, bubbles, cancelable) {
        if (data === void 0) { data = null; }
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        var _this = _super.call(this, type, bubbles, cancelable) || this;
        _this.data = data;
        return _this;
    }
    TimerEvent.TIMER = "TimerEvent:timer";
    TimerEvent.TIMER_COMPLETE = "TimerEvent:timerComplete";
    return TimerEvent;
}(createjs.Event));
var Timer = (function (_super) {
    __extends(Timer, _super);
    function Timer(delay, repeatCount) {
        if (repeatCount === void 0) { repeatCount = -1; }
        var _this = _super.call(this) || this;
        _this.handleInterval = function () {
            _this._currentCount++;
            if (_this._currentCount == _this._repeatCount) {
                _this.stop();
                _this.dispatchEvent(new TimerEvent(TimerEvent.TIMER_COMPLETE, _this));
                return;
            }
            _this.dispatchEvent(new TimerEvent(TimerEvent.TIMER, _this));
        };
        _this._delay = delay;
        _this._repeatCount = repeatCount;
        _this._init();
        return _this;
    }
    Object.defineProperty(Timer.prototype, "currentCount", {
        get: function () {
            return this._currentCount;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Timer.prototype, "delay", {
        get: function () {
            return this._delay;
        },
        set: function (value) {
            this._delay = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Timer.prototype, "repeatCount", {
        get: function () {
            return this._repeatCount;
        },
        set: function (value) {
            this._repeatCount = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Timer.prototype, "running", {
        get: function () {
            return this._running;
        },
        enumerable: false,
        configurable: true
    });
    Timer.prototype._init = function () {
        this._currentCount = 0;
    };
    Timer.prototype.reset = function () {
        this.stop();
        this._currentCount = 0;
        this.interval = null;
    };
    Timer.prototype.start = function () {
        if (this.interval) {
            clearInterval(this.interval);
        }
        this.interval = window.setInterval(this.handleInterval, this._delay);
        this._running = true;
    };
    Timer.prototype.stop = function () {
        if (this.interval) {
            clearInterval(this.interval);
        }
        this._running = false;
    };
    return Timer;
}(createjs.EventDispatcher));
var DelayData = (function () {
    function DelayData() {
    }
    return DelayData;
}());
var RGB = (function () {
    function RGB() {
    }
    return RGB;
}());
var Convert = (function () {
    function Convert() {
    }
    Convert.hexToRgb = function (hex) {
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
        });
        var value = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        var result = new RGB();
        result.r = parseInt(value[1], 16);
        result.g = parseInt(value[2], 16);
        result.b = parseInt(value[3], 16);
        return result;
    };
    return Convert;
}());
var DebugConsole = (function () {
    function DebugConsole() {
        this._init();
    }
    Object.defineProperty(DebugConsole.prototype, "bgAlpha", {
        get: function () {
            return this._bgAlpha;
        },
        set: function (value) {
            this._bgAlpha = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DebugConsole.prototype, "bgColor", {
        get: function () {
            return this._bgColor;
        },
        set: function (value) {
            this._bgColor = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DebugConsole.prototype, "fontColor", {
        get: function () {
            return this._fontColor;
        },
        set: function (value) {
            this._fontColor = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DebugConsole.prototype, "fontSize", {
        get: function () {
            return this._fontSize;
        },
        set: function (value) {
            this._fontSize = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DebugConsole.prototype, "height", {
        get: function () {
            return this._height;
        },
        set: function (value) {
            this._height = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DebugConsole.prototype, "padding", {
        get: function () {
            return this._padding;
        },
        set: function (value) {
            this._padding = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DebugConsole.prototype, "width", {
        get: function () {
            return this._width;
        },
        set: function (value) {
            this._width = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DebugConsole.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (value) {
            this._x = value;
            if (this.zimWindow) {
                this.zimWindow.x = this._x;
                this.windowBg.x = this._x;
                this.zimStage.update();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DebugConsole.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (value) {
            this._y = value;
            if (this.zimWindow) {
                this.zimWindow.y = this._y;
                this.windowBg.y = this._y;
                this.zimStage.update();
            }
        },
        enumerable: false,
        configurable: true
    });
    DebugConsole.prototype._init = function () {
        this._bgAlpha = .7;
        this._bgColor = "#444444";
        this._fontColor = "#FFFFFF";
        this._fontSize = 18;
        this._height = 200;
        this._padding = 10;
        this._width = 200;
        this._x = 0;
        this._y = 0;
    };
    DebugConsole.prototype.createBg = function () {
        var rgb = Convert.hexToRgb(this._bgColor);
        this.windowBg = new zim.Rectangle({
            width: this._width,
            height: this._height,
            color: "rgba(".concat(rgb.r, ", ").concat(rgb.g, ", ").concat(rgb.b, ", ").concat(this._bgAlpha, ")")
        });
        this.windowBg.shadow = new createjs.Shadow("rgba(0,0,0,.4)", 2, 2, 4);
        this.windowBg.x = this._x;
        this.windowBg.y = this._y;
        this.windowBg.addTo(this.zimStage);
    };
    DebugConsole.prototype.createFrame = function () {
        var _this = this;
        this.zimFrame = new Frame(null, this._width, this._height);
        this.zimFrame.on("ready", function () {
            _this.zimStage = _this.zimFrame.stage;
            _this.createBg();
            _this.createWindow();
            _this.createLabel();
        });
    };
    DebugConsole.prototype.createLabel = function () {
        this.zimLabel = new Label({
            text: "",
            color: this._fontColor,
            labelWidth: this._width - this._padding,
            size: this._fontSize
        });
        this.zimWindow.add(this.zimLabel);
    };
    DebugConsole.prototype.createWindow = function () {
        this.zimWindow = new zim.Window({
            scrollBarDrag: true,
            padding: this._padding,
            width: this._width,
            height: this._height,
            backgroundColor: clear,
            shadowBlur: 0
        });
        this.zimWindow.x = this._x;
        this.zimWindow.y = this._y;
        this.zimWindow.addTo(this.zimStage);
    };
    DebugConsole.prototype.clear = function () {
        if (this.zimLabel) {
            this.zimLabel.text = "";
            this.zimStage.update();
        }
    };
    DebugConsole.prototype.create = function () {
        this.createFrame();
    };
    DebugConsole.prototype.destroy = function () {
        if (this.zimStage) {
            this.zimStage.removeAllEventListeners();
            this.zimStage.removeAllChildren();
        }
    };
    DebugConsole.prototype.log = function (value) {
        if (this.zimLabel) {
            if (this.zimLabel.text != "") {
                this.zimLabel.text += "\n".concat(value);
            }
            else {
                this.zimLabel.text += "".concat(value);
            }
            this.zimStage.update();
        }
        else {
            console.log("DEBUG_CONSOLE_ERROR: Label hasn't been created yet. Try making the call later.");
        }
    };
    return DebugConsole;
}());
var Delay = (function () {
    function Delay() {
    }
    Delay.checkForDuplicateIds = function (id) {
        if (this.delayCalls) {
            var len = this.delayCalls.length;
            for (var i = 0; i < len; i++) {
                if (this.delayCalls[i].id && this.delayCalls[i].id == id) {
                    console.log("!!! WARNING: Duplicate ID detected. Did you mean to set two delays with the same ID?");
                    return;
                }
            }
        }
    };
    Delay.removeCall = function (id) {
        if (this.delayCalls) {
            for (var i = 0; i < this.delayCalls.length; i++) {
                if (this.delayCalls[i].id == id) {
                    this.delayCalls[i].callback = null;
                    this.delayCalls[i].id = null;
                    this.delayCalls[i].params = null;
                    if (this.delayCalls[i].timer) {
                        this.delayCalls[i].timer.reset();
                        this.delayCalls[i].timer.removeEventListener(TimerEvent.TIMER_COMPLETE, this.handleComplete);
                        this.delayCalls[i].timer = null;
                    }
                    this.delayCalls[i].params = null;
                    this.delayCalls[i] = null;
                    this.delayCalls.splice(i, 1);
                }
            }
        }
    };
    Delay.anyDelaysAreRunning = function () {
        if (this.delayCalls) {
            var len = this.delayCalls.length;
            for (var i = 0; i < len; i++) {
                if (this.delayCalls[i].timer && this.delayCalls[i].timer.running) {
                    return true;
                }
            }
        }
        return false;
    };
    Delay.callLater = function (functionToCall, delayMS, id) {
        if (id === void 0) { id = null; }
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        if (this.delayCalls == null) {
            this.delayCalls = [];
        }
        this.checkForDuplicateIds(id);
        var curCall = new DelayData();
        curCall.timer = new Timer(1000, 1);
        curCall.timer.addEventListener(TimerEvent.TIMER_COMPLETE, this.handleComplete);
        curCall.callback = functionToCall;
        curCall.timer.delay = delayMS;
        if (id != null) {
            curCall.id = id;
        }
        curCall.params = args;
        this.delayCalls.push(curCall);
        curCall.timer.start();
    };
    Delay.cancelAllCalls = function () {
        if (this.delayCalls) {
            var len = this.delayCalls.length;
            for (var i = 0; i < len; i++) {
                if (this.delayCalls[i].timer) {
                    this.delayCalls[i].timer.reset();
                    this.delayCalls[i].timer.removeEventListener(TimerEvent.TIMER_COMPLETE, this.handleComplete);
                    this.delayCalls[i].timer = null;
                }
                this.delayCalls[i].callback = null;
                this.delayCalls[i].id = null;
                this.delayCalls[i].params = null;
                this.delayCalls[i] = null;
            }
            this.delayCalls = null;
        }
    };
    Delay.cancelCall = function (id) {
        this.removeCall(id);
    };
    Delay.delayIsRunning = function (id) {
        if (this.delayCalls) {
            var len = this.delayCalls.length;
            for (var i = 0; i < len; i++) {
                if (this.delayCalls[i].id && this.delayCalls[i].id == id) {
                    return true;
                }
            }
        }
        return false;
    };
    Delay.destroy = function () {
        this.cancelAllCalls();
    };
    Delay.getAllDelaysRunning = function () {
        var runningDelays = [];
        if (this.delayCalls) {
            var len = this.delayCalls.length;
            for (var i = 0; i < len; i++) {
                if (this.delayCalls[i].timer && this.delayCalls[i].timer.running) {
                    runningDelays.push(this.delayCalls[i]);
                }
            }
        }
        return runningDelays;
    };
    Delay.pauseCall = function (id) {
        if (this.delayCalls) {
            var len = this.delayCalls.length;
            for (var i = 0; i < len; i++) {
                if (this.delayCalls[i].id == id) {
                    if (this.delayCalls[i].timer) {
                        this.delayCalls[i].timer.stop();
                    }
                }
            }
        }
    };
    Delay.resumeCall = function (id) {
        if (this.delayCalls) {
            var len = this.delayCalls.length;
            for (var i = 0; i < len; i++) {
                if (this.delayCalls[i].id == id) {
                    if (this.delayCalls[i].timer) {
                        this.delayCalls[i].timer.start();
                    }
                }
            }
        }
    };
    Delay.handleComplete = function (event) {
        var curCall;
        var len = Delay.delayCalls.length;
        for (var i = 0; i < len; i++) {
            if (Delay.delayCalls[i].timer === event.target) {
                curCall = Delay.delayCalls[i];
                Delay.delayCalls.splice(i, 1);
                break;
            }
        }
        curCall.timer.reset();
        curCall.timer.removeEventListener(TimerEvent.TIMER_COMPLETE, Delay.handleComplete);
        curCall.timer = null;
        if (curCall.params) {
            curCall.callback.apply(null, curCall.params);
        }
        else {
            curCall.callback();
        }
        curCall.callback = null;
        curCall.id = null;
        curCall.params = null;
        if (Delay.delayCalls && Delay.delayCalls.length == 0) {
            Delay.delayCalls = null;
        }
    };
    return Delay;
}());
var ObjectPool = (function () {
    function ObjectPool(type, amount) {
        this.ObjClass = type;
        this.count = amount;
        this._init();
    }
    Object.defineProperty(ObjectPool.prototype, "unusedCount", {
        get: function () {
            return this.count;
        },
        enumerable: false,
        configurable: true
    });
    ObjectPool.prototype._init = function () {
        this.objects = new Array(this.count);
        this.createPool();
    };
    ObjectPool.prototype.createPool = function () {
        for (var i = 0; i < this.count; i++) {
            this.objects[i] = new this.ObjClass();
            if ("create" in this.objects[i]) {
                this.objects[i].create();
            }
        }
    };
    ObjectPool.prototype.destroy = function () {
        var len = this.objects.length;
        for (var i = 0; i < len; i++) {
            if ("destroy" in this.objects[i]) {
                this.objects[i].destroy();
            }
            this.objects[i] = null;
        }
        this.objects = null;
    };
    ObjectPool.prototype.getAllObjects = function () {
        return this.objects;
    };
    ObjectPool.prototype.getObject = function () {
        if (this.count > 0) {
            return this.objects[--this.count];
        }
        else {
            throw new Error("There are currently no objects available.");
        }
    };
    ObjectPool.prototype.returnObject = function (obj) {
        this.objects[this.count++] = obj;
    };
    return ObjectPool;
}());
var Rand = (function () {
    function Rand() {
        this._pointer = 0;
        this._seed = 0;
        this.seedInvalid = true;
    }
    Object.defineProperty(Rand, "instance", {
        get: function () {
            if (this._instance == null) {
                this._instance = new Rand();
            }
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rand, "pointer", {
        get: function () {
            return this.instance.pointer;
        },
        set: function (value) {
            this.instance.pointer = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rand, "seed", {
        get: function () {
            return this.instance.seed;
        },
        set: function (value) {
            this.instance.seed = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rand.prototype, "pointer", {
        get: function () {
            return this._pointer;
        },
        set: function (value) {
            this._pointer = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rand.prototype, "seed", {
        get: function () {
            return this._seed;
        },
        set: function (value) {
            if (value != this._seed) {
                this.seedInvalid = true;
                this._pointer = 0;
            }
            this._seed = value;
        },
        enumerable: false,
        configurable: true
    });
    Rand.prototype.Rand = function (seed) {
        if (seed === void 0) { seed = 0; }
        this._seed = seed;
    };
    Rand.array = function (src) {
        this.instance.array(src);
    };
    Rand.bit = function (chance) {
        if (chance === void 0) { chance = 0.5; }
        return this.instance.bit(chance);
    };
    Rand.boolean = function (chance) {
        if (chance === void 0) { chance = 0.5; }
        return this.instance.boolean(chance);
    };
    Rand.color = function () {
        return this.instance.color();
    };
    Rand.destroy = function () {
        this.instance.destroy();
    };
    Rand.integer = function (min, max) {
        if (max === void 0) { max = NaN; }
        return this.instance.integer(min, max);
    };
    Rand.number = function (min, max) {
        if (max === void 0) { max = NaN; }
        return this.instance.number(min, max);
    };
    Rand.reset = function () {
        this.instance.reset();
    };
    Rand.sign = function (chance) {
        if (chance === void 0) { chance = 0.5; }
        return this.instance.sign(chance);
    };
    Rand.prototype.array = function (src) {
        var len = src.length;
        for (var i = len - 1; i >= 0; i--) {
            var randIndex = this.integer(0, len - 1);
            var temp = src[randIndex];
            src[randIndex] = src[i];
            src[i] = temp;
        }
    };
    Rand.prototype.bit = function (chance) {
        if (chance === void 0) { chance = 0.5; }
        return (this.random() < chance) ? 1 : 0;
    };
    Rand.prototype.boolean = function (chance) {
        if (chance === void 0) { chance = 0.5; }
        return (this.random() < chance);
    };
    Rand.prototype.color = function () {
        var randColor = ("00000" + (Math.random() * 16777216 << 0).toString(16)).substr(-6);
        return "#" + randColor;
    };
    Rand.prototype.destroy = function () {
        Rand._instance = null;
    };
    Rand.prototype.integer = function (min, max) {
        if (max === void 0) { max = NaN; }
        if (isNaN(max)) {
            max = min;
            min = 0;
        }
        return Math.floor(this.number(min, max + 1));
    };
    Rand.prototype.number = function (min, max) {
        if (max === void 0) { max = NaN; }
        if (isNaN(max)) {
            max = min;
            min = 0;
        }
        return Math.random() * (max - min) + min;
    };
    Rand.prototype.random = function () {
        if (this.seedInvalid) {
            if (this._seed == 0) {
                this._seed = Math.random() * 0xFFFFFF;
            }
            this.seedInvalid = false;
        }
        this._pointer = (this._pointer + 1) % 200000;
        return (this.number(this._pointer % 1000, this._pointer / 1000 >> 0) * 0.999999999999998 + 0.000000000000001) / 0xFFFFFFFF;
    };
    Rand.prototype.reset = function () {
        this._pointer = 0;
    };
    Rand.prototype.sign = function (chance) {
        if (chance === void 0) { chance = 0.5; }
        return (this.random() < chance) ? 1 : -1;
    };
    return Rand;
}());
//# sourceMappingURL=rhtemplatelibrary.js.map