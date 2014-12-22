//Access the raspberry pi service
var rasp = new Rasp();

//Access firebase for real-time LED status
var firebase = new Firebase('https://pi-swif.firebaseio.com/');

$(document).ready(function() {

	rasp.ledStatus(function(data) {

		firebase.set({
				"led": data.status
			});

	}, function(error) {

		$(document).alert('danger', 'There was an error...');

	});

	//Get real time status of LED's and apply to LED icons
	firebase.child("led").on("value", function(snapshot) {

		$.each(snapshot.val(), function(k,v) {

			$('.led[data-colour=' + k + ']').attr('data-status', v);
			$('.led').children('i').removeClass('fa-spin');

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

		var fbLed = new Firebase('https://pi-swif.firebaseio.com/led');
		var status = {};
		
		$(document).alert('success', '<strong>Success!</strong> The ' + params.colour + ' LED has changed.');
		btn.html(btnText).removeClass('disabled');

		status[params.colour] = params.action;
		fbLed.update(status);
		
	}, function(error) {

		$(document).alert("danger", "The LED did not change...");
		btn.html(btnText).removeClass('disabled');

	});
});