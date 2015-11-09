// runner for async shit
var run = function(generator) {	
	var gi;
	var util = function(asyncFun) {
		console.log('use the util to have a reference to thyself in async.'); 
		asyncFun(gi);
	}

	gi = generator(util);
	gi.next(); 				// kick/start the generator
}

// main program
run( function *(util) {

	util(function(main) { 
		setTimeout(function () {
			console.log('first async completed.');
			main.next();
		});
	});
	yield;
	console.log('do something after first async');
	/* do some more shit */

	yield util(function(main) { 
		setTimeout(function () {
			console.log('seocnd async completed.');
			main.next();
		});
	});

	console.log('do something after first async');
	/* do some more shit */
})


