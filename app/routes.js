module.exports = {
  bind : function (app) {

    app.get('/', function (req, res) {
      res.render('index');
    });

    // -------------------------------------------------------- //

    // Journey v9 routes

    // Carry through search terms into results pages
    app.get('/digital-register/journeys/v9/search-results', function(req, res) {
      res.render('digital-register/journeys/v9/search-results', {'terms' : req.query.s});
    });
    app.get('/digital-register/journeys/v9/search-results-2', function(req, res) {
      res.render('digital-register/journeys/v9/search-results-2', {'terms' : req.query.s});
    });

    // Handle submissions from title-summary - document selection
    app.post('/digital-register/journeys/v9/title-summary', function(req, res) {
      
      req.checkBody('documents', 'This is an error message').notEmpty();
      var errors = req.validationErrors();  
      
      if(!errors) {
        res.render('digital-register/journeys/v9/pre-sign-in');
      } else {
        res.render('digital-register/journeys/v9/title-summary', {
          errors: errors
        });
      }

    });

    // Make a decision based on submission from /pre-sign-in - "Do you have an account?"
    app.get('/digital-register/journeys/v9/check-sign-in', function(req, res) {
      var reg = req.query.registered;
      if (reg == 'yes') {
        res.render('digital-register/journeys/v9/sign-in');
      } else {
        res.render('digital-register/journeys/v9/create-account');
      }
    });

    // Accept a POST to stage 2 of account creation (so no password etc is in a query string)
    app.post('/digital-register/journeys/v9/create-account-2', function(req, res) {
      res.render('digital-register/journeys/v9/create-account-2');
    });

    // Accept a POST to account creation confirmation (so nothing in a query string)
    app.post('/digital-register/journeys/v9/account-created', function(req, res) {
      res.render('digital-register/journeys/v9/account-created');
    });

    // -------------------------------------------------------- //

    // /v8 routes

    // Carry through search terms into results pages
    app.get('/digital-register/journeys/v8/search-results', function(req, res) {
      res.render('digital-register/journeys/v8/search-results', {'terms' : req.query.s});
    });
    app.get('/digital-register/journeys/v8/search-results-2', function(req, res) {
      res.render('digital-register/journeys/v8/search-results-2', {'terms' : req.query.s});
    });

    // Handle submissions from title-summary - document selection
    app.post('/digital-register/journeys/v8/title-summary', function(req, res) {
      
      req.checkBody('documents', 'This is an error message').notEmpty();
      var errors = req.validationErrors();  
      
      if(!errors) {
        res.render('digital-register/journeys/v8/pre-sign-in');
      } else {
        res.render('digital-register/journeys/v8/title-summary', {
          errors: errors
        });
      }

    });

    // Make a decision based on submission from /pre-sign-in - "Do you have an account?"
    app.get('/digital-register/journeys/v8/check-sign-in', function(req, res) {
      var reg = req.query.registered;
      if (reg == 'yes') {
        res.render('digital-register/journeys/v8/sign-in');
      } else {
        res.render('digital-register/journeys/v8/create-account');
      }
    });

    // Accept a POST to stage 2 of account creation (so no password etc is in a query string)
    app.post('/digital-register/journeys/v8/create-account-2', function(req, res) {
      res.render('digital-register/journeys/v8/create-account-2');
    });

    // Accept a POST to account creation confirmation (so nothing in a query string)
    app.post('/digital-register/journeys/v8/account-created', function(req, res) {
      res.render('digital-register/journeys/v8/account-created');
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
