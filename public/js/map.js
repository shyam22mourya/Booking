
let maptoken = maptokens;
console.log(maptoken);
mapboxgl.accessToken = maptoken;
const map = new mapboxgl.Map({
  container: 'map', // container ID
  center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
  zoom: 9// starting zoom
});
// console.log(Coordinets)

// Create a default Marker and add it to the map.
const marker1 = new mapboxgl.Marker({ color: "red" })
  .setLngLat(listing.geometry.coordinates) // listing.geometry.cordinates 
  .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<h4>${listing.location} </h4><p> Exact Location After Booking </p> `))
  .addTo(map);