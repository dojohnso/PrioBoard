var retroCode = '';

function retroString()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

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

if ( refs.length == 0 || refs == '' || refs[0] == '' || retroCode == 'new' || retroCode == '' )
{
    var newCode = false;
    if ( retroCode == 'new' )
    {
        newCode = true;
    }
    else
    {
        // take them to their cookie if exists
        retroCode = $.cookie('your_retro');
        if ( typeof retroCode != 'undefined' && retroCode != '' && retroCode != 'new' )
        {
            window.top.location = '?b='+retroCode;
        }
        else
        {
            newCode = true;
        }
    }

    if ( newCode )
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

myVotes = sessionStorage[retroCode+'votes'];
if ( !myVotes )
{
    myVotes = {'votes':[]}
    myVotes = JSON.stringify( myVotes );
    sessionStorage[retroCode+'votes'] = myVotes;
}

$(function(){
    $('.add_widget .glyphicon-plus').on('click',function(e){
        e.preventDefault();

        if ( boardIsLocked() ) { return; }

        type = $(this).parent().data('type')
        var addForm = $(this).parents('.retro_type').find('.add_form');

        addForm.toggle(200, function()
        {
            if ( addForm.is(':visible') )
            {
                addForm.find('input').focus();
            }
        });

        return false;
    });

    $('.add_widget .glyphicon-chevron-down, .add_widget .glyphicon-chevron-up').on('click',function(e){
        e.preventDefault();

        if ( boardIsLocked() ) { return; }

        if ( $(this).parents('.retro_type').find('ul:visible').length )
        {
            $(this).parents('.retro_type').find('ul').slideUp(150);
            $(this).removeClass( 'glyphicon-chevron-up' );
            $(this).addClass( 'glyphicon-chevron-down' );
        }
        else
        {
            $(this).parents('.retro_type').find('ul').slideDown(100);
            $(this).removeClass( 'glyphicon-chevron-down' );
            $(this).addClass( 'glyphicon-chevron-up' );
        }

        return false;
    });

    $('.add_form').find(':button').on('click',function()
    {
        if ( boardIsLocked() ) { return; }

        var note = $(this).parent().find('input').val();

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

        $(this).parent().find('input').val('').focus();
    });

    notes = {}
    notes.keep = new Firebase('https://dojohnso.firebaseio.com/prioboard/'+retroCode+'/keep');
    notes.stop = new Firebase('https://dojohnso.firebaseio.com/prioboard/'+retroCode+'/stop');
    notes.start = new Firebase('https://dojohnso.firebaseio.com/prioboard/'+retroCode+'/start');
    notes.more = new Firebase('https://dojohnso.firebaseio.com/prioboard/'+retroCode+'/more');
    notes.less = new Firebase('https://dojohnso.firebaseio.com/prioboard/'+retroCode+'/less');

    notes.keep.on('value', drawNotes);
    notes.stop.on('value', drawNotes);
    notes.start.on('value', drawNotes);
    notes.more.on('value', drawNotes);
    notes.less.on('value', drawNotes);

    notes.board_info = new Firebase('https://dojohnso.firebaseio.com/prioboard/'+retroCode+'/board_info');
    notes.board_info.on('value',updateBoard);

    if ( gAdmin )
    {
        $('.board-lock').css('cursor','pointer').on('click',function()
        {
            if ( $(this).hasClass( 'locked' ) )
            {
                unlockBoard();
            }
            else
            {
                lockBoard();
            }
        });
    }
});

function lockBoard()
{
    notes.board_info.update({locked:1});
}

function unlockBoard()
{
    notes.board_info.update({locked:0});
}

function updateBoard( snapshot )
{
    if ( snapshot.val() !== null )
    {
        if ( snapshot.val().locked )
        {
            $('.board-lock').removeClass('unlocked').addClass('locked');
        }
        else
        {
            $('.board-lock').removeClass('locked').addClass('unlocked');
        }
    }
    else
    {
        notes.board_info.set({locked:0});
        $('.board-lock').removeClass('locked').addClass('unlocked');
    }
}

function drawNotes( snapshot )
{
    type = snapshot.key();
    $('.retro_type.'+type+' ul').find('li').remove();

    if ( snapshot.val() !== null )
    {
        for ( i in snapshot.val() )
        {
            drawNote(type, snapshot.val()[i], i);
        }
    }
}

function removeNote( obj )
{
    if ( boardIsLocked() ) { return; }

    var id = $(obj).attr('id');

    type = $(obj).parents('.retro_type').data('type');

    var noteRef = notes[type].child( id )
    noteRef.remove();
}

function addNote( type, note )
{
    if ( boardIsLocked() ) { return; }

    var noteRef = notes[type];
    noteRef.push().setWithPriority({note:note,upvotes:1},-1);

    // get the last (newest) item
    noteRef.limitToLast(1).once('value',function(snap){
        for (k in snap.val() )
        {
            var newNoteId = k;
        }

        myNotes = JSON.parse( sessionStorage[retroCode+'notes'] );

        myNotes.notes.push(newNoteId)

        myNotes = JSON.stringify(myNotes);
        sessionStorage[retroCode+'notes'] = myNotes;

        notes[type].once('value', drawNotes); // need to resync for the delete icon, for now
    });
}

function drawNote( type, noteRef, id )
{
    var note = noteRef.note;
    var upvotes = typeof noteRef.upvotes == 'undefined' ? 1 : noteRef.upvotes*1;

    myNotes = JSON.parse( sessionStorage[retroCode+'notes'] );

    var del = '';
    var upIcon = '';
    if ( $.inArray( id, myNotes.notes ) > -1 || gAdmin )
    {
        del = '<span class="glyphicon glyphicon-remove"></span>';
    }

    myVotes = JSON.parse( sessionStorage[retroCode+'votes'] );
    upIcon = '<span class="glyphicon glyphicon-arrow-up">'+upvotes+'</span>';

    $('.retro_type.'+type+' ul').append('<li id="'+id+'">'+upIcon+del+'<span class="note">'+note+'</span></li>');

    $('.retro_type.'+type+' ul li .glyphicon-remove').off().on('mouseup',function(e){
        e.preventDefault();

        if ( boardIsLocked() ) { return; }

        if ( confirm("Delete the following?\n\n"+$(this).parent().find('span.note').text()) )
        {
            removeNote($(this).parent());
        }
    });

    $('.retro_type.'+type+' ul li .glyphicon-arrow-up').off().on('mouseup',function(e){
        e.preventDefault();

        if ( boardIsLocked() ) { return; }

        type = $(this).parents('.retro_type').data('type');

        var id = $(this).parent().attr('id');
        var noteRef = notes[type].child( id )

        myVotes = JSON.parse( sessionStorage[retroCode+'votes'] );
        if ( ($.inArray( id, myNotes.notes ) > -1 || $.inArray( id, myVotes.votes ) > -1)  )
        {
            return false;
        }

        noteRef.once("value", function(snap) {
            noteRef.transaction(
                function(currentNote)
                {
                    return {note:currentNote.note, upvotes: ++currentNote.upvotes || 2}
                },
                function (error,committed,snap)
                {
                    if ( committed && error == null )
                    {
                        myVotes = JSON.parse( sessionStorage[retroCode+'votes'] );

                        myVotes.votes.push(snap.key());

                        myVotes = JSON.stringify(myVotes);
                        sessionStorage[retroCode+'votes'] = myVotes;

                        noteRef.setPriority(-1*snap.val().upvotes);
                    }
                }
            );
        });
    });
}

function boardIsLocked()
{
    var locked = false;
    notes.board_info.once('value',function( snapshot )
    {
        locked = snapshot.val().locked;
    });

    return locked;
}
