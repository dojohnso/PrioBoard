<?php
if ( $_GET['a'] == 'priogawd' )
{
    setcookie( 'gAdmin', true );

    $splits = explode( '&', $_SERVER['QUERY_STRING'] );
    $url = $_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'].'?'.$splits[0];
    header( 'location: http://' . $url );
    exit;
}

?><!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="">
        <meta name="author" content="">

		<link id="favicon" rel="shortcut icon" href="images/prioboard-star.png" />

        <title>PrioBoard</title>

        <!-- Bootstrap core CSS -->
        <link href="css/bootstrap.min.css" rel="stylesheet">
        <link href="css/normalize.css" rel="stylesheet">
        <link href="css/dashboard.css?<?php echo filemtime( 'css/dashboard.css' ); ?>" rel="stylesheet">

        <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
        <![endif]-->

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
        <script type='text/javascript' src='https://cdn.firebase.com/js/client/1.0.6/firebase.js'></script>
        <script src="js/jquery.cookie.js"></script>

        <script src="js/bootstrap.min.js"></script>
        <script src="js/dashboard.js?<?php echo filemtime( 'js/dashboard.js' ); ?>"></script>
    </head>

    <body>
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-70352811-1', 'auto');
      ga('send', 'pageview');

    </script>
        <div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
            <div class="container">
                <div class="navbar-header">
                    <a class="navbar-brand" href="?<?= $_SERVER['QUERY_STRING']; ?>">PrioBoard</a>
                </div>
                <div class="collapse navbar-collapse">
                    <ul class="nav navbar-nav">
                        <li><a href="?new">New Code?</a></li>
                        <!-- <li>
                            <form id="code-form" method="get">
                                <div class="input-group input-group-sm">
                                    <input type="text" class="form-control" placeholder="Enter Code" id="your-code" name="b">
                                </div>
                            </form>
                        </li> -->
                    </ul>
                </div>
            </div>
        </div>

        <div class="container">
            <!-- <div class="admin-code-box">
                <label class="sr-only" for="admin-code">Admin Code</label>
                <input type="input" class="form-control" id="admin-code" placeholder="Admin Code">
            </div> -->
            <div class="retro_type keep" data-type="keep">
                <div class="add_widget" data-type="keep"><span class="glyphicon glyphicon-chevron-up"></span><span class="glyphicon glyphicon-pencil"></span>Keep</div>
                <div class="add_form">
                    <textarea class="form-control" rows="5"></textarea>
                    <button type="button" class="btn btn-default">Submit</button>
                </div>
                <ul><li class="text-center">... loading ...</li></ul>
            </div>

            <div class="retro_type stop" data-type="stop">
                <div class="add_widget" data-type="stop"><span class="glyphicon glyphicon-chevron-up"></span><span class="glyphicon glyphicon-pencil"></span>Stop</div>
                <div class="add_form">
                    <textarea class="form-control" rows="5"></textarea>
                    <button type="button" class="btn btn-default">Submit</button>
                </div>
                <ul><li class="text-center">... loading ...</li></ul>
            </div>

            <div class="retro_type start" data-type="start">
                <div class="add_widget" data-type="start"><span class="glyphicon glyphicon-chevron-up"></span><span class="glyphicon glyphicon-pencil"></span>Start</div>
                <div class="add_form">
                    <textarea class="form-control" rows="5"></textarea>
                    <button type="button" class="btn btn-default">Submit</button>
                </div>
                <ul><li class="text-center">... loading ...</li></ul>
            </div>

            <div class="retro_type more" data-type="more">
                <div class="add_widget" data-type="more"><span class="glyphicon glyphicon-chevron-up"></span><span class="glyphicon glyphicon-pencil"></span>More</div>
                <div class="add_form">
                    <textarea class="form-control" rows="5"></textarea>
                    <button type="button" class="btn btn-default">Submit</button>
                </div>
                <ul><li class="text-center">... loading ...</li></ul>
            </div>

            <div class="retro_type less" data-type="less">
                <div class="add_widget" data-type="less"><span class="glyphicon glyphicon-chevron-up"></span><span class="glyphicon glyphicon-pencil"></span>Less</div>
                <div class="add_form">
                    <textarea class="form-control" rows="5"></textarea>
                    <button type="button" class="btn btn-default">Submit</button>
                </div>
                <ul><li class="text-center">... loading ...</li></ul>
            </div>
        </div>
    </body>
</html>
