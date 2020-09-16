/* global Pace, ScrollMagic */

(function($){
    "use strict";
    
    var $document = $(document),
        $window = $(window),
        $htmlBody = $('html, body'),
        $body = $('body'),
        $header = $('header'),
        $navbar = $('.navbar'),
        $navbarCollapse = $('.navbar-collapse'),
        $pageScrollLink = $('.page-scroll'),
        $galleryGrid = $('.gallery-grid'),
        $scrollToTop = $('.scroll-to-top'),
        navHeight = 80,
        navHeightShrink = 60;
      
    /** Detect mobile device */
    var isMobile = {
        Android: function(){
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function(){
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function(){
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function(){
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function(){
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function(){
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };
    
    
    /*
    * Preloader
    */
   
    Pace.on('start', function(){
        var $paceProgress = $('.pace-progress');
        $paceProgress.addClass($body.data('preloader-color'));
    });
    
    Pace.start();
    
    
    /*
    * Window load
    */
   
    $window.on('load', function(){
        
        var submitted=false;
        /** Bootstrap scrollspy */
        var ww = Math.max($window.width(), window.innerWidth);
        $body.scrollspy({    
            target: '#navigation',
            offset: ww > 992 ? navHeightShrink : navHeight
        });



     new FlipDown(1609459200, {
         theme: "light",
       }).start();


        if ($window.width() > 900) {

            $('#reveillon-video').removeClass('col-12');
            $('#reveillon-video').removeClass('col-4');

            $('#reveillon-texto').removeClass('col-12');
            $('#reveillon-texto').removeClass('col-8');

            $('#reveillon-texto').addClass('col-8');
            $('#reveillon-video').addClass('col-4');

            $('#festa-video').removeClass('col-12');
            $('#festa-video').removeClass('col-4');

            $('#festa-texto').removeClass('col-12');
            $('#festa-texto').removeClass('col-8');


            $('#festa-texto').addClass('col-8');
            $('#festa-video').addClass('col-4');

            $('#festa-video-2').removeClass('classe-video');
            $('#festa-video-2').addClass('classe-video');


        
          } else {
            $('#reveillon-video').removeClass('col-4');
            $('#reveillon-video').addClass('col-12');
            $('#reveillon-texto').removeClass('col-8');
            $('#reveillon-texto').addClass('col-12');

            $('#festa-video').removeClass('col-4');
            $('#festa-video').addClass('col-12');
            $('#festa-texto').removeClass('col-8');
            $('#festa-texto').addClass('col-12');
          }


    });
    
    
    /*
    * Document ready
    */
   
    $document.ready(function(){
        
        /*
        * Window scroll
        */
       
        $window.on('scroll', function(){
        
            if ($document.scrollTop() > navHeight){
                
                /** Shrink navigation */
                $header.addClass('shrink');
                $navbar.addClass('shrink');
                
                /** Scroll to top */
                $scrollToTop.fadeIn();
            }
            else{
                
                /** Shrink navigation */
                $header.removeClass('shrink');
                $navbar.removeClass('shrink');
                
                /** Scroll to top */
                $scrollToTop.fadeOut();
            }
        });
        
        
        /*
        * Window resize
        */
       
        $window.on('resize', function(){
            
            /** Bootstrap scrollspy */
            var dataScrollSpy = $body.data('bs.scrollspy'),
                ww = Math.max($window.width(), window.innerWidth),
                offset = ww > 992 ? navHeightShrink : navHeight;
        
            dataScrollSpy._config.offset = offset;
            $body.data('bs.scrollspy', dataScrollSpy);
            $body.scrollspy('refresh');
            
            
            /** Gallery grid */
            if ($.fn.isotope){
                $galleryGrid.isotope('layout');
            }

            if ($window.width() > 900) {

                $('#reveillon-video').removeClass('col-12');
                $('#reveillon-video').removeClass('col-4');

                $('#reveillon-texto').removeClass('col-12');
                $('#reveillon-texto').removeClass('col-8');

                $('#reveillon-texto').addClass('col-8');
                $('#reveillon-video').addClass('col-4');

                $('#festa-video').removeClass('col-12');
                $('#festa-video').removeClass('col-4');
    
                $('#festa-texto').removeClass('col-12');
                $('#festa-texto').removeClass('col-8');
    
    
                $('#festa-texto').addClass('col-8');
                $('#festa-video').addClass('col-4');

                $('#festa-video').removeClass('classe-video');
                $('#festa-video-2').addClass('classe-video');

            
              } else {
                $('#reveillon-video').removeClass('col-4');
                $('#reveillon-video').addClass('col-12');
                $('#reveillon-texto').removeClass('col-8');
                $('#reveillon-texto').addClass('col-12');

                $('#festa-video').removeClass('col-4');
                $('#festa-video').addClass('col-12');
                $('#festa-texto').removeClass('col-8');
                $('#festa-texto').addClass('col-12');

                $('#festa-video-2').removeClass('classe-video');
                $('#festa-video').addClass('classe-video');

              }

        });
        
        
        /** Page scroll */ 
        $pageScrollLink.on('click', function(e){
            var anchor = $(this),
                target = anchor.attr('href');
            pageScroll(target);
            e.preventDefault();
        });
        
        function pageScroll(target){
            var ww = Math.max($window.width(), window.innerWidth),
                    offset = ww > 992 ? navHeightShrink : navHeight;
            
            $htmlBody.stop().animate({
                scrollTop: $(target).offset().top - (offset - 1)
            }, 1000, 'easeInOutExpo');
            
            // Automatically retract the navigation after clicking on one of the menu items.
            $navbarCollapse.collapse('hide');
        };
        
        
        /** Counter Number */
        if ($.fn.countTo){
            var $timer = $('.timer');
            $timer.one('inview', function(isInView){
                if (isInView){
                    $(this).countTo();
                }
            });
        }
        
        
        /** Gallery - Grid */
        if ($.fn.imagesLoaded && $.fn.isotope){
            $galleryGrid.imagesLoaded(function(){
                $galleryGrid.isotope({
                    itemSelector: '.item',
                    layoutMode: 'masonry'
                });
            });
        }
        
        
        /** Gallery - Magnific popup */
        if ($.fn.magnificPopup){
            $galleryGrid.magnificPopup({
                delegate: 'a',
                type: 'image',
                mainClass: 'mfp-fade',
                gallery:{
                    enabled: true,
                    navigateByImgClick: true,
                    preload: [0,2],
                    tPrev: 'Previous',
                    tNext: 'Next',
                    tCounter: '<span class="mfp-counter-curr">%curr%</span> of <span class="mfp-counter-total">%total%</span>'
                }
            });
        }
        
       
        
        /** BG Parallax */
        if (typeof ScrollMagic !== 'undefined'){
            var selector = '#hero-bg-parallax';
            
            // Init controller
            var controller = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: 'onEnter', duration: '200%'}});
        
            // Build scenes
            new ScrollMagic.Scene({triggerElement: selector})
                    .setTween(selector + ' > .bg-img-parallax', {y: '80%', ease: Linear.easeNone})
                    .addTo(controller);
        }
        
        
        /** BG Slider */
        if ($.fn.flickity){
            var $bgSlider = $('#hero-bg-slider').find('.carousel-custom');
            carouselCustom($bgSlider);
        }
        
        /** Carousel Custom */
        function carouselCustom($elem){
            $elem.flickity({
                cellSelector: '.carousel-cell',
                cellAlign: 'left',
                contain: true,
                prevNextButtons: $elem.data('prev-next-buttons'),
                pageDots: $elem.data('page-dots'),
                draggable: $elem.data('draggable'),
                autoPlay: $elem.data('autoplay'),
                imagesLoaded: true,
                pauseAutoPlayOnHover: false
            });
            
            if ($elem.data('autoplay')){
                var flkty = $elem.data('flickity');
                $elem.find('.flickity-prev-next-button').on('mouseleave', function(){ 
                    flkty.playPlayer(); 
                });
            }
        }
        

        

        
        /** BG Slideshow */
        if ($.fn.flexslider){
            var $bgSlideshow = $('#hero-bg-slideshow').find('.bg-slideshow-wrapper');
            $bgSlideshow.flexslider({
                selector: '.slides > .bg-img-cover',
                easing: 'linear',
                slideshowSpeed: $bgSlideshow.data('slideshow-speed'),
                controlNav: false,
                directionNav: $bgSlideshow.data('direction-nav'),
                prevText: '',
                nextText: '',
                keyboard: false,
                pauseOnAction: true,
                touch: false,
                after: function(slider){
                    if (!slider.playing){
                        slider.play();
                    }
                }
            });
        }
        
        
        /** BG Video - Vimeo */
        if ($.fn.vimeo_player){
            var $bgVideo = $('#bgVideoVimeo');
            if (!isMobile.any()){
                $bgVideo.vimeo_player();
            }
            else{
                $bgVideo.hide();
                $bgVideo.parent().css('background-image', 'url("' + $bgVideo.data('video-poster') + '")');
            }
        }
        
        
        /** BG - Video (YouTube) */
        if ($.fn.YTPlayer){
            var $bgVideo = $('#bgVideoYouTube');
            if (!isMobile.any()){
                $bgVideo.YTPlayer();
            }
            else{
                $bgVideo.hide();
                $bgVideo.parent().css('background-image', 'url("' + $bgVideo.data('video-poster') + '")');
            }
        }
        
        
        
        
     
    });
})(jQuery);