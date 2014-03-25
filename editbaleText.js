$(function() {
    
    $.fn.editableText = function(options) {
        
        // options and default options
        options = $.extend( {
            onEdit: function(el) { },
            onSave: function(el) { },
            editOn: "click"
        }, options );
        
        // simple function to show one element, hide another
        function showHide(show, hide) {
            $(show).show();
            $(hide).hide();
        }
        
        // called when blur or key press (enter) is triggered
        function save(clickable, editable) {
            // hide editable, show clickable
            showHide(clickable, editable)
            // set value of clickable
            $(clickable).html($(editable).val())
            // callback
            options.onSave(clickable, editable);
        }
        
        // append clickable text
        function appendClickable(el, options) {
            var value = $(el).val()
            if(value.length > options.truncate) {
                value = value.substring(0,options.truncate) + "...";
            }
            var clickable = $('<span class="textFormText">' + value + '</span>');
            $(el).parent().append(clickable)
            return clickable
        }
        
        // allows us to pass in editOn as either an array or string
        if (typeof options.editOn != Array) {
            options.editOn = [options.editOn]
        }
        
        // textareas...
        $(this).find("input, select, textarea").each(function() {
            
            var tagName = $(this).prop("tagName").toLowerCase();
            
            // define clickable (append), and editable
            var clickable = appendClickable(this, options)            
            var editable = $(this);
            
            // show/ hide
            showHide(clickable, editable);
            
            // set events
            $.each(options.editOn, function(index, value) {
                clickable.on(value, function() {
                    // show editable, hide clickable
                    showHide(editable, clickable)
                    // set focus/select
                    switch(tagName) {
                        case "input":
                           $(editable).select();
                           break;
                        default:
                           $(editable).focus();
                    }
                });
            });
            
            editable.on("blur", function() {
                showHide(clickable, editable);
            });
            
            editable.on("change", function() {
                save(clickable, editable)
            });
            
            editable.keydown(function (e){
                if(e.keyCode == 13){
                    save(clickable, editable)
                }
            })
        });
        
    }
    
});
