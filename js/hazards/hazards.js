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
var selectedLatLng = null; // Store clicked location
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
    // layer.bindPopup(`<b>Barangay:</b> ${barangayName}`).openPopup();
}

// Handle Barangay Boundary Clicks
var layer_PG_Brgy_Boundary_Cadastral_edited_1 = new L.geoJson(json_PG_Brgy_Boundary_Cadastral_edited_1, {
    attribution: '',
    interactive: true,
    dataVar: 'json_PG_Brgy_Boundary_Cadastral_edited_1',
    layerName: 'layer_PG_Brgy_Boundary_Cadastral_edited_1',
    pane: 'pane_PG_Brgy_Boundary_Cadastral_edited_1',
    style: style_PG_Brgy_Boundary_Cadastral_edited_1_0,
    renderer: L.svg(),
    maxZoom: 24,
    tolerance: 3,
    onEachFeature: function (feature, layer) {
        layer.on({
            mouseover: function (e) {
                e.target.setStyle({ fillColor: 'rgba(0, 0, 255, 0.4)', fillOpacity: 0.5 });
            },
            mouseout: function (e) {
                layer.setStyle(style_PG_Brgy_Boundary_Cadastral_edited_1_0()); // Reset style on mouseout
            },
            click: function (e) {
                console.log("Barangay clicked at:", e.latlng);

                // 🛑 Stop if the user clicked inside a drawn shape or hazard
                if (isClickInsideDrawnShape(e.latlng) || isClickInsideFetchedHazard(e.latlng)) {
                    console.log("Click ignored: Inside drawn shape or hazard.");
                    return;
                }

                zoomToBarangay(e, feature);

                var lat = e.latlng.lat;
                var lng = e.latlng.lng;
                var streetViewUrl = `https://www.google.com/maps?q=&layer=c&cbll=${lat},${lng}`;

                L.popup()
                    .setLatLng(e.latlng)
                    .setContent(`
                        <b>Barangay:</b> ${feature.properties.Barangay || "Unknown Barangay"}<br>
                        <a href="${streetViewUrl}" target="_blank">📍 View in Google Street View</a>
                    `)
                    .openOn(map);
            }
        });
    }
});
bounds_group.addLayer(layer_PG_Brgy_Boundary_Cadastral_edited_1);
map.addLayer(layer_PG_Brgy_Boundary_Cadastral_edited_1);

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
    propertyName: 'name',
}));
document.getElementsByClassName('search-button')[0].className +=
    ' fa fa-binoculars';

// Initialize Leaflet.draw
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

var drawControl = new L.Control.Draw({
    edit: { featureGroup: drawnItems, remove: true },
    draw: { polygon: true, rectangle: true, marker: false, polyline: false, circle: false, circlemarker: false }
});
map.addControl(drawControl);

// Global function for deletion confirmation
function confirmDeleteHazard(hazardId) {
    Swal.fire({
        title: 'Delete Hazard?',
        text: 'Are you sure you want to delete this hazard?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#52b855',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            deleteHazard(hazardId);
        }
    });
}

// Function to delete hazard
function deleteHazard(hazardId) {
    let layersToRemove = [];
    let hazardType = null; // Store the type of the hazard being deleted

    // Identify layers to remove
    fetchedHazards.eachLayer(layer => {
        if (layer.hazardData && layer.hazardData.id == hazardId) {
            layersToRemove.push(layer);
            hazardType = layer.hazardData.type;
        }
    });

    drawnItems.eachLayer(layer => {
        if (layer.hazardId == hazardId) {
            layersToRemove.push(layer);
            hazardType = layer.hazardData.type;
        }
    });

    // Remove all identified layers from the map instantly
    layersToRemove.forEach(layer => {
        fetchedHazards.removeLayer(layer);
        drawnItems.removeLayer(layer);
        map.removeLayer(layer);
    });

    // Close any open popup instantly
    map.closePopup();

    // Check if any hazards of the same type still exist
    let hazardStillExists = false;

    fetchedHazards.eachLayer(layer => {
        if (layer.hazardData && layer.hazardData.type === hazardType) {
            hazardStillExists = true;
        }
    });

    drawnItems.eachLayer(layer => {
        if (layer.hazardData && layer.hazardData.type === hazardType) {
            hazardStillExists = true;
        }
    });

    // Remove from legend only if no hazards of that type remain (instant update)
    if (!hazardStillExists && hazardType) {
        let legendList = document.getElementById("legend-list");
        let legendChildren = [...legendList.children]; // Convert to array

        legendChildren.forEach((item) => {
            if (item.innerText.trim().toLowerCase() === hazardType.toLowerCase()) {
                item.remove(); // Remove instantly
                delete legendItems[hazardType]; // Remove from tracking
                console.log(`Removed ${hazardType} from legend.`);
            }
        });
    }

    // Send request to delete from the database (happens in background)
    fetch("php/hazards/delete_hazard.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `hazard_id=${hazardId}`
    })
    .then(response => response.text())
    .then(data => {
        console.log("Server Response:", data);
        Swal.fire({
            title: 'Success!',
            text: 'Hazard deleted successfully!',
            icon: 'success',
            confirmButtonColor: '#52b855'
        });
    })
    .catch(error => {
        console.error("Error deleting hazard:", error);
        Swal.fire({
            title: "Error",
            text: "Error deleting hazard",
            icon: "error",
            confirmButtonColor: "#d32f2f"
        });
    });
}

// DELETE SHAPE ON REMOVE (Leaflet Draw Event)
map.on('draw:deleted', function (event) {
    event.layers.eachLayer(function (layer) {
        if (layer.hazardId) {
            console.log(`Deleting hazard with ID: ${layer.hazardId}`);
            deleteHazard(layer.hazardId);
        }
    });
});

// Ensure clicks inside drawn shapes do not trigger barangay click, but show hazard popup    
function isClickInsideDrawnShape(latlng) {
    let clickedPoint = turf.point([latlng.lng, latlng.lat]); // Convert click to GeoJSON point

    let inside = false; // Default to false

    drawnItems.eachLayer(function (layer) {
        if (layer.hazardData && layer.hazardData.geometry) {
            let hazardGeoJSON = layer.hazardData.geometry; // Use exact GeoJSON from DB
            
            // Convert GeoJSON to Turf polygon
            let polygon = turf.polygon(hazardGeoJSON.coordinates);

            if (turf.booleanPointInPolygon(clickedPoint, polygon)) {
                inside = true;

                console.log("Clicked inside a stored hazard. Showing popup.");
                L.popup()
                    .setLatLng(latlng)
                    .setContent(`
                        <div class="p-1">
                            <p class="text-gray-800"><span class="font-semibold">Type:</span> ${layer.hazardData.type}</p>
                            <p class="text-gray-800"><span class="font-semibold">Status:</span> ${layer.hazardData.status}</p>
                            <p class="text-gray-800"><span class="font-semibold">Description:</span> ${layer.hazardData.description}</p>
                            <button onclick="confirmDeleteHazard(${layer.hazardData.id})"
                                class="mt-2 bg-red-500 text-white px-3 py-1 text-sm rounded hover:bg-red-600 transition">
                                Delete
                            </button>
                        </div>
                    `)
                    .openOn(map);
                // drawnItems.addLayer(layer);
            }
        }
    });

    return inside;
}

function isClickInsideFetchedHazard(latlng) {
    let clickedPoint = turf.point([latlng.lng, latlng.lat]); // Convert click to GeoJSON point

    let inside = false; // Default to false

    fetchedHazards.eachLayer(function (layer) {
        if (layer.hazardData && layer.hazardData.geometry) {
            let hazardGeoJSON = layer.hazardData.geometry; // Use exact GeoJSON from DB
            
            // Convert GeoJSON to Turf polygon
            let polygon = turf.polygon(hazardGeoJSON.coordinates);

            if (turf.booleanPointInPolygon(clickedPoint, polygon)) {
                inside = true;

                console.log("Clicked inside a stored hazard. Showing popup.");
                L.popup()
                    .setLatLng(latlng)
                    .setContent(`
                        <div class="p-1">
                            <p class="text-gray-800"><span class="font-semibold">Type:</span> ${layer.hazardData.type}</p>
                            <p class="text-gray-800"><span class="font-semibold">Status:</span> ${layer.hazardData.status}</p>
                            <p class="text-gray-800"><span class="font-semibold">Description:</span> ${layer.hazardData.description}</p>
                            <button onclick="confirmDeleteHazard(${layer.hazardData.id})"
                                class="mt-2 bg-red-500 text-white px-3 py-1 text-sm rounded hover:bg-red-600 transition">
                                Delete
                            </button>
                        </div>
                    `)
                    .openOn(map);
                // drawnItems.addLayer(layer);
            }
        }
    });

    return inside;
}

// Ensure Drawn Shapes are Clickable
map.on(L.Draw.Event.CREATED, function (event) {
    var layer = event.layer;
    
    layer.on('click', function (e) {
        console.log("Clicked on drawn shape", e.latlng);
        L.popup()
            .setLatLng(e.latlng)
            .setContent(`
                <div class="p-1">
                    <p class="text-gray-800"><span class="font-semibold">Type:</span> ${layer.hazardData.type}</p>
                    <p class="text-gray-800"><span class="font-semibold">Status:</span> ${layer.hazardData.status}</p>
                    <p class="text-gray-800"><span class="font-semibold">Description:</span> ${layer.hazardData.description}</p>
                    <button onclick="confirmDeleteHazard(${layer.hazardData.id})"
                        class="mt-2 bg-red-500 text-white px-3 py-1 text-sm rounded hover:bg-red-600 transition">
                        Delete
                    </button>
                </div>
            `)
            .openOn(map);
    });

    drawnItems.addLayer(layer);
    
    currentGeoJSON = JSON.stringify(layer.toGeoJSON().geometry);
    document.getElementById("form-container").style.display = "block";
});

// Fix Fetched Hazards Clicks
var fetchedHazards = new L.FeatureGroup(); // Store fetched hazards

var hazardColors = {
    "fire": "red",
    "flood": "blue",
    "earthquake": "orange",
    "landslide": "brown"
};

var legendItems = {}; // Store legend items to avoid duplicates

// Function to update the legend on the map
function updateLegend(hazardType, color) {
    var legendList = document.getElementById("legend-list");

    // Check if legend item already exists
    if (!legendItems[hazardType]) {
        var listItem = document.createElement("li");
        listItem.innerHTML = `<span style="background: ${color}; width: 10px; height: 10px; display: inline-block;"></span> ${hazardType.charAt(0).toUpperCase() + hazardType.slice(1)}`;
        legendList.appendChild(listItem);

        // Mark hazard type as added to prevent duplicates
        legendItems[hazardType] = true;
    }
}

// Function to fetch hazards stored from the database
function fetchHazards() {
    fetch("php/hazards/fetch_hazards.php")
    .then(response => response.json())
    .then(data => {
        data.forEach(hazard => {
            try {
                let parsedLocation = JSON.parse(hazard.location);
                let hazardType = hazard.hazard_type.toLowerCase();
                let color = hazardColors[hazardType] || "blue";

                updateLegend(hazardType, color); 

                map.createPane('hazardPane');
                map.getPane('hazardPane').style.zIndex = 403;
                map.getPane('hazardPane').style['mix-blend-mode'] = 'normal';

                var hazardLayer = L.geoJSON(parsedLocation, {
                    style: {
                        color: color,
                        fillColor: color,
                        fillOpacity: 0.3,
                        weight: 2
                    },
                    interactive: true,
                    pane: 'hazardPane',
                });

                hazardLayer.eachLayer(function(layer) {
                    layer.hazardId = hazard.hazard_id;

                    // Store hazard data inside layer
                    layer.hazardData = {
                        id: hazard.hazard_id,
                        type: hazard.hazard_type,
                        status: hazard.status,
                        description: hazard.description,
                        geometry: parsedLocation
                    };

                    layer.on('click', function(e) {
                        console.log("Hazard clicked at:", e.latlng);
                        
                        // Stop propagation so barangay doesn’t trigger
                        L.DomEvent.stopPropagation(e);
                        L.DomEvent.preventDefault(e);
                        L.DomEvent.stopImmediatePropagation(e);

                        L.popup()
                            .setLatLng(e.latlng)
                            .setContent(`
                                <b>Type:</b> ${hazard.hazard_type} <br>
                                <b>Status:</b> ${hazard.status} <br>
                                <b>Description:</b> ${hazard.description} <br>
                                <button onclick="confirmDeleteHazard(${hazard.hazard_id})">Delete</button>
                            `)
                            .openOn(map);
                    });

                    fetchedHazards.addLayer(layer);
                    // drawnItems.addLayer(layer);
                });

                map.addLayer(hazardLayer);
            } catch (parseError) {
                console.error("Error parsing hazard location:", parseError);
                Swal.fire({
                    title: "Error",
                    text: "Error parsing hazard location.",
                    icon: "error",
                    confirmButtonColor: "#d32f2f"
                });
            }
        });
    })
    .catch(error => {
        console.error("Error fetching hazards:", error);
        Swal.fire({
            title: "Error",
            text: "Fetch error.",
            icon: "error",
            confirmButtonColor: "#d32f2f"
        });
    });
}

fetchHazards(); 

// Function to update the hazard's coordinate
function updateHazardOnMap(hazardId, newGeoJSON) {
    let hazardType = null; // Store hazard type
    let color = "blue"; // Default color

    // Find the existing layer to retrieve hazard type
    fetchedHazards.eachLayer(function (layer) {
        if (layer.hazardId == hazardId) {
            hazardType = layer.hazardData.type.toLowerCase(); // Get stored type
            color = hazardColors[hazardType] || "blue"; // Use predefined color
            map.removeLayer(layer); // Remove old layer
        }
    });

    // Create updated layer with correct color
    let updatedLayer = L.geoJSON(newGeoJSON, {
        style: {
            color: color,
            fillColor: color,
            fillOpacity: 0.3,
            weight: 2
        },
        interactive: true
    });

    updatedLayer.eachLayer(function (newLayer) {
        newLayer.hazardId = hazardId;
        newLayer.hazardData = { 
            id: hazardId, 
            type: hazardType, 
            status: hazardStatus, 
            description: hazardDescription, 
            geometry: newGeoJSON 
        };

        // Reattach click event
        newLayer.on('click', function(e) {
            console.log("Updated hazard clicked at:", e.latlng);

            L.popup()
                .setLatLng(e.latlng)
                .setContent(`
                    <div class="p-1">
                        <p class="text-gray-800"><span class="font-semibold">Type:</span> ${newLayer.hazardData.type}</p>
                        <p class="text-gray-800"><span class="font-semibold">Status:</span> ${newLayer.hazardData.status}</p>
                        <p class="text-gray-800"><span class="font-semibold">Description:</span> ${newLayer.hazardData.description}</p>
                        <button onclick="confirmDeleteHazard(${newLayer.hazardData.id})"
                            class="mt-2 bg-red-500 text-white px-3 py-1 text-sm rounded hover:bg-red-600 transition">
                            Delete
                        </button>
                    </div>
                `)
                .openOn(map);
        });

        fetchedHazards.addLayer(newLayer);
        drawnItems.addLayer(newLayer);
    });

    map.addLayer(updatedLayer); // Add updated layer back to map
}
        
map.on('draw:edited', function (event) {
    event.layers.eachLayer(function (layer) {
        if (layer.hazardId) {
            console.log(`Updating hazard with ID: ${layer.hazardId}`);

            let updatedGeoJSON = layer.toGeoJSON().geometry; // Get updated geometry
            let updatedData = {
                hazard_id: layer.hazardId,
                location: JSON.stringify(updatedGeoJSON) // Convert to JSON for DB storage
            };

            // Send update request to the server
            fetch("php/hazards/update_hazard.php", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `hazard_id=${updatedData.hazard_id}&location=${encodeURIComponent(updatedData.location)}`
            })
            .then(response => response.text())
            .then(data => {
                console.log(`Server Response: ${data}`);
                Swal.fire({
                  title: "Success!",
                  text: "Hazard updated successfully!",
                  icon: "success",
                  confirmButtonColor: "#52b855",
                });

                // Update the map with new geometry
                updateHazardOnMap(
                    data.hazard_id, 
                    JSON.parse(data.location), 
                    data.hazard_type, 
                    data.status, 
                    data.description
                );
            })
            .catch(error => {
                console.error("Error updating hazard:", error);
                Swal.fire({
                    title: "Error",
                    text: "Error updating hazard.",
                    icon: "error",
                    confirmButtonColor: "#d32f2f"
                });
            });
        }
    });
});

// Function to cancel the form
function cancelForm() {
    document.getElementById("form-container").style.display = "none";
    document.getElementById("locationForm").reset();

    // Remove only the most recently drawn shape
    drawnItems.clearLayers();
    
    // Remove the last drawn shape if it exists
    currentGeoJSON = null;
}

// Form submission to save the shape
document.getElementById("locationForm").addEventListener("submit", function (e) {
    e.preventDefault();
    if (!currentGeoJSON) return;

    var hazardType = document.getElementById("hazard_type").value;
    var status = document.getElementById("status").value;
    var description = document.getElementById("description").value;

    fetch("php/hazards/save_hazard.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `hazard_type=${encodeURIComponent(hazardType)}&status=${encodeURIComponent(status)}&description=${encodeURIComponent(description)}&location=${encodeURIComponent(currentGeoJSON)}`
    }).then(response => response.text())
    .then(data => {
        Swal.fire({
            title: 'Success!',
            text: 'Hazard saved successfully!',
            icon: 'success',
            confirmButtonColor: '#52b855'
        });
        
        // Clear the temporary drawn shape
        drawnItems.clearLayers();

        // location.reload(); // Reload the page to refresh hazards
        fetchHazards();
    })
    .catch(error => {
        console.error("Error:", error);
        Swal.fire({
            title: "Error",
            text: "Fetch error.",
            icon: "error",
            confirmButtonColor: "#d32f2f"
        });
    });

    document.getElementById("form-container").style.display = "none";
});

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