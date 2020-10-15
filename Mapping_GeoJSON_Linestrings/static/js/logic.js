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
let dayNav = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-preview-day-v4/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data  © ; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let nightNav = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-preview-night-v4/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

//Create a base layer that holds both maps.
let baseMaps = {
    Light: dayNav,
    Dark: nightNav
};

//create teh map object with center on Toronto, zoom level 2, and light default layer.
let map = L.map('mapid', {
    center: [44.0, -80.0],
    zoom: 2,
    layers: [nightNav]
});

//pass map layers into layers control and add the layers control to the map
L.control.layers(baseMaps).addTo(map);

// Accessing the Toronto airline routes GeoJSON URL.
let torontoData = "https://raw.githubusercontent.com/leah-braswell/Mapping_Earthquakes/main/torontoRoutes.json";


//Create a style for the lines
let myStyle = {
    color: "#ffffa1",
    weight: 2
}

//Grab the GeoJSON data
d3.json(torontoData).then(function(data) {
    console.log(data);
    //create a GeoJSON layer with retrieved data
    L.geoJson(data, {
        style: myStyle,
        onEachFeature: function(feature, layer){
            layer.bindPopup("<h3> Airline: " + feature.properties.airline + "</h3> <hr> <h3> Destination: " +feature.properties.dst + "</h3>");
        }
    })
.addTo(map);
});

// Then we add our 'graymap' tile layer to the map.
//streets.addTo(map);