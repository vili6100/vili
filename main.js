/*---------------------------
                            LOCATION GOOGLE MAP
---------------------------*/
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var bounds = new google.maps.LatLngBounds();
var map;



var places = [
    {lat: 50.60478849508268, lng: 26.261422634124756},
]

var stadion = [
  {lat: 50.606441193054614, lng: 26.2602961063385},
  {lat: 50.606499069413225, lng: 26.26007616519928},
  {lat: 50.60659439502515, lng: 26.259899139404297},
  {lat: 50.60681228141293, lng: 26.25984013080597},
  {lat: 50.60759530229052, lng: 26.259942054748535},
  {lat: 50.60778594887941, lng: 26.260140538215637},
  {lat: 50.60786084554226, lng: 26.2603497505188},
  {lat: 50.60783020601278, lng: 26.26057505607605},
  {lat: 50.60776211809803, lng: 26.2608003616333},
  {lat: 50.60763955960321, lng: 26.260923743247986},
  {lat: 50.607356992968086, lng: 26.260907649993896},
  {lat: 50.60666588910734, lng: 26.26082181930542},
  {lat: 50.606536518783784, lng: 26.260714530944824},
  {lat: 50.60645140653483, lng: 26.26053750514984},
];

var route = [
  {lat: 50.605726882282134, lng: 26.261626482009888},
  {lat: 50.605937963627234, lng: 26.25779628753662},
  {lat: 50.60849129198713, lng: 26.258139610290527},
  {lat: 50.609703223354096, lng: 26.257957220077515},
  {lat: 50.61101724849331, lng: 26.257892847061157},
  {lat: 50.61283503623565, lng: 26.25710964202881},
  {lat: 50.61344094987413, lng: 26.25679850578308},
  {lat: 50.615326721028765, lng: 26.255425214767456},
  {lat: 50.615626258947295, lng: 26.254910230636597},
  {lat: 50.6161912911917, lng: 26.253633499145508},
  {lat: 50.61660655152596, lng: 26.253021955490112},
  {lat: 50.617185186861775, lng: 26.252388954162598},
  {lat: 50.61727368340318, lng: 26.25234603881836},
  {lat: 50.61770254889893, lng: 26.252152919769287},
  {lat: 50.619118458005474, lng: 26.252152919769287},
  {lat: 50.618240327089566, lng: 26.258643865585327},
];

function calcRoute(start, end) {
  var start = new google.maps.LatLng(start.lat, start.lng);
  var end = new google.maps.LatLng(end.lat, end.lng);
  var request = {
    origin:start,
    destination:end,
    travelMode: google.maps.TravelMode.WALKING
  };
  directionsService.route(request, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(result);
    }
  });
}


function calcRouteMod() {
  var s = $('#start option:selected');
  var e = $('#end option:selected');
  var start = new google.maps.LatLng(s.data('lat'), s.data('lng'));
  var end = new google.maps.LatLng(e.data('lat'), e.data('lng'));
  console.log(start);
  var request = {
    origin:start,
    destination:end,
    travelMode: google.maps.TravelMode.WALKING
  };
  directionsService.route(request, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(result);
    }
  });
}


function map_initialize() {
    directionsDisplay = new google.maps.DirectionsRenderer();
    var lat = 50.60478849508268;
    var long = 26.261422634124756;

    var mapCenterCoord = new google.maps.LatLng(lat, long);

    var mapOptions = {
        center: mapCenterCoord,
        zoom: 15,
        //draggable: false,
        disableDefaultUI: false,
        scrollwheel: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    };


    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    directionsDisplay.setMap(map);

    // Adds markers
    for( i = 0; i < places.length; i++ ) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng( places[i].lat, places[i].lng ), 
            map: map
        })
        bounds.extend(marker.position);
    }
    /*map.fitBounds(bounds);*/
  
    // Construct the polygon.
    var s = new google.maps.Polygon({
        paths: stadion,
        strokeColor: '#95C83D',
        strokeWeight: 3,
        fillOpacity: 0.3
    });
    s.setMap(map);

    // Construct the polyline.
    var r = new google.maps.Polyline({
        path: route,
        geodesic: true,
        strokeColor: '#473AF7',
        strokeOpacity: 1.0,
        strokeWeight: 5
    });
    r.setMap(map);

    /*calcRoute({lat: 50.60479338921412, lng: 26.261417269706726}, {lat: 50.60937917945394, lng: 26.25933051109314});*/

    map.addListener('click', function(e) {
        console.log('{lat: '+e.latLng.lat()+', lng: '+e.latLng.lng()+'},');
    });
}

if ( $('#map').length > 0) {
    map_initialize();   
}