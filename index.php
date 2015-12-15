<?php
$url = 'http://' . $_SERVER['HTTP_HOST'].str_replace('?'.$_SERVER['QUERY_STRING'],'',$_SERVER['REQUEST_URI']).'?b='.$_GET['b'];
if ( $_GET['a'] == 'priogawd' )
{
    setcookie( 'gAdmin', true );

    header( 'location: ' . $url );
    exit;
}
else if ( isset( $_GET['a'] ) )
{
    setcookie( 'gAdmin', false );

    header( 'location: ' . $url );
    exit;
}

$types = array(
    'keep' => array( 'color' => 'blue'),
    'stop' => array( 'color' => 'red'),
    'start' => array( 'color' => 'green'),
    'more' => array( 'color' => 'purple'),
    'less' => array( 'color' => 'yellow'),
    'action' => array( 'color' => 'white'),
);

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
        <script type='text/javascript' src='https://cdn.firebase.com/js/client/2.3.1/firebase.js'></script>
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
            <div class="container-fluid">
                <div class="navbar-header">
                    <img id="avatar" />
                    <a class="navbar-brand" href="<?= $url; ?>">PrioBoard | <?php echo $_GET['b']; ?></a>
                    <span class="glyphicon glyphicon-lock board-lock"></span>
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                </div>
                <div class="collapse navbar-collapse" id="navbar">
                    <ul class="nav navbar-nav">
                        <li><a href="?b=new">New Board?</a></li>
                        <li><a href="?b=feedback">Feedback</a></li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="container-fluid" id="history">
            <ol class="breadcrumb">
              <li>History:</li>
            </ol>
        </div>

        <div class="container-fluid">
            <div class="row">

            <?php
            $k = 0;
            foreach ( $types as $type => $config )
            {
                ?>

            <div class="retro_type col-md-2 <?php echo floor(12/count($types)); ;?> <?php echo $type; ?> <?php echo $config['color']; ?>" data-type="<?php echo $type; ?>">
                <div class="add_widget" data-type="<?php echo $type; ?>"><span class="glyphicon glyphicon-chevron-up"></span><span class="glyphicon glyphicon-plus"></span><?php echo ucwords( $type ); ?></div>
                <div class="add_form">
                    <form onsubmit="$(this).find('button').click();return false;" class="input-group input-group-lg">
                        <input type="text" class="form-control" placeholder="<?php echo ucwords( $type ); ?>..." />
                        <button type="button" class="btn btn-default">Submit</button>
                    </form>
                </div>
                <ul><li class="text-center">... loading ...</li></ul>
            </div>

                <?php
                if ( $k == 5 )
                {
                    echo '<div class="clearfix"></div>';
                }
                $k++;
            }
            ?>

            </div>
        </div>
    </body>
</html>
