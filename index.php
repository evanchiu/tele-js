<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="Evan Chiu">
    <link rel="shortcut icon" href="images/tele.png">
    <link rel="apple-touch-icon" href="images/tele.png">

    <title>Tele</title>

    <!-- Bootstrap core CSS -->
    <link href="css/bootstrap.css" rel="stylesheet">

    <!-- Custom styles -->
    <link href="css/tele.css" rel="stylesheet">
  </head>

  <body>
    <!-- Main jumbotron for a primary marketing message or call to action -->
    <div class="jumbotron">
      <div class="container">
        <h1>Tele</h1>
        <p>These television recordings are available</p>
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
        <p>&copy;2015 <a href = "http://evanchiu.com">Evan Chiu</a></p>
      </footer>
    </div> <!-- /container -->


    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="//code.jquery.com/jquery-2.1.1.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/tele.js"></script>
  </body>
</html>
