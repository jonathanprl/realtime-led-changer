var Rasp = function () {

};

Rasp.prototype.led = function(params, successFn, errorFn) {

	$.ajax({
		type: "POST",
		url: "http://api.rasp.swif/pi/led",
		data: params,
		success: successFn,
		error: errorFn,
		dataType: "json"
	});
	
};