module.exports = {
  bind : function (app) {

    app.get('/', function (req, res) {
      res.render('index');
    });

    // -------------------------------------------------------- //

    // Journey v9 routes and variables

    var v9 = {

      /*buyingSummary: false,
      signedIn: false,
      type: '',*/

      fh: {
        tenure: 'freehold',
        number: '14',
        title: 'HP725747'
      },
      lh: {
        tenure: 'leasehold',
        number: '14a',
        title: 'HP725748'
      }

    };

    app.get('/digital-register/journeys/v9/*', function(req, res, next) {
      
      var n = req.session.views || 0;
      req.session.views = ++n;

      console.log('views: ' + req.session.views);
      console.log('signedIn: ' + req.session.signedIn);
      console.log('tenureType: ' + req.session.type);
      console.log('buyingSummary: ' + req.session.buyingSummary);
      console.log('\n');

      next();
    });



    // ---------- 0. Reset page. Reset the prototype

    app.get('/digital-register/journeys/v9/reset', function(req, res) {
      // destroy the session:
      req.session = null;
      res.render('digital-register/journeys/v9/reset');
    });


    // ---------- 1. Search page


    // ---------- 2. Results page(s)

    // Carry through search terms into results pages
    app.get('/digital-register/journeys/v9/search-results', function(req, res) {
      // reset type
      req.session.type = null;
      res.render('digital-register/journeys/v9/search-results', {'terms' : req.query.s});
    });
    app.get('/digital-register/journeys/v9/search-results-2', function(req, res) {
      res.render('digital-register/journeys/v9/search-results-2', {'terms' : req.query.s});
    });

    // ---------- 3. Access fork (summary or documents?)

    // Handle entry to access-fork
    app.get('/digital-register/journeys/v9/access-fork', function(req, res) {
      var tenureType = req.query.type;
      req.session.type = tenureType;
      res.render('digital-register/journeys/v9/access-fork', {
        'tenure': v9[tenureType].tenure,
        'number': v9[tenureType].number,
        'title': v9[tenureType].title,
      });
    });

    // Handle submissions from access-fork - access selection
    app.post('/digital-register/journeys/v9/access-fork', function(req, res) {
      
      req.checkBody('accessType', 'This is an error message').notEmpty();
      var errors = req.validationErrors();

      if(!errors) {
        if (req.body.accessType == 'summary') {
          req.session.buyingSummary = true;
          if (req.session.signedIn == true) {
            res.redirect('digital-register/journeys/v9/payment');
          } else {
            res.redirect('digital-register/journeys/v9/pre-sign-in');
          }
        } else {
          req.session.buyingSummary = false;
          res.redirect('digital-register/journeys/v9/select-documents');
        }
      } else {
        res.render('digital-register/journeys/v9/access-fork', {
          errors: errors,
          'tenure': v9[req.session.type].tenure,
          'number': v9[req.session.type].number,
          'title': v9[req.session.type].title
        });
      }

    });

    // ---------- Path B. Document selection

    // Handle visits to Select Documents from a summary page
    app.get('/digital-register/journeys/v9/select-documents', function(req, res) {
      if (req.query.refer == 'registerView') {
        req.session.buyingSummary = false;
      }
      res.render('digital-register/journeys/v9/select-documents', {
        'tenure': v9[req.session.type].tenure,
        'number': v9[req.session.type].number,
        'title': v9[req.session.type].title,
      });
    });

    // Handle submissions from document selection page
    app.post('/digital-register/journeys/v9/select-documents', function(req, res) {
      
      req.checkBody('documents', 'This is an error message').notEmpty();
      var errors = req.validationErrors();

      if(!errors) {
        if (req.session.signedIn == true) {
          res.redirect('digital-register/journeys/v9/payment');
        } else {
          res.redirect('digital-register/journeys/v9/pre-sign-in');
        }
      } else {
        res.render('digital-register/journeys/v9/select-documents', {
          errors: errors,
          'tenure': v9[req.session.type].tenure,
          'number': v9[req.session.type].number,
          'title': v9[req.session.type].title
        });
      }

    });

    // "Do you have an account?"
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


    // ---------- ALL PATHS. Payment page

    // Payment page display
    app.get('/digital-register/journeys/v9/payment', function(req, res) {
      // to get to payment you MUST have an account and be signed in, so
      req.session.signedIn = true;
      res.render('digital-register/journeys/v9/payment', {
        'buyingSummary': req.session.buyingSummary,
        'tenure': v9[req.session.type].tenure,
        'number': v9[req.session.type].number,
        'title': v9[req.session.type].title
      });
    });

    // ---------- ALL PATHS. View router

    // View router after payment - summary or download?
    app.get('/digital-register/journeys/v9/view-router', function(req, res) {
      if (req.session.buyingSummary == true) {
        if (req.session.type == 'fh') {
          res.redirect('digital-register/journeys/v9/register-view-fh');
        } else {
          res.redirect('digital-register/journeys/v9/register-view-lh');
        }
      } else {
        res.render('digital-register/journeys/v9/download-documents', {
          'tenure': v9[req.session.type].tenure,
          'number': v9[req.session.type].number,
          'title': v9[req.session.type].title
        });
      }
    });


    // -------------------------------------------------------- //
    // -------------------------------------------------------- //
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
