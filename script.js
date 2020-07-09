$(document).ready(function () {

	console.log('document ready')

	startSong();

})



var bpm = 128;

var millis = bpmToMillis(bpm);

var bgColor = '';

var tempBG = '';

var fgColor = '';

var tempFG = '';



/*

	. -> do nothing

	+ -> change bg and fg

	- -> blackout

	< -> blackout fg, change bg

	> -> blackout bg, change fg

	} -> changes fg, does nothing to bg

	{ -> changes bg, does nothing to fg

	[ -> blackouts bg, doesn't change fg

	] -> blackouts fg, doesn't change bg

	

*/

var script = 'u' +

	'|.......|.......|.......|.......' +

	'|.......|.......|.......|.......' +

	'|.......|.......|.......|.......' +

	'|.......|.......|.......|.......' +

	'|.......|.......|.......|.......' +

	'|.......|.......|.......|.......' +

	'|.......|.......|.......|.......' +

	'|.......|.......|.......||------' +

	'|...<...|...<...|...<...|...----' +

	'|...<...|...<...|...<...|-|-|-|-' +

	'|...<...+.+.<...|...<...|...----' +

	'|...|...|...|...|.....|.....|..-' +

	'|...<...|...<...|...<...|...----' +

	'|...<...|...<...|...<...|-|-|-|-' +

	'|...<...+.+.<...|...<.+-+...----' +

	'|...|...|...|...+<<<<<+<<<<<<<<<' +

	'<<<<<<<<+<<<<<<<<<<<<<<<+<<<<<<<' +

	'<<<<<<<<+<<<<<<<<<<<<<<<+<<<<<<<' +

	'<<<<<<<<+<<<<<<<<<<<<<<<+<<<<<<<' +

	'<-------+---------------+-------' +

	'|...............................' +

	'................................' +

	'|...............................' +

	'................................' +

	'|...............................' +

	'................................' +

	'|...............................' +

	'................................' +

	'|...............................' +

	'................................' +

	'|...............................' +

	'................................' +

	'|.......|...............|.......' +

	'........|...............|.......' +

	'........|...............|.......' +

	'........|...............|.......' +

	'........|...............|.......' +

	'........|...............|.......' +

	'........|...............|.......' +

	'........|...........<-..|.......' +

	'|.--<-<-|.--<-<-|.--<-<-|.--<-<-' +

	'|.--<-<-|.--<-<-|.--<-<-|.--<-<-' +

	'<-<-<-<-<-<-<-<-<-<-<-<-<-<-<-<-' +

	'<-<-<-<-<-<-<-<-<-<-<-<-<-<-<-<-' +

	'+<<<<<<<+<<<<<<<+<<<<<<<+<<<+<<<' +

	'+<<<+<<<+<<<+<<<+<<<+<<<+<<<+<<<' +

	'+<+<+<+<+<+<+<+<+<+<+<+<+<+<+<+<' +

	'++++++++++++++++|.----|.----|.--' +

	'++++--++ ++--|.-- |..-|..- |..-|..-' +

	'||....|| ....|... +...+... +.......' +

	'++++--++ ++--|.-- |..-|..- |..-|..-' +

	'<...>... <...>... |...--|. ..--|.--' +

	'++++--++ ++--|.-- |..-|..- |..-|..-' +

	'<...>... <...>... |...--|. ..--|.--' +

	'++++--++ ++--|.-- |....... ----^...' +

	'<...>... <...>... |...--|. ..--|.--' +

	'+.....+. ....+... <------- <-------' +

	'|.--|.-- ----|.-- |---|-|- <><.....' +

	'|...--|. ..--|.-- <------- <-------' +

	'<------- <------- |.--|.-- |...----' +

	'+.....+. ....+... <------- <-------' +

	'|.--|.-- ----|.-- |---|-|- <><.....' +

	'|...--|. ..--|.-- <------- <-------' +

	'<------- <------- |.--|.-- |...----' +

	'+.]..... }.].{... }.]..... }.].....' +

	'}.]..... }.]..... }.]..... }.].....' +

	'+.]...{. }.].{... }.]..... }.].....' +

	'}.]..... }.]..... +.]..... }.].{...' +

	'>....... ....>... ........ }]......' +

	'........ }]...... ........ }]......' +

	'>.....>. }]..>... ........ }]......' +

	'........ }]...... >....... }]..>...' +

	'+.]..... }.].{... }.]..... }.].....' +

	'}.]..... }.]..... }.]..... >.<.>.--' +

	'+.]..... }.].{... }.]..... }.].....' +

	'}.]..... }.]..... }.]...<. ..<.>.--' +

	'+.]...{. }.].{... }.]..... }.].....' +

	'}.]..... }.]..... }.]..... } ].....' +

	'+.]...{. }.].{... }.]..... }.].....' +

	'+.].+.]. +.].+.]. <...>.<. >.--|---' +

	'+<<<<<+< <<<<+.-- |.--|.-- |.--|.--' +

	'|...|... |...|... +....... .-+.....' +

	'+<<<<<+< <<<<+.-- |.--|.-- |.--|.--' +

	'|...|... |...|... +....-+. .-+.....' +

	'+<<<<<+< <<<<+.-- |.--|.-- |.--|.--' +

	'|...|... |...|... +....... .-+.....' +

	'+<<<<<+< <<<<+.-- |...--|. ..--|..-' +

	'|...|... |...|... <...<... <...>...' +

	'++++--++ ++--|.-- |..-|..- |..-|..-' +

	'||....|| ....|... +...+... +.......' +

	'++++--++ ++--|.-- |..-|..- |..-|..-' +

	'<...>... <...>... |...--|. ..--|.--' +

	'++++--++ ++--|.-- |..-|..- |..-|..-' +

	'<...>... <...>... |...--|. ..--|.--' +

	'++++--++ ++--|.-- |....... ----^...' +

	'<...>... <...>... >...>... <...<.--' +

	'' +

	'+.....+. ....+... <------- <-------' +

	'|.--|.-- ----|.-- |.----|. ..------' +

	'|...--|. ..--|.-- <------- <-------' +

	'<------- <------- |.--|.-- |...----' +

	'+.....+. ....+... <------- <-------' +

	'|.--|.-- ----|.-- |...--|. ..--|..-' +

	'|...--|. ..--|.-- <------- <-------' +

	'<------- <------- |.--|.-- |...----' +

	'+.]..... }.].{... }.]..... }.].....' +

	'}.]..... }.]..... }.]..... }.].....' +

	'+.]...{. }.].{... }.]..... }.].....' +

	'}.]..... }.]..... +.]..... }.].{...' +

	'+.]...{. }.].{... }.]..... }.].....' +

	'+.]...{. }.].{... +.].{... +.].....' +

	'+.].{.{. }.].{.[. +.].}... +.>.....' +

	'}.]..... -------- {........ ....+.--' +

	'' +

	'+<<<<<+< <<<<+.-- |.--|.-- |.--|.--' +

	'|...|... |...|... +....... .-+.....' +

	'+<<<<<+< <<<<+.-- |.--|.-- |.--|.--' +

	'|...|... |...|... +....-+. .-+.....' +

	'+<<<<<+< <<<<+.-- |.--|.-- |.--|.--' +

	'|...|... |...|... +....... .-+.....' +

	'+<<<<<+< <<<<+.-- |...--|. ..--|..-' +

	'|...|... |...|... <...<... <...>...' +

	'++++--++ ++--|.-- |..-|..- |..-|..-' +

	'||....|| ....|... +...+... +.......' +

	'++++--++ ++--|.-- |..-|..- |..-|..-' +

	'<...>... <...>... |...--|. ..--|.--' +

	'++++--++ ++--|.-- |..-|..- |..-|..-' +

	'<...>... <...>... |...--|. ..--|.--' +

	'++++--++ ++--|.-- |....... ----^...' +

	'<...>... <...>... >...>... <...<.--' +

	'>....... ........ ........ --------' +

	's';

var index = 0;



// var timeBeforeStart = 52;
var timeBeforeStart = 66;

//var timeBeforeStart

var song = 'magenta';



var timer;



var colors = [

	'80DFFF',

	'8099FF',

	'A280FF',

	'CC80FF',

	'FF80FF',

	'FF80AE',

	'FF8080',

	'80EAFF',

	'80FFC6',

	'80FF8A',

	'B9FF80',

	'EEFF80',

	'FFDD80',

	'FFB080'

];



function bpmToMillis(bpm) {

	var millisInMinute = 60000;

	return millisInMinute / (bpm * 4);

}



function startSong() {

	var b = true;

	index = -1;

	$('source').attr('src', './songs/' + song + '.mp3');

	setTimeout(function() {

		
		$('audio').trigger('play');
		
		$('audio').prop('volume', 0.1);

		
	}, 3000);
	
	$('audio').bind('playing', function () {
		$('.warning').remove();
		
		if (b) {

			b = false;

			setTimeout(startTicks, timeBeforeStart);

		}

  });



}



function startTicks() {

	//setInterval(tick, bpmToMillis(bpm * 8));

	timer = accurateInterval(bpmToMillis(bpm), tick);

	tick();

}



function tick() {

	readScript();

	//setTimeout(tick, millis)



}



function readScript() {

	index = (index + 1) % script.length;

	switch (script.charAt(index)) {

		case '.': scriptHandlerNothing();

			break;

		case '+': scriptHandlerBothDifferent();

			break;

		case '|': scriptHandlerBoth();

			break;

		case '-': scriptHandlerBlackout();

			break;

		case '<': scriptHandlerBlackBG();

			break;

		case '>': scriptHandlerBlackFG();

			break;

		case '^': scriptHandlerRemoveTemp();

			break;

		case '}': scriptHandlerChangeOnlyFG();

			break;

		case '{': scriptHandlerChangeOnlyBG();

			break;

		case '[': scriptHandlerBlackBGNoFGChange();

			break;

		case ']': scriptHandlerBlackFGNoBGChange();

			break;

		case 'u':

			scriptHandlerSpeedUp();

			readScript();

			break;

		case 'd':

			scriptHandlerSlowDown();

			readScript();

			break;

		case 's':

			scriptHandlerStop();

			break;

		default: readScript();

			break;

	}

}



function scriptHandlerNothing() {

	//resetTempColors();

}



function scriptHandlerStop() {

	timer.cancel();

}



function scriptHandlerChangeOnlyFG() {

	if (tempFG) {

		tempFG = '';

		changeFGcolor(fgColor);

	}

	changeFGcolor();

}

function scriptHandlerChangeOnlyBG() {

	if (tempBG) {

		tempBG = '';

		changeBGcolor(bgColor);

	}

	changeBGcolor();

}



function scriptHandlerRemoveTemp() {

	resetTempColors();

}



function scriptHandlerSpeedUp() {

	timer.cancel();

	bpm = bpm * 2;

	millis = bpmToMillis(bpm)

	timer = accurateInterval(millis, tick);

}



function scriptHandlerSlowDown() {

	timer.cancel();

	bpm = bpm / 2;

	millis = bpmToMillis(bpm)

	timer = accurateInterval(millis, tick);

}

function scriptHandlerBothDifferent() {

	resetTempColors();

	changeBGcolor();

	changeFGcolor();

}



function scriptHandlerBoth() {

	var color = getRandomColor();

	while (color === bgColor || color === fgColor) {

		color = getRandomColor();

	}

	changeBGcolor(color);

	changeFGcolor(color);

}



function scriptHandlerBlackout() {

	tempBG = '000000';

	tempFG = '000000';

	$('#bg').css('background-color', '#000000');

	$('#fg').css('background-color', '#000000');

}



function scriptHandlerBlackFG() {

	changeBGcolor();

	tempFG = '000000'

	$('#fg').css('background-color', '#' + tempFG);

}



function scriptHandlerBlackBG() {

	changeFGcolor();

	tempBG = '000000';

	$('#bg').css('background-color', '#' + tempBG);

}



function scriptHandlerBlackFGNoBGChange() {

	tempFG = '000000'

	$('#fg').css('background-color', '#' + tempFG);

}



function scriptHandlerBlackBGNoFGChange() {

	tempBG = '000000'

	$('#bg').css('background-color', '#' + tempBG);

}



function resetTempColors() {

	if (tempBG) {

		tempBG = '';

		changeBGcolor(bgColor);

	}

	if (tempFG) {

		tempFG = '';

		changeFGcolor(fgColor);

	}

}



function changeBGcolor(c) {

	if (c) {

		bgColor = c;

		$('#bg').css('background-color', '#' + c);

	} else {

		var color = getRandomColor();

		while (color === bgColor || color === fgColor) {

			color = getRandomColor();

		}

		bgColor = color;

		$('#bg').css('background-color', '#' + bgColor);

	}

}



function changeFGcolor(c) {

	if (c) {

		fgColor = c;

		$('#fg').css('background-color', '#' + c);

	} else {

		var color = getRandomColor();

		while (color === fgColor || color === bgColor) {

			color = getRandomColor();

		}

		fgColor = color;

		$('#fg').css('background-color', '#' + fgColor);

	}

}



function getRandomColor() {

	return colors[Math.floor(Math.random() * colors.length)];

}



var accurateInterval = function (time, fn) {

	var cancel, nextAt, timeout, wrapper, _ref;

	nextAt = new Date().getTime() + time;

	timeout = null;

	if (typeof time === 'function') _ref = [time, fn], fn = _ref[0], time = _ref[1];

	wrapper = function () {

		nextAt += time;

		timeout = setTimeout(wrapper, nextAt - new Date().getTime());

		return fn();

	};

	cancel = function () {

		return clearTimeout(timeout);

	};

	timeout = setTimeout(wrapper, nextAt - new Date().getTime());

	return {

		cancel: cancel

	};

};