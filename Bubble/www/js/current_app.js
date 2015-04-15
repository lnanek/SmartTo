
var app = {

	serviceUUID:"4ad39e52-69d1-4b7a-9940-43a120df7b2d",
	notifyUUID:"4ad39e52-69d1-4b7a-9940-43a120df7b2e",

		localName:"Bubble",

	element_BlueSlider_changed: function(e) {
		(function(){
			var targetValues = {};
			var sourceValue =  app.element_BlueSlider.getValue();
			var value = sourceValue;
				try {
					eval("targetValues.value = " + "value");
				}

				catch(err) {
					if(baseApp.debugLog !== undefined) {
						baseApp.debugLog("Connector Error: [ \"BlueSlider\" ]---X--->[ \"PWMSet22\" ] " + err.toString());
					}
				}

			app.element_PWMSet22.execute(targetValues.value);

			//baseApp.debugLog("Connection Event: [ \"BlueSlider\" ]---(" + JSON.stringify(targetValues) + ")--->[ \"PWMSet22\" ]");
		})();

	},

	element_Task5_task: function(e) {
		(function(){
			var targetValues = {};
			var sourceValue = undefined;
				try {
					eval("targetValues.value = " + "undefined");
				}

				catch(err) {
					if(baseApp.debugLog !== undefined) {
						baseApp.debugLog("Connector Error: [ \"Task5\" ]---X--->[ \"Function4\" ] " + err.toString());
					}
				}

			app.element_Function4.execute(targetValues.value);

			//baseApp.debugLog("Connection Event: [ \"Task5\" ]---(" + JSON.stringify(targetValues) + ")--->[ \"Function4\" ]");
		})();

	},

	element_RedSlider_changed: function(e) {
		(function(){
			var targetValues = {};
			var sourceValue =  app.element_RedSlider.getValue();
			var value = sourceValue;
				try {
					eval("targetValues.value = " + "value");
				}

				catch(err) {
					if(baseApp.debugLog !== undefined) {
						baseApp.debugLog("Connector Error: [ \"RedSlider\" ]---X--->[ \"PWMSet21\" ] " + err.toString());
					}
				}

			app.element_PWMSet21.execute(targetValues.value);

			//baseApp.debugLog("Connection Event: [ \"RedSlider\" ]---(" + JSON.stringify(targetValues) + ")--->[ \"PWMSet21\" ]");
		})();

	},

	element_Connection5_connected: function(e) {
		(function(){
			var targetValues = {};
			var sourceValue = undefined;
				try {
					eval("targetValues.runEvery = " + "undefined");
				}

				catch(err) {
					if(baseApp.debugLog !== undefined) {
						baseApp.debugLog("Connector Error: [ \"Connection5\" ]---X--->[ \"Task5\" ] " + err.toString());
					}
				}

				try {
					eval("targetValues.runIn = " + "20");
				}

				catch(err) {
					if(baseApp.debugLog !== undefined) {
						baseApp.debugLog("Connector Error: [ \"Connection5\" ]---X--->[ \"Task5\" ] " + err.toString());
					}
				}

			app.element_Task5.run(targetValues.runIn,targetValues.runEvery);

			//baseApp.debugLog("Connection Event: [ \"Connection5\" ]---(" + JSON.stringify(targetValues) + ")--->[ \"Task5\" ]");
		})();

	},

	element_Connection5_disconnected: function(e) {
		(function(){
			var targetValues = {};
			var sourceValue = undefined;
			app.element_Task5.pause();

			//baseApp.debugLog("Connection Event: [ \"Connection5\" ]---(" + JSON.stringify(targetValues) + ")--->[ \"Task5\" ]");
		})();

	},

	element_GreenSlider_changed: function(e) {
		(function(){
			var targetValues = {};
			var sourceValue =  app.element_GreenSlider.getValue();
			var value = sourceValue;
				try {
					eval("targetValues.value = " + "value");
				}

				catch(err) {
					if(baseApp.debugLog !== undefined) {
						baseApp.debugLog("Connector Error: [ \"GreenSlider\" ]---X--->[ \"PPWMSet23\" ] " + err.toString());
					}
				}

			app.element_PPWMSet23.execute(targetValues.value);

			//baseApp.debugLog("Connection Event: [ \"GreenSlider\" ]---(" + JSON.stringify(targetValues) + ")--->[ \"PPWMSet23\" ]");
		})();

	},

	element_Function4_valueReturned: function(e) {
		(function(){
			var targetValues = {};
			var sourceValue =  app.element_Function4.getValue();
			var value = sourceValue;
				try {
					eval("targetValues.y = " + "value[1]");
				}

				catch(err) {
					if(baseApp.debugLog !== undefined) {
						baseApp.debugLog("Connector Error: [ \"Function4\" ]---X--->[ \"ImagePan1\" ] " + err.toString());
					}
				}

				try {
					eval("targetValues.x = " + "value[0]");
				}

				catch(err) {
					if(baseApp.debugLog !== undefined) {
						baseApp.debugLog("Connector Error: [ \"Function4\" ]---X--->[ \"ImagePan1\" ] " + err.toString());
					}
				}

			app.element_ImagePan1.setOffset(targetValues.x,targetValues.y);

			//baseApp.debugLog("Connection Event: [ \"Function4\" ]---(" + JSON.stringify(targetValues) + ")--->[ \"ImagePan1\" ]");
		})();

		(function(){
			var targetValues = {};
			var sourceValue =  app.element_Function4.getValue();
			var value = sourceValue;
				try {
					eval("targetValues.width = " + "value[2]");
				}

				catch(err) {
					if(baseApp.debugLog !== undefined) {
						baseApp.debugLog("Connector Error: [ \"Function4\" ]---X--->[ \"ImagePan1\" ] " + err.toString());
					}
				}

				try {
					eval("targetValues.height = " + "value[3]");
				}

				catch(err) {
					if(baseApp.debugLog !== undefined) {
						baseApp.debugLog("Connector Error: [ \"Function4\" ]---X--->[ \"ImagePan1\" ] " + err.toString());
					}
				}

			app.element_ImagePan1.setSize(targetValues.width,targetValues.height);

			//baseApp.debugLog("Connection Event: [ \"Function4\" ]---(" + JSON.stringify(targetValues) + ")--->[ \"ImagePan1\" ]");
		})();

		(function(){
			var targetValues = {};
			var sourceValue = undefined;
				try {
					eval("targetValues.runEvery = " + "0");
				}

				catch(err) {
					if(baseApp.debugLog !== undefined) {
						baseApp.debugLog("Connector Error: [ \"Function4\" ]---X--->[ \"Task5\" ] " + err.toString());
					}
				}

				try {
					eval("targetValues.runIn = " + "20");
				}

				catch(err) {
					if(baseApp.debugLog !== undefined) {
						baseApp.debugLog("Connector Error: [ \"Function4\" ]---X--->[ \"Task5\" ] " + err.toString());
					}
				}

			app.element_Task5.run(targetValues.runIn,targetValues.runEvery);

			//baseApp.debugLog("Connection Event: [ \"Function4\" ]---(" + JSON.stringify(targetValues) + ")--->[ \"Task5\" ]");
		})();

		(function(){
			var targetValues = {};
			var sourceValue =  app.element_Function4.getValue();
			var value = sourceValue;
				try {
					eval("targetValues.value = " + "value.toString()");
				}

				catch(err) {
					if(baseApp.debugLog !== undefined) {
						baseApp.debugLog("Connector Error: [ \"Function4\" ]---X--->[ \"TextField6\" ] " + err.toString());
					}
				}

			app.element_TextField6.setValue(targetValues.value);

			processData(targetValues, app);

			//baseApp.debugLog("Connection Event: [ \"Function4\" ]---(" + JSON.stringify(targetValues) + ")--->[ \"TextField6\" ]");
		})();

	},

	initialize: function() {

			app.layouts = {"Default": {"devicename": ".*", "elements": {"TextField6": {"y": 7, "x": 7, "width": 114, "height": 34}, "BlueSlider": {"y": 7, "x": 7, "height": 86, "width": 106}, "RedSlider": {"y": 7, "x": 7, "height": 86, "width": 106}, "Button6": {"y": 140, "x": 311, "width": 146, "height": 46}, "ImagePan1": {"y": 430, "x": 302, "width": 164, "height": 164}, "GreenSlider": {"y": 7, "x": 7, "height": 86, "width": 106}, "ImagePan3": {"y": 7, "x": 7, "width": 290.85714285714295, "height": 65.03703703703705}, "ImagePan2": {"y": 484, "x": 356, "width": 56, "height": 56}}, "orientation": "portrait", "platform": ".*", "height": 1024, "width": 768, "version": ".*", "name": "Default (768x1024)"}, "nexus7": {"devicename": ".*", "elements": {"TextField6": {"y": 93, "x": 191, "height": 20, "width": 100}, "BlueSlider": {"y": 386, "x": 31, "height": 86, "width": 106}, "RedSlider": {"y": 172, "x": 31, "height": 86, "width": 106}, "ImagePan1": {"y": 486, "x": 220, "height": 150, "width": 150}, "GreenSlider": {"y": 280, "x": 31, "height": 86, "width": 106}, "ImagePan3": {"y": 14, "x": 14, "height": 51.03703703703705, "width": 276.85714285714295}}, "orientation": "portrait", "platform": ".*", "height": 912, "width": 600, "version": ".*", "name": "Nexus 7 (2013)"}};
			app.currentLayout = "Default";
			var bestLayoutMatch = "Default";

			for(var layoutName in app.layouts) {
				if(app.layouts[layoutName].width == baseApp.screenWidth && app.layouts[layoutName].height == baseApp.screenHeight && device.platform == app.layouts[layoutName].platform) {
					bestLayoutMatch = layoutName;
					break;
				}

				else if(	app.layouts[layoutName].width <= baseApp.screenWidth &&
						app.layouts[layoutName].height <= baseApp.screenHeight) {

						if(bestLayoutMatch != "Default") {
							if(((baseApp.screenWidth - app.layouts[layoutName].width) + (baseApp.screenHeight - app.layouts[layoutName].height)) <
							((baseApp.screenWidth - app.layouts[bestLayoutMatch].width) + (baseApp.screenHeight - app.layouts[bestLayoutMatch].height))) {

								bestLayoutMatch = layoutName;
							}
						}

						else {
							bestLayoutMatch = layoutName;
						}
				}
			}

			if(app.layouts[bestLayoutMatch] === undefined) {
				bestLayoutMatch = "Default";
			}

			app.currentLayout = bestLayoutMatch;


			app.element_PWMSet22 = new Function(0, "4ad39e52-69d1-4b7a-9940-43a120df7b32", "json", "json");

			app.element_PWMSet22.trigger = function() {
				if(app.element_PWMSet22.onTrigger != undefined)
					app.element_PWMSet22.onTrigger();
			}

			if(app.element_PWMSet22_onTrigger != undefined)
				app.element_PWMSet22.onTrigger = app.element_PWMSet22_onTrigger;

			if(app.element_PWMSet22_valueReturned != undefined)
				app.element_PWMSet22.valueReturned = app.element_PWMSet22_valueReturned;

			if(app.element_PWMSet22_notified != undefined)
				app.element_PWMSet22.notified = app.element_PWMSet22_notified;

			app.element_TextField6 = new zebra.ui.HtmlTextField("");

			app.element_TextField6.setVisible(false);
			app.element_TextField6.setEnabled(true);

			app.element_TextField6.trigger = function() {
				if(app.element_TextField6.onTrigger != undefined)
					app.element_TextField6.onTrigger();
			};

			app.element_TextField6.appendValue = function(value) {
				this.setValue(this.getValue() + value);
			};

			if(app.element_TextField6_onTrigger != undefined)
				app.element_TextField6.onTrigger = app.element_TextField6_onTrigger;

			if(app.element_TextField6_keyPressed != undefined)
				app.element_TextField6.keyPressed = app.element_TextField6_keyPressed;

			if(app.element_TextField6_keyReleased != undefined)
				app.element_TextField6.keyReleased = app.element_TextField6_keyReleased;

			app.element_TextField6.setBounds(	app.layouts[app.currentLayout]["elements"].TextField6.x,
							app.layouts[app.currentLayout]["elements"].TextField6.y,
							app.layouts[app.currentLayout]["elements"].TextField6.width,
							app.layouts[app.currentLayout]["elements"].TextField6.height);


			app.element_PWMSet21 = new Function(0, "4ad39e52-69d1-4b7a-9940-43a120df7b31", "json", "json");

			app.element_PWMSet21.trigger = function() {
				if(app.element_PWMSet21.onTrigger != undefined)
					app.element_PWMSet21.onTrigger();
			}

			if(app.element_PWMSet21_onTrigger != undefined)
				app.element_PWMSet21.onTrigger = app.element_PWMSet21_onTrigger;

			if(app.element_PWMSet21_valueReturned != undefined)
				app.element_PWMSet21.valueReturned = app.element_PWMSet21_valueReturned;

			if(app.element_PWMSet21_notified != undefined)
				app.element_PWMSet21.notified = app.element_PWMSet21_notified;

			app.element_BlueSlider = new zebra.ui.Slider();

			app.element_BlueSlider.setValues = function(min,max,intervals,roughStep,exactStep) {
				if(roughStep <= 0 || exactStep < 0 || min >= max || min + roughStep > max || min + exactStep > max) {
					//throw new Error("Invalid values");
				}

				// inject new intervals code here
				for(var i = 0, start = min;i < intervals.length; i ++ ) {
					start += intervals[i];
					if(start > max || intervals[i] < 0) {
						//throw new Error();
					}
				}

				this.min = min;
				this.max = max;
				this.roughStep = roughStep;
				this.exactStep = exactStep;
				this.intervals = Array(intervals.length);

				for(var i=0; i<intervals.length; i++){
					this.intervals[i] = intervals[i];
				}

				if(this.value < min || this.value > max) {
					this.setValue(this.isIntervalMode ? min + intervals[0] : min);
				}
				this.vrp();
			};

			app.element_BlueSlider.setValue = function(v) {
				var prev = this.value;
				if(this.value != v) {
					this.value = v;
					this._.fired(this, prev);
					this.repaint();
				}
			};

			app.element_BlueSlider.setVisible(false);
			app.element_BlueSlider.setEnabled(true);
			app.element_BlueSlider.setShowScale(false);
			app.element_BlueSlider.setShowTitle(false);

			app.element_BlueSlider.setMaxValue = function (max) {
				this.setValues(this.min, max, this.intervals, this.roughStep, this.exactStep);
			};

			app.element_BlueSlider.setMinValue = function(min) {
				this.setValues(min, this.max, this.intervals, this.roughStep, this.exactStep);
			};

			app.element_BlueSlider.setIntervals = function(intervals) {
				this.setValues(this.min, this.max, intervals, this.roughStep, this.exactStep);
			};

			app.element_BlueSlider.setMinValue(0);
			app.element_BlueSlider.setMaxValue(20);
			app.element_BlueSlider.setValue(0);
			app.element_BlueSlider.setIntervals([0, 10, 10]);
			app.element_BlueSlider.setScaleStep(1);

			app.element_BlueSlider.orient = zebra.layout.HORIZONTAL;

			app.element_BlueSlider.trigger = function() {
				if(app.element_BlueSlider.onTrigger != undefined)
					app.element_BlueSlider.onTrigger();
			}

			if(app.element_BlueSlider_onTrigger != undefined)
				app.element_BlueSlider.onTrigger = app.element_BlueSlider_onTrigger;

			if(app.element_BlueSlider_changed != undefined)
				app.element_BlueSlider.bind(app.element_BlueSlider_changed);

			app.element_BlueSlider.setBounds(	app.layouts[app.currentLayout]["elements"].BlueSlider.x,
							app.layouts[app.currentLayout]["elements"].BlueSlider.y,
							app.layouts[app.currentLayout]["elements"].BlueSlider.width,
							app.layouts[app.currentLayout]["elements"].BlueSlider.height);


			app.element_Task5 = new zebra.util.task(function(c){
				if(app.element_Task5_task != undefined)
					this.element_Task5_task();
			});

			app.element_Task5.element_Task5_task = app.element_Task5_task;

			app.element_Task5.trigger = function() {
				if(app.element_Task5.onTrigger != undefined)
					app.element_Task5.onTrigger();
			}

			if(app.element_Task5_onTrigger != undefined)
				app.element_Task5.onTrigger = app.element_Task5_onTrigger;

			app.element_Task5.run(20, 0);


			app.element_RedSlider = new zebra.ui.Slider();

			app.element_RedSlider.setValues = function(min,max,intervals,roughStep,exactStep) {
				if(roughStep <= 0 || exactStep < 0 || min >= max || min + roughStep > max || min + exactStep > max) {
					//throw new Error("Invalid values");
				}

				// inject new intervals code here
				for(var i = 0, start = min;i < intervals.length; i ++ ) {
					start += intervals[i];
					if(start > max || intervals[i] < 0) {
						//throw new Error();
					}
				}

				this.min = min;
				this.max = max;
				this.roughStep = roughStep;
				this.exactStep = exactStep;
				this.intervals = Array(intervals.length);

				for(var i=0; i<intervals.length; i++){
					this.intervals[i] = intervals[i];
				}

				if(this.value < min || this.value > max) {
					this.setValue(this.isIntervalMode ? min + intervals[0] : min);
				}
				this.vrp();
			};

			app.element_RedSlider.setValue = function(v) {
				var prev = this.value;
				if(this.value != v) {
					this.value = v;
					this._.fired(this, prev);
					this.repaint();
				}
			};

			app.element_RedSlider.setVisible(false);
			app.element_RedSlider.setEnabled(true);
			app.element_RedSlider.setShowScale(false);
			app.element_RedSlider.setShowTitle(false);

			app.element_RedSlider.setMaxValue = function (max) {
				this.setValues(this.min, max, this.intervals, this.roughStep, this.exactStep);
			};

			app.element_RedSlider.setMinValue = function(min) {
				this.setValues(min, this.max, this.intervals, this.roughStep, this.exactStep);
			};

			app.element_RedSlider.setIntervals = function(intervals) {
				this.setValues(this.min, this.max, intervals, this.roughStep, this.exactStep);
			};

			app.element_RedSlider.setMinValue(0);
			app.element_RedSlider.setMaxValue(20);
			app.element_RedSlider.setValue(0);
			app.element_RedSlider.setIntervals([0, 10, 10]);
			app.element_RedSlider.setScaleStep(1);

			app.element_RedSlider.orient = zebra.layout.HORIZONTAL;

			app.element_RedSlider.trigger = function() {
				if(app.element_RedSlider.onTrigger != undefined)
					app.element_RedSlider.onTrigger();
			}

			if(app.element_RedSlider_onTrigger != undefined)
				app.element_RedSlider.onTrigger = app.element_RedSlider_onTrigger;

			if(app.element_RedSlider_changed != undefined)
				app.element_RedSlider.bind(app.element_RedSlider_changed);

			app.element_RedSlider.setBounds(	app.layouts[app.currentLayout]["elements"].RedSlider.x,
							app.layouts[app.currentLayout]["elements"].RedSlider.y,
							app.layouts[app.currentLayout]["elements"].RedSlider.width,
							app.layouts[app.currentLayout]["elements"].RedSlider.height);


			app.element_PPWMSet23 = new Function(0, "4ad39e52-69d1-4b7a-9940-43a120df7b30", "json", "json");

			app.element_PPWMSet23.trigger = function() {
				if(app.element_PPWMSet23.onTrigger != undefined)
					app.element_PPWMSet23.onTrigger();
			}

			if(app.element_PPWMSet23_onTrigger != undefined)
				app.element_PPWMSet23.onTrigger = app.element_PPWMSet23_onTrigger;

			if(app.element_PPWMSet23_valueReturned != undefined)
				app.element_PPWMSet23.valueReturned = app.element_PPWMSet23_valueReturned;

			if(app.element_PPWMSet23_notified != undefined)
				app.element_PPWMSet23.notified = app.element_PPWMSet23_notified;

			app.element_Connection5 = new Connection();

			app.element_Connection5.trigger = function() {
				if(app.element_Connection5.onTrigger != undefined)
					app.element_Connection5.onTrigger();
			}

			if(app.element_Connection5_onTrigger != undefined)
				app.element_Connection5.onTrigger = app.element_Connection5_onTrigger;

			if(app.element_Connection5_connecting != undefined)
				app.element_Connection5.connecting = app.element_Connection5_connecting;

			if(app.element_Connection5_connected != undefined)
				app.element_Connection5.connected = app.element_Connection5_connected;

			if(app.element_Connection5_disconnecting != undefined)
				app.element_Connection5.disconnecting = app.element_Connection5_disconnecting;

			if(app.element_Connection5_disconnected != undefined)
				app.element_Connection5.disconnected = app.element_Connection5_disconnected;

			app.element_ImagePan1 = new zebra.ui.ImagePan("http://atmosphere.anaren.com/dev/images/demo/bubble.png");

			app.element_ImagePan1.airOffset = [0, 0];

			app.element_ImagePan1.setOffset = function (x, y) {
				if(this.airOffset === undefined) {
					this.airOffset = [0, 0];
				}

				if(x != this.airOffset[0] || y != this.airOffset[1]) {
					this.setLocation(this.x - this.airOffset[0], this.y - this.airOffset[1]);

					this.airOffset[0] = x;
					this.airOffset[1] = y;

					this.setLocation(this.x + this.airOffset[0], this.y + this.airOffset[1]);

					this.repaint();
				}
			};

			app.element_ImagePan1.getOffset = function() {
				return this.airOffset;
			};

			app.element_ImagePan1.setRotation = function(r) {
				if(this.airRotation != r) {
					this.airRotation = r;
					this.repaint();
				}
			};

			app.element_ImagePan1.getRotation = function() {
				if (this.airRotation === undefined) {
					this.airRotation = 0;
				}
				return this.airRotation;
			};

			app.element_ImagePan1.paint = function (g) {
				if (this.view != null) {
					var l = this.getLeft(), t = this.getTop(), w = this.width, h = this.height;
					if(this.airRotation !== undefined) {
						g.translate(this.width/2, this.height/2);
						g.rotate(this.airRotation*Math.PI/180);
						g.translate(-this.width/2, -this.height/2);
					}
					this.view.paint(g, l, t, w, h, this);
				}
			};

			app.element_ImagePan1.setRotation(0);
			app.element_ImagePan1.setVisible(false);
			app.element_ImagePan1.setEnabled(true);
			app.element_ImagePan1.setBackground("transparent");

			app.element_ImagePan1.trigger = function() {
				if(app.element_ImagePan1.onTrigger != undefined)
					app.element_ImagePan1.onTrigger();
			}

			if(app.element_ImagePan1_onTrigger != undefined)
				app.element_ImagePan1.onTrigger = app.element_ImagePan1_onTrigger;

			if(app.element_ImagePan1_mousePressed != undefined)
				app.element_ImagePan1.mousePressed = app.element_ImagePan1_mousePressed;

			if(app.element_ImagePan1_mouseClicked != undefined)
				app.element_ImagePan1.mouseClicked = app.element_ImagePan1_mouseClicked;

			if(app.element_ImagePan1_mouseReleased != undefined)
				app.element_ImagePan1.mouseReleased = app.element_ImagePan1_mouseReleased;

			if(app.element_ImagePan1_mouseEntered != undefined)
				app.element_ImagePan1.mouseEntered = app.element_ImagePan1_mouseEntered;

			if(app.element_ImagePan1_mouseMoved != undefined)
				app.element_ImagePan1.mouseMoved = app.element_ImagePan1_mouseMoved;

			if(app.element_ImagePan1_mouseExited != undefined)
				app.element_ImagePan1.mouseExited = app.element_ImagePan1_mouseExited;

			app.element_ImagePan1.setBounds(	app.layouts[app.currentLayout]["elements"].ImagePan1.x,
							app.layouts[app.currentLayout]["elements"].ImagePan1.y,
							app.layouts[app.currentLayout]["elements"].ImagePan1.width,
							app.layouts[app.currentLayout]["elements"].ImagePan1.height);


			app.element_GreenSlider = new zebra.ui.Slider();

			app.element_GreenSlider.setValues = function(min,max,intervals,roughStep,exactStep) {
				if(roughStep <= 0 || exactStep < 0 || min >= max || min + roughStep > max || min + exactStep > max) {
					//throw new Error("Invalid values");
				}

				// inject new intervals code here
				for(var i = 0, start = min;i < intervals.length; i ++ ) {
					start += intervals[i];
					if(start > max || intervals[i] < 0) {
						//throw new Error();
					}
				}

				this.min = min;
				this.max = max;
				this.roughStep = roughStep;
				this.exactStep = exactStep;
				this.intervals = Array(intervals.length);

				for(var i=0; i<intervals.length; i++){
					this.intervals[i] = intervals[i];
				}

				if(this.value < min || this.value > max) {
					this.setValue(this.isIntervalMode ? min + intervals[0] : min);
				}
				this.vrp();
			};

			app.element_GreenSlider.setValue = function(v) {
				var prev = this.value;
				if(this.value != v) {
					this.value = v;
					this._.fired(this, prev);
					this.repaint();
				}
			};

			app.element_GreenSlider.setVisible(false);
			app.element_GreenSlider.setEnabled(true);
			app.element_GreenSlider.setShowScale(false);
			app.element_GreenSlider.setShowTitle(false);

			app.element_GreenSlider.setMaxValue = function (max) {
				this.setValues(this.min, max, this.intervals, this.roughStep, this.exactStep);
			};

			app.element_GreenSlider.setMinValue = function(min) {
				this.setValues(min, this.max, this.intervals, this.roughStep, this.exactStep);
			};

			app.element_GreenSlider.setIntervals = function(intervals) {
				this.setValues(this.min, this.max, intervals, this.roughStep, this.exactStep);
			};

			app.element_GreenSlider.setMinValue(0);
			app.element_GreenSlider.setMaxValue(20);
			app.element_GreenSlider.setValue(0);
			app.element_GreenSlider.setIntervals([0, 10, 10]);
			app.element_GreenSlider.setScaleStep(1);

			app.element_GreenSlider.orient = zebra.layout.HORIZONTAL;

			app.element_GreenSlider.trigger = function() {
				if(app.element_GreenSlider.onTrigger != undefined)
					app.element_GreenSlider.onTrigger();
			}

			if(app.element_GreenSlider_onTrigger != undefined)
				app.element_GreenSlider.onTrigger = app.element_GreenSlider_onTrigger;

			if(app.element_GreenSlider_changed != undefined)
				app.element_GreenSlider.bind(app.element_GreenSlider_changed);

			app.element_GreenSlider.setBounds(	app.layouts[app.currentLayout]["elements"].GreenSlider.x,
							app.layouts[app.currentLayout]["elements"].GreenSlider.y,
							app.layouts[app.currentLayout]["elements"].GreenSlider.width,
							app.layouts[app.currentLayout]["elements"].GreenSlider.height);


			app.element_ImagePan3 = new zebra.ui.ImagePan("http://atmosphere.anaren.com/dev/images/demo/anaren.jpg");

			app.element_ImagePan3.airOffset = [0, 0];

			app.element_ImagePan3.setOffset = function (x, y) {
				if(this.airOffset === undefined) {
					this.airOffset = [0, 0];
				}

				if(x != this.airOffset[0] || y != this.airOffset[1]) {
					this.setLocation(this.x - this.airOffset[0], this.y - this.airOffset[1]);

					this.airOffset[0] = x;
					this.airOffset[1] = y;

					this.setLocation(this.x + this.airOffset[0], this.y + this.airOffset[1]);

					this.repaint();
				}
			};

			app.element_ImagePan3.getOffset = function() {
				return this.airOffset;
			};

			app.element_ImagePan3.setRotation = function(r) {
				if(this.airRotation != r) {
					this.airRotation = r;
					this.repaint();
				}
			};

			app.element_ImagePan3.getRotation = function() {
				if (this.airRotation === undefined) {
					this.airRotation = 0;
				}
				return this.airRotation;
			};

			app.element_ImagePan3.paint = function (g) {
				if (this.view != null) {
					var l = this.getLeft(), t = this.getTop(), w = this.width, h = this.height;
					if(this.airRotation !== undefined) {
						g.translate(this.width/2, this.height/2);
						g.rotate(this.airRotation*Math.PI/180);
						g.translate(-this.width/2, -this.height/2);
					}
					this.view.paint(g, l, t, w, h, this);
				}
			};

			app.element_ImagePan3.setRotation(0);
			app.element_ImagePan3.setVisible(false);
			app.element_ImagePan3.setEnabled(true);
			app.element_ImagePan3.setBackground("transparent");

			app.element_ImagePan3.trigger = function() {
				if(app.element_ImagePan3.onTrigger != undefined)
					app.element_ImagePan3.onTrigger();
			}

			if(app.element_ImagePan3_onTrigger != undefined)
				app.element_ImagePan3.onTrigger = app.element_ImagePan3_onTrigger;

			if(app.element_ImagePan3_mousePressed != undefined)
				app.element_ImagePan3.mousePressed = app.element_ImagePan3_mousePressed;

			if(app.element_ImagePan3_mouseClicked != undefined)
				app.element_ImagePan3.mouseClicked = app.element_ImagePan3_mouseClicked;

			if(app.element_ImagePan3_mouseReleased != undefined)
				app.element_ImagePan3.mouseReleased = app.element_ImagePan3_mouseReleased;

			if(app.element_ImagePan3_mouseEntered != undefined)
				app.element_ImagePan3.mouseEntered = app.element_ImagePan3_mouseEntered;

			if(app.element_ImagePan3_mouseMoved != undefined)
				app.element_ImagePan3.mouseMoved = app.element_ImagePan3_mouseMoved;

			if(app.element_ImagePan3_mouseExited != undefined)
				app.element_ImagePan3.mouseExited = app.element_ImagePan3_mouseExited;

			app.element_ImagePan3.setBounds(	app.layouts[app.currentLayout]["elements"].ImagePan3.x,
							app.layouts[app.currentLayout]["elements"].ImagePan3.y,
							app.layouts[app.currentLayout]["elements"].ImagePan3.width,
							app.layouts[app.currentLayout]["elements"].ImagePan3.height);


			app.element_Function4 = new Function(0, "4ad39e52-69d1-4b7a-9940-43a120df7b2f", "json", "json");

			app.element_Function4.trigger = function() {
				if(app.element_Function4.onTrigger != undefined)
					app.element_Function4.onTrigger();
			}

			if(app.element_Function4_onTrigger != undefined)
				app.element_Function4.onTrigger = app.element_Function4_onTrigger;

			if(app.element_Function4_valueReturned != undefined)
				app.element_Function4.valueReturned = app.element_Function4_valueReturned;

			if(app.element_Function4_notified != undefined)
				app.element_Function4.notified = app.element_Function4_notified;

			app.appPanel.add(app.element_ImagePan1);

			app.appPanel.add(app.element_ImagePan3);

			app.appPanel.add(app.element_TextField6);

			app.appPanel.add(app.element_RedSlider);

			app.appPanel.add(app.element_GreenSlider);

			app.appPanel.add(app.element_BlueSlider);

	},

}
