//Access the raspberry pi service
var rasp = new Rasp();

$(document).ready(function() {

	rasp.ledStatus(params, function() {

		btn.html(btnText).removeClass('disabled');

	}, function(error) {

		btn.html(btnText).removeClass('disabled');

	});

});

$(".btn-led").click(function(event) {
	var btn = $(this);
	var btnText = btn.html();

	btn.html('<i class="fa fa-cog fa-spin"></i>').addClass('disabled');

	var params = {};
	params.action = btn.data('action');
	params.colour = btn.data('colour');

	rasp.ledUpdate(params, function() {

		$(document).alert("success", "<strong>Success!</strong> The "+params.colour+" LED is now "+params.action+".");
		btn.html(btnText).removeClass('disabled');

	}, function(error) {

		$(document).alert("danger", "The LED did not change...");
		btn.html(btnText).removeClass('disabled');

	});
});