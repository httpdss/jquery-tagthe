//TODO:
//License, put it up on Github?
//Test test test, first jQuery plugin
//Example: test what would happen if tagthe.net gives us HTML tags

//TODO: set optional and configurable encapsulation tags (for ex. <li></li>)
//TODO: make separator configurable
//TODO: get people and language from dimensions array too 

(function($) {
    jQuery.tagvar = false;
    $.fn.tagthe = function(options) {   
        var opts = $.extend({},$.fn.tagthe.defaults, options);
        return this.each(function() {
            $(this).click(function() {
                text = escape(opts.content);
                var url = "http://tagthe.net/api/?text="+text+"&view=json&callback=?";
                if (!jQuery.tagvar) {
                    $.getJSON(url, function(data) { 
                        prnt_html(data,opts); 
                        jQuery.tagvar = data;
                    });
                } 
                else {
                    prnt_html(jQuery.tagvar,opts);
                }
                console.info(jQuery.tagvar);
            });
        });
    };
    $.fn.tagthe.defaults = {
            info_type:'language',
            destination:'#tags',
            content:'Bienvenido al primer tutorial de Javascript y HTML meto a David Beckham para gente.'
    };
    $.fn.tagthe.format = function(txt) { 
        return txt + " "; 
    }
    function prnt_html(data,opts) {
        var dim = data.memes[0].dimensions;
        var html_string = '';
        if (dim[opts.info_type] != undefined) {
            $.each(dim[opts.info_type], function(i,item) {
                html_string += $.fn.tagthe.format(item);
            });     
            $(opts.destination).html(html_string);
        }
    }
})(jQuery); 
