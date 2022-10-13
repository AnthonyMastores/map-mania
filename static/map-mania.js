// Notes relating to differences from other tutorials:
// 1 - Renamed "Map, Map, Map" to "myMapID, gMap, map"
// 2 - Modified "bounds-changed" to "idle"


var gMap;
let favoritePlaces;
let currentPlace; 
let currentPlaceIndex = 9;
let lat1;
let lng1;
let score = 10;
const placeUrl = "https://map-mania-am.azurewebsites.net/places"
  async function start() {
    try {
        let response = await fetch (placeUrl)
        let data = await response.json()
        console.log("data")
        console.log(data)
        initApplication(data)
    }catch(e) {
        console.log("There was a problem fetching my favorite places")
    }
    
}
start();


function initApplication(dt) {
    favoritePlaces = dt
    currentPlace = favoritePlaces[currentPlaceIndex];
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