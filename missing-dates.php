<!DOCTYPE html>
<html>
<head>
  <title>Datepicker</title>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
  <link href="css/normalize.css" rel="stylesheet" type="text/css"/>
  <link href="css/datepicker.css" rel="stylesheet" type="text/css"/>
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
  <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>
  <link rel="stylesheet" type="text/css" href="//cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.css"/>
  <script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js" integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU=" crossorigin="anonymous"></script>
  <script type="text/javascript" src="js/javascript.js"></script>
  <script type="text/javascript" src="js/datepicker-he.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
  <script type="text/javascript" src="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
</head>
<body data-page-id="missing-dates">
<div class="page-title">
  <h1>תאריכים חסרים</h1>
</div>
<div class="generate-missing">
  <div class="select-dates">
    <div class="start-date-container">
      <label for="start">תאריך התחלה:</label>
      <input type="date" id="start" name="trip-start"
             value=""
             min="2012-01-01" max="2020-12-31">
    </div>

    <div class="end-date-container">
      <label for="end">תאריך סיום:</label>
      <input type="date" id="end" name="trip-start"
             value=""
             min="2012-01-01" max="2020-12-31">
    </div>
  </div>
  <button class="btn btn-light" id="generate-missing-btn">הצג</button>

</div>
<div class="missing-dates-container">
  <ul>

  </ul>
</div>

<div class="page-bottom-title">
  <h3>מאת שחר טנג'י</h3>
</div>
</body>
</html>