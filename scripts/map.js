(function() {

mapboxgl.accessToken = 'pk.eyJ1IjoiaXJzYS1hIiwiYSI6ImNsYWhxaG85bTFxd2QzeXMzZmE1eXJqdGYifQ.Nfa5rrFOUp9Zy86Ec1cLEA';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [-73.9897, 40.7411], // Flatiron district = starting position [lng, lat]
    zoom: 12, // starting zoom
    projection: 'albers', // display the map as a 3D globe
    attributionControl: false
});
map.addControl(new mapboxgl.AttributionControl(), 'bottom-right')

map.on('style.load', () => {
    map.setFog({}); // Set the default atmosphere style
});


d3.json("map_data.json").then((data) => {
    data = JSON.parse(data)
    // console.log(data)

    var currentMarkers=[];
    for (var l of data) {
        let marker = new mapboxgl.Marker({
        color: l.Color
        }).setLngLat([l.Longitude, l.Latitude])
            .setPopup(new mapboxgl.Popup().setHTML(`<strong>${l.Name}</strong><br>Price: ${l.Price || "Unknown"}<br>Rating: ${l.Rating}`))
            .addTo(map);
        currentMarkers.push(marker); 
} 


d3.select("select")
    .on("change", function (e, d) {
        let newData = data.filter(d => d.Category === e.target.value);
        if (currentMarkers!==null) {
            for (var i = currentMarkers.length - 1; i >= 0; i--) {
            currentMarkers[i].remove();
            }
        }
        for (var l of newData) {
            let marker = new mapboxgl.Marker({
            color: l.Color
            }).setLngLat([l.Longitude, l.Latitude])
                .setPopup(new mapboxgl.Popup().setHTML(`<strong>${l.Name}</strong><br>Price: ${l.Price || "Unknown"}<br>Rating: ${l.Rating}`))
                .addTo(map);
            currentMarkers.push(marker);
        }
    })})
})();