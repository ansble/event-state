'use strict';

var flatten = function () {
		var args = [].slice.call(arguments),
			flat = [],
			fltn = function (arry) {
				return arry.reduce(function (flat, item) {
					if (Array.isArray(item)) {
						flat.concat(fltn(item));
					} else {
						flat.push(item);
					}
					return flat;
				}, flat);
			};
		return [].concat(fltn(args));
	};

module.exports = {
	flatten: flatten
};