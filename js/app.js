var siteConfig;
var sitePath = "/";
jQuery(function ($) {
   $.getJSON(sitePath + "/json/config.json", function (data) {
      siteConfig = data;
      new FI.load()
   })
});
var FI = {
   vars: {
      timer: null,
      modalTimer: null
   },
   load: function () {
      $(window).on("keyup", function (e) {
         var code = (e.keyCode ? e.keyCode : e.which);
         switch (code) {
         case 27:
            $(".overlay").trigger("click");
            break
         }
      });
      $("a[href^='http']").attr("target", "_blank");
      $(".ad.pdf").click(function () {
         _gaq.push(["_trackEvent", "micro conversion", "dlpdf", "ConvinceBoss", 1])
      });
      var obj = $("html");
      $("body").on("click", ".overlay-general", function () {
         $("body").css("overflow-x", "auto");
         $(this).remove()
      });
      $("body").on("click", ".overlay .modal a", function (e) {
         window.location.href = $(this).attr("href")
      });
      $("body").on("click", ".overlay-general .modal", function (e) {
         e.stopPropagation();
         return false
      });
      $(".js .menu-open").on("click", function () {
         if (obj.hasClass("js-menu-open")) {
            obj.removeClass("js-menu-open");
            FI.vars.timer = setTimeout(function () {
               nextSet()
            }, 20000)
         } else {
            obj.addClass("js-menu-open");
            clearTimeout(FI.vars.timer)
         }
         return false
      });
      handleCommonIeImages();
      $(window).resize(function () {
         clearTimeout(FI.vars.modalTimer);
         var $overlay = $(".overlay");
         var wrapperHeight = $(".wrapper").height();
         var padding = parseInt($(".wrapper").css("padding-bottom"));
         $overlay.css({
            height: wrapperHeight + padding
         });
         var modalWidth = $overlay.find(".modal").width();
         var modalHeight = $overlay.find(".modal").height();
         var top = $(window).scrollTop() + 20;
         var winHeight = $(window).height();
         if ((top + modalHeight) > wrapperHeight) {
            top = wrapperHeight - modalHeight - padding
         }
         FI.vars.modalTimer = setTimeout(function () {
            $overlay.find(".modal").css({
               opacity: 1,
               top: top,
               "margin-left": -(modalWidth / 2)
            })
         }, 300)
      });
      $(".newsletter").on("click", function () {
         if ($(window).width() >= 768) {
            var headerImg = siteConfig.assetsPath + "/images/320x320.gif";
            var html = "<div class='overlay overlay-general'><div class='modal'><div class='bio contact'><form action='" + siteConfig.mailchimpURL + "' method='post' class='newsletter-form'><header><img src='" + headerImg + "' alt=''><span class='detail'><h2>Get the newsletter</h2><span class='company'>Enter your email below</span></span></header>";
            html += "<div class='wrap'><input type='text' value='' placeholder='Email Address' name='EMAIL' id='txtNewsletterEmail'></textarea><button type='submit'>Subscribe</button></div></form></div></div></div>";
            $("body").append(html);
            modalSetup();
            return false
         }
      });
      $("footer .contact, .page-head .contact").on("click", function () {
         if ($(window).width() >= 768) {
            var headerImg = siteConfig.assetsPath + "/images/320x320.gif";
            var html = "<div class='overlay overlay-general'><div class='modal'><div class='bio contact'><form class='contact-form'><header><img src='" + headerImg + "' alt=''><span class='detail'><h2>Contact us</h2><span class='company'>How can we help you?</span></span></header>";
            html += "<div class='wrap'><input type='text' value='' placeholder='Name' id='txtName'><input type='text' value='' placeholder='Email Address' id='txtContactEmail'><textarea id='txtMessage' placeholder='Your Message'></textarea><button type='submit'>Send Message</button></div></form></div></div></div>";
            $("body").append(html);
            modalSetup();
            return false
         }
      });
      $("body").on("click", ".contact-form button", function (e) {
         var formWrapper = $(this).parent(".wrap");
         formWrapper.children(".message").remove();
         var txtName = formWrapper.children("#txtName").val();
         var txtEmail = formWrapper.children("#txtContactEmail").val();
         var txtMessage = formWrapper.children("#txtMessage").val();
         if (txtName == "" || txtName == undefined || txtEmail === "" || txtEmail == undefined || txtMessage === "" || txtMessage == undefined) {
            formWrapper.prepend("<span class='message error'>Please complete all fields!</span>");
            return false
         }
         $.ajax({
            type: "POST",
            url: siteConfig.path + "/inc/mailer.php",
            data: "name='" + txtName + "'&email='" + txtEmail + "'&message='" + txtMessage,
            timeout: 5000,
            async: true,
            success: function (data) {
               formWrapper.prepend(data)
            },
            error: function (xhr, err) {
               formWrapper.prepend("<span class='message error'>" + err + "</span>")
            }
         });
         return false
      });
      $("body").on("click", ".newsletter-form button", function (e) {
         var formWrapper = $(this).parent(".wrap");
         formWrapper.children(".message").remove();
         var txtEmail = formWrapper.children("#txtNewsletterEmail").val();
         if (txtEmail == "" || txtEmail == undefined) {
            formWrapper.prepend("<span class='message error'>Please enter a valid email address</span>");
            return false
         }
         $(".newsletter-form").submit()
      })
   }
};

function handleCommonIeImages() {
   if ($("html").hasClass("lt-ie8") || $("html").hasClass("ie8")) {
      $(".page-head .register-super").attr("src", siteConfig.assetsPath + "/images/png/register-btns/register-super.png").css("background-image", "none");
      $(".page-head .register-early").attr("src", siteConfig.assetsPath + "/images/png/register-btns/register-early.png").css("background-image", "none");
      $(".page-head .register-today").attr("src", siteConfig.assetsPath + "/images/png/register-btns/register-today.png").css("background-image", "none");
      $(".testimonial img").attr("src", siteConfig.assetsPath + "/images/png/testimonials.png").css("background-image", "none")
   }
}
function modalSetup() {
   $(".overlay .modal, .overlay").css("opacity", "0");
   var windowHeight = $(".wrapper").height();
   var padding = parseInt($(".wrapper").css("padding-bottom"));
   $(".overlay").height(windowHeight + padding);
   var width = $(".overlay .modal").width();
   var height = $(".overlay .modal").height();
   $(".overlay .modal").css({
      "margin-left": -(width / 2)
   });
   $(".overlay").css({
      opacity: 1
   });
   var top = $(window).scrollTop() + 20;
   var winHeight = $(window).height();
   if ((top + height) > windowHeight) {
      top = windowHeight - height - padding
   }
   setTimeout(function () {
      $(".overlay .modal").css({
         opacity: 1,
         top: top
      })
   }, 500)
}
jQuery(function ($) {
   if ($(".page-home").length > 0) {
      $.getJSON(sitePath + "/json/config.json", function (data) {
         siteConfig = data;
         new FI_Index.load()
      })
   }
});
var FI_Index = {
   vars: {
      pos: 0,
      data: null,
      items: 0,
      timer: null,
      interval: null,
      intervalPos: 0,
      root: sitePath + "/"
   },
   load: function () {
      setTimeout(function () {
         $(".ad-testimonial p").fitText(1.3, {
            minFontSize: "12px",
            maxFontSize: "20px"
         })
      }, 500);
      $.getJSON(siteConfig.path + "/json/index.json", function (json) {
         FI_Index.vars.data = json
      });
      FI_Index.vars.items = $(".flip img").size() - 1;
      FI_Index.vars.timer = setTimeout(function () {
         nextSet()
      }, 12000);
      FI_Index.vars.interval = setInterval(function () {
         FI_Index.vars.intervalPos++;
         if (FI_Index.vars.intervalPos > FI_Index.vars.data.testimonials.length - 1) {
            FI_Index.vars.intervalPos = 0
         }
         var testData = FI_Index.vars.data.testimonials[FI_Index.vars.intervalPos];
         $(".ad-testimonial .name").fadeOut(200, function () {
            $(".ad-testimonial .testimony").fadeOut(300, function () {
               $(this).text(testData.testimonial).fadeIn(300, function () {
                  $(".ad-testimonial .name").html(testData.name + " <em>" + testData.company + "</em>").fadeIn(200)
               })
            })
         })
      }, 20000);
      handleIeImages()
   }
};

function nextSet() {
   FI_Index.vars.pos++;
   if (FI_Index.vars.pos > FI_Index.vars.data.tracks.length - 1) {
      FI_Index.vars.pos = 0
   }
   var data = FI_Index.vars.data.tracks[FI_Index.vars.pos];
   $(".intro h1").css("opacity", 0);
   $(".intro h2").css("opacity", 0);
   $(".intro h3").css("opacity", 0);
   content(data);
   setTimeout(function () {
      $(".intro h1").html(data.title);
      $(".intro h3").text(data.description);
      $(".intro h2").hide();
      if (data.date) {
         $(".intro h2").show();
         $(".intro h2").css("opacity", 1)
      }
      $(".intro h1").css("opacity", 1);
      $(".intro h3").css("opacity", 1)
   }, 1000)
}
function content(data) {
   $(".flip:not(.icon) img").unbind().bind("animationend webkitAnimationEnd msAnimationEnd oAnimationEnd", function (e) {
      if (!$(this).hasClass("flipOut")) {
         return
      }
      $(this).css("webkitAnimationDelay", "0s").css("animationDelay", "0s").css("msAnimationDelay", "0s").css("oAnimationDelay", "0s");
      var i = $(this).attr("data-id") - 1;
      $(this).one("load", function () {
         $(this).prev(".speaker-detail").children("h3").text(FI_Index.vars.data.tracks[FI_Index.vars.pos].speakers[i].name);
         $(this).prev(".speaker-detail").children(".company").text(FI_Index.vars.data.tracks[FI_Index.vars.pos].speakers[i].company);
         $(this).parent("a").attr("href", FI_Index.vars.root + FI_Index.vars.data.tracks[FI_Index.vars.pos].speakers[i].link);
         $(this).removeClass("out").removeClass("flipOut").addClass("flipIn")
      }).attr("src", FI_Index.vars.data.tracks[FI_Index.vars.pos].speakers[i].img).each(function () {
         if (this.complete) {
            $(this).trigger("load")
         }
      })
   });
   var iconUrl = siteConfig.assetsPath + "/svg/";
   var iconExt = ".svg";
   if (!$("html").hasClass("svg")) {
      iconUrl = siteConfig.assetsPath + "/images/png/";
      iconExt = ".png"
   }
   $(".icon img").unbind().bind("animationend webkitAnimationEnd msAnimationEnd oAnimationEnd", function (e) {
      $(this).one("load", function () {
         $(this).removeClass("out").removeClass("flipOut").addClass("flipIn")
      }).css("background-image", "url(" + iconUrl + data.icon + iconExt + ")").each(function () {
         if (this.complete) {
            $(this).trigger("load")
         }
      })
   });
   setTimeout(function () {
      children(data.speakers)
   }, 500);
   $(".icon img").addClass("out").addClass("flipOut")
}
function children(speakers) {
   var a = 0;
   $(".flip:not(.icon) a img").each(function (i) {
      var $x = $(this);
      if ($x.is(":visible")) {
         a++
      }
      $x.addClass("out").css("webkitAnimationDelay", (a * 0.6) + "s").css("oAnimationDelay", (a * 0.6) + "s").css("msAnimationDelay", (a * 0.6) + "s").css("animationDelay", (a * 0.6) + "s").addClass("flipOut");
      if ((FI_Index.vars.items - 1) === i) {
         FI_Index.vars.timer = setTimeout(function () {
            nextSet()
         }, 12000)
      }
   })
}
function handleIeImages() {
   if ($("html").hasClass("lt-ie8") || $("html").hasClass("ie8")) {
      $(".twentythirteen img").attr("src", siteConfig.assetsPath + "/images/png/2013.png").css("background-image", "none");
      $(".hand-picked-speakers img").attr("src", siteConfig.assetsPath + "/images/png/hand-picked-speakers.png").css("background-image", "none");
      $(".hot-topics img").attr("src", siteConfig.assetsPath + "/images/png/hot-topics.png").css("background-image", "none");
      $(".packed-schedule img").attr("src", siteConfig.assetsPath + "/images/png/packed-schedule.png").css("background-image", "none");
      $(".five-awesome-tracks img").attr("src", siteConfig.assetsPath + "/images/png/five-awesome-tracks.png").css("background-image", "none");
      $(".ad.newsletter img").attr("src", siteConfig.assetsPath + "/images/png/newsletter.png").css("background-image", "none");
      $(".ad.pdf img").attr("src", siteConfig.assetsPath + "/images/png/pdf.png").css("background-image", "none");
      $(".icon img").attr("src", siteConfig.assetsPath + "/images/png/eye.png").css("background-image", "none");
      $(".page-content .register-super").attr("src", siteConfig.assetsPath + "/images/png/register-btns/large-register-super.png").css("background-image", "none");
      $(".page-content .register-early").attr("src", siteConfig.assetsPath + "/images/png/register-btns/large-register-early.png").css("background-image", "none");
      $(".page-content .register-today").attr("src", siteConfig.assetsPath + "/images/png/register-btns/large-register-today.png").css("background-image", "none")
   }
}
jQuery(function ($) {
   if ($(".page-speakers").length > 0) {
      new FI_Speakers.load()
   }
});
var FI_Speakers = {
   vars: {
      modalTimer: null
   },
   load: function () {
      $(".speaker-list li .wrap").append("<a href='#' class='btn'>Biography</a>");
      $("body").on("click", ".overlay .modal", function (e) {
         e.stopPropagation();
         return false
      });
      $("body").on("click", ".overlay-speakers", function () {
         $(this).remove();
         $(".speaker-list li.open").removeClass("open").addClass("closed");
         $("body").css("overflow-x", "auto");
         return false
      });
      handleSpeakersIeImages();
      $(".speaker-list").on("click", "li.open", function () {
         $(this).removeClass("open").addClass("closed")
      });
      $(".speaker-list").on("click", "li.closed", function (e) {
         $(".overlay").remove();
         var t = $(this);
         var id = $(this).attr("id");
         $(".speaker-list li.open").removeClass("open").addClass("closed");
         $("body").append("<div class='overlay overlay-speakers'><div class='modal'></div></div>");
         var $overlay = $(".overlay");
         var wrapperHeight = $(".wrapper").height();
         var padding = parseInt($(".wrapper").css("padding-bottom"));
         $overlay.css({
            height: wrapperHeight + padding
         });
         $("body").css("overflow-x", "hidden");
         var cloned = $(this).find(".bio").clone();
         var img = $(this).find("img").clone();
         var detail = $(this).find(".detail").clone();
         $overlay.find(".modal").append(cloned);
         $overlay.find(".bio").prepend("<header></header>");
         $overlay.find(".bio header").append(img);
         $overlay.find(".bio header").append(detail);
         var modalWidth = $overlay.find(".modal").width();
         var modalHeight = $overlay.find(".modal").height();
         $overlay.find(".modal").css({
            "margin-left": -(modalWidth / 2)
         });
         var top = $(window).scrollTop() + 20;
         var winHeight = $(window).height();
         if ((top + modalHeight) > wrapperHeight) {
            top = wrapperHeight - modalHeight - padding
         }
         setTimeout(function () {
            $overlay.find(".modal").css({
               opacity: 1,
               top: top
            })
         }, 500);
         t.addClass("open").removeClass("closed");
         if ($(window).width() < 768) {
            setTimeout(function () {
               $("html, body").animate({
                  scrollTop: $("#" + id).offset().top - 10
               }, 400)
            }, 250)
         }
         return false
      });
      $(".speaker-list li").on("click", "a", function (e) {
         e.stopPropagation();
         var t = $(this).parent(".wrap").parent("li");
         $(t).trigger("click");
         return false
      });
      var hash = window.location.hash;
      setTimeout(function () {
         if (hash != undefined && hash != null && hash.length > 0) {
            $(".speaker-list li" + hash).trigger("click")
         }
      }, 500)
   }
};

function handleSpeakersIeImages() {
   if ($("html").hasClass("lt-ie8") || $("html").hasClass("ie8")) {
      $(".icon img").attr("src", siteConfig.assetsPath + "/images/png/speakers.png").css("background-image", "none")
   }
}
jQuery(function ($) {
   if ($(".page-schedule").length > 0) {
      new FI_Schedule.load()
   }
});
var FI_Schedule = {
   vars: {
      modalTimer: null
   },
   load: function () {
      $(".schedule-list li.more-detail .wrap").append("<a href='#' class='btn'>Biography</a>");
      $("body").on("click", ".overlay .modal", function (e) {
         e.stopPropagation();
         return false
      });
      $("body").on("click", ".overlay-schedule", function () {
         $(this).remove();
         $(".schedule-list li.more-detail").removeClass("open").addClass("closed");
         $("body").css("overflow-x", "auto");
         return false
      });
      if ($("ol.schedule-list").size() === 2) {
         $("body").addClass("days-expand")
      }
      handleScheduleIeImages();
      $(".schedule-list").on("click", "li.open", function () {
         $(this).removeClass("open").addClass("closed")
      });
      $(".schedule-list").on("click", "li.closed", function (e) {
         $(".overlay").remove();
         var t = $(this);
         var id = $(this).attr("id");
         $(".schedule-list li.open").removeClass("open").addClass("closed");
         $("body").append("<div class='overlay overlay-schedule'><div class='modal'></div></div>");
         var $overlay = $(".overlay");
         var wrapperHeight = $(".wrapper").height();
         var padding = parseInt($(".wrapper").css("padding-bottom"));
         $overlay.css({
            height: wrapperHeight + padding
         });
         $("body").css("overflow-x", "hidden");
         var cloned = $(this).find(".description").clone();
         var img = $(this).find("img").clone();
         var time = $(this).find(".time").text();
         var title = $(this).find(".summary").text();
         var speaker = $(this).find(".speaker").text();
         var speakerLink = $(this).find(".speaker").attr("href");
         _gaq.push(["_trackEvent", "session", "click", title, 1]);
         $(".overlay .modal").append(cloned);
         $(".overlay .description").prepend("<header><div class='detail'><span>" + time + " <a href='" + speakerLink + "'>" + speaker + "</a></span><h2>" + title + "</h2></div></header>");
         $(".overlay .description header").prepend(img);
         var modalWidth = $overlay.find(".modal").width();
         var modalHeight = $overlay.find(".modal").height();
         $overlay.find(".modal").css({
            "margin-left": -(modalWidth / 2)
         });
         var top = $(window).scrollTop() + 20;
         var winHeight = $(window).height();
         if ((top + modalHeight) > wrapperHeight) {
            top = wrapperHeight - modalHeight - padding
         }
         setTimeout(function () {
            $overlay.find(".modal").css({
               opacity: 1,
               top: top
            })
         }, 500);
         t.addClass("open").removeClass("closed");
         if ($(window).width() < 768) {
            setTimeout(function () {
               $("html, body").animate({
                  scrollTop: $("#" + id).offset().top - 10
               }, 400)
            }, 250)
         }
         return false
      });
      $(".schedule-list li.more-detail").on("click", "a", function (e) {
         e.stopPropagation();
         if ($(this).hasClass("speaker")) {
            window.location.href = $(this).attr("href")
         }
         var t = $(this).parent(".wrap").parent("li");
         $(t).trigger("click");
         return false
      });
      var hash = window.location.hash;
      setTimeout(function () {
         if (hash != undefined && hash != null && hash.length > 0) {
            $(".schedule-list li.more-detail" + hash).trigger("click")
         }
      }, 500)
   }
};

function handleScheduleIeImages() {
   if ($("html").hasClass("lt-ie8") || $("html").hasClass("ie8")) {
      $("img.registration").attr("src", siteConfig.assetsPath + "/images/png/ie/registration.png").css("background-image", "none");
      $("img.lunch").attr("src", siteConfig.assetsPath + "/images/png/ie/lunch.png").css("background-image", "none");
      $("img.break").attr("src", siteConfig.assetsPath + "/images/png/ie/break.png").css("background-image", "none");
      $("img.general").attr("src", siteConfig.assetsPath + "/images/png/ie/general.png").css("background-image", "none");
      $("img.no-speaker").attr("src", siteConfig.assetsPath + "/images/png/ie/no-speaker.png").css("background-image", "none")
   }
}
jQuery(function ($) {
   if ($(".page-workshops").length > 0) {
      new FI_Workshops.load()
   }
});
var FI_Workshops = {
   vars: {
      modalTimer: null
   },
   load: function () {
      $(".workshop-list li .wrap").append("<a href='#' class='btn'>Biography</a>");
      $("body").on("click", ".overlay .modal", function (e) {
         e.stopPropagation();
         return false
      });
      $("body").on("click", ".overlay-workshop", function () {
         $(this).remove();
         $(".workshop-list li").removeClass("open").addClass("closed");
         $("body").css("overflow-x", "auto");
         return false
      });
      $(".workshop-list").on("click", "li.open", function () {
         $(this).removeClass("open").addClass("closed")
      });
      $(".workshop-list").on("click", "li.closed", function (e) {
         $(".overlay").remove();
         var t = $(this);
         var id = $(this).attr("id");
         $(".workshop-list li.open").removeClass("open").addClass("closed");
         $("body").append("<div class='overlay overlay-workshop'><div class='modal'></div></div>");
         var $overlay = $(".overlay");
         var wrapperHeight = $(".wrapper").height();
         var padding = parseInt($(".wrapper").css("padding-bottom"));
         $overlay.css({
            height: wrapperHeight + padding
         });
         $("body").css("overflow-x", "hidden");
         var cloned = $(this).find(".description").clone();
         var img = $(this).find("img").clone();
         var title = $(this).find(".detail h3").text();
         var speaker = $(this).find(".detail h4").text();
         var speakerLink = $(this).find(".detail h4").attr("data-id");
         $overlay.find(".modal").append(cloned);
         $overlay.find(".description").prepend("<header><div class='detail'><span><a href='" + speakerLink + "'>" + speaker + "</a></span><h2>" + title + "</h2></div></header>");
         $overlay.find("header").prepend(img);
         var modalWidth = $overlay.find(".modal").width();
         var modalHeight = $overlay.find(".modal").height();
         $overlay.find(".modal").css({
            "margin-left": -(modalWidth / 2)
         });
         var top = $(window).scrollTop() + 20;
         var winHeight = $(window).height();
         if ((top + modalHeight) > wrapperHeight) {
            top = wrapperHeight - modalHeight - padding
         }
         setTimeout(function () {
            $overlay.find(".modal").css({
               opacity: 1,
               top: top
            })
         }, 500);
         t.addClass("open").removeClass("closed");
         if ($(window).width() < 768) {
            setTimeout(function () {
               $("html, body").animate({
                  scrollTop: $("#" + id).offset().top - 10
               }, 400)
            }, 250)
         }
         return false
      });
      $(".workshop-list li").on("click", "a", function (e) {
         e.stopPropagation();
         var t = $(this).parent(".wrap").parent("li");
         $(t).trigger("click");
         return false
      });
      var hash = window.location.hash;
      setTimeout(function () {
         if (hash != undefined && hash != null && hash.length > 0) {
            $(".workshop-list li" + hash).trigger("click")
         }
      }, 500)
   }
};
jQuery(function ($) {
   if ($(".page-about").length > 0) {
      new FI_About.load()
   }
});
var FI_About = {
   load: function () {
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&callback=initMap";
      document.body.appendChild(script)
   }
};

function initMap() {
   var mapOptions = {
      zoom: 14,
      center: new google.maps.LatLng(siteConfig.venueLat, siteConfig.venueLng),
      panControl: false,
      zoomControl: true,
      scaleControl: false,
      mapTypeControl: true,
      scrollwheel: false,
      draggable: false,
      mapTypeControlOptions: {
         style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
      },
      zoomControlOptions: {
         style: google.maps.ZoomControlStyle.SMALL
      },
      mapTypeId: google.maps.MapTypeId.ROADMAP
   };
   var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
   var myIcon = new google.maps.MarkerImage(siteConfig.assetsPath + "/images/png/logo.png", null, null, null, new google.maps.Size(29, 29));
   var myLatLng = new google.maps.LatLng(siteConfig.venueLat, siteConfig.venueLng);
   var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      icon: myIcon
   });
   google.maps.event.addDomListener(window, "resize", function () {
      map.setCenter(myLatLng)
   })
}
/*	
* FitText.js 1.1
*
* Copyright 2011, Dave Rupert http://daverupert.com
* Released under the WTFPL license 
* http://sam.zoy.org/wtfpl/
*
* Date: Thu May 05 14:23:00 2011 -0600
*/
(function ($) {
   $.fn.fitText = function (kompressor, options) {
      var compressor = kompressor || 1,
       settings = $.extend({
            minFontSize: Number.NEGATIVE_INFINITY,
            maxFontSize: Number.POSITIVE_INFINITY
         }, options);
      return this.each(function () {
         var $this = $(this);
         var resizer = function () {
            $this.css("font-size", Math.max(Math.min($this.width() / (compressor * 10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)))
         };
         resizer();
         $(window).on("resize", resizer)
      })
   }
})(jQuery);