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
        <link href="/css/dashboard.css" rel="stylesheet">

        <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
        <![endif]-->

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
        <script type='text/javascript' src='https://cdn.firebase.com/js/client/1.0.6/firebase.js'></script>
        <script src="/js/jquery.cookie.js"></script>

        <script src="/js/bootstrap.min.js"></script>
        <script src="/js/dashboard.js"></script>
    </head>

    <body>

        <div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
            <div class="container">
                <div class="navbar-header">
                    <!-- <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button> -->
                    <a class="navbar-brand" href="#">Retrospective 2.0</a>
                </div>
                <!-- <div class="collapse navbar-collapse"> -->
                    <!-- <ul class="nav navbar-nav"> -->
                        <!-- <li class="active"><a href="/?<?= $_SERVER['QUERY_STRING']; ?>">Home</a></li> -->
                        <!-- <li><a href="/submit?<?= $_SERVER['QUERY_STRING']; ?>">Submit</a></li> -->
                    <!-- </ul> -->
                <!-- </div> -->
            </div>
        </div>

        <div class="container">
            <div class="retro_type keep" data-type="keep">
                <div class="add_widget" data-type="keep"><span class="glyphicon glyphicon-chevron-up"></span><span class="glyphicon glyphicon-pencil"></span>Keep</div>
                <div class="add_form">
                    <textarea class="form-control" rows="5"></textarea>
                    <button type="button" class="btn btn-default">Submit</button>
                </div>
                <ul></ul>
            </div>

            <div class="retro_type stop" data-type="stop">
                <div class="add_widget" data-type="stop"><span class="glyphicon glyphicon-chevron-up"></span><span class="glyphicon glyphicon-pencil"></span>Stop</div>
                <div class="add_form">
                    <textarea class="form-control" rows="5"></textarea>
                    <button type="button" class="btn btn-default">Submit</button>
                </div>
                <ul></ul>
            </div>

            <div class="retro_type start" data-type="start">
                <div class="add_widget" data-type="start"><span class="glyphicon glyphicon-chevron-up"></span><span class="glyphicon glyphicon-pencil"></span>Start</div>
                <div class="add_form">
                    <textarea class="form-control" rows="5"></textarea>
                    <button type="button" class="btn btn-default">Submit</button>
                </div>
                <ul></ul>
            </div>

            <div class="retro_type more" data-type="more">
                <div class="add_widget" data-type="more"><span class="glyphicon glyphicon-chevron-up"></span><span class="glyphicon glyphicon-pencil"></span>More</div>
                <div class="add_form">
                    <textarea class="form-control" rows="5"></textarea>
                    <button type="button" class="btn btn-default">Submit</button>
                </div>
                <ul></ul>
            </div>

            <div class="retro_type less" data-type="less">
                <div class="add_widget" data-type="less"><span class="glyphicon glyphicon-chevron-up"></span><span class="glyphicon glyphicon-pencil"></span>Less</div>
                <div class="add_form">
                    <textarea class="form-control" rows="5"></textarea>
                    <button type="button" class="btn btn-default">Submit</button>
                </div>
                <ul></ul>
            </div>
        </div>
    </body>
</html>
