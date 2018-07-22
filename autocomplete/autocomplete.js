import Component from 'can-component/';
import DefineMap from 'can-define/map/';
import DefineList from 'can-define/list/';
import view from './autocomplete.stache!';
import Api from 'shuttle-can-api';
import each from 'can-util/js/each/';
import ComponentViewModel from '../infrastructure/component-view-model';
import guard from 'shuttle-guard';
import i18n from '../infrastructure/i18n';

export const ViewModel = ComponentViewModel.extend({
	_api: {},

	text: {
		type: 'string',
		default: ''
	},

	getText(map) {
		guard.againstUndefined(map, 'map');

		var text = map[this.textAttribute];

		if (text == undefined){
			return `['undefined' returned from 'textAttribute' with name '${this.textAttribute}']`;
		}

		return (typeof (text) === 'function') ? text() : text;
	},

	parameters: {
		type: '*',
		get(value) {
			var result = (typeof(value) === 'function') ? value() : value;

			return (typeof(result) === 'string') ? eval('(' + result + ')') : result;
		}
	},

	loadingText: {
		type: 'string',
		default: 'autocomplete-loading',
		get(value){
			return i18n.value(value);
		}
	},

	emptyText: {
		type: 'string',
		default: 'autocomplete-empty',
		get(value){
			return i18n.value(value);
		}
	},

	map: {
		Type: DefineMap
	},

	mapper: {
		type: 'compute',
		default: undefined
	},

	method: {
		type:'string',
		default: 'post',
		set(value){
			guard.againstUndefined(value, 'value');

			return value.toLowerCase() === 'post' ? 'post' : 'get';
		}
	},

	searchAttribute: {
		type:'string',
		default: 'search'
	},

	textAttribute: {
		type:'string',
		default: 'text'
	},

	endpoint: {
		type: 'string',
		set(value) {
			guard.againstUndefined(value, 'value')

			this._api = new Api({endpoint: value});

			return value;
		}
	},

	searchValue: {
		type: 'string',
		default: ''
	},

	get searchPromise() {
		const self = this;
		var promise;
		var data;
		var parameters;

		if (!this.searchValue){
			return Promise.resolve([]);
		}

		parameters = this.parameters || {};
		parameters[this.searchAttribute] = encodeURIComponent(this.searchValue);

		return this._api.list(parameters, { post: this.method.toLowerCase() === 'post'})
			.then(function(response){
				if (!self.mapper){
					return response;
				}

				var result = new DefineList();

				each(response, function(item){
					guard.againstUndefined(item, 'item');

					var mapped = self.mapper.call(self, item);

					if (!mapped){
						throw new Error('The mapper returned an undefined object.');
					}

					result.push(mapped);
				});

				return result;
			});
	},

	search: function (el) {
		this.searchValue = el.value;

		$(el).dropdown();
	},

	select: function (map) {
		this.map = map;
		this.text = this.getText(map);
	}
});

export default Component.extend({
	tag: 'cs-autocomplete',
	ViewModel,
	view
});