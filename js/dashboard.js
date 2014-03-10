var options, isDragging = false, isResizing = false, retroNotes;

function retroString()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

    for( var i=0; i < 10; i++ )
    text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

var refs = document.referrer.split('?');

if ( refs.length == 1 || refs[1] == '' )
{
    // take them to their cookie if exists
    retroCode = $.cookie('your_retro');
    if ( typeof retroCode != 'undefined' )
    {
        window.top.location = 'http://local.retro.github.com/?'+retroCode;
        // window.top.location = 'http://retros.spartzinc.com/?'+retroCode;
    }
    else
    {
        // give them a new one
        retroString = retroString();
        $.cookie('your_retro', retroString);
        window.top.location = 'http://local.retro.github.com/?'+retroString;
        // window.top.location = 'http://retros.spartzinc.com/?'+retroString;
    }
}

retroCode = refs[1];

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

            resize: function(e, ui, $widget) {
            },

            stop: function(e, ui, $widget) {
                isResizing = false;
                updateSerial( $widget.parents('.gridster').data('type') )
            }
        },
        draggable: {
            start: function(e, ui) {
                isDragging = true;
            },

            drag: function(e, ui) {
            },

            stop: function(e, ui) {
                isDragging = false;
                updateSerial( $(e.target).parents('.gridster').data('type') )
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

        note = 'Bacon ipsum dolor sit pork sparfe ribs leberkas'+Math.random();
        type = $(this).data('type')
        addNote( type, note );

        return false;
    });

    notes = {}
    notes.keep = new Firebase('https://dojohnso.firebaseio.com/retrospective/'+retroCode+'/keep');
    notes.stop = new Firebase('https://dojohnso.firebaseio.com/retrospective/'+retroCode+'/stop');
    notes.start = new Firebase('https://dojohnso.firebaseio.com/retrospective/'+retroCode+'/start');
    notes.more = new Firebase('https://dojohnso.firebaseio.com/retrospective/'+retroCode+'/more');
    notes.less = new Firebase('https://dojohnso.firebaseio.com/retrospective/'+retroCode+'/less');

    notes.keep.on('value', drawNotes);
    notes.stop.on('value', drawNotes);
    notes.start.on('value', drawNotes);
    notes.more.on('value', drawNotes);
    notes.less.on('value', drawNotes);
});

function drawNotes( snapshot )
{
    type = snapshot.name();
    grids[type].remove_all_widgets();

    if ( snapshot.val() !== null )
    {
        $.each(snapshot.val().serialized, function() {
            drawNote(type, this.text, this.size_x, this.size_y, this.col, this.row);
        });
    }
}

// function removeNote( obj )
// {
//     var id = $(obj).attr('id');
//     grid = $(obj).parents('.gridster');
//     type = grid.data('type');

//     var noteRef = notes[type].child( id )
//     noteRef.remove();
// }

function addNote( type, note )
{
    drawNote(type, note, 4, 2 );
    updateSerial(type);
}

function updateSerial(type)
{
    var serialRef = notes[type].child( 'serialized' );

    var serial = grids[type].serialize();

    for ( i in serial )
    {
        serial[i].text = $('.gridster[data-type='+type+']').find('li[data-col='+serial[i].col+'][data-row='+serial[i].row+']').text();
    }

    serialRef.set( serial );
}

function drawNote( type, note, size_x, size_y, col, row )
{
    $widget = grids[type].add_widget('<li>'+note+'</li>', size_x, size_y, col, row);

    $widget.on('mouseup',function(e){
        e.preventDefault();
        if ( isDragging || isResizing ) {
            return;
        }

        if ( confirm("Delete the following?\n\n"+$(this).text()) )
        {
            grid = $(this).parents('.gridster');
            type = grid.data('type');

            // removeNote(this);
            grids[type].remove_widget( $(this), function(){
                updateSerial(type);
            });
        }
    });
}
