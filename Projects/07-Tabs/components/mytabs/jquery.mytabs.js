	;(function($, window) {

		var pub = {

			activate: function(index){

				return $(this).each(function(){

				var data = $(this).data("myTabs");
				
				// only runs code if data is not null i.e. it actually exist
				if(data){
				
					activateTab(data, index);

			}


				})
			}
		}

		var options = {};

		function init(opts) {
			var $target = $(this);

			//allows overrides of default options   
			opts = $.extend({}, options, opts);

			$target.each(function(){
				//locally cached 'instance' "prevents having to do lookups everytime a function is run"
				var $instance = $(this);

				var data = {

					//looks inside object '$instance' for ".tab-nav and .tab"
					$links: $instance.find(".tab-nav .tab"),
					$content: $instance.find(".tab-content .tab")
				};
				//listen to any clicks on .tab-nav .tab
				$instance.on("click", ".tab-nav .tab", data, onTabClick)
										.data("myTabs", data);

			});

		}

		function onTabClick(e){
			//prevent browser defaults on most events
			e.preventDefault();



			var data = e.data;
			//object clicks on 
			var $target = $(e.target);
			//returns the index of the target(clicked) relative to list of links
			var index = data.$links.index($target);

			//removes the active state/class from elements that we have cached previously and adds the active class the current index
			
			

			activateTab(data, index);



		};

		function activateTab(data, index) {

			data.$links.removeClass("active")
				.eq(index)
				.addClass("active")

			
			data.$content.removeClass("active")
				.eq(index)
				.addClass("active")


		};

		$.fn.myTabs = function (method) {
				//checks if the "method" in public is present reut

			if (pub[method]) {

				return pub[method].apply(this, Array.prototype.slice.call(arguments, 1));

			} else 
			//checks the type of method (whether it is an object or it is not a method)
				if(typeof method === "object" || !method) {

					return init.apply(this, arguments);
			}

			return this;
		};


	})(jQuery, this);