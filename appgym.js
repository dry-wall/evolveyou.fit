const registrationForm = document.getElementById('registration-form');
const mapElement = document.getElementById('map');
let map, service;

// Initialize the Google Map
function initMap(lat, lng) {
    const location = { lat: lat, lng: lng };
    map = new google.maps.Map(mapElement, {
        center: location,
        zoom: 15
    });

    // Request gyms nearby
    const request = {
        location: location,
        radius: '5000',  // Radius in meters
        type: ['gym']
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            results.forEach(place => {
                addMarker(place);
            });
        }
    });
}

// Add markers for gyms on the map
function addMarker(place) {
    const marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    const infowindow = new google.maps.InfoWindow({
        content: `<strong>${place.name}</strong><br>${place.vicinity}`
    });

    marker.addListener('click', () => {
        infowindow.open(map, marker);
    });
}

// Geocode pincode and initialize the map
function geocodePincode(pincode) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': pincode }, (results, status) => {
        if (status === 'OK') {
            const location = results[0].geometry.location;
            initMap(location.lat(), location.lng());
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

// Handle form submission
registrationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const pincode = document.getElementById('pincode').value;
    
    if (pincode) {
        geocodePincode(pincode);  // Convert pincode to coordinates and show gyms
    }
});
