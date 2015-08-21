window.onload = function() {

  // Remove default 'no javascript' message
  document.getElementById('map').innerHTML = '';

  // Check that cooridinate data is present
  if (indexData &&
      (
        (indexData.geometry && indexData.geometry.coordinates && indexData.geometry.coordinates.length > 0) ||
        (indexData.features && indexData.features[0].geometry && indexData.features[0].geometry.coordinates && indexData.features[0].geometry.coordinates.length > 0)
      )
  ) {
    document.getElementById('map').style.height = '420px';

    // Define coordinate system using PROJ4 standards
    projection_name = 'EPSG:27700'
    // from: http://epsg.io/27700-5622 - TODO: research which transformation we should use
    projection_def = '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +towgs84=370.396,-108.938,435.682,0,0,0,0 +units=m +no_defs'

    new L.Proj.CRS(projection_name, projection_def,
      {
        resolutions: [2500, 1000, 500, 200, 100, 50, 25, 10, 5, 2.5, 1],
        bounds: L.bounds([1300000,0],[700000,0])
      }
    );

    // set up control and options
    options = {
      continuousWorld: true,
      worldCopyJump: false,
      minZoom: 15,
      maxZoom: 19,
      // controls
      dragging: false,
      touchZoom: false,
      doubleClickZoom: false,
      scrollWheelZoom: false,
      boxZoom: false,
      keyboard: false,
      tap: false,
      zoomControl: true,
      attributionControl: false
    };

    // set up the map
    var map = new L.Map('map', options);

    // create the tile layer with correct attribution
    var osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osm = new L.TileLayer(osmUrl);
    map.addLayer(osm);

    //Add a scale control to the map
    L.control.scale().addTo(map);

    //Index stlye
    var indexStyle = {
      fillcolor: 'blue',
      fillOpacity: 0.5,
      opacity: 0
    };

    //Create the index layer
    var indexGeoJson = L.Proj.geoJson(indexData, {
      style: indexStyle
    });

    indexGeoJson.addTo(map);

    //Center map view on geojson polygon
    var bounds = indexGeoJson.getBounds();

    map.fitBounds(bounds, {maxZoom: 18, animate: false});
  } else {
    document.getElementById('map').innerHTML = '<div class="panel-simple">No map information available</div>';
  }
};
