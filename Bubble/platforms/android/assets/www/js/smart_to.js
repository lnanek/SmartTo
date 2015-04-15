

var UNSTABLE_DELTA = 250;

var mockValue1 = {
	'value':'-16640,64,16192,0,0,0'
};

var mockValue2 = {
	'value':'-16640,0,16192,0,0,0'
};

var mockValue3 = {
	'value':'4032,0,16320,0,0,0'
};

var recCount = 0;

var uberUrl = 'https://m.uber.com/sign-up?client_id=E-oMZWkA0kWkCkQBh1VhT5QUJhXnlFqz&first_name=Lance&last_name=Nanek&email=lnanek@gmail.com&country_code=us&mobile_country_code=%2B1&mobile_phone=123-456-7890&zipcode=94111&product_id=a1111c8c-c720-46c3-8534-2fcdd730040d&pickup_latitude=37.775818&pickup_longitude=-122.418028&pickup_nickname=Uber%20HQ&pickup_address=1455%20Market%20St%2C%20San%20Francisco%2C%20CA%2094103&dropoff_address=';

var uberUrlMobile = 'uber://?action=setPickup&pickup=my_location&client_id=E-oMZWkA0kWkCkQBh1VhT5QUJhXnlFqz&dropoff_address=';

var previousX, previousY, previousZ;
var hasPrevious = false;

var triggered = false;

var countdownTimeMs = 0;

var countdownStartedTimestamp;

function turnBlueLedOn(app) {
	console.log('turnBlueLedOn');

	// Try to set LED to full
	try {
		var toSend = true;
		app.element_PWMSet22.execute(toSend);
	}
	catch(err) {
		console.log('***error: ' + err.message);
	}
}

function turnBlueLedOff(app) {
	console.log('turnBlueLedOff');

	// Try to set LED to full
	try {
		var toSend = false;
		app.element_PWMSet22.execute(toSend);
	}
	catch(err) {
		console.log('***error: ' + err.message);
	}
}

function processData(targetValues, app) {

	document.getElementById('main').style.display = "none";
	document.getElementById('currentValue').value = JSON.stringify(targetValues);
	recCount++;

	var valuesArray = targetValues.value.split(',');
	var x = parseInt(valuesArray[0]);
	var y = parseInt(valuesArray[1]);
	var z = parseInt(valuesArray[2]);

	console.log('x: ' + x);
	console.log('y: ' + y);
	console.log('z: ' + z);

	var displayString = 'x: ' + x + ', y: ' + y + ', z: ' + z + ', count: ' + recCount;
	document.getElementById('currentValue').value = displayString;


	if ( hasPrevious ) {

		var xDiff = Math.abs(x - previousX);
		var yDiff = Math.abs(y - previousY);
		var zDiff = Math.abs(z - previousZ);

		console.log('xDiff: ' + xDiff);
		console.log('yDiff: ' + yDiff);
		console.log('zDiff: ' + zDiff);

		if (xDiff > UNSTABLE_DELTA
			|| yDiff > UNSTABLE_DELTA
			|| zDiff > UNSTABLE_DELTA) {

			onUnstable(app);
		} else {
			onStable(app);
		}
	}

	previousX = x;
	previousY = y;
	previousZ = z;
	hasPrevious = true;
}

function onStable(app) {
	document.getElementById('currentResult').innerHTML  = 'Not Moving';
	document.getElementById('sTTabContainer').className = "stTabContent";

	turnBlueLedOff(app);
}

function onUnstable(app) {

	if ( sTIsKeyTabSelected() ) {
		turnBlueLedOn(app);
	} else if ( sTIsShoeTabSelected() ) {
		turnBlueLedOn(app);
	} else {
		turnBlueLedOff(app);
	}

	document.getElementById('currentResult').innerHTML  = 'Moving';
	document.getElementById('sTTabContainer').className = "stTabContent sTMoving";

	if (!triggered) {
		triggered = true;
		document.getElementById('stTriggeredDisplay').value = 'true';

		if (sTIsShoeTabSelected()) {
			openUber();

		} else if ( sTIsKeyTabSelected() ) {
			sTPlaySound('stRevSound');

		} else {
			sTSendLeavingText();

		}
	}
}

function sTSendLeavingText() {
	console.log('sTSendLeavingText');

	var number = document.getElementById('stTextOnLeaveNumber').value;
	sTSendText(number, "I'm getting ready to go out. Will you walk with me?");

	try {
		countdownStartedTimestamp = new Date().getTime();

		var e = document.getElementById("sTDelayMinutes");
		var minutesString = e.options[e.selectedIndex].value;
		var minutesFloat = parseFloat(minutesString);
		countdownTimeMs = minutesFloat * 60 * 1000;

		sTUpdateCountdown();
	}
	catch(err) {
		console.log('***error: ' + err.message);
	}
}

function truncate(n) {
  return n | 0; // bitwise operators convert operands to 32-bit integers
}

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function stCallUpdateCountdown() {
	console.log('stCallUpdateCountdown');

	sTUpdateCountdown();
}

function sTUpdateCountdown() {
	console.log('sTUpdateCountdown');

	if ( !triggered || !sTIsCoatTabSelected() || !countdownStartedTimestamp ) {
		return;
	}

	var msElapsed = new Date().getTime() - countdownStartedTimestamp;
	var msRemaining = countdownTimeMs - msElapsed;
	if (msRemaining <= 0) {
		countdownStartedTimestamp = 0;

		document.getElementById('sTMinutes').value = '--';
		document.getElementById('sTSeconds').value = '--';

		var number = document.getElementById('stTextOnMissingNumber').value;
		sTSendText(number, "I'm didn't arrive when expected. Come look for me, please!");

		return;
	}

	var secondsRemaining = truncate(msRemaining / 1000);
	var minutesRemaining = truncate(secondsRemaining / 60);
	var secondsRemainder = pad(secondsRemaining % 60, 2);

	document.getElementById('sTMinutes').value = minutesRemaining;
	document.getElementById('sTSeconds').value = secondsRemainder;

	setTimeout(stCallUpdateCountdown, 500);
}

function onStopPressed() {
	console.log('onStopPressed');

	countdownStartedTimestamp = 0;
	document.getElementById('sTMinutes').value = '--';
	document.getElementById('sTSeconds').value = '--';

}

function sTPlaySound(id) {
    var audioElement = document.getElementById(id);
    var url = audioElement.getAttribute('src');
    var my_media = new Media(url,
            // success callback
             function () { console.log("playAudio():Audio Success"); },
            // error callback
             function (err) { console.log("playAudio():Audio Error: " + err); }
    );
           // Play audio
    my_media.play();
}

function sTSendText(number, message) {
	console.log('sTSendText - number : ' + number);

	// SMS plugin not available on this platform
	if (typeof sms == 'undefined') {

		alert("Texting: \"" + message + "\" to " + number);

		return;
	}

        //CONFIGURATION
        var options = {
            replaceLineBreaks: false, // true to replace \n by a new line, false by default
            android: {
                //intent: 'INTENT'  // send SMS with the native android SMS messaging
                intent: '' // send SMS without open any other app
            }
        };

        var success = function () { alert('Message sent successfully'); };
        var error = function (e) { alert('Message Failed:' + e); };
        sms.send(number, message, options, success, error);
}

function sTIsShoeTabSelected() {
	return 'selected' == document.getElementById('stShoeTab').className;
}

function sTIsKeyTabSelected() {
	return 'selected' == document.getElementById('stKeyTab').className;
}

function sTIsCoatTabSelected() {
	return 'selected' == document.getElementById('stCoatTab').className;
}

function sTResetTriggered() {
	triggered = false;
	countdownStartedTimestamp = 0;
	document.getElementById('stTriggeredDisplay').value = 'false';
}

function openUber() {
	console.log('openUber');

	var rawAddress = document.getElementById('sTDestination').value;
	var encodedAddress = encodeURIComponent(rawAddress);


	    if (typeof navigator !== "undefined" && navigator.app) {
	        // Mobile device.
	        window.open(uberUrlMobile + encodedAddress, '_system');
	    } else {
	        // Possible web browser
	        window.open(uberUrl + encodedAddress, '_system');
    }
}

function onMock1Pressed() {
	processData(mockValue1);
}

function onMock2Pressed() {
	processData(mockValue2);
}

function onMock3Pressed() {
	processData(mockValue3);
}

function onKeyTabClick() {
	console.log('onKeyTabClick');
	sTResetTriggered();

	document.getElementById('stKeyTab').className = 'selected';
	document.getElementById('stCoatTab').className = '';
	document.getElementById('stShoeTab').className = '';

	document.getElementById('stKeyTabContent').style.display = '';
	document.getElementById('stCoatTabContent').style.display = 'none';
	document.getElementById('stShoeTabContent').style.display = 'none';
}

function onCoatTabClick() {
	console.log('onCoatTabClick');
	sTResetTriggered();

	document.getElementById('stKeyTab').className = '';
	document.getElementById('stCoatTab').className = 'selected';
	document.getElementById('stShoeTab').className = '';

	document.getElementById('stKeyTabContent').style.display = 'none';
	document.getElementById('stCoatTabContent').style.display = '';
	document.getElementById('stShoeTabContent').style.display = 'none';
}

function onShoeTabClick() {
	console.log('onShoeTabClick');
	sTResetTriggered();

	document.getElementById('stKeyTab').className = '';
	document.getElementById('stCoatTab').className = '';
	document.getElementById('stShoeTab').className = 'selected';

	document.getElementById('stKeyTabContent').style.display = 'none';
	document.getElementById('stCoatTabContent').style.display = 'none';
	document.getElementById('stShoeTabContent').style.display = '';

}