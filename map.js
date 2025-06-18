const map = L.map('map').setView([-5.356, 104.974], 10);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Layer Groups
const layers = {
    sekolah: L.layerGroup(),
    rumahSakit: L.layerGroup(),
    spbu: L.layerGroup(),
    terminal: L.layerGroup(),
    ibadah: L.layerGroup(),
    olahraga: L.layerGroup(),
    kantorPos: L.layerGroup(),
    admin: L.layerGroup()
};

// Icon Colors
const iconColors = {
    sekolah: '#f6e21d',
    rumahSakit: '#4caf50',
    spbu: '#c62828',
    terminal: '#0d47a1',
    ibadah: '#00bcd4',
    olahraga: '#9c27b0',
    kantorPos: '#f57c00'
};

// Fungsi buat marker bulatan
function createCircleMarker(feature, latlng, color) {
    return L.circleMarker(latlng, {
        radius: 6,
        fillColor: color,
        color: '#fff',
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    }).bindPopup(`<strong>${feature.properties.nama}</strong><br>${feature.properties.kategori}`);
}

// Fungsi load GeoJSON
function loadGeoJSON(url, layerGroup, colorKey) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            L.geoJSON(data, {
                pointToLayer: (feature, latlng) => createCircleMarker(feature, latlng, iconColors[colorKey])
            }).addTo(layerGroup);
        });
}

// Panggil semua layer fasilitas (ganti URL dengan path yang sesuai)
loadGeoJSON('geojson/sekolah.geojson', layers.sekolah, 'sekolah');
loadGeoJSON('geojson/rumahsakit.geojson', layers.rumahSakit, 'rumahSakit');
loadGeoJSON('geojson/spbu.geojson', layers.spbu, 'spbu');
loadGeoJSON('geojson/terminal.geojson', layers.terminal, 'terminal');
loadGeoJSON('geojson/ibadah.geojson', layers.ibadah, 'ibadah');
loadGeoJSON('geojson/olahraga.geojson', layers.olahraga, 'olahraga');
loadGeoJSON('geojson/kantorpos.geojson', layers.kantorPos, 'kantorPos');
loadGeoJSON('geojson/administrasi.geojson', layers.admin, 'admin');

// Tambahkan ke map defaultnya
layers.admin.addTo(map);
layers.kantorPos.addTo(map);

// Layer control
const overlayMaps = {
    "Sekolah": layers.sekolah,
    "Rumah Sakit": layers.rumahSakit,
    "SPBU": layers.spbu,
    "Terminal Bus": layers.terminal,
    "Sarana Ibadah": layers.ibadah,
    "Area Olahraga": layers.olahraga,
    "Kantor Pos": layers.kantorPos,
    "Administrasi Kabupaten": layers.admin
};

L.control.layers(null, overlayMaps, { collapsed: false }).addTo(map);
