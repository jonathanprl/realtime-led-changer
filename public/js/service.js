var Rasp = function () {

};

Rasp.prototype.ledUpdate = function(params, successFn, errorFn) {

	$.ajax({
		type: "POST",
		url: "http://api.rasp.swif/led/update",
		data: params,
		success: successFn,
		error: errorFn,
		dataType: "json"
	});
	
};

Rasp.prototype.ledStatus = function(params, successFn, errorFn) {

	$.ajax({
		type: "POST",
		url: "http://api.rasp.swif/led/status",
		data: params,
		success: successFn,
		error: errorFn,
		dataType: "json"
	});
	
};