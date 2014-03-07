<?php

?><!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="">
        <meta name="author" content="">

        <title>Retrospective 2.0</title>

        <!-- Bootstrap core CSS -->
        <link href="/css/bootstrap.min.css" rel="stylesheet">
        <link href="/css/normalize.css" rel="stylesheet">
        <link href="/css/jquery.gridster.min.css" rel="stylesheet">
        <link href="/css/dashboard.css" rel="stylesheet">

        <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
        <![endif]-->

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
        <script src="/js/jquery.gridster.min.js"></script>
        <script src="/js/bootstrap.min.js"></script>
        <script src="/js/dashboard.js"></script>
    </head>

    <body>

        <div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">Retrospective 2.0</a>
                </div>
                <div class="collapse navbar-collapse">
                    <ul class="nav navbar-nav">
                        <li class="active"><a href="/">Home</a></li>
                        <!-- <li><a href="#" class="add_widget" data-type="less">Less</a></li> -->
                    </ul>
                </div>
            </div>
        </div>

        <div class="container">
            <div class="gridster label add_widget" data-type="keep">Keep</div>
            <div class="gridster label add_widget" data-type="stop">Stop</div>
            <div class="gridster label add_widget" data-type="start">Start</div>
            <div class="gridster label add_widget" data-type="more">More</div>
            <div class="gridster label add_widget" data-type="less">Less</div>
        </div>
        <div class="container">
            <div class="gridster keep" data-type="keep"><ul></ul></div>
            <div class="gridster stop" data-type="stop"><ul></ul></div>
            <div class="gridster start" data-type="start"><ul></ul></div>
            <div class="gridster more" data-type="more"><ul></ul></div>
            <div class="gridster less" data-type="less"><ul></ul></div>
        </div>
    </body>
</html>
