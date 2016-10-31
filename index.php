<!DOCTYPE html>
<?php include('config.php'); ?>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="Evan Chiu">
    <link rel="shortcut icon" href="images/tele.png">
    <link rel="apple-touch-icon" href="images/tele.png">

    <title><?php print $server_config['title']; ?></title>

    <link href="css/bootstrap.css" rel="stylesheet">
    <link href="css/tele.css" rel="stylesheet">
  </head>

  <body>
    <div class="jumbotron">
      <div class="container">
        <h1><?php print $server_config['title']; ?></h1>
        <p><?php print $server_config['tagline']; ?></p>
      </div>
    </div>

    <div class="container">
      <div id="loading"
        class="alert alert-info"
        role="alert"
        style="display:none">loading...</div>

      <div id="error"
        class="alert alert-danger"
        role="alert"
        style="display:none"></div>

      <div id="disk-usage-bar" class="progress" style="display:none"></div>

      <div id="show-container"></div>

      <hr />

      <footer>
        <p>&copy;2015 <a href = "http://evanchiu.com">Evan Chiu</a> | Fork me on <a href = "https://github.com/evanchiu/tele">Github</a></p>
      </footer>
    </div> <!-- /container -->

    <!-- JavaScript -->
    <script>
      var client_config = <?php print json_encode($client_config); ?>;
    </script>
    <script src="//code.jquery.com/jquery-2.1.1.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/tele.js"></script>
  </body>
</html>
