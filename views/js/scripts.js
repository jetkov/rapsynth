(function ($) {
    "use strict"; // Start of use strict
 
    //to smooth scroll and keep track of location
    $(function () {
        // Add smooth scrolling to all links
        $("a").on('click', function (event) {
            if (this.hash !== "") {
                // Prevent default anchor click behavior
                event.preventDefault();
                // Store hash
                var hash = this.hash;
                $('html, body').animate({
                    scrollTop: $(hash).offset().top
                }, 500,
                    function () {
                    // ADD HASH
                        window.location.hash = hash;
                    });
            } // End if
        });
        
    });

    // Scrollspy
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    });
    
    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    });
    
    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function () {
        $('.navbar-toggle:visible').click();
    });
    
    //Closes responsive menu when something else is clicked
    $(document).click(function (event) {
        var clickover = $(event.target),
            $navbar = $(".navbar-collapse"),
            opened = $navbar.hasClass("in");
        if (opened === true && !clickover.hasClass("navbar-toggle")) {
            $navbar.collapse('hide');
        }
        
    });
    
    //animations FIX YOU CAROL FIX IT ALREADY
    $(window).scroll(function () {
        $(".scrollanim").each(function () {
            var pos = $(this).offset().top,
                winTop = $(window).scrollTop();

            if (pos < winTop + 600) {
                if ($(this).hasClass("rollIn")) {
                    $(this).addClass("animated");
                } else if ($(this).hasClass("down")) {
                    $(this).addClass("slidedown");
                } else if ($(this).hasClass("left")) {
                    $(this).addClass("slideleft");
                } else if ($(this).hasClass("right")) {
                    $(this).addClass("slideright");
                } else if ($(this).hasClass("fade")) {
                    $(this).addClass("fadein");
                }
            }
        });
    });
    
    $.scrollify({
        section : ".panels",
        sectionName : "section-name",
        interstitialSection : "",
        easing: "easeOutExpo",
        scrollSpeed: 1100,
        offset : 0,
        scrollbars: true,
        standardScrollElements: "",
        setHeights: true,
        overflowScroll: true,
        before:function() {},
        after:function() {},
        afterResize:function() {},
        afterRender:function() {}
    });
    
    
                $(function() {
                    $.scrollify({
                        section : ".panels",
                    });
                });
})(jQuery); // End of use
