var Funnelback = {
			
    init: function (options, elem) {
    	this.options = jQuery.extend({},this.options,options);
    	this.formatters = jQuery.extend({},this.formatters,this.options.formatters);
		this.elem = elem;
		this.$elem = jQuery(elem);
		
		this._build();
		return this;
	},
	
	options: {
		url : '/s/search.html',
		form : 'simple',
		profile : '_default',
		captureClass : 'fbcapture',
		collection : '',
		formatter: 'searchResultsList',
		formatters: {},
		targets: {},
    },
    
    targets: {}, // targets is a list of objects in the format { 'path': <jquery elem>, 'formatter': <formatter name> } 
	
    _build: function(){
		this.jsonpbind();
    },
	
	jsonpbind: function() {
		var fbbase = this;
    	jQuery("a." + this.options.captureClass).live('click', function(e) {
    		e.preventDefault();
    		var url = fbbase.options.url + jQuery(this).attr('href');
    		jQuery.each(fbbase.options.targets, function() {
    			fbbase.jsonprefresh(url, this['path'], fbbase.formatters[this['formatter']], fbbase.options.fbloader);
    		});
    	});		
	},
	
	jsonpsearch: function(query){
		var fbbase = this;
		var params = {
		        profile: fbbase.options.profile,
		        collection: fbbase.options.collection,
		        query: query,
			};
		var url = fbbase.options.url + "?" + jQuery.param(params);
		jQuery.each(fbbase.options.targets, function() {
			fbbase.jsonprefresh(url, this['path'], fbbase.formatters[this['formatter']], fbbase.options.fbloader);
		});
	},
	
	jsonprefresh: function(url, path, formatter, fbloader){
		// show loader with timeout 
		// var showLoader;
		// showLoader = setTimeout("$('#loader').show()", 300);
		if (fbloader) { 
			fbloader.show();
		};
		jQuery.ajax({
			url: url,
			type: 'GET',
			dataType: 'jsonp',
			success: function(json) {
				path.html(formatter(json));
				// clearTimeout(showLoader);
		        if (fbloader) {
					fbloader.hide();		        	
		        }
			}
		});
	},
	
	formatters: {
		'searchResultsList': function(json){
			var rendered = '<ul>';
			jQuery.each(json.response.resultPacket.results, function(){
				var result = this;
				rendered += '<li>';
				rendered += '<a href="' + result.clickTrackingUrl + '">';
				rendered += result.title + '</a></li>';
			});
			rendered += '</ul>';
			var baselink = '?' + json.QueryString.replace(/&callback=jsonp\d+/, "");
			baselink = baselink.replace(/&start_rank=\d+/, '');
			pagelink = baselink + "&start_rank=" + json.response.resultPacket.resultsSummary.nextStart;
			rendered += '<p><a href="' + pagelink + '" class="fbcapture">More</a></p>';
			return rendered;
		},
		'targetClasslist': function(thisfunnelback) {
			var classlist = '';
			jQuery.each(thisfunnelback.options.targets, function(){
				classlist += this.captureClass + ' ';
			});
			return classlist;
		},
		'contextualNavigationList': function(json){
			var rendered = '<ul>';
			jQuery.each(json.response.resultPacket.contextualNavigation.categories, function(){
				var category = this;
				rendered += '<li>';
				rendered += '<h4>' + category.name + '</h4>';
				rendered += '<ul>';
				jQuery.each(category.clusters, function(){
					var cluster = this;
					rendered += '<li>';
					rendered += '<a href="' + cluster.href.replace(/callback=jsonp\d+/, "") + '" class="fbcapture">';
					rendered += cluster.label + '</a></li>';
				});
				rendered += '</ul>';
				rendered += '</li>';
			});
			rendered += '</ul>';
			return rendered;
		},
	},
	
};

if (typeof Object.create !== 'function') {
	Object.create = function (o) {
		function F() {}
		F.prototype = o;
		return new F();
	};
}

jQuery.funnelbackize = function(name, object) {
	jQuery.fn[name] = function( options ) {
		return this.each(function() {
			if ( ! jQuery.data( this, name ) ) {
				jQuery.data( this, name, Object.create(object).init(options, this));
			}
		});
	};
};
