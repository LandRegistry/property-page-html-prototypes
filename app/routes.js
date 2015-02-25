module.exports = {
  bind : function (app) {

    app.get('/', function (req, res) {
      res.render('index');
    });

    app.get('/properties/PL20_7HE/25_UNDERWAYS_YELVERTON', function (req, res) {
      res.render('property-page/demo/index');
    });

  }
};
