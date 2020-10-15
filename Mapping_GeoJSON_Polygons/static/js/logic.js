//Add console.log to check to see if our code is working.
console.log("working");

//poinToLayer
//L.geoJSON(sanFranAirport, {
    //turn each feature into a marker on the map
    //pointToLayer: function(feature, latlng) {
        //console.log(feature);
        //return L.marker(latlng)
        //.bindPopup("<h2>" + feature.properties.name + "</h2> <hr> <h3>"  + feature.properties.city + ", " + feature.properties.country + "</h3>" );
    //}
//}).addTo(map);


//onEachFeature
//Grab GeoJSON data
//L.geoJson(sanFranAirport, {
    //onEachFeature: function(feature, layer) {
        //console.log(layer);
        //this is broken, i'm not sure how to fix the text for the
       // layer.bindPopup(<h2>Airport Code: " + feature.properties.faa + "</h2>" <hr> <h3>Airport Name: " + feature.properties.name + "</h3>");
    //}
//}).addTo(map);

// We create the light layer that will be an option for our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data  © ; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

//Create a base layer that holds both maps.
let baseMaps = {
    "Streets" : streets,
    "Satellite Streets" : satelliteStreets
};

//create teh map object with center on Toronto, zoom level 11, and satellite streets default layer.
let map = L.map('mapid', {
    center: [43.7, -79.3],
    zoom: 11,
    layers: [satelliteStreets]
});

//pass map layers into layers control and add the layers control to the map
L.control.layers(baseMaps).addTo(map);

// Accessing the Toronto neighborhoods GeoJSON URL.
let torontoHoods = "https://raw.githubusercontent.com/leah-braswell/Mapping_Earthquakes/main/torontoNeighborhoods.json";

//Create a style for the lines
let myStyle = {
    color: "#0000FF",
    weight: 1,
    fillColor: "#FFFF00"
}

//Grab the GeoJSON data
d3.json(torontoHoods).then(function(data) {
    console.log(data);
    //create a GeoJSON layer with retrieved data
    L.geoJson(data, {
        style: myStyle,
        onEachFeature: function(feature, layer){
            layer.bindPopup("<h3> Neighborhood: " + feature.properties.AREA_NAME + "</h3>");
        }
    })
.addTo(map);
});

// Then we add our 'graymap' tile layer to the map.
//streets.addTo(map);