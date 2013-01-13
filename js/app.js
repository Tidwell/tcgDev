(function() {
	/*all navigation stuff to turn it into a single-page app*/
	var $home;
	var $digitalList;

	var total;
	var cnt;
	var cb;
	function hideAll(callback) {
		cb = callback;
		total = 2;
		cnt = 0;
		$home.fadeOut(count);
		$digitalList.fadeOut(count);
	}
	function count() {
		cnt++;
		if (cnt === total) {
			cb();
		}
	}

	function changePage() {
		var page = location.hash.replace('#','');
		hideAll(function(){
			$('.nav .active').removeClass('active');
			$('.nav a[href="#'+page+'"]').parent().addClass('active');
			if (!page) {
				page = 'home';
			}
			$('#'+page).fadeIn();
		});
	}

	function getElements() {
		$home = $('#home');
		$digitalList = $('#digital-list');
	}

	$(function(){
		getElements();
		$(window).hashchange(changePage);
		$(window).hashchange();
	});
}());