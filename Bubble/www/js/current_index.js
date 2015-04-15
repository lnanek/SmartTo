var iOSPlatform = "iOS";
var androidPlatform = "Android";

function clone(obj) {
	if(obj === null || typeof(obj) != 'object')	{
		return obj;
	}
	
	var temp = obj.constructor(); // changed

	for(var key in obj)	{
		temp[key] = clone(obj[key]);
	}
	
	return temp;
}

function isValidJSON(str) {
	try	{
		JSON.parse(str);
		return true;
	}
	
	catch(e) {
		return false;
	}
	
	return false;
}

function Expression(exp) {
	var currentValue = null;
	var currentValues = {};
	var me = this;
	var expression = exp;
	
	//Trigger
	this.expressionTrue = function(e) {
	};
	
	//Trigger
	this.expressionFalse = function(e) {
	};
	
	//Trigger
	this.evaluated = function(e) {
	};
	
	//Target
	this.evaluate = function(values) {

		if(values !== undefined && values !== null) {
			this.addValues(values);
		}
		
		values = currentValues;
		
		try {
			eval("currentValue = " + expression);
		}
		
		catch(err) {
			if(baseApp.debugLog !== undefined) {
				baseApp.debugLog("Expression Error: " + err.toString());
			}
			
			return;
		}
		
		if(currentValue === true) {
			this.expressionTrue();
		}
		
		else {
			this.expressionFalse();
		}
		
		this.evaluated();
	};
	
	//Target
	this.clearValues = function() {
		currentValues = {};
	};
	
	//Target
	this.addValues = function(values) {
		for(var key in values) {
			currentValues[key] = values[key];
		}
	};
	
	//Target
	this.addValue = function(key, value) {
		currentValues[key] = value;
	};
	
	//Source
	this.getValue = function() {
		return currentValue;
	};
}

function Condition() {
	var currentValue = null;
	var me = this;
	
	//Trigger
	this.conditionTrue = function(e) {
	};
	
	//Trigger
	this.conditionFalse = function(e) {
	};
	
	//Target
	this.check = function(value) {
		
		currentValue = value;
		
		if(value) {
			this.conditionTrue();
		}
		
		else {
			this.conditionFalse();
		}
	};
	
	//Source
	this.getValue = function() {
		return currentValue();
	};
}

function Function(id, uuid, returnType, inputType) {
	var currentValue;
	//For some reason when the valueReturnedCallback function is execute this is a global reference instead of the instance of this element...
	var me = this;
	this.id = id;
	this.uuid = uuid;
	this.waiting = false;
	this.waitingCommand = null;
	this.waitingTimeout = null;
	this.returnType = returnType;
	this.inputType = inputType;
	baseApp.functionMapping[id] = this;
	
	//Trigger
	this.valueReturned = null;
	
	//Trigger
	this.notified = function(e) {
	};
	
	//Target Method
	this.execute = function(args) {
		me.sendEvent(1, args);
	};
	
	//Helper Method
	this.sendEvent = function(commandType, data) {
		console.log("sendEvent:"+ me.id);
		
		if(data === undefined && me.inputType !== "json") {
			data = "";
		}
		
		if(baseApp.isConnected == false) {
			console.log("We are not fully connected yet...");
			me.waiting = false;
			return;
		}
		
		if (device.platform == iOSPlatform) {
			if(me.waiting) {
				console.log("I am waiting...");
				me.waitingCommand = {commandType:commandType, data:data};
				
				if(me.waitingTimeout === null) {
					me.waitingTimeout = setTimeout(function() {me.waiting = false; console.log("TIMEOUT REACHED"); clearTimeout(me.waitingTimeout); me.waitingTimeout = null;}, 1000);
				}
				
				return
			}

			if(me.waitingCommand != null) {
				var newWaitingCommand = {commandType:commandType, data:data};
				commandType = me.waitingCommand.commandType;
				data = me.waitingCommand.data;
				
				if(commandType != 0) {
					me.waitingCommand = newWaitingCommand;
				}
				
				else {
					me.waitingCommand = null;
				}
			}
		}
		
		if(commandType == 0) {
			return;
		}
		
		me.waiting = true;
		
		var base64Value = null;
		
		if(me.inputType === "json" || me.inputType === undefined) {
			
			data = JSON.stringify(data);
			
			if(data === undefined) {
				data = "";
			}
			
			var t = [commandType, me.id, data.length];
			
			for(var x = 0; x < data.length; x++) {
				t.push(data.charCodeAt(x));
			}
			
			var value = new Uint8Array(t);
			base64Value = bluetoothle.bytesToEncodedString(value);
		}
		
		else if(me.inputType === "int") {
			var long = parseInt(data)
			
			var t = [0x00, 0x00, 0x00, 0x00] //Four bytes for a integer 32-bit
			
			for ( var index = 0; index < t.length; index ++ ) {
				var byte = long & 0xff;
				t [ index ] = byte;
				long = (long - byte) / 256 ;
			}
			
			var value = new Uint8Array(t);
			base64Value = bluetoothle.bytesToEncodedString(value);
		}
		
		else if(me.inputType === "float") {
			var dataFloat = parseFloat(data)
			
			var buffer = new ArrayBuffer(4);
			var intView = new Int32Array(buffer);
			var floatView = new Float32Array(buffer);

			floatView[0] = dataFloat
			
			var long = intView[0]
			
			var t = [0x00, 0x00, 0x00, 0x00] //Four bytes for a integer 32-bit
			
			for ( var index = 0; index < t.length; index ++ ) {
				var byte = long & 0xff;
				t [ index ] = byte;
				long = (long - byte) / 256 ;
			}
			
			var value = new Uint8Array(t);
			base64Value = bluetoothle.bytesToEncodedString(value);
		}
		
		else if(me.inputType === "double") {
			var dataFloat = parseFloat(data)
			
			var buffer = new ArrayBuffer(8);
			var intView = new Int32Array(buffer);
			var floatView = new Float64Array(buffer);

			floatView[0] = dataFloat
			
			var t = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00] //Four bytes for a integer 32-bit
			
			for ( var index = 0; index < t.length; index ++ ) {
				var long = intView[1];
				
				if(index > 3) {
					long = intView[0];
				}
				
				var byte = long & 0xff;
				t [ index ] = byte;
				long = (long - byte) / 256 ;
			}
			
			var value = new Uint8Array(t);
			base64Value = bluetoothle.bytesToEncodedString(value);
		}
		
		else if(me.inputType === "bool") {
			var t = [];
			
			if(data) {
				t.push(0x01);
			}
			
			else {
				t.push(0x00);
			}
			
			var value = new Uint8Array(t);
			base64Value = bluetoothle.bytesToEncodedString(value);
		}
		
		else if(me.inputType === "char") {
			var t = [];
			
			if(typeof data === "string") {
				t.push(data.charCodeAt(0));
			}
			
			else if(typeof data === "number") {
				t.push(data % 256);
			}
			
			var value = new Uint8Array(t);
			base64Value = bluetoothle.bytesToEncodedString(value);
		}
		
		else if(me.inputType === "void") {
			var t = [0x00];
			var value = new Uint8Array(t);
			base64Value = bluetoothle.bytesToEncodedString(value);
		}
		
		else if(me.inputType === "string") {
			var t = [];
			
			if(typeof data === "string") {
				for(var x = 0; x < data.length; x++) {
					t.push(data.charCodeAt(x));
				}
			}
			
			else if(data.length === undefined) {
				for(var x = 0; x < data.length; x++) {
					if(typeof data[x] === "number") {
						t.push(data[x]);
					}
					
					else {
						t.push(0x00);
					}
				}
			}
			
			var value = new Uint8Array(t);
			base64Value = bluetoothle.bytesToEncodedString(value);
		}
		
		bluetoothle.write(me.valueWriteSuccessCallback, me.valueWriteFailedCallback, {"address":baseApp.currentlyConnectedAddress, "value":base64Value, "serviceUuid":app.serviceUUID, "characteristicUuid":me.uuid});
	};
	
	this.valueReturnedCallback = function(retObject) {
		console.log("valueReturnedCallback:"+ me.id);
		
		if(retObject.characteristicUuid != me.uuid)
		{
			console.log("I got the wrong UUID value! " + me.uuid + " I got " + retObject.characteristicUuid);
		}
		
		baseApp.handleBLECallback(retObject);
		
		var data = atob(retObject.value);
		
		if(me.returnType === "json" || me.returnType === undefined) {
			data = data.substring(2);
			data = data.substring(0, data.length-1);
			currentValue = null;
			
			if(isValidJSON(data)) {
				currentValue = JSON.parse(data);
			}

			else {
				currentValue = data;
			}
		}
		
		else if(me.returnType === "int") {
			var buf = new Uint8Array(4);
			
			for (var i = 0; i < 4; ++i) {
				buf[i] = data.charCodeAt(i);
			}

			currentValue = new Int32Array(buf.buffer)[0];
		}
		
		else if(me.returnType === "float") {
			var buf = new Uint8Array(4);
			
			for (var i = 0; i < 4; ++i) {
				buf[i] = data.charCodeAt(i);
			}

			currentValue = new Float32Array(buf.buffer)[0];
		}
		
		else if(me.returnType === "double") {
			var buf = new Uint8Array(8);
			
			for (var i = 0; i < 8; ++i) {
				buf[i] = data.charCodeAt(i);
			}

			currentValue = new Float64Array(buf.buffer)[0];
		}
		
		else if(me.returnType === "void") {
			currentValue = null;
		}
		
		else if(me.returnType === "bool") {
			currentValue = true == data.charCodeAt(0);
		}
		
		else if(me.returnType === "char") {
			currentValue = data.charCodeAt(i);
		}

		else if(me.returnType === "string") {
			currentValue = data;
		}
		
		if(me.valueReturned !== null) {
			me.valueReturned();
		}
		
		me.waiting = false;
		
		if(me.waitingTimeout !== null) {
			clearTimeout(me.waitingTimeout);
			me.waitingTimeout = null;
		}
		
		if(me.waitingCommand != null) {
			me.sendEvent(0, "");
		}
	};
	
	this.notifyReturnedCallback = function(retObject) {
		console.log("notifyReturnedCallback");
        
	var data = atob(retObject.value);
	console.log(data.length);
	data = data.substring(2);
	data = data.substring(0, data.length-1);
	currentValue = null;

	if(isValidJSON(data)) {
		currentValue = JSON.parse(data);
	}

	else {
		currentValue = data;
	}

		me.notified();
	};
	
	
	
	this.valueWriteFailedCallback = function(retObject) {
		console.log("valueWriteFailedCallback:"+ me.id);
		baseApp.handleBLECallback(retObject);
		me.waiting = false;
	};
	
	this.valueWriteSuccessCallback = function(retObject) {
		console.log("valueWriteSuccessCallback:"+ me.id);
		
		baseApp.handleBLECallback(retObject);
		
		if(me.valueReturned !== null) {
			bluetoothle.read(me.valueReturnedCallback, me.valueReadFailedCallback, {"address":baseApp.currentlyConnectedAddress, "serviceUuid":app.serviceUUID, "characteristicUuid":me.uuid});
		}
		
		else {
			me.waiting = false;
		
			if(me.waitingTimeout !== null) {
				clearTimeout(me.waitingTimeout);
				me.waitingTimeout = null;
			}
			
			if(me.waitingCommand != null) {
				me.sendEvent(0, "");
			}
		}
	};
	
	//Source Method
	this.getValue = function() {
		return currentValue;
	};
}

function AppFunction() {
	var currentValue;
	
	//Trigger
	this.executed = function() {
	};
	
	//Helper this will be redefined to be the users code.
	this.executeCode = function(args) {
	};
	
	//Target
	this.execute = function(args) {
		currentValue = this.executeCode(args);
		this.executed();
	};
	
	//Source
	this.getValue = function(args) {
		return currentValue;
	};
}

function Scanner() {
	var currentValue = null;
	var me = this;
	
	baseApp.scanners.push(this);
	
	//Trigger
	this.deviceDiscovered = function() {
	};
	
	//Trigger
	this.scanningStarted = function() {
	};
	
	//Trigger
	this.scanningStopped = function() {
	};
	
	//Target
	this.startScan = function(args) {
		baseApp.startScanning();
	};
	
	//Target
	this.stopScan = function(args) {
		baseApp.stopScanning();
	};
	
	//Helper
	this.bleCallbackHandler = function(e) {
		currentValue = e;
		
		if(currentValue.status == "scanStarted") {
			this.scanningStarted();
		}
		
		else if(currentValue.status == "scanStopped") {
			this.scanningStopped();
		}
		
		else if(currentValue.status == "scanResult") {
			this.deviceDiscovered();
		}
	};
	
	//Source
	this.getDeviceName = function() {
		
		if(currentValue === null) {
			return null;
		}
		
		return currentValue.name;
	};
	
	//Source
	this.getDeviceAddress = function() {
		
		if(currentValue === null) {
			return null;
		}
		
		return currentValue.address;
	};
	
	//Source
	this.getDeviceRSSI = function() {
		
		if(currentValue === null) {
			return null;
		}
		
		return currentValue.rssi;
	};
	
	//Source
	this.getValue = function () {
		return [currentValue.name, currentValue.address, currentValue.rssi];
	};
}

function Connection() {
	
	// Current value is never read?
	var currentValue;
	var currentAddress;
	var currentName;
	
	// Me is never read?
	var me = this;
	
	baseApp.connections.push(this);
	
	//Trigger
	this.connecting = function() {
	};
	
	//Trigger
	this.connected = function() {
	};
	
	//Trigger
	this.disconnecting = function() {
	};
	
	//Trigger
	this.disconnected = function() {
	};
	
	//Helper
	this.bleCallbackHandler = function(e) {
		currentValue = e;
		
		if(e.address !== undefined) {
			currentAddress = e.address;
		}
		
		if(e.name !== undefined) {
			currentName = e.name;
		}
		
		//console.log(JSON.stringify(currentValue));
		
		if(currentValue.status == "subscribed") {
			this.connected();
		}
		
		else if(currentValue.status == "connecting") {
			this.connecting();
		}
		
		else if(currentValue.status == "disconnecting") {
			this.disconnecting();
		}
		
		else if(currentValue.status == "disconnected")	{
			this.disconnected();
		}
		
		// else?
	};
	
	//Target
	this.connectToDevice = function(address) {
		baseApp.connectToDevice(address);
	};
	
	//Target
	this.disconnectFromDevice = function() {
		baseApp.disconnectFromDevice();
	};
	
	//Source
	this.getDeviceName = function() {
		return currentName;
	};
	
	//Source
	this.getDeviceAddress = function() {
		return currentAddress;
	};
	
	//Source
	this.getConnected = function() {
		return baseApp.isConnected;
	};
	
	//We may wish to expand this into a complete bluetooth control system.
}

function LocalStorage(k) {
	
	var value = '';
	var key = k;
 
	//Trigger
	this.valueSet = function() {
	};
	
	//Trigger
	this.valueReturned = function() {
	};
	
	//Target
	this.setKey = function(k) {
		key = k;
	};
	
	//Target
	this.setValue = function(value) {
		window.localStorage.setItem(key, JSON.stringify(value));
		this.valueSet();
	};
	
	//Target
	this.retrieveValue = function() {
		value = JSON.parse(window.localStorage.getItem(key));
		this.valueReturned();
	};
	
	//Source
	this.getValue = function() {
		return value;
	};
	
	//Source
	this.getKey = function() {
		return key;
	};
	
}

function WebIO() {
	var uri = null;
	var me = this;
	var currentValue = null;
	var currentStatus = 404;
	
	//Trigger
	this.valueReturned = function () {
	};
	
	//Trigger
	this.errorReturned = function () {
	};
	
	//Helper
	this.valueReturnedCallback = function(request) {
		//console.log(JSON.stringify(request));
		
		currentStatus = request.status;
		
		if (request.status == 200) {
			try {
				currentValue = JSON.parse(request.response);
			}
			catch(e) {
				currentValue = request.response;
				
			}
			
			me.valueReturned();
		}
		
		else {
			currentValue = null;
			me.errorReturned();
		}
	};
	
	//Target
	this.get = function (data) {
        //console.log(JSON.stringify(data));
		var gdata = zebra.io.GET(uri, {data:encodeURI(JSON.stringify(data))}, me.valueReturnedCallback);
	};
	
	//Target
	this.post = function (data) {
        //console.log(JSON.stringify(data));
		var gdata = baseApp.POST(uri, {data:encodeURI(JSON.stringify(data))}, me.valueReturnedCallback);
	};
	
	//Target
	this.advancedGet = function(data) {
        //console.log("get sent");
        //console.log(data);
		var gdata = zebra.io.GET(uri, data, me.valueReturnedCallback);
	};
	
	//Target
	this.advancedPost = function(data, headers) {
        //console.log("get sent");
        //console.log(JSON.stringify(data));
		var gdata = baseApp.POST(uri, data, me.valueReturnedCallback, headers);
	};
	
	//Target
	this.setURI = function (value) {
		uri = value;
	};
	
	//Source
	this.getURI = function () {
		return uri;
	};
	
	//Source
	this.getValue = function () {
		return currentValue;
	};
	
	//Source
	this.getStatus = function () {
		return currentStatus;
	};
}

function GATTBattery() {
	var currentValue = null;
	var currentStatus = null;
	
	// Me is never read?
	var me = this;
	
	baseApp.connections.push(this);
	
	//Helper
	//Once we are connected we can subscripe to the battery service notifier
	this.bleCallbackHandler = function(e) {
// 		if(currentValue.status == "subscribed") {
// 			this.connected();
// 		}
		
		// else?
	};
	
	//Helper Method
	this.valueReadFailedCallback = function(retObject) {
		console.log("valueReadFailedCallback:"+ me.id);
		baseApp.handleBLECallback(retObject);
	};
	
	//Helper
	this.valueReturnedCallback = function(retObject) {
		console.log("valueReturnedCallback:"+ me.id);
		
		if(retObject.characteristicUuid != me.uuid)
		{
			console.log("I got the wrong UUID value! " + me.uuid + " I got " + retObject.characteristicUuid);
		}
		
		baseApp.handleBLECallback(retObject);
		
		var data = atob(retObject.value);
		
		currentValue = data.charCodeAt(0);

		if(me.batteryLevelRead !== null) {
			me.batteryLevelRead();
		}
	};
	
	//Trigger
	this.batteryLevelRead = function () {
	};
	
	//Trigger
	this.batteryLevelNotified = function () {
	};
	
	//Source
	this.getBatteryLevel = function () {
		return currentValue;
	};
	
	//Target
	this.readBatteryLevel = function () {
		console.log(JSON.stringify({"address":baseApp.currentlyConnectedAddress, "serviceUuid":"180f", "characteristicUuid":"2a19"}));
		bluetoothle.read(me.valueReturnedCallback, me.valueReadFailedCallback, {"address":baseApp.currentlyConnectedAddress, "serviceUuid":"180f", "characteristicUuid":"2a19"});
	};
}
	
function GATTImmediateAlert() {
	var currentValue = null;
	var currentStatus = null;
	
	// Me is never read?
	var me = this;
	
	//Helper Method
	this.valueReadFailedCallback = function(retObject) {
		console.log("valueReadFailedCallback:"+ me.id);
		baseApp.handleBLECallback(retObject);
	};
	
	//Helper
	this.valueWriteCallback = function(retObject) {
		console.log("valueWriteSuccessCallback");
		
		baseApp.handleBLECallback(retObject);
	};
	
	//Target
	this.writeAlertLevel = function (level) {	
		var t = [0x00]
		
		for ( var index = 0; index < t.length; index ++ ) {
			var byte = level & 0xff;
			t [ index ] = byte;
			level = (level - byte) / 256 ;
		}
		
		var value = new Uint8Array(t);
		base64Value = bluetoothle.bytesToEncodedString(value);
		
		console.log(JSON.stringify({"address":baseApp.currentlyConnectedAddress, "value":base64Value, "serviceUuid":"1802", "characteristicUuid":"2a06","type":"noResponse"}));
		
		bluetoothle.write(me.valueWriteCallback, me.valueWriteCallback, {"address":baseApp.currentlyConnectedAddress, "value":base64Value, "serviceUuid":"1802", "characteristicUuid":"2a06","type":"noResponse"});
	};
}

var baseApp = {
	bleready:false,
	currentScanResults:{},
	scanners:[],
	connections:[],
	functionMapping:{},
	isConnected:false,
	connectionTimeout:null,
	
	POST:function(url, data, callback, headers) {
		var xmlhttp;

		console.log(headers);
		console.log(data);

		// build the data
		var formData = "";
		
		for (var key in data) {
			formData += key + "=" + data[key] + "&";
		}

		formData = formData.substring(0, formData.length - 1);

		console.log(formData);

		if (window.XMLHttpRequest) {
			xmlhttp = new XMLHttpRequest();
		}
		
		else {
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}     
		// setup a callback function if it is defined
		if (callback !== null && callback !== undefined) {
			
			xmlhttp.onreadystatechange=function() {
				if(xmlhttp.readyState == 4) {
					callback(xmlhttp);
				}
			}
			
			xmlhttp.ontimeout=function() {
				callback(xmlhttp);
			}
		}
		// open request to url async
		xmlhttp.open("POST", url, true);
		// check header and set up headers
		if (headers !== null && headers !== undefined) {
			for(var key in headers) {
				console.log(key.toString());
				console.log(headers[key]);
				xmlhttp.setRequestHeader(key.toString(), headers[key]);
			}
		}
		else {
			xmlhttp.setRequestHeader("Connection", "close");
		}
		
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.setRequestHeader("Content-length", formData.length);
		// send it
		xmlhttp.send(formData);   
	},
	
	initialize: function() {
		this.bindEvents();
	},

	bindEvents: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},

	setAppVisible:function() {
		app.appPanel.setVisible(true);
		app.devWrapperPanel.setVisible(false);
		app.debugWrapperPanel.setVisible(false);
	},
	
	setDevVisible:function(value) {
		app.appPanel.setVisible(false);
		app.devWrapperPanel.setVisible(true);
		app.debugWrapperPanel.setVisible(false);
	},
	
	setDebugVisible:function(value) {
		app.appPanel.setVisible(false);
		app.devWrapperPanel.setVisible(false);
		app.debugWrapperPanel.setVisible(true);
	},
	
	debugLog:function(data) {
		if ((app.consoleTextArea !== undefined) && (app.consoleTextArea !== null)) {
			if ((app.consoleTextArea.getValue() !== undefined) && (app.consoleTextArea.getValue() !== null)) {
				var curConsole = app.consoleTextArea.getValue();
				app.consoleTextArea.setValue(curConsole + "\n" + data);
			}
			else {
				app.consoleTextArea.setValue(data);
			}
		}
		
		console.log(data);
	},
	
	onDeviceReady: function() {
		bluetoothle.initialize(baseApp.initializeSuccess, baseApp.initializeFailed, {"request":true});
		
		baseApp.screenWidth = window.innerWidth;
		baseApp.screenHeight = window.innerHeight;
		baseApp.screenPixelRatio = window.devicePixelRatio || 1;
		baseApp.currentlyConnectedAddress = "";
		
		zebra.ready(function() {
			
			//Something went wrong with loading the application
			try {
				if(app === undefined) {
				}
			} catch(err) {
				app = {};
				app.airError = true;
				app.initialize = function() {
					return;
				};
			}
			
			app.deviceListMapping = {};
			
			
			app.canvas = new zebra.ui.zCanvas("main");
			app.canvas.fullScreen();
			app.root = app.canvas.root;
			//app.root.setLayout(new zebra.layout.RasterLayout());
			app.root.setLayout(new zebra.layout.BorderLayout(0,0));
			
			app.mainPanel = new zebra.ui.Panel();
			app.mainPanel.setLayout(new zebra.layout.RasterLayout());
			app.root.add(zebra.layout.CENTER, app.mainPanel);
			
			app.appPanel = new zebra.ui.Panel();
			app.appPanel.setLayout(new zebra.layout.RasterLayout());
			app.appPanel.setBounds(0, 0, app.root.width, app.root.height);
			app.mainPanel.add(app.appPanel);
			
			app.devWrapperPanel = new zebra.ui.Panel();
			app.devWrapperPanel.setLayout(new zebra.layout.RasterLayout());
			app.devWrapperPanel.setBounds(0, 0, app.root.width, app.root.height);
			app.mainPanel.add(app.devWrapperPanel);
			
			app.debugWrapperPanel = new zebra.ui.Panel();
			app.debugWrapperPanel.setLayout(new zebra.layout.RasterLayout());
			app.debugWrapperPanel.setBounds(0, 0, app.root.width, app.root.height);
			app.mainPanel.add(app.debugWrapperPanel);
			
			//Build the app panel
			app.devToolButton = new zebra.ui.Button(new zebra.ui.ImagePan("img/icons/gears.png"));
			app.devToolButton.setBounds(app.root.width - 64, app.root.height - 64, 64, 64);
			
			app.devToolButton.mousePressed = function(e) {
				baseApp.setDevVisible();
			};
			
			//Build the devtool panel
			app.devToolCloseButton = new zebra.ui.Button(new zebra.ui.ImagePan("img/icons/close.png"));
			app.devToolCloseButton.setBounds(app.root.width - 64, app.root.height - 64, 64, 64);
			
			app.devToolCloseButton.mousePressed = function(e) {
				baseApp.setAppVisible();
			};
			
			app.logoutButton = new zebra.ui.Button(new zebra.ui.ImagePan("img/icons/logout.png"));
			app.logoutButton.setBounds(0, app.root.height - 64, 64, 64);
			app.logoutButton.mousePressed = function(e) {
				baseApp.stopScanning();
				baseApp.disconnectFromDevice();
				window.location = "index.html";
			};
			
			app.refreshButton = new zebra.ui.Button(new zebra.ui.ImagePan("img/icons/refresh.png"));
			app.refreshButton.setBounds(app.root.width - 130, app.root.height - 64, 64, 64);
			
			app.refreshButton.mousePressed = function(e) {
				baseApp.stopScanning();
				baseApp.disconnectFromDevice();
				location.reload();
			};
			
			app.debugButton = new zebra.ui.Button(new zebra.ui.ImagePan("img/icons/ladybug.png"));
			app.debugButton.setBounds(app.root.width - 196, app.root.height - 64, 64, 64);
			
			app.debugButton.mousePressed = function(e) {
				baseApp.setDebugVisible();
			};
			
			app.devPanel = new zebra.ui.Panel({
				layout: new zebra.layout.BorderLayout(4,4),
				background: "white",
				padding: 2,
				border: new zebra.ui.Border("lightGray", 5, 5),	
			});	

			app.devTopPanel = new zebra.ui.Panel(new zebra.layout.FlowLayout(zebra.layout.CENTER, zebra.layout.CENTER, zebra.layout.HORIZONTAL, 2));

			app.devTopPanel.add(new zebra.ui.Label("Connect To Device")).properties({
			canHaveFocus: false,
			font: "20px Arial Bold",
			});

			app.devBottomPanel = new zebra.ui.Panel(new zebra.layout.FlowLayout(zebra.layout.CENTER, zebra.layout.CENTER, zebra.layout.HORIZONTAL, 8));

			app.connectButton = new zebra.ui.Button("Connect").properties({
				height:44,
				width:112,
				psWidth:112,
				psHeight:44
			});
			app.connectButton.bind(function(e) {
				if(app.connectButton.find("//zebra.ui.Label").getValue() == "Connect") {
					baseApp.connectToDevice(e.airAddress);
				}
				else {
					baseApp.disconnectFromDevice();
				}
			});
			
			app.connectButton.setEnabled(false);
			
			app.devBottomPanel.add(app.connectButton);

			app.deviceList = new zebra.ui.Panel(new zebra.layout.ListLayout(zebra.layout.STRETCH, 4));

			app.pScroll = new zebra.ui.ScrollPan(app.deviceList, zebra.layout.VERTICAL);  	
			app.pScrollWrapper = new zebra.ui.BorderPan("Devices", app.pScroll);

			app.scanButton = new zebra.ui.Button("Scan").properties({
				height:44,
				width:112,
				psWidth:112,
				psHeight:44
			});
			
			app.scanButton.setBounds(app.root.width - 110, 96, 108, 38);
			app.scanButton.mousePressed = function(e) {
				if(app.scanButton.find("//zebra.ui.Label").getValue() == "Scan") {
					baseApp.startScanning();
				}
				else {
					baseApp.stopScanning();
				}
			};
			
			app.devBottomPanel.add(app.scanButton);
			
			app.devPanel.add(zebra.layout.TOP, app.devTopPanel);	
			app.devPanel.add(zebra.layout.CENTER, app.pScrollWrapper);	 
			app.devPanel.add(zebra.layout.BOTTOM, app.devBottomPanel);	
			app.devPanel.setBounds(22, 22, app.root.width - 44, app.root.height - 88);
			
			//Build debug panel
			app.debugToolCloseButton = new zebra.ui.Button(new zebra.ui.ImagePan("img/icons/close.png"));
			app.debugToolCloseButton.setBounds(app.root.width - 64, app.root.height - 64, 64, 64);
			
			app.debugToolCloseButton.mousePressed = function(e) {
				baseApp.setDevVisible();
			};
			
			app.consoleClearButton = new zebra.ui.Button(new zebra.ui.ImagePan("img/icons/clear.png")).properties(app.defaultButtonProps);
			app.consoleClearButton.setBounds(app.root.width - 130, app.root.height - 64, 64, 64);
			
			app.consoleClearButton.bind(function(e) {
				app.consoleTextArea.setValue("");
			});
			
			app.consoleTextArea = new zebra.ui.TextArea("");
			app.consoleTextArea.setEditable("false");
			app.consoleScrollPan = new zebra.ui.ScrollPan(app.consoleTextArea);
			app.consolePanelBorderPan = new zebra.ui.BorderPan("Debug Console", app.consoleScrollPan);
			app.consolePanelBorderPan.setBorder(new zebra.ui.Border("transparent"));
			app.consolePanelBorderPan.kids[0].setColor("#222222");
			app.consolePanelBorderPan.setBounds(22, 22, app.root.width - 44, app.root.height - 88);
			
			//Init user's app
			baseApp.debugLog("Your Screen is (width, height, pixel ratio) = (" + baseApp.screenWidth + "," + baseApp.screenHeight + "," + baseApp.screenPixelRatio + ")");
			
			if(app.airError == true) {
				baseApp.debugLog("There was a critical error when attempting to try and run your project please send an export of the current Atmosphere project to a developer for debugging at support@atmosphere.anaren.com");
			}
			
			try {
				app.initialize();
				baseApp.debugLog("Using layout \"" + app.currentLayout + "\"");
			} catch (err) {
				baseApp.debugLog(err.toString());
			}
			
			//Finishing up building the UI
			app.devWrapperPanel.setVisible(false);
			app.devWrapperPanel.add(app.devPanel);
			app.devWrapperPanel.add(app.devToolCloseButton);
			app.devWrapperPanel.add(app.logoutButton);
			app.devWrapperPanel.add(app.refreshButton);
			app.devWrapperPanel.add(app.debugButton);
			
			app.debugWrapperPanel.setVisible(false);
			app.debugWrapperPanel.add(app.debugToolCloseButton);
			app.debugWrapperPanel.add(app.consoleClearButton);
			app.debugWrapperPanel.add(app.consolePanelBorderPan);
			
			app.appPanel.add(app.devToolButton);
		});
	},
	
	updateDeviceConnectionPanel: function(name, address, rssi) {
		var devicePanel = null;
		
		for(var key in app.deviceListMapping) {
			if(key == name + ":" + address) {
				devicePanel = app.deviceListMapping[name + ":" + address];
				break;
			}
		}
		
		if(devicePanel == null) {
			devicePanel = new zebra.ui.Panel(new zebra.layout.ListLayout(zebra.layout.STRETCH, 4));
			devicePanel.setPreferredSize(app.root.width - 44 - 50, 60);
			devicePanel.add(new zebra.ui.Label("Name: " + name));	   	
			devicePanel.add(new zebra.ui.Label("Address: " + address));	   	
			devicePanel.add(new zebra.ui.Label("RSSI: " + rssi));	  
			var deviceButton = new zebra.ui.Button();
			deviceButton.setLayout(new zebra.layout.ListLayout(zebra.layout.STRETCH));
			deviceButton.add(devicePanel);
			deviceButton.airAddress = address;
			app.deviceListMapping[name + ":" + address] = devicePanel;
			app.deviceList.add(deviceButton);
			
			deviceButton.bind(function(e) {
				console.log("Pressed " + e.airAddress);
				app.connectButton.airAddress = e.airAddress;
				app.connectButton.setEnabled(true);
				
				for(var i = 0; i < app.deviceList.kids.length; i++) {
					app.deviceList.kids[i].setBackground(new zebra.ui.Gradient("rgb(250, 250, 250)", "rgb(234, 234, 234)"));
				}
				
				e.setBackground(new zebra.ui.Gradient("#DCEBF9", "#7BAEDB"));
				
			});
			
			app.devPanel.repaint();
		}
		
		else {
			devicePanel.removeAll();
			devicePanel.add(new zebra.ui.Label("Name: " + name));	   	
			devicePanel.add(new zebra.ui.Label("Address: " + address));
			devicePanel.add(new zebra.ui.Label("RSSI: " + rssi));
			
			app.devPanel.repaint();
		}
	},
	
	startScanning: function() {
		console.log("startScanning: Serive UUID:" + app.serviceUUID.toString());
		
		if (device.platform == iOSPlatform) {
			bluetoothle.startScan(baseApp.scanSuccess, baseApp.scanFailed, {"serviceUuids": [app.serviceUUID]});
		}
		
		else if(device.platform == androidPlatform) {
			bluetoothle.startScan(baseApp.scanSuccess, baseApp.scanFailed, {"serviceUuids": []});
		}
	},
	
	stopScanning: function() {
		console.log("stopScanning");
		
		bluetoothle.stopScan(baseApp.scanSuccess, baseApp.scanFailed);
	},
	
	connectToDevice: function(address) {
		console.log("connectToDevice: " + address);
		
		baseApp.currentlyConnectedAddress = address;
		
		bluetoothle.connect(baseApp.connectedSuccess, baseApp.connectedFailed, {"address":address});
	},
	
	disconnectFromDevice: function(address) {
		console.log("disconnectFromDevice");
		
		if(address === undefined) {
			address = baseApp.currentlyConnectedAddress;
			
		}
		
		bluetoothle.disconnect(baseApp.disconnectSuccess, baseApp.disconnectFailed, {"address":address});
	},
	
	closeConnection: function(address) {
		console.log("closeConnection");
		
		if(address === undefined) {
			address = baseApp.currentlyConnectedAddress;
			
		}
		
		baseApp.connected = false;
		bluetoothle.close(baseApp.closeSuccess, baseApp.closeFailed, {"address":address});
	},
	
	reconnectToDevice: function(address) {
		console.log("reconnectToDevice");
		
		if(address === undefined) {
			address = baseApp.currentlyConnectedAddress;
			
		}
		
		bluetoothle.reconnect(baseApp.connectedSuccess, baseApp.connectedFailed, {"address":address});
	},
	
	handleBLECallback: function(retObject, fromCallback) {
		console.log("handleBLECallback");
		console.log(JSON.stringify(retObject));
		app.appPanel.repaint();

		//Status Types
		if(retObject.status !== undefined) {
			switch(retObject.status) {
				case "enabled":
					break;
					
				case "scanStarted":
					app.scanButton.find("//zebra.ui.Label").setValue("Stop");
					break;
					
				case "scanStopped":
					app.scanButton.find("//zebra.ui.Label").setValue("Scan");
					break;
					
				case "scanResult":
					
					//FIXME: There is a bug with the service filtering when scanning with android. this is a workaround
					
					if (device.platform == androidPlatform) {
						
						var advData = retObject.advertisement;
						
						var rawData = atob(advData);
						
						serviceUuid = "";
						
						for(var i = 20; i >= 5; i--) {
							serviceUuid = serviceUuid + ("00" + rawData.charCodeAt(i).toString(16)).slice(-2);
							
							if(i == 17 || i == 15 || i == 13 || i == 11) {
								serviceUuid = serviceUuid + "-";
							}
							
						}
						
						if(serviceUuid !== app.serviceUUID) {
							return;
						}
					}
					
					baseApp.updateDeviceConnectionPanel(retObject.name, retObject.address, retObject.rssi);
					break;
				
				case "connecting":
					app.connectButton.find("//zebra.ui.Label").setValue("Connecting");
					baseApp.connectionTimeout = setTimeout(function() {
						console.log("CONNECTION TIMEOUT REACHED");
						baseApp.debugLog("Attempt to connect to device reached it's timeout");
						clearTimeout(baseApp.connectionTimeout);
						app.connectButton.find("//zebra.ui.Label").setValue("Connect");
						baseApp.disconnectFromDevice(retObject.address);
						
					}, 10000);
					
					break;
					
				case "connected":
					app.connectButton.find("//zebra.ui.Label").setValue("Discovering");
					
					
					
					if (device.platform == iOSPlatform)	{
						console.log("Discovering services");
						var paramsObj = {"address":baseApp.currentlyConnectedAddress, "serviceUuids":[]};
						bluetoothle.services(baseApp.servicesSuccess, baseApp.servicesFailure, paramsObj);
					}
					
					else if (device.platform == androidPlatform) {
						console.log("Beginning discovery");
						var paramsObj = {"address":baseApp.currentlyConnectedAddress, "serviceUuids":[app.serviceUUID]};
						bluetoothle.discover(baseApp.discoverSuccess, baseApp.discoverFailed, paramsObj);
					}
					
					break;
					
				case "disconnecting":
					app.connectButton.find("//zebra.ui.Label").setValue("Disconnecting");
					
					break;
					
				case "disconnected":
					app.connectButton.find("//zebra.ui.Label").setValue("Connect");
					baseApp.closeConnection(retObject.address);
					baseApp.isConnected = false;
					
					break;
					
				case "closed":
					
					break;
				
					
				//iOS only
				case "services":
					console.log("Checking for characteristic");
					var serviceUuids = retObject.serviceUuids;
					for (var i = 0; i < serviceUuids.length; i++) {
						// This is never used/read?
						var serviceUuid = serviceUuids[i];
			
						console.log("Finding characteristics");
						var paramsObj = {"address":baseApp.currentlyConnectedAddress, "serviceUuid":app.serviceUUID};
						bluetoothle.characteristics(baseApp.characteristicSuccess, baseApp.characteristicFailure, paramsObj);
						
						return;
					}
					
					break;
				
				//iOS only
				case "characteristics":
					app.connectButton.find("//zebra.ui.Label").setValue("Disconnect"); 
					
					var paramsObj = {"address":baseApp.currentlyConnectedAddress, "serviceUuid":app.serviceUUID, "characteristicUuid":app.notifyUUID};
					bluetoothle.subscribe(baseApp.subscribeSuccess, baseApp.subscribeFailed, paramsObj);
					
					break;
					
				case "descriptors":
					
					break;
				
				//Android only
				case "discovered":
					app.connectButton.find("//zebra.ui.Label").setValue("Disconnect");
					
					var paramsObj = {"serviceUuid":app.serviceUUID, "characteristicUuid":app.notifyUUID,"isNotification":true, "address":baseApp.currentlyConnectedAddress};
					bluetoothle.subscribe(baseApp.subscribeSuccess, baseApp.subscribeFailed, paramsObj);

					break;
					
				case "read":
					
					break;
					
				case "subscribed":
					baseApp.isConnected = true;
					clearTimeout(baseApp.connectionTimeout);
					
					for(var id in baseApp.functionMapping) {
						baseApp.functionMapping[id].waiting = false;
						baseApp.functionMapping[id].waitingCommand = null;
					}
					
					if (device.platform == androidPlatform) {
// 						console.log("Changing priority");
// 						var paramsObj = {"address":baseApp.currentlyConnectedAddress, "priority":"high"};
// 						bluetoothle.requestConnectionPriority(function(ret){console.log("SUCCESS GOT:" + JSON.stringify(ret));} , function(ret){console.log("FAILURE GOT:" + JSON.stringify(ret));}, paramsObj);
					}
					
					baseApp.setAppVisible();
					break;
					
				case "subscribedResult":
					if(retObject.serviceUuid == app.serviceUUID && retObject.characteristicUuid == app.notifyUUID) {
						console.log("notification returned!")
						
						//console.log("Got data:" + atob(retObject.value));
						var data = atob(retObject.value);
						
						var code = data.charCodeAt(0);
						var id = data.charCodeAt(1);
						
						//FIXME:Le-sigh... This wasn't a notification, iOS has a bug...
						if(code == 0x04) {
							retObject.status = "read";
							if(baseApp.functionMapping[id] !== undefined) {
								baseApp.functionMapping[id].valueReturnedCallback(retObject);
							}
							return;
						}
						
						if(baseApp.functionMapping[id] !== undefined) {
							baseApp.functionMapping[id].notifyReturnedCallback(retObject);
						}
					}
					
					break;
					
				case "unsubscribed":
					break;
					
				case "written":
					break;
					
				case "readDescriptor":
					break;
					
				case "writtenDescriptor":
					break;
					
				case "rssi":
					break;
					
				default:
					break;
			}
		}

		if(retObject.error !== undefined) {
		
			switch(retObject.error) {
				//Error Types
				case "initialize":
					break;
					
				case "enable":
					break;
					
				case "arguments":
					break;
					
				case "startScan":
					app.scanButton.find("//zebra.ui.Label").setValue("Stop");
					break;
					
				case "stopScan":
					app.scanButton.find("//zebra.ui.Label").setValue("Start");
					break;
					
				case "connect":
					app.connectButton.find("//zebra.ui.Label").setValue("Connect");
					
					if(fromCallback === "closeFailed" && retObject.error === "isNotDisconnected") {
						baseApp.disconnectFromDevice(retObject.address);
					}
					
					else if(fromCallback === "connectedFailed") {
						baseApp.closeConnection(retObject.address);
					}
					
					else if(fromCallback !== "disconnectFailed" && fromCallback !== "closeFailed") {
						baseApp.disconnectFromDevice(retObject.address);
					}
					
					//We have had a disconnect error, meaning we may need to try and close the connection.
					else if(fromCallback !== "closeFailed") {
						baseApp.closeConnection(retObject.address);
					}
					
					break;
					
				case "reconnect":
					break;
					
				case "discover":
					break;
					
				case "read":
					baseApp.debugLog("Read Error: Unable to read characteristic from target device: " + retObject.serviceUuid + ':' + retObject.characteristicUuid);
					break;
					
				case "subscription":
					break;
					
				case "write":
					baseApp.debugLog("Write Error: Unable to write characteristic from target device: " + retObject.serviceUuid + ':' + retObject.characteristicUuid);
					break;
					
				case "redDescriptor":
					break;
					
				case "writeDescriptor":
					break;
					
				case "rssi":
					break;
					
				case "neverConnected":
					app.connectButton.find("//zebra.ui.Label").setValue("Connect");
					baseApp.isConnected = false;
					
					break;
					
				case "isNotDisconnected":
					break;
					
				case "isNotConnected":
					baseApp.isConnected = false;
					break;
					
				case "isDisconnected":
					app.connectButton.find("//zebra.ui.Label").setValue("Connect");
					baseApp.closeConnection(retObject.address);
					
					break;
					
				case "service":
					break;
					
				case "characteristic":
					break;
					
				case "descriptor":
					break;
					
				default:
					break;
			}
		}
		
		var i = 0;
		
		for(i = 0; i < baseApp.scanners.length; i++) {
			baseApp.scanners[i].bleCallbackHandler(retObject);
		}
		
		for(i = 0; i < baseApp.connections.length; i++)	{
			baseApp.connections[i].bleCallbackHandler(retObject);
		}
	},
	
	initializeSuccess: function(retObject) {
		console.log("initializeSuccess");
		baseApp.bleready = true;
	},
	
	initializeFailed: function(retObject) {
		console.log("initializeFailed");
		baseApp.bleready = false;
	},
	
	scanSuccess: function(retObject) {
		console.log("scanSuccess");
		baseApp.handleBLECallback(retObject, "scanSuccess");
	},
	
	scanFailed: function(retObject) {
		console.log("scanFailed");
		baseApp.handleBLECallback(retObject, "scanFailed");
	},
	
	connectedSuccess: function(retObject) {
		console.log("connectedSuccess");
		baseApp.handleBLECallback(retObject, "connectedSuccess");
	},
	
	servicesSuccess: function(retObject) {
		console.log("servicesSuccess");
		baseApp.handleBLECallback(retObject, "servicesSuccess");
	},
	
	servicesFailure: function(retObject) {
		console.log("servicesFailure");
		baseApp.handleBLECallback(retObject, "servicesFailure");
	},
	
	characteristicSuccess: function(retObject) {
		console.log("characteristicSuccess");
		baseApp.handleBLECallback(retObject,"characteristicSuccess");
	},
	
	characteristicFailure: function(retObject) {
		console.log("characteristicFailure");
		baseApp.handleBLECallback(retObject, "characteristicFailure");
	},
	
	connectedFailed: function(retObject) {
		console.log("connectedFailed");
		baseApp.handleBLECallback(retObject, "connectedFailed");
	},
	
	disconnectSuccess: function(retObject) {
		console.log("disconnectSuccess");
		baseApp.handleBLECallback(retObject, "disconnectSuccess");
	},
	
	disconnectFailed: function(retObject) {
		console.log("disconnectFailed");
		baseApp.handleBLECallback(retObject, "disconnectFailed");
	},
	
	discoverSuccess: function(retObject) {
		console.log("discoverSuccess");
		baseApp.handleBLECallback(retObject, "discoverSuccess");
	},
	
	discoverFailed: function(retObject) {
		console.log("discoverFailed");
		baseApp.handleBLECallback(retObject, "discoverFailed");
	},
	
	closeSuccess: function(retObject) {
		console.log("closeSuccess");	
		baseApp.handleBLECallback(retObject, "closeSuccess");
	},
	
	closeFailed: function(retObject) {
		console.log("closeFailed");
		baseApp.handleBLECallback(retObject, "closeFailed");
	},
	
	subscribeSuccess: function(retObject) {
		console.log("subscribedSuccess");
        	baseApp.handleBLECallback(retObject, "subscribedSuccess");
	},
	
	subscribeFailed: function(retObject) {
		console.log("subscribedFailed");
		baseApp.handleBLECallback(retObject,"subscribedFailed");
	},
};
