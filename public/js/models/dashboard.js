/*global Todos, DS */
(function () {
	'use strict';

	App.Dashboard = DS.Model.extend({
		title: DS.attr('string'),
		isCompleted: DS.attr('boolean')
	});
})();