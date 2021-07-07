(function() {
	if(!window.history.pushState || !document.dispatchEvent) return;
	var href = location.href;
	var flag = true;
	var voidFn = function() {};
	var fn = voidFn;
	var dispatchFn = function() {
		var evt = document.createEvent('Event');
		evt.initEvent('popstate', true, true);
		window.dispatchEvent(evt);
	};

	window.addEventListener('load', function() {
		if(location.hash !== '#flag') {
			history.replaceState({}, '', _back_link_jump);
			if(href.search('#') === -1) {
				history.pushState({}, '', href + '#flag');
			} else {
				history.pushState({}, '', href.replace(/#.*/, '#flag'));
			}
		}

		window.addEventListener('popstate', function() {
			dispatchFn = voidFn;
			flag = !flag;
			if(flag) {
				location.reload();
			}
		}, false);

		setTimeout(function() {
			fn = dispatchFn;
			fn();
		}, 20);
	}, false);
})();