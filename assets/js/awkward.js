jQuery(document).ready(function($) {
    var showcase_dup = jQuery('#showcase').clone();
    showcase_dup.attr('id', 'showcase-dup');
    showcase_dup.hide();

    function Defaults()
    {
        var screenRes = jQuery(window).width();
        var sliderType = (screenRes < 768) ? 'horizontal' : 'vertical';
        var sliderWidth;
        var sliderHeight;

        if(screenRes >= 960)
        {
            sliderWidth = 960;
            sliderHeight = 543;
        }
        if(screenRes < 959)
        {
            sliderWidth = 728;
            sliderHeight = 412;
        }
        if(screenRes < 767)
        {
            sliderWidth = 450;
            sliderHeight = 255;
        }
        if(screenRes < 479)
        {
            sliderWidth = 300;
            sliderHeight = 170;
        }
        if(screenRes < 319)
        {
            sliderWidth = 960;
            sliderHeight = 543;
        }

        $("#showcase").awShowcase({
            content_width:		sliderWidth,
            content_height:		sliderHeight,
            fit_to_parent:		false,
            auto:			true,
            interval:		3000,
            continuous:		true,
            loading:		true,
            tooltip_width:		200,
            tooltip_icon_width:	32,
            tooltip_icon_height:    32,
            tooltip_offsetx:	18,
            tooltip_offsety:	0,
            arrows:			false,
            buttons:		false,
            btn_numbers:		false,
            keybord_keys:		true,
            mousetrace:		false,
            pauseonover:		true,
            stoponclick:		true,
            transition:		'fade',
            transition_delay:	1000,
            transition_speed:	800,
            show_caption:		'onhover',
            thumbnails:		true,
            thumbnails_position:    'inside-last',
            thumbnails_direction:   sliderType,
            thumbnails_slidex:	1,
            dynamic_height:		false,
            speed_change:		true,
            viewline:		false
        });

    }

    Defaults();

    jQuery(window).resize(function(){
        jQuery('#showcase').replaceWith(showcase_dup.clone().attr('id', 'showcase').show());
        Defaults();
    })
});
