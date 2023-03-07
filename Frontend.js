$(document).ready(function() {
    // Initialize the Leaflet.js map
    var map = L.map('map').setView([0, 0], 2);
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18
    }).addTo(map);
  
    // Connect to the WebSocket endpoint
    var socket = new WebSocket('ws://localhost:5000/data');
  
    // Handle incoming WebSocket messages
    socket.onmessage = function(event) {
      var data = JSON.parse(event.data);
  
      // Update the map with the new data
      var marker = L.marker([data.latitude, data.longitude]).addTo(map);
      marker.bindPopup(data.name);
    }
  });
  
  