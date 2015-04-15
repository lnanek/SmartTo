var iOSPlatform = "iOS";
var androidPlatform = "Android";

var baseApp = {
	bleready:false,
	waiting:true,
	currentReadCallBack:null,
	currentScanResults:{},
	
	// Application Constructor
	initialize: function() {
		this.bindEvents();
	},
	// Bind Event Listeners
	//
	// Bind any events that are required on startup. Common events are:
	// 'load', 'deviceready', 'offline', and 'online'.
	bindEvents: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},
	// deviceready Event Handler
	//
	// The scope of 'this' is the event. In order to call the 'receivedEvent'
	// function, we must explicity call 'baseApp.receivedEvent(...);'
	onDeviceReady: function() {
		bluetoothle.initialize(baseApp.onInitializeSuccess, baseApp.onInitializeFailed);
		app.initialize();
	},
	
	onInitializeSuccess: function() {
		console.log("BLE Success");
		baseApp.bleready = true;
// 		bluetoothle.startScan(baseApp.onScanSucces, baseApp.onScanFailed, {});
	},
	
	onInitializeFailed: function() {
		console.log("BLE Failed");
		baseApp.bleready = false;
	},
	
	onScanSucces:function(retObject) {
		app.scanCallback(retObject);
	},
	
	onScanFailed:function(retObject) {
	},
	
	onConnectedSuccess:function(retObject)
	{
		console.log(JSON.stringify(retObject));
		
		if (retObject.status == "connected")
		{
			if (device.platform == iOSPlatform)
			{
				console.log("Discovering service");
				var paramsObj = {"serviceUuids":[app.serviceUUID]};
				bluetoothle.services(baseApp.discoverSuccess, function(retObject){console.log("Failed to discover services");}, paramsObj);
			}
			
			else if (device.platform == androidPlatform)
			{
				console.log("Beginning discovery");
				bluetoothle.discover(baseApp.discoverSuccess, function(retObject){console.log("Failed to discover services");});
			}
		}
		
	},
	
	onConnectedFailed:function(retObject)
	{
		console.log(JSON.stringify(retObject));
	},
	
	connectToDevice:function(address)
	{
		if(baseApp.bleready) 
		{
			bluetoothle.connect(baseApp.onConnectedSuccess, baseApp.onConnectedFailed, {"address":address});
		}
	},
	
	
	discoverSuccess:function(retObject)
	{
		console.log(JSON.stringify(retObject));
		
		if(retObject.status == "discovered")
		{
			baseApp.waiting = false;
// 			baseApp.sendEvent(0x01, 0x01, []);
		}
	},
	
	writeSuccess:function(retObject)
	{
		console.log(JSON.stringify(retObject));
		baseApp.waiting = false;
		
		if(baseApp.currentReadCallBack != null)
		{
			bluetoothle.read(baseApp.currentReadCallBack, baseApp.readFailed, {"serviceUuid":app.serviceUUID, "characteristicUuid":app.charUUID});
		}
	},
	
	writeFailed:function(retObject)
	{
		console.log("Failed to write value:" + JSON.stringify(retObject));
		baseApp.waiting = false;
	},
	
	readSuccess:function(retObject)
	{
		console.log(JSON.stringify(retObject));
		baseApp.waiting = false;
	},
	
	readFailed:function(retObject)
	{
		console.log(JSON.stringify(retObject));
		baseApp.waiting = false;
	},
	
	onScanPressed : function() {
		console.log("Scan Button Pressed");
	},
	
	sendEvent:function(commandType, commandId, data, f)
	{
		//var u8 = new Uint8Array(u8bytes)[0];
		//{"type":0x01, "commandId":0x01, "args":UInt8Array[]}
		
		var t = [commandType, commandId, data.length];
		
		for(var x = 0; x < 13 && x < data.length; x++)
		{
			t.push(data[x]);
		}
		
		var value = new Uint8Array(t)
		var base64Value = bluetoothle.bytesToEncodedString(value);
		
		if(!baseApp.waiting)
		{
			baseApp.waiting = true;
			bluetoothle.write(baseApp.writeSuccess, baseApp.writeFailed, {"value":base64Value, "serviceUuid":app.serviceUUID, "characteristicUuid":app.charUUID});
			baseApp.currentReadCallBack = f;
		}
		
	}
};
