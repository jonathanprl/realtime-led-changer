//Access the raspberry pi service
var rasp = new Rasp();

$(document).ready(function() {

	var params = {};

	$('.led').each(function(i,v) {
		params.colour = $(v).data('colour');

		rasp.ledStatus(params, function(data) {

			if(data.status == 1) {
				$(v).addClass($(v).data('class'));
			}else{
				$(v).removeClass($(v).data('class'));
			}

			$(v).children('i').removeClass('fa-spin');

		}, function(error) {

			$(document).alert("danger", "There was an error...");

		});

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