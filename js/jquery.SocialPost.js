(function ($) {
    $.fn.SocialPost = function (options) {

        var defaults = {
            Count: ' ',
            UID: ' ',
        };

        var options = $.extend(defaults, options);
		var selector = this;

        return this.each(function () {

			var Facebookurl = 'https://graph.facebook.com/' + options.UID + '/posts?access_token=257246281110093|LFauDLtvm6RXTKqC-YjYbBybX-c&limit=' + options.Count;
			$.getJSON(Facebookurl, function (posts) {    
    			//only show posts that are posted by the page admin
    			if(posts.data[0].from.id==options.UID){

				function myDateFormatter(dateObject) {
    				var parts, date, time, dt, ms;
    				parts = dateObject.split(/[T ]/); // Split on `T` or a space to get date and time
    				date = parts[0];
    				time = parts[1];
    				dt = new Date();
    				parts = date.split(/[-\/]/);  // Split date on - or /
    				dt.setFullYear(parseInt(parts[0], 10));
    				dt.setMonth(parseInt(parts[1], 10) - 1); // Months start at 0 in JS
    				dt.setDate(parseInt(parts[2], 10));
    				parts = time.split(/:/);    // Split time on :
    				dt.setHours(parseInt(parts[0], 10));
    				dt.setMinutes(parseInt(parts[1], 10));
				    dt.setSeconds(parseInt(parts[2], 10));
    				ms = dt.getTime();
					var d = new Date(ms);
        			var day = d.getDate();
        			var month = d.getMonth() + 1;
        			var year = d.getFullYear();
        			if (day < 10) {
        			    day = "0" + day;
        			}
        			if (month < 10) {
        			    month = "0" + month;
        			}
        			var your_date = day + "-" + month + "-" + year;
        			return your_date;
    			};

				var myTime = myDateFormatter(posts.data[0].created_time);
				if (posts.data[0].message) {
					var message = posts.data[0].message;
				} else if (posts.data[0].story) {
					var message = posts.data[0].story;
				}

				if (posts.data[0].picture.indexOf("https://fbcdn-sphotos-c-a.akamaihd.net/")) {
					var picture = posts.data[0].picture;
					var myPicture = picture.replace('hphotos-xpf1/v/t1.0-9/s130x130','hphotos-xpa1/t31.0-8/s720x720');
				}
				else if (posts.data[0].picture.indexOf("https://scontent-a.xx.fbcdn.net/")) {
					var picture = posts.data[0].picture;
					var myPicture = picture.replace('/hphotos-ak-xpf1/v/t1.0-9/s130x130/', '/hphotos-ak-xfa1/t31.0-8/s720x720/');
				}
				else if ( !(posts.data[0].picture.indexOf("https://fbexternal-a.akamaihd.net/")) ) {
					var myPicture = posts.data[0].picture;
				}

				//post = '<strong>' + posts.data[0].message + '</strong> <small style="color:#ffffff;">(' + myTime + ')</small>';
				if (myPicture) {
					if (posts.data[0].message.length < 50) {
						post = '<li class="flip" id="article"><a href="' + posts.data[0].link + '" target="_blank"><div class="item-detail"><h3>' + posts.data[0].from.name + '</h3><span class="company">' + message + '<small>(' + myTime + ')</small></span></div><img src="images/320x320.gif" class="animated flipIn" style="background-image: url(' + myPicture + ');background-size:100% auto;background-repeat:no-repeat;"></a></li>';
					} else {
						post = '<a href="' + posts.data[0].link + '" target="_blank" class="article" id="article"><span class="article-details"><h4>' + posts.data[0].from.name + '</h4><p>' + message + '<br><small>(' + myTime + ')</small></p></span><img src="images/320x640.gif" alt="" style="background-image: url(' + myPicture + ');background-position-y: 13%;"></a>';
					}
				}
				else {
					post = '<a href="' + posts.data[0].link + '" target="_blank" class="article article-small" id="article"><span class="article-link"><h5>' + posts.data[0].from.name + '</h5><p>' + message + '<br><small>(' + myTime + ')</small></span></p></span><img src="images/320x320.gif"></a>';
				}

				$(selector).html(post);
    			
				}

			});

		});

};

})(jQuery);
