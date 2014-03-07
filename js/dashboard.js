var options, isDragging = false, isResizing = false;
$(function(){

    options = {
        widget_margins: [3, 3],
        widget_base_dimensions: [50, 50],
        max_cols:4,
        extra_rows:1,
        resize: {
            enabled: true,
            start: function(e, ui, $widget) {
                isResizing = true;
            },

            drag: function(e, ui, $widget) {
            },

            stop: function(e, ui, $widget) {
                isResizing = false;
            }
        },
        draggable: {
            start: function(e, ui, $widget) {
                $('iframe').fadeOut(250);
                isDragging = true;
            },

            resize: function(e, ui, $widget) {
            },

            stop: function(e, ui, $widget) {
                $('iframe').fadeIn(250);
                isDragging = false;
            }
        }
    }

    grids = {}
    grids.keep = $(".gridster.keep ul").gridster(options).data('gridster');
    grids.stop = $(".gridster.stop ul").gridster(options).data('gridster');
    grids.start = $(".gridster.start ul").gridster(options).data('gridster');
    grids.more = $(".gridster.more ul").gridster(options).data('gridster');
    grids.less = $(".gridster.less ul").gridster(options).data('gridster');

    $('.add_widget').on('click',function(e){
        e.preventDefault();

        type = $(this).data('type')
        $widget = grids[type].add_widget('<li>'+type+' Bacon ipsum dolor sit amet sausage pancetta pork spare ribs leberkas</li>', 4, 2);

        $widget.on('mouseup',function(e){
            e.preventDefault();
            if ( isDragging || isResizing ) {
                return;
            }

            if ( confirm("Delete the following?\n\n"+$(this).text()) )
            {
                grid = $(this).parents('.gridster');
                type = grid.data('type')

                grids[type].remove_widget( $(this) );
            }
        });

        return false;
    });
});

