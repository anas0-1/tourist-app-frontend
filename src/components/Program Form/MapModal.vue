<template>
    <div class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-lg w-11/12 md:w-8/12 lg:w-6/12">
        <div class="p-6">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">Select a Location</h2>
          <div class="mb-4">
            <input
              v-model="searchQuery"
              @input="searchLocation"
              type="text"
              placeholder="Search for a place"
              class="w-full border-gray-300 p-3 rounded-md focus:ring focus:ring-blue-300"
            />
          </div>
          <div id="map" class="h-96 rounded-md mb-4"></div>
          <button
            @click="confirmSelection"
            class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Confirm Location
          </button>
          <button
            @click="$emit('close')"
            class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 ml-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import L from 'leaflet';
  import 'leaflet/dist/leaflet.css';
  
  export default {
    data() {
      return {
        map: null,
        marker: null,
        selectedLocation: null,
        searchQuery: '',
        searchResults: [],
      };
    },
    mounted() {
      this.initializeMap();
    },
    methods: {
      initializeMap() {
        this.map = L.map('map').setView([51.505, -0.09], 13); // Default center
  
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);
  
        this.marker = L.marker([51.505, -0.09], { draggable: true }).addTo(this.map);
  
        this.map.on('click', (e) => {
          this.handleMapClick(e.latlng);
        });
      },
      handleMapClick(latlng) {
        if (this.marker) {
          this.marker.setLatLng(latlng);
        } else {
          this.marker = L.marker(latlng, { draggable: true }).addTo(this.map);
        }
        this.selectedLocation = {
          lat: latlng.lat,
          lng: latlng.lng,
        };
  
        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latlng.lat}&lon=${latlng.lng}&format=json`)
          .then(response => response.json())
          .then(data => {
            this.selectedLocation.name = data.display_name;
          });
      },
      searchLocation() {
        if (this.searchQuery.length < 3) return;
  
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${this.searchQuery}`)
          .then(response => response.json())
          .then(data => {
            this.searchResults = data;
            this.map.clearLayers();
            this.searchResults.forEach(result => {
              L.marker([result.lat, result.lon])
                .addTo(this.map)
                .on('click', () => this.handleMapClick(L.latLng(result.lat, result.lon)));
            });
          });
      },
      confirmSelection() {
        if (this.selectedLocation) {
          this.$emit('select-location', this.selectedLocation);
          this.selectedLocation = null;
        }
      },
    },
  };
  </script>
  
  <style>
  /* Add custom styles if necessary */
  </style>
  