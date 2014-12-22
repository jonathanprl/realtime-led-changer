var Rasp = function () {

};

Rasp.prototype.ledUpdate = function(params, successFn, errorFn) {

	$.ajax({
		type: "POST",
		url: "http://api.pi.swif.co/led/update",
		data: params,
		success: successFn,
		error: errorFn,
		dataType: "json"
	});
	
};

Rasp.prototype.ledStatus = function(params, successFn, errorFn) {

	$.ajax({
		type: "GET",
		url: "http://api.pi.swif.co/led/status",
		data: params,
		success: successFn,
		error: errorFn,
		dataType: "json"
	});
	
};