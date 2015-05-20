module.exports = {
  bind : function (app) {

    app.get('/', function (req, res) {
      res.render('index');
    });

    // -------------------------------------------------------- //

    // /v8/ routes

    // Carry through search terms into results page
    app.get('/digital-register/journeys/v8/search-results', function(req, res) {
      res.render('digital-register/journeys/v8/search-results', {'terms' : req.query.s});
    });

    // -------------------------------------------------------- //

    // /v7/ routes

    // Prepopulate email field in Create account screen (v7)
    app.get('/digital-register/journeys/v7/create-account', function(req, res) {
      res.render('digital-register/journeys/v7/create-account', {'email' : req.query.email});
    });
    // Prepopulate fields in purchase screen (v7)
    app.get('/digital-register/journeys/v7/purchase-documents', function(req, res) {
      res.render('digital-register/journeys/v7/purchase-documents', {
        'name' : req.query.name,
        'address' : req.query.address,
        'email' : req.query.email
      });
    });
    // Prepopulate email field in Create account screen (v7-1)
    app.get('/digital-register/journeys/v7-1/create-account', function(req, res) {
      res.render('digital-register/journeys/v7-1/create-account', {'email' : req.query.email});
    });
    // Prepopulate fields in purchase screen (v7-1)
    app.get('/digital-register/journeys/v7-1/purchase-documents', function(req, res) {
      res.render('digital-register/journeys/v7-1/purchase-documents', {
        'name' : req.query.name,
        'address' : req.query.address,
        'email' : req.query.email
      });
    });

    // -------------------------------------------------------- //

    // demo URL - essentially describing what the URL structure could be
    app.get('/property/PL20_7HE/25_UNDERWAYS_YELVERTON', function (req, res) {
      res.render('property-page/demo/index');
    });

  }
};
