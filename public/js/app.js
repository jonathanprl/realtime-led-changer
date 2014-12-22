//Access the raspberry pi service
var rasp = new Rasp();

$(".btn-led").click(function(event) {
	var btn = $(this);
	var btnText = btn.html();

	btn.html('<i class="fa fa-cog fa-spin"></i>');

	var params = {};
	params.action = btn.data('action');
	params.colour = btn.data('colour');

	rasp.led(params, function() {

		$(document).alert("success", "<strong>Success!</strong> The "+params.colour+" LED is now "+params.action+".");
		btn.html(btnText).attr('disabled');

	}, function(error) {

		$(document).alert("danger", "The LED did not change...");
		btn.html(btnText);

	});
});