module.exports = {
  bind : function (app) {

    app.get('/', function (req, res) {
      res.render('index');
    });

    // demo URL - essentially describing what the URL structure could be
    app.get('/property/PL20_7HE/25_UNDERWAYS_YELVERTON', function (req, res) {
      res.render('property-page/demo/index');
    });

    // Prepopulate email field in Create account screen (v7)
    app.get('/digital-register/journeys/v7/create-account', function(req, res) {
      res.render('digital-register/journeys/v7/create-account', {'email' : req.query.email});
    });

  }
};
