// Notes relating to differences from other tutorials:
// 1 - Renamed "Map, Map, Map" to "myMapID, gMap, map"
// 2 - Modified "bounds-changed" to "idle"

var gMap;

var favoritePlaces = [
    {content:'<strong>#1: New Buffalo, MI!<strong>', coordinates:{lat:41.79,lng:-86.74}, iconImagePath:"two.png"},
    {content:'Phoenix, AZ', coordinates:{lat:33.4484,lng:112.0740}, iconImagePath:"flag.png"},
    {content:'<strong>#3: Plainfield, IL... Home Sweet Home!<strong>', coordinates:{lat:41.615913,lng:-88.204071}, iconImagePath:"one.png"},
    {content:'Tamba Bay, FL', coordinates:{lat:27.964157,lng:-82.452606}, iconImagePath:"flag.png"},
    {content:'Rome, Italy', coordinates:{lat:41.9028,lng:12.4964}, iconImagePath:"flag.png"},
    {content:'Peloponnese, Greece', coordinates:{lat:37.5079,lng:22.3735}, iconImagePath:"flag.png"},
    {content:'Myrtle Beach, SC', coordinates:{lat:33.6891,lng:-78.8867}, iconImagePath:"flag.png"},
    {content:'Vilinus, Lithuania', coordinates:{lat:54.6872,lng:25.2797}, iconImagePath:"flag.png"},
    {content:'Moscow, Russia', coordinates:{lat:55.7558,lng:37.6173}, iconImagePath:"flag.png"},
    {content:'Kenosha, WI', coordinates:{lat:42.5847,lng:-87.8212}, iconImagePath:"flag.png"}
]; 
var currentPlaceIndex = 9;
var currentPlace = favoritePlaces[currentPlaceIndex];
var score = 10;

function initApplication() {
    console.log('Map Mania Lite - Starting!');
}

// initMap is a callback function that is initiated as part of the Google Maps API call at the bottom
// of the HTML file. 
function initMap() {
    // Create a new map and assign it to gMap
    gMap = new google.maps.Map(document.getElementById('myMapID'), {
        center: {lat: 41.878, lng: 10}, zoom: 3});
    var lat1 = currentPlace["coordinates"].lat
    var lng1 = currentPlace["coordinates"].lng
    // Add a marker for Canoe Bay, WI    
    var marker = new google.maps.Marker({position:{lat:lat1,lng:lng1}, map:gMap});

    // Add a second marking with a custom icon, an Info window, and a listener.
    var marker2 = new google.maps.Marker({position:{lat:42.5847,lng:-87.8212}, map:gMap});
    marker2.setIcon('https://maps.google.com/mapfiles/kml/shapes/info-i_maps.png');

    var infoWindow = new google.maps.InfoWindow({content:currentPlace["content"]});
    marker2.addListener('click', function() {
        infoWindow.open(gMap, marker2);
    });

    // Note that several message boards suggested using 'idle' instead of 'bounds_changed' because 
    // 'bounds_changed' gets called over and over when the user drags the map.
    google.maps.event.addListener(gMap, 'idle', function() {
        updateGame()
    });
    
    SetHint("Hint 1");
    SetScore(score);
}

function updateGame() {
    console.log('function UpdateGame() google-maps-step-03!');
    var zoomLevel = gMap.getZoom()
    var inBounds = false;
    console.log(currentPlace)
    var loc1 = new google.maps.LatLng(currentPlace["coordinates"].lat,currentPlace["coordinates"].lng)

    if (gMap.getBounds().contains(loc1)) {
        inBounds = true;
        if (zoomLevel == 13){
            locationFound();
        }
    }
   
    console.log("inBounds:"+inBounds+" zoomLevel:"+zoomLevel);
    console.log("Loc 1:" + loc1)
}

function SetHint(hint) {
    document.getElementById("hint-id").value = hint;  
}

function SetScore() {
    document.getElementById("score-id").value = score; 
}

function locationFound() {
    console.log("Congrats you found my nth favortie location")
    if (currentPlaceIndex == 0){
        gameOver();
    }
    currentPlaceIndex --
    currentPlace = favoritePlaces[currentPlaceIndex]
    //show alert congrats 
    //press button to go reset map and go find next location or just sleep few secs
    //initMap()
}
function gameOver(){

}
