var retroCode = '';

function retroString()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

    for( var i=0; i < 10; i++ )
    text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

var refs = document.location.href.split('?');

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
        retroCode = retroString();
        $.cookie('your_retro', retroCode);
        window.top.location = 'http://local.retro.github.com/?'+retroCode;
        // window.top.location = 'http://retros.spartzinc.com/?'+retroString;
    }
}

retroCode = refs[1];
$.cookie('your_retro', retroCode);

// myNotes = {'notes':[]}
// myNotes = JSON.stringify( myNotes );
// sessionStorage[retroCode+'notes'] = myNotes;

myNotes = sessionStorage[retroCode+'notes'];
if ( !myNotes )
{
    myNotes = {'notes':[]}
    myNotes = JSON.stringify( myNotes );
    sessionStorage[retroCode+'notes'] = myNotes;
}

$(function(){

    $('.add_widget').on('click',function(e){
        e.preventDefault();

        type = $(this).data('type')
        $(this).parents('.retro_type').find('.add_form').toggle(200).find('textarea').focus();

        return false;
    });

    $('.add_form').find(':button').on('click',function(){

        var note = $(this).parent().find('textarea').val();

        note = $("<div/>").html( note ).text(); //filter tags
        note = $.trim(note);

        addNote( $(this).parents('.retro_type').data('type'), note );
        $(this).parent().find('textarea').val('').focus();
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
    $('.retro_type.'+type+' ul').find('li').remove();

    if ( snapshot.val() !== null )
    {
        for ( i in snapshot.val() )
        {
            drawNote(type, snapshot.val()[i].note, i);
        }
    }
}

function removeNote( obj )
{
    var id = $(obj).attr('id');

    type = $(obj).parents('.retro_type').data('type');

    var noteRef = notes[type].child( id )
    noteRef.remove();
}

function addNote( type, note )
{
    var noteRef = notes[type];
    id = noteRef.push({note:note});

    myNotes = JSON.parse( sessionStorage[retroCode+'notes'] );

    myNotes.notes.push(id.name())

    myNotes = JSON.stringify(myNotes);
    sessionStorage[retroCode+'notes'] = myNotes;

    notes[type].once('value', drawNotes); // need to resync for the delete icon, for now
}

function drawNote( type, note, id )
{
    myNotes = JSON.parse( sessionStorage[retroCode+'notes'] );

    var del = '';
    if ( $.inArray( id, myNotes.notes ) > -1 )
    {
        del = '<span class="glyphicon glyphicon-remove"></span>';
    }
    $('.retro_type.'+type+' ul').append('<li id="'+id+'">'+del+note+'</li>');

    $('.retro_type.'+type+' ul li .glyphicon-remove').off().on('mouseup',function(e){
        e.preventDefault();

        var id = $(this).parent().attr('id');
        myNotes = JSON.parse( sessionStorage[retroCode+'notes'] );
        if ( $.inArray( id, myNotes.notes ) > -1 )
        {
            if ( confirm("Delete the following?\n\n"+$(this).parent().text()) )
            {
                removeNote($(this).parent());
            }
        }
    });
}
