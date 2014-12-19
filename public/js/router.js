/*global Ember, Todos */
(function () {
	'use strict';

	App.Router.map(function () {
		this.resource('dashboard', { path: '/' }, function () {
			this.route('active');
			this.route('completed');
		});
	});

	App.AppRoute = Ember.Route.extend({
		model: function () {
			return this.store.find('dashboard');
		}
	});

	App.AppIndexRoute = App.AppRoute.extend({
		templateName: 'dashboard',
		controllerName: 'dashboard'
	});

	App.AppActiveRoute = App.AppIndexRoute.extend({
		model: function () {
			return this.store.filter('dashboard', function (dashboard) {
				return !dashboard.get('isCompleted');
			});
		}
	});

	App.AppCompletedRoute = App.TodosIndexRoute.extend({
		model: function () {
			return this.store.filter('dashboard', function (dashboard) {
				return dashboard.get('isCompleted');
			});
		}
	});
})();