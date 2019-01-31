/**
 * jQuery.Toggler
 * @version   1.0
 * @author    biohzrdmx <github.com/biohzrdmx>
 * @requires  jQuery 1.8+
 * @license   MIT
 * @copyright Copyright © 2019 biohzrdmx. All rights reserved.
 */
;(function($) {
	$.fn.toggler = function(options) {
		if (!this.length) { return this; }
		var opts = $.extend(true, {}, $.toggler.defaults, options);
		this.each(function() {
			var el = $(this);
			$.toggler.api.init(el, opts);
		});
		return this;
	};
	$.toggler = {
		api: {
			init: function(el, opts) {
				var condition = el.data('toggler'),
					fnDefault = function() {
						return false;
					};
				el.on('change', function() {
					var items = $('[data-toggle-condition*='+ condition +']');
					$.each(items, function() {
						var item = $(this),
							toggler = item.data('toggle-function') || 'display',
							solver = item.data('toggle-solver') || 'value',
							value = item.data('toggle-value'),
							fnSolver = opts.solvers[solver] || fnDefault,
							fnToggler = opts.togglers[toggler] || fnDefault,
							arr = value.split('|');
						fnToggler( item, fnSolver(el, arr, item, opts), opts );
					});
				});
			},
			destroy: function(el) {
				el.off('change');
			}
		},
		defaults: {
			solvers: {
				value: function(el, param, item, opts) {
					var val = el.val();
					return $.isArray(param) ? param.indexOf(val) >= 0 : param == val;
				},
				valueNot: function(el, param, item, opts) {
					var val = el.val();
					return !opts.solvers.value(el, param, item, opts);
				},
				oneOf: function(el, param, item, opts) {
					var ret = false,
						conditions = item.data('toggle-condition').split('|');
					if (conditions) {
						var value = item.data('toggle-value');
						for (var i = 0; i < conditions.length; i++) {
							var condition = conditions[i],
								element = $('[data-toggler=' + condition + ']');
							if ( element.val() == value ) {
								ret = true;
							}
						};
					}
					return ret;
				}
			},
			togglers: {
				display: function(el, toggle, opts) {
					el.css('display', toggle ? 'block' : 'none');
				},
				enabled: function(el, toggle, opts) {
					el.prop('disabled', !toggle);
				}
			}
		}
	};
})(jQuery);