+function($, window){ 'use strict';
	var app = {
		name: 'Infinity',
		version: '1.0.0'
	};

	app.defaults = {
		sidebar: {
			folded: false,
			theme: 'light',
			themes: ['light', 'dark']
		},
		navbar: {
			theme: 'primary',
			themes: ['primary', 'success', 'warning', 'danger', 'pink', 'purple', 'inverse', 'dark']
		}
	};

	app.$body = $('body');
	app.$sidebar = $('#app-aside');
	app.$navbar = $('#app-navbar');
	app.$main = $('#app-main');

	app.settings = app.defaults;

	var appSettings = app.name+"Settings";

	// initialize navbar
	app.$navbar.removeClass('primary').addClass(app.settings.navbar.theme).addClass('in');
	app.$body.removeClass('theme-primary').addClass('theme-'+app.settings.navbar.theme);

	// initialize sidebar
	app.$sidebar.removeClass('light').addClass(app.settings.sidebar.theme).addClass('in');
	app.settings.sidebar.folded
		&& app.$sidebar.addClass('folded')
		&& app.$body.addClass('sb-folded')
		&& $('#aside-fold').removeClass('is-active');

	// initialize main
	app.$main.addClass('in');
	
	app.init = function() {

		$('[data-plugin]').plugins();

		// load some needed libs listed at: LIBS.others => library.js
		var loadingLibs = loader.load(LIBS["others"]);

		loadingLibs.done(function(){
		});
	};

	window.app = app;
}(jQuery, window);


// NAVBAR MODULE
// =====================
+function($, window){ 'use strict';
	
	// Cache DOM
	var $body = app.$body,
			$navbar = app.$navbar;

	var navbar = {};

	navbar.init = function() {
		this.listenForEvents();
	};

	navbar.listenForEvents = function() {
		$(document)
			.on('click', '#navbar-search-open', openSearch)
			.on('click', '#search-close, .search-backdrop', closeSearch);
	};

	navbar.getAppliedTheme = function() {
		var appliedTheme = "", themes = app.settings.navbar.themes, theme;
		for(theme in themes) {
			if ($navbar.hasClass(themes[theme])) {
				appliedTheme = themes[theme];
				break;
			}
		}
		return appliedTheme;
	};

	navbar.getCurrentTheme = function() {
		return app.settings.navbar.theme;
	};

	navbar.setTheme = function(theme) {
		if (theme) app.settings.navbar.theme = theme;
	};

	navbar.applyTheme = function() {
		var appliedTheme = this.getAppliedTheme();
		var currentTheme = this.getCurrentTheme();

		$navbar.removeClass(appliedTheme)
			.addClass(currentTheme);

		$body.removeClass('theme-'+appliedTheme)
			.addClass('theme-'+currentTheme);
	};


	function openSearch(e) {
		e.preventDefault();
		e.stopPropagation();
		$navbar.append('<div class="search-backdrop"></div>');
		$('#navbar-search').addClass('open');
		$('.search-backdrop').addClass('open');
	}

	function closeSearch(e) {
		e.preventDefault();
		e.stopPropagation();
		$('#navbar-search').removeClass('open');
		$('.search-backdrop').removeClass('open').remove();
	}

	window.app.navbar = navbar;
}(jQuery, window);


// CUSTOMIZER MODULE
// =====================

+function($, window){ 'use strict';
	
	// Cache DOM
	var $body = app.$body,
			$sidebar = app.$sidebar,
			$navbar = app.$navbar;

	var customizer = {};

	customizer.init = function() {
		this.listenForEvents();
	}

	customizer.listenForEvents = function() {
		var self = this;

		// initialize customizer component
		self.initCustomizer();

		$('[name="aside-theme"]').on('change', function(e){
			var $this = $(this);
			if (app.sidebar.getCurrentTheme() !== $this.attr('data-theme')) {
				app.sidebar.setTheme($this.attr('data-theme'));
				app.sidebar.applyTheme();
				app.saveSettings();
			}
		});

		$('#aside-fold-switch').on('change', function(e){
			if ($(this).is(':checked')) {
				app.settings.sidebar.folded = true;
				$sidebar.addClass('folded');
				$body.addClass('sb-folded');
				$('#aside-fold').removeClass('is-active');
			} else {
				app.settings.sidebar.folded = false;
				$sidebar.removeClass('folded');
				$body.removeClass('sb-folded');
				$('#aside-fold').addClass('is-active');
			}
			app.sidebar.toggleScroll();
			app.saveSettings();
		});

		// Resets sidebar settings to defaults
		$('#aside-reset-btn').on('click', function(e){
			app.settings.sidebar = app.defaults.sidebar;
			app.saveSettings();
			location.reload();
		});

		// navbar theme change
		$('[name="navbar-theme"]').on('change', function(e){
			var $this = $(this);
			if (app.navbar.getCurrentTheme() !== $this.attr('data-theme')) {
				app.navbar.setTheme($this.attr('data-theme'));
				app.navbar.applyTheme();
				app.saveSettings();
			}
		});

		// Resets navbar settings to defaults
		$('#navbar-reset-btn').on('click', function(e){
			app.settings.navbar = app.defaults.navbar;
			app.saveSettings();
			location.reload();
		});
	};

	customizer.initCustomizer = function() {
		$('[data-theme="'+app.navbar.getCurrentTheme()+'"]').prop('checked', true);
		app.settings.sidebar.folded && $('#aside-fold-switch').prop('checked', true);
	};

	window.app.customizer = customizer;
}(jQuery, window);


// initialize app
+function($, window) { 'use strict';
	window.app.init();
	window.app.navbar.init();
	window.app.customizer.init();
}(jQuery, window);

$("[data-toggle=popover]").popover({
	html: true, 
	content: function() {
		return $('#popover-content').html();
	}
});

$("#toggle-filter-show").click(function(e) {
	e.preventDefault();
	if ($("#table-with-filter").hasClass('collapsed')) {
		$("#table-with-filter").removeClass("collapsed");
	} else {
		$("#table-with-filter").addClass("collapsed");
	}
});

$("#toggle-filter-hide").click(function(e) {
	e.preventDefault();
	if ($("#table-with-filter").hasClass('collapsed')) {
		$("#table-with-filter").removeClass("collapsed");
	} else {
		$("#table-with-filter").addClass("collapsed");
	}
});