//TODO: set optional and configurable encapsulation tags (for ex. <li></li>)
//TODO: make separator configurable
//TODO: get people and language from dimensions array too 

(function($) {
    $.fn.tagthe = function(options) {   
        var opts = $.extend({},$.fn.tagthe.defaults, options);
        return this.each(function() {
            text = escape(opts.content);
            var url = "http://tagthe.net/api/?text="+text+"&view=json&callback=?";
                $.getJSON(url, function(data) { 
                    prnt_html(data,opts); 
                    jQuery.tagvar = data;
                });
        }); 
    };
    $.fn.tagthe.defaults = {
            info_type:'language',
            destination:'#tags',
            content:'',
            left_separator:'',
            right_separator:'',
            word_separator:', ',
    };
    $.fn.tagthe.format = function(txt, opts) { 
        return opts.left_separator + txt + opts.right_separator + opts.word_separator; 
    }
    function prnt_html(data,opts) {
        var dim = data.memes[0].dimensions;
        var html_string = '';
        if (dim[opts.info_type] != undefined) {
            $.each(dim[opts.info_type], function(i,item) {
                html_string += $.fn.tagthe.format(item, opts);
            });     
            html_string = html_string.toLowerCase();
            html_string = html_string.slice(0, 0 - opts.word_separator.length);
            $(opts.destination).html(html_string);
        }
    }
})(jQuery); 
