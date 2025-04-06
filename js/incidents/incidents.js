var highlightLayer;
function highlightFeature(e) {
    highlightLayer = e.target;

    if (e.target.feature.geometry.type === 'LineString' || e.target.feature.geometry.type === 'MultiLineString') {
        highlightLayer.setStyle({
        color: '#ffff00',
        });
    } else {
        highlightLayer.setStyle({
        fillColor: '#ffff00',
        fillOpacity: 1
        });
    }
}

// Load Leaflet map
var map = L.map('map', {
    zoomControl: false,
    maxZoom: 24,
    minZoom: 13,
    scrollWheelZoom: true,
    wheelDebounceTime: 150,     // Increased debounce time
    wheelPxPerZoomLevel: 120,   // Increased pixels per zoom level
    zoomSnap: 0.5,
    zoomDelta: 0.5,
    preferCanvas: true,         // Use Canvas renderer for better performance
    updateWhenZooming: false,   // Delay update until zoom ends
    updateWhenIdle: true,       // Only update when map is idle
});

// ✅ Reduce zooming sensitivity
// map.options.zoomSnap = 0.5;  // Make zoom steps smaller
// map.options.zoomDelta = 0.5; // Reduce zoom step sensitivity

// Check if there's a stored view (center & zoom)
var storedView = localStorage.getItem('mapView');

if (storedView) {
    var view = JSON.parse(storedView);
    map.setView(view.center, view.zoom);
} else {
    // Fit to Padre Garcia boundary if no saved view
    map.fitBounds([[13.88005510304514,121.2057414823282], [13.885586665519138,121.21539261014819]]);
}

// Save current view when moving
map.on('moveend', function () {
    var center = map.getCenter();
    var zoom = map.getZoom();
    localStorage.setItem('mapView', JSON.stringify({ center, zoom }));
});

var userLayer = L.layerGroup().addTo(map); // Layer for user-added markers
// var selectedLatLng = null; // Store clicked location

var hash = new L.Hash(map);
var lastClickedBarangay = null; // ✅ Store the last barangay clicked

map.attributionControl.setPrefix('<a href="https://github.com/tomchadwin/qgis2web" target="_blank">qgis2web</a> &middot; <a href="https://leafletjs.com" title="A JS library for interactive maps">Leaflet</a> &middot; <a href="https://qgis.org">QGIS</a>');
var autolinker = new Autolinker({truncate: {length: 30, location: 'smart'}});

// remove popup's row if "visible-with-data"
function removeEmptyRowsFromPopupContent(content, feature) {
    var tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    var rows = tempDiv.querySelectorAll('tr');
    for (var i = 0; i < rows.length; i++) {
        var td = rows[i].querySelector('td.visible-with-data');
        var key = td ? td.id : '';
        if (td && td.classList.contains('visible-with-data') && feature.properties[key] == null) {
            rows[i].parentNode.removeChild(rows[i]);
        }
    }
    return tempDiv.innerHTML;
}

// add class to format popup if it contains media
function addClassToPopupIfMedia(content, popup) {
    var tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    if (tempDiv.querySelector('td img')) {
        popup._contentNode.classList.add('media');
            // Delay to force the redraw
            setTimeout(function() {
                popup.update();
            }, 10);
    } else {
        popup._contentNode.classList.remove('media');
    }
}
var zoomControl = L.control.zoom({
    position: 'topleft'
}).addTo(map);
L.control.locate({locateOptions: {maxZoom: 19}}).addTo(map);
var measureControl = new L.Control.Measure({
    position: 'topleft',
    primaryLengthUnit: 'feet',
    secondaryLengthUnit: 'miles',
    primaryAreaUnit: 'sqfeet',
    secondaryAreaUnit: 'sqmiles'
});
measureControl.addTo(map);
document.getElementsByClassName('leaflet-control-measure-toggle')[0].innerHTML = '';
document.getElementsByClassName('leaflet-control-measure-toggle')[0].className += ' fas fa-ruler';
var bounds_group = new L.featureGroup([]);
function setBounds() {
}
map.createPane('pane_OpenStreetMap_0');
map.getPane('pane_OpenStreetMap_0').style.zIndex = 400;

var layer_OpenStreetMap_0 = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    pane: 'pane_OpenStreetMap_0',
    opacity: 1.0,
    attribution: '',
    minZoom: 13,
    maxZoom: 24,
    maxNativeZoom: 19,              // Limit max native zoom
    updateWhenIdle: true,           // Only update when map is idle
    updateWhenZooming: false,       // Don't update while zooming
    keepBuffer: 2,                  // Keep more tiles in buffer
    reuseTiles: true,               // Reuse tile objects
});
layer_OpenStreetMap_0;
map.addLayer(layer_OpenStreetMap_0);

function pop_PG_Brgy_Boundary_Cadastral_edited_1(feature, layer) {
    layer.on({
        mouseout: function(e) {
            for (var i in e.target._eventParents) {
                if (typeof e.target._eventParents[i].resetStyle === 'function') {
                    e.target._eventParents[i].resetStyle(e.target);
                }
            }
        },
        mouseover: highlightFeature,
    });
    var popupContent = '<table>\
            <tr>\
                <td colspan="2">' + (feature.properties['Barangay'] !== null ? autolinker.link(String(feature.properties['Barangay']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['Area_ha'] !== null ? autolinker.link(String(feature.properties['Area_ha']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
        </table>';
    var content = removeEmptyRowsFromPopupContent(popupContent, feature);
    layer.on('popupopen', function(e) {
        addClassToPopupIfMedia(content, e.popup);
    });
    layer.bindPopup(content, { maxHeight: 400 });
}

function style_PG_Brgy_Boundary_Cadastral_edited_1_0() {
    return {
        pane: 'pane_PG_Brgy_Boundary_Cadastral_edited_1',
        opacity: 1,
        color: 'rgba(48,18,59,1.0)',
        dashArray: '',
        lineCap: 'square',
        lineJoin: 'bevel',
        weight: 2.0,
        fillOpacity: 0,
        interactive: true,
    }
}

map.createPane('pane_PG_Brgy_Boundary_Cadastral_edited_1');
map.getPane('pane_PG_Brgy_Boundary_Cadastral_edited_1').style.zIndex = 401;
map.getPane('pane_PG_Brgy_Boundary_Cadastral_edited_1').style['mix-blend-mode'] = 'normal';

function zoomToBarangay(e, feature) {
    var barangayName = feature.properties.Barangay || "Unknown Barangay";

    // ✅ Prevent re-zooming if clicking the same barangay
    if (lastClickedBarangay === barangayName) {
        console.log("Already zoomed to this barangay, ignoring.");
        return;
    }

    lastClickedBarangay = barangayName; // ✅ Update the last clicked barangay

    var layer = e.target;
    var bounds = layer.getBounds();

    // Calculate center point of the barangay
    var center = bounds.getCenter();

    layer.setStyle({
        color: "blue",
        weight: 2,
        fillColor: "rgba(0, 0, 255, 0.4)",
        fillOpacity: 0.5
    });

    // ✅ Zoom smoothly to the barangay
    map.flyToBounds(bounds, {
        padding: [50, 50],
        maxZoom: 18,
        duration: 0.8
    });

    // ✅ Show the popup with barangay name
    layer.bindPopup(`<b>Barangay:</b> ${barangayName}`).openPopup();
}

var layer_PG_Brgy_Boundary_Cadastral_edited_1 = new L.geoJson(json_PG_Brgy_Boundary_Cadastral_edited_1, {
    attribution: '',
    interactive: true,
    dataVar: 'json_PG_Brgy_Boundary_Cadastral_edited_1',
    layerName: 'layer_PG_Brgy_Boundary_Cadastral_edited_1',
    pane: 'pane_PG_Brgy_Boundary_Cadastral_edited_1',
    onEachFeature: pop_PG_Brgy_Boundary_Cadastral_edited_1,
    style: style_PG_Brgy_Boundary_Cadastral_edited_1_0,
    renderer: L.canvas(),      // Use canvas renderer
    maxZoom: 24,
    tolerance: 3,             // Simplify geometries when zooming out
    onEachFeature: function (feature, layer) {
        layer.on({
            mouseover: function (e) {
                e.target.setStyle({ fillColor: 'rgba(0, 0, 255, 0.4)', fillOpacity: 0.5 });
            },
            mouseout: function (e) {
                layer.setStyle(style_PG_Brgy_Boundary_Cadastral_edited_1_0()); // Reset style on mouseout
            },
            click: function (e) {
                zoomToBarangay(e, feature); // ✅ Adjusts zoom & centers camera

                // ✅ Get clicked location (latitude & longitude)
                var lat = e.latlng.lat;
                var lng = e.latlng.lng;

                // ✅ Generate Google Street View URL
                var streetViewUrl = `https://www.google.com/maps?q=&layer=c&cbll=${lat},${lng}`;

                // ✅ Show a popup with a Street View link
                layer.bindPopup(`
                    <b>Barangay:</b> ${feature.properties.Barangay || "Unknown Barangay"}<br>
                    <a href="${streetViewUrl}" target="_blank">📍 View in Google Street View</a>
                `).openPopup();
            }
        });

        // ✅ Optional: Show barangay name in a popup
        // var barangayName = feature.properties.Barangay || "Unknown Barangay";
        // layer.bindPopup(`<b>Barangay:</b> ${barangayName}`);
    }
});
bounds_group.addLayer(layer_PG_Brgy_Boundary_Cadastral_edited_1);
map.addLayer(layer_PG_Brgy_Boundary_Cadastral_edited_1);
layer_PG_Brgy_Boundary_Cadastral_edited_1.on("click", function (e) {
    selectedLatLng = e.latlng; // Store clicked location
    document.getElementById("location").value = `Lat: ${e.latlng.lat.toFixed(6)}, Lng: ${e.latlng.lng.toFixed(6)}`;
});

function pop_Buildings_2(feature, layer) {
    layer.on({
        mouseout: function(e) {
            for (var i in e.target._eventParents) {
                if (typeof e.target._eventParents[i].resetStyle === 'function') {
                    e.target._eventParents[i].resetStyle(e.target);
                }
            }
        },
        mouseover: highlightFeature,
    });
    var popupContent = '<table>\
            <tr>\
                <td colspan="2">' + (feature.properties['full_id'] !== null ? autolinker.link(String(feature.properties['full_id']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['osm_id'] !== null ? autolinker.link(String(feature.properties['osm_id']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['osm_type'] !== null ? autolinker.link(String(feature.properties['osm_type']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['building'] !== null ? autolinker.link(String(feature.properties['building']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['name_en'] !== null ? autolinker.link(String(feature.properties['name_en']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['name'] !== null ? autolinker.link(String(feature.properties['name']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['amenity'] !== null ? autolinker.link(String(feature.properties['amenity']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['addr_provi'] !== null ? autolinker.link(String(feature.properties['addr_provi']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['type'] !== null ? autolinker.link(String(feature.properties['type']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['Longitude'] !== null ? autolinker.link(String(feature.properties['Longitude']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['Latitude'] !== null ? autolinker.link(String(feature.properties['Latitude']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['StreetView'] !== null ? autolinker.link(String(feature.properties['StreetView']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
        </table>';
    var content = removeEmptyRowsFromPopupContent(popupContent, feature);
    layer.on('popupopen', function(e) {
        addClassToPopupIfMedia(content, e.popup);
    });
    layer.bindPopup(content, { maxHeight: 400 });
}

function style_Buildings_2_0() {
    return {
        pane: 'pane_Buildings_2',
        opacity: 1,
        color: 'rgba(35,35,35,1.0)',
        dashArray: '',
        lineCap: 'butt',
        lineJoin: 'miter',
        weight: 1.0, 
        fill: true,
        fillOpacity: 1,
        fillColor: 'rgba(190,178,151,1.0)',
        interactive: true,
        clickable: true,
    }
}
map.createPane('pane_Buildings_2');
map.getPane('pane_Buildings_2').style.zIndex = 403;
map.getPane('pane_Buildings_2').style['mix-blend-mode'] = 'normal';

var layer_Buildings_2 = new L.geoJson(json_Buildings_2, {
    attribution: '',
    interactive: true,
    dataVar: 'json_Buildings_2',
    layerName: 'layer_Buildings_2',
    pane: 'pane_Buildings_2',
    onEachFeature: pop_Buildings_2,
    style: style_Buildings_2_0,
});
bounds_group.addLayer(layer_Buildings_2);
map.addLayer(layer_Buildings_2);
setBounds();

var i = 0;
layer_PG_Brgy_Boundary_Cadastral_edited_1.eachLayer(function(layer) {
    var context = {
        feature: layer.feature,
        variables: {}
    };
    layer.bindTooltip((layer.feature.properties['Barangay'] !== null?String('<div style="color: #30123b; font-size: 12pt; font-family: \'Open Sans\', sans-serif;">' + layer.feature.properties['Barangay']) + '</div>':''), {permanent: true, offset: [-0, -16], className: 'css_PG_Brgy_Boundary_Cadastral_edited_1'});
    labels.push(layer);
    totalMarkers += 1;
        layer.added = true;
        addLabel(layer, i);
        i++;
});

map.addControl(new L.Control.Search({
    layer: layer_Buildings_2,
    initial: false,
    hideMarkerOnCollapse: true,
    propertyName: 'name'}));
document.getElementsByClassName('search-button')[0].className +=
    ' fa fa-binoculars';

let selectedLatLng = null; // Store clicked location

map.on('click', function (e) {
    var clickedBarangay = null;

    // Check if the click is inside any barangay
    layer_PG_Brgy_Boundary_Cadastral_edited_1_0.eachLayer(function (layer) {
        if (layer.getBounds().contains(e.latlng)) {
            clickedBarangay = layer.feature.properties.Barangay;
        }
    });

    // If clicking inside the last selected barangay, do nothing
    if (clickedBarangay === lastClickedBarangay) {
        console.log("Clicked inside the same barangay, ignoring.");
        return;
    }

    console.log("Clicked outside barangay, ignoring.");

    if (isInsideBoundary(e.latlng, layer_PG_Brgy_Boundary_Cadastral_edited_1_0)) {
        let lat = e.latlng.lat;
        let lng = e.latlng.lng;

        // Store selected location
        selectedLatLng = { lat, lng };

        // Show selected coordinates in input field
        document.getElementById("location").value = `Lat: ${lat}, Lng: ${lng}`;

        // Add a marker to preview the selected location
        L.marker([lat, lng]).addTo(map)
            .bindPopup(`Latitude: ${lat}<br>Longitude: ${lng}`)
            .openPopup();
    } else {
        alert("You can only add markers inside Padre Garcia.");
    }
});

// Get the details from the form and insert it on the database
document.getElementById("locationForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent page refresh

    if (!selectedLatLng) {
        // Swal.fire("Error", "Please click inside the boundary to select a location.", "error");
        Swal.fire({
            title: "Error",
            text: "Please click inside the boundary to select a location.",
            icon: "error",
            confirmButtonColor: "#d32f2f",
        });
        return;
    }

    var description = document.getElementById("description").value.trim();
    if (!description) {
        // Swal.fire("Error", "Please enter a description.", "error");
        Swal.fire({
            title: "Error",
            text: "Please enter a description.",
            icon: "error",
            confirmButtonColor: "#d32f2f",
        });
        return;
    }

    // Send data to server using AJAX
    let formData = new FormData();
    formData.append("latitude", selectedLatLng.lat);
    formData.append("longitude", selectedLatLng.lng);
    formData.append("description", description);

    fetch("php/reportings/save_report.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json()) // Expect JSON response
    .then(data => {
        if (data.success) {
            // Show success message
            Swal.fire({
              title: "Success",
              text: "Report added successfully!",
              icon: "success",
              confirmButtonColor: "#52b855",
            });

            // Create popup content similar to `loadReports()`
            let popupContent = `
                <div class="p-1">
                    <p class="font-semibold text-gray-800">${data.description}</p>
                    <p class="text-sm text-gray-600">Lat: ${parseFloat(data.latitude).toFixed(6)}</p>
                    <p class="text-sm text-gray-600">Lng: ${parseFloat(data.longitude).toFixed(6)}</p>
                    <button onclick="deleteReport(${data.report_id}, this)"  
                        class="mt-2 bg-red-500 text-white px-3 py-1 text-sm rounded hover:bg-red-600 transition">
                        Delete
                    </button>
                </div>
            `;

            // Add the new marker with the proper popup
            let marker = L.marker([data.latitude, data.longitude]).addTo(map)
                .bindPopup(popupContent)
                .on("popupopen", function () {
                    this._popup._contentNode.querySelector("button").markerRef = this;
                });

            // Reset form fields
            document.getElementById("locationForm").reset();
            selectedLatLng = null;
        } else {
            // Swal.fire("Error", data.error || "Failed to save report.", "error");
            Swal.fire({
                title: "Error",
                text: data.error || "Failed to save report.",
                icon: "error",
                confirmButtonColor: "#d32f2f",
            });
        }
    })
    .catch(error => {
        console.error("Error:", error);
        // Swal.fire("Error", "An unexpected error occurred.", "error");
        Swal.fire({
            title: "Error",
            text: "An unexpected error occurred.",
            icon: "error",
            confirmButtonColor: "#d32f2f",
        });
    });
});

// Function to fetch reports from the database
function loadReports() {
    fetch("php/reportings/fetch_reports.php")
        .then(response => response.json())
        .then(data => {
            console.log("Reports fetched:", data); // Debugging output

            data.forEach(report => {
                if (!report.report_id) {  // Fix: Use report.report_id
                    console.error("Error: Missing report_id for report", report);
                    return;
                }

                let popupContent = `
                    <div class="p-1">
                        <p class="font-semibold text-gray-800">${report.description}</p>
                        <p class="text-sm text-gray-600">Lat: ${report.latitude.toFixed(6)}</p>
                        <p class="text-sm text-gray-600">Lng: ${report.longitude.toFixed(6)}</p>
                        <button onclick="deleteReport(${report.report_id}, this)"  // Fix: Use report.report_id
                            class="mt-2 bg-red-500 text-white px-3 py-1 text-sm rounded hover:bg-red-600 transition">
                            Delete
                        </button>
                    </div>
                `;

                let marker = L.marker([report.latitude, report.longitude])
                    .addTo(map)
                    .bindPopup(popupContent)
                    .on("popupopen", function () {
                        this._popup._contentNode.querySelector("button").markerRef = this;
                });
            });
        })
    .catch(error => {
        console.error("Error fetching reports:", error);
        Swal.fire({
            title: "Error",
            text: "Error fetching reports.",
            icon: "error",
            confirmButtonColor: "#d32f2f"
        });
    });}

// Function to delete a report from the database
function deleteReport(reportId, buttonElement) {
    let formData = new FormData();
    formData.append("id", reportId);  // Ensure the correct key is sent

    console.log("Deleting Report ID:", reportId); // Debugging

    fetch("php/reportings/delete_report.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // alert(data.success);
            // Swal.fire("Success", data.success || "Report successfully deleted!", "success");
            Swal.fire({
                title: "Success",
                text: data.success || "Report succesfully deleted!",
                icon: "success",
                confirmButtonColor: "#52b855",
            });
            map.removeLayer(buttonElement.markerRef); // Remove marker from map
        } else {
            console.error("Error deleting report:", data.error);
            Swal.fire({
                title: "Error",
                text: `Error deleting report: ${data.error}`,
                icon: "error",
                confirmButtonColor: "#d32f2f",
            });
        }
    })
    .catch(error => {
        console.error("Error fetching reports:", error);
        Swal.fire({
            title: "Error",
            text: "Fetch error.",
            icon: "error",
            confirmButtonColor: "#d32f2f"
        });
    });
}

// Load reports when page loads
loadReports();

// loading....
document.addEventListener('DOMContentLoaded', function() {
    var loadingCheck = setInterval(function() {
        // Check if the document is still loading
        if (document.readyState === 'complete') {
            document.getElementById('loader-container').classList.add('loader-hidden');
            clearInterval(loadingCheck);
        }
    }, 100);

    // Fallback - hide loader after 5 seconds maximum
    setTimeout(function() {
        document.getElementById('loader-container').classList.add('loader-hidden');
        clearInterval(loadingCheck);
    }, 5000);
});