var retroCode = '';

function retroString()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-";

    for( var i=0; i < 10; i++ )
    text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

var refs = document.location.search.replace('\?','');
refs = refs.split('&');

for ( r in refs )
{
    param = refs[r].split('=');

    if ( param[0] == 'b' )
    {
        retroCode = param[1];
    }
    else if ( param.length == 1 && param[0] != '' )
    {
        retroCode = param[0]; // backward compatible - take ?code to ?b=code
        window.top.location = '?b='+retroCode;
    }
}

if ( refs.length == 0 || refs == '' || retroCode == 'new' || retroCode == '' )
{
    // take them to their cookie if exists
    retroCode = $.cookie('your_retro');
    if ( typeof retroCode != 'undefined' && retroCode != '' && retroCode != 'new' )
    {
        window.top.location = '?b='+retroCode;
    }
    else
    {
        // give them a new one
        retroCode = retroString();
        $.cookie('your_retro', retroCode);
        window.top.location = '?b='+retroCode;
    }
}

var gAdmin = $.cookie('gAdmin');


$.cookie('your_retro', retroCode);

myNotes = sessionStorage[retroCode+'notes'];
if ( !myNotes )
{
    myNotes = {'notes':[]}
    myNotes = JSON.stringify( myNotes );
    sessionStorage[retroCode+'notes'] = myNotes;
}

$(function(){
    $('.navbar-brand').append(' | ' + retroCode)

    $('.add_widget .glyphicon-pencil').on('click',function(e){
        e.preventDefault();

        type = $(this).parent().data('type')
        $(this).parents('.retro_type').find('.add_form').toggle(200).find('textarea').focus();

        return false;
    });

    $('.add_widget .glyphicon-chevron-down, .add_widget .glyphicon-chevron-up').on('click',function(e){
        e.preventDefault();

        if ( $(this).parents('.retro_type').find('ul:visible').length )
        {
            $(this).parents('.retro_type').find('ul').slideUp(50);
            $(this).removeClass( 'glyphicon-chevron-up' );
            $(this).addClass( 'glyphicon-chevron-down' );
        }
        else
        {
            $(this).parents('.retro_type').find('ul').slideDown(50);
            $(this).removeClass( 'glyphicon-chevron-down' );
            $(this).addClass( 'glyphicon-chevron-up' );
        }

        return false;
    });

    $('.add_form').find(':button').on('click',function(){

        var note = $(this).parent().find('textarea').val();

        note = $("<div/>").html( note ).text(); //filter tags
        note = $.trim(note);

		if ( note.length == 0 )
		{
			alert('You must type something.');
		}
		else
		{
        	addNote( $(this).parents('.retro_type').data('type'), note );
		}

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
    if ( $.inArray( id, myNotes.notes ) > -1 || gAdmin )
    {
        del = '<span class="glyphicon glyphicon-remove"></span>';
    }
    $('.retro_type.'+type+' ul').append('<li id="'+id+'">'+del+note+'</li>');

    $('.retro_type.'+type+' ul li .glyphicon-remove').off().on('mouseup',function(e){
        e.preventDefault();

        var id = $(this).parent().attr('id');
        myNotes = JSON.parse( sessionStorage[retroCode+'notes'] );
        if ( $.inArray( id, myNotes.notes ) > -1 || gAdmin)
        {
            if ( confirm("Delete the following?\n\n"+$(this).parent().text()) )
            {
                removeNote($(this).parent());
            }
        }
    });
}
