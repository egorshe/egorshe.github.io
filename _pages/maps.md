---
layout: default
title: Maps
permalink: /maps/
---

<!-- Leaflet CSS -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css" />
<!-- Leaflet MarkerCluster CSS -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.5.3/MarkerCluster.css" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.5.3/MarkerCluster.Default.css" />

<style>
/* Additional map-specific styles */
.map-loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    z-index: 1000;
    pointer-events: none;
}

.map-loading .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid var(--border-light);
    border-top-color: var(--accent-red);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin: 0 auto 1rem;
}

.map-loading p {
    color: var(--text-secondary);
    font-size: 0.9rem;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

/* Remove marker-count since not needed */

/* .marker-count {
    font-size: 0.85rem;
    color: var(--text-secondary);
    padding: 0.5rem;
    display: flex;
    align-items: center;
    white-space: nowrap;
}

.marker-count span {
    font-weight: 600;
    color: var(--accent-red);
    margin: 0 0.25rem;
} */

.reset-view-btn {
    display: none; /* Hide reset button */
}

/* Marker Cluster Styles */
.marker-cluster-small {
    background-color: rgba(181, 226, 140, 0.6);
}

.marker-cluster-small div {
    background-color: rgba(110, 204, 57, 0.6);
}

.marker-cluster-medium {
    background-color: rgba(241, 211, 87, 0.6);
}

.marker-cluster-medium div {
    background-color: rgba(240, 194, 12, 0.6);
}

.marker-cluster-large {
    background-color: rgba(253, 156, 115, 0.6);
}

.marker-cluster-large div {
    background-color: rgba(241, 128, 23, 0.6);
}

.marker-cluster {
    border-radius: 50%;
}

.marker-cluster div {
    width: 30px;
    height: 30px;
    margin-left: 5px;
    margin-top: 5px;
    text-align: center;
    border-radius: 50%;
    font-weight: 600;
    font-size: 12px;
}

.marker-cluster span {
    line-height: 30px;
    color: #333;
}

/* Dark mode cluster styles */
:root[data-theme="dark"] .marker-cluster-small {
    background-color: rgba(110, 204, 57, 0.4);
}

:root[data-theme="dark"] .marker-cluster-small div {
    background-color: rgba(110, 204, 57, 0.6);
}

:root[data-theme="dark"] .marker-cluster-medium {
    background-color: rgba(240, 194, 12, 0.4);
}

:root[data-theme="dark"] .marker-cluster-medium div {
    background-color: rgba(240, 194, 12, 0.6);
}

:root[data-theme="dark"] .marker-cluster-large {
    background-color: rgba(241, 128, 23, 0.4);
}

:root[data-theme="dark"] .marker-cluster-large div {
    background-color: rgba(241, 128, 23, 0.6);
}

:root[data-theme="dark"] .marker-cluster span {
    color: #fff;
}

/* Prevent cluster icons from being inverted */
:root[data-theme="dark"] .marker-cluster,
:root[data-theme="dark"] .marker-cluster div {
    filter: none !important;
}

/* Upcoming events toggle styling */
.upcoming-checkbox-container {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    margin-left: 1rem;
    font-size: 0.93rem;
    user-select: none;
}

.upcoming-checkbox {
    accent-color: var(--accent-red);
    margin-right: 0.25rem;
}
.upcoming-checkbox-label {
    cursor: pointer;
    color: var(--text-primary);
}

/* Mobile optimizations */
@media (max-width: 768px) {
    .map-controls {
        gap: 0.5rem;
        flex-wrap: wrap;
    }

    /* Remove mobile styling for .marker-count */
    /* .marker-count {
        width: 100%;
        justify-content: center;
        order: -1;
        padding: 0.25rem 0.5rem;
        border-bottom: 1px solid var(--border-light);
    } */
    .reset-view-btn {
        display: none;
    }
    .upcoming-checkbox-container {
        margin: 0.5rem 0 0.5rem 0;
        width: 100%;
        justify-content: flex-start;
    }
}
</style>

<h1 class="page-title">Maps</h1>
<p class="page-intro">
    Explore Baltic research through geography. Click markers on the interactive map to discover posts and projects connected to specific locations across Estonia, Latvia, Lithuania, and beyond.
</p>

<div class="map-container">
    <div class="map-controls" style="display: flex; gap: 1rem; align-items: center;">
        <div class="filter-dropdown">
            <label>Type</label>
            <button class="dropdown-toggle" id="typeDropdown" aria-haspopup="true" aria-expanded="false">
                All
            </button>
            <div class="dropdown-menu" id="typeMenu">
                <button class="dropdown-item active" data-filter="all">All</button>
                <button class="dropdown-item" data-filter="posts">Field Notes</button>
                <button class="dropdown-item" data-filter="projects">Projects</button>
                <button class="dropdown-item" data-filter="digest">Digest</button>
            </div>
        </div>

        <div class="filter-dropdown">
            <label>Location</label>
            <button class="dropdown-toggle" id="locationDropdown" aria-haspopup="true" aria-expanded="false">
                All
            </button>
            <div class="dropdown-menu" id="locationMenu">
                <button class="dropdown-item active" data-country="all">All</button>
                <button class="dropdown-item" data-country="estonia">Estonia</button>
                <button class="dropdown-item" data-country="latvia">Latvia</button>
                <button class="dropdown-item" data-country="lithuania">Lithuania</button>
                <button class="dropdown-item" data-country="abroad">Abroad</button>
            </div>
        </div>

        <div class="upcoming-checkbox-container">
            <input type="checkbox" id="upcomingOnly" class="upcoming-checkbox" />
            <label for="upcomingOnly" class="upcoming-checkbox-label">Upcoming events</label>
        </div>
    </div>

    <div id="map">
        <div class="map-loading">
            <div class="spinner"></div>
            <p>Loading map...</p>
        </div>
    </div>
</div>

<div class="map-gallery">
    <h2 class="section-title">Historical & Thematic Maps</h2>
    <div class="gallery-grid">
        {% for map in site.data.maps %}
        <div class="gallery-item">
            <img src="{{ site.baseurl }}{{ map.image }}"
                 alt="{{ map.title }}"
                 onerror="this.src='https://via.placeholder.com/400x180/2f4f4f/ffffff?text={{ map.title | url_encode }}'">
            <div class="gallery-info">
                <div class="gallery-title">{{ map.title }}</div>
                <div class="gallery-description">{{ map.description }}</div>
                <div class="gallery-source">Source: {{ map.source }}</div>
                {% if map.link %}
                <a href="{{ map.link }}" class="gallery-link" target="_blank">
                    {{ map.link_text | default: "View full resolution" }} →
                </a>
                {% endif %}
            </div>
        </div>
        {% endfor %}
    </div>
</div>

<!-- Leaflet JS -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js"></script>
<!-- Leaflet MarkerCluster JS -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.5.3/leaflet.markercluster.min.js"></script>

<script>
// ============================================
// Map Initialization
// ============================================
const defaultView = [57.5, 25.0];
const defaultZoom = 6;

const map = L.map('map', {
    zoomControl: false
}).setView(defaultView, defaultZoom);

// Add zoom control to right side
L.control.zoom({
    position: 'bottomright'
}).addTo(map);

// CartoDB Positron - Clean, minimal style
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap contributors © CARTO',
    maxZoom: 19
}).addTo(map);

// Hide loading state when map is ready
map.whenReady(function() {
    const loading = document.querySelector('.map-loading');
    if (loading) {
        loading.style.opacity = '0';
        setTimeout(() => loading.remove(), 300);
    }
});

// ============================================
// Utility Functions
// ============================================
function parseCoords(loc) {
    if (loc.coords) {
        if (typeof loc.coords === 'string') {
            const parts = loc.coords.split(',').map(s => parseFloat(s.trim()));
            return { lat: parts[0], lng: parts[1] };
        } else if (Array.isArray(loc.coords)) {
            return { lat: loc.coords[0], lng: loc.coords[1] };
        }
    }
    return { lat: loc.lat, lng: loc.lng };
}

function isPastDate(dateString) {
    if (!dateString) return false;
    const eventDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return eventDate < today;
}

// ============================================
// Generate locations from Jekyll posts
// ============================================
const locations = [
    // Posts with multiple locations
    {% for post in site.posts %}
    {% if post.locations %}
        {% for loc in post.locations %}
        {
            title: {{ post.title | jsonify }},
            subtitle: {{ loc.venue | default: loc.city | jsonify }},
            lat: {{ loc.coords[0] | default: loc.lat }},
            lng: {{ loc.coords[1] | default: loc.lng }},
            coords: {{ loc.coords | jsonify }},
            country: {{ loc.country | jsonify }},
            type: "posts",
            date: {{ loc.date | default: post.date | date: "%B %d, %Y" | jsonify }},
            rawDate: {{ loc.date | default: post.date | date: "%Y-%m-%d" | jsonify }},
            description: {{ loc.description | default: post.excerpt | strip_html | truncatewords: 15 | jsonify }},
            url: {{ post.url | jsonify }}
        },
        {% endfor %}
    {% elsif post.location %}
    {
        title: {{ post.title | jsonify }},
        lat: {{ post.location.coords[0] | default: post.location.lat }},
        lng: {{ post.location.coords[1] | default: post.location.lng }},
        coords: {{ post.location.coords | jsonify }},
        country: {{ post.location.country | jsonify }},
        type: "posts",
        date: {{ post.date | date: "%B %d, %Y" | jsonify }},
        rawDate: {{ post.date | date: "%Y-%m-%d" | jsonify }},
        excerpt: {{ post.excerpt | strip_html | truncatewords: 20 | jsonify }},
        url: {{ post.url | jsonify }}
    },
    {% endif %}
    {% endfor %}

    // Projects
    {% for project in site.projects %}
    {% if project.location %}
    {
        title: {{ project.title | jsonify }},
        lat: {{ project.location.coords[0] | default: project.location.lat }},
        lng: {{ project.location.coords[1] | default: project.location.lng }},
        coords: {{ project.location.coords | jsonify }},
        country: {{ project.location.country | jsonify }},
        type: "projects",
        excerpt: {{ project.excerpt | strip_html | truncatewords: 20 | jsonify }},
        url: {{ project.url | jsonify }}
    },
    {% endif %}
    {% endfor %}

    // Digest with multiple locations
    {% for item in site.digest %}
    {% if item.locations %}
        {% for loc in item.locations %}
        {
            title: {{ loc.title | default: item.title | jsonify }},
            subtitle: {{ loc.venue | default: loc.city | jsonify }},
            lat: {{ loc.coords[0] | default: loc.lat }},
            lng: {{ loc.coords[1] | default: loc.lng }},
            coords: {{ loc.coords | jsonify }},
            country: {{ loc.country | jsonify }},
            type: "digest",
            date: {{ loc.date | default: item.date | date: "%B %d, %Y" | jsonify }},
            rawDate: {{ loc.date | default: item.date | date: "%Y-%m-%d" | jsonify }},
            description: {{ loc.description | default: item.excerpt | strip_html | truncatewords: 15 | jsonify }},
            url: {{ item.url | jsonify }}
        },
        {% endfor %}
    {% elsif item.location %}
    {
        title: {{ item.title | jsonify }},
        lat: {{ item.location.coords[0] | default: item.location.lat }},
        lng: {{ item.location.coords[1] | default: item.location.lng }},
        coords: {{ item.location.coords | jsonify }},
        country: {{ item.location.country | jsonify }},
        type: "digest",
        date: {{ item.date | date: "%B %d, %Y" | jsonify }},
        rawDate: {{ item.date | date: "%Y-%m-%d" | jsonify }},
        excerpt: {{ item.excerpt | strip_html | truncatewords: 20 | jsonify }},
        url: {{ item.url | jsonify }}
    },
    {% endif %}
    {% endfor %}
].filter(loc => loc.title && loc.lat && loc.lng);

// Parse coordinates
locations.forEach(location => {
    if (location.coords && !location.lat) {
        const parsed = parseCoords(location);
        location.lat = parsed.lat;
        location.lng = parsed.lng;
    }
});

// ============================================
// Marker Cluster Setup
// ============================================
const markerClusters = L.markerClusterGroup({
    maxClusterRadius: 50,
    spiderfyOnMaxZoom: true,
    showCoverageOnHover: false,
    zoomToBoundsOnClick: true,
    spiderfyDistanceMultiplier: 1.5,
    iconCreateFunction: function(cluster) {
        const count = cluster.getChildCount();
        let size = 'small';
        if (count > 10) size = 'large';
        else if (count > 5) size = 'medium';

        return L.divIcon({
            html: `<div><span>${count}</span></div>`,
            className: `marker-cluster marker-cluster-${size}`,
            iconSize: L.point(40, 40)
        });
    }
});

map.addLayer(markerClusters);

// ============================================
// Marker Creation
// ============================================
let markers = [];

function getMarkerColor(type) {
    const colors = {
        posts: '#cc0000',
        projects: '#75ade8',
        digest: '#046A38'
    };
    return colors[type] || '#cc0000';
}

function createCustomIcon(type) {
    const color = getMarkerColor(type);
    return L.divIcon({
        className: 'custom-marker',
        html: `<div style="background: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8]
    });
}

function createPopupContent(location) {
    const typeLabel = location.type === 'posts' ? 'Field Notes' :
                     location.type.charAt(0).toUpperCase() + location.type.slice(1);

    let html = '<div class="marker-popup">';
    html += `<div class="popup-title">${location.title}</div>`;

    if (location.subtitle) {
        html += `<div class="popup-venue">${location.subtitle}</div>`;
    }

    if (location.date) {
        html += `<div class="popup-date">${location.date}</div>`;
    }

    html += `<div class="popup-meta">${typeLabel} • ${location.country.charAt(0).toUpperCase() + location.country.slice(1)}</div>`;
    html += `<div class="popup-excerpt">${location.description || location.excerpt}</div>`;
    html += `<a href="${location.url}" class="popup-link">Read more →</a>`;
    html += '</div>';

    return html;
}

locations.forEach(location => {
    const marker = L.marker([location.lat, location.lng], {
        icon: createCustomIcon(location.type),
        country: location.country,
        type: location.type,
        rawDate: location.rawDate
    });

    marker.bindPopup(createPopupContent(location));

    markerClusters.addLayer(marker);
    markers.push(marker);
});

// ============================================
// Dropdown Functionality
// ============================================
function setupDropdown(toggleId, menuId) {
    const toggle = document.getElementById(toggleId);
    const menu = document.getElementById(menuId);
    const items = menu.querySelectorAll('.dropdown-item');

    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = menu.classList.contains('show');

        document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.remove('show'));
        document.querySelectorAll('.dropdown-toggle').forEach(t => t.classList.remove('active'));

        if (!isOpen) {
            menu.classList.add('show');
            toggle.classList.add('active');
        }
    });

    items.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            items.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            toggle.textContent = item.textContent;
            menu.classList.remove('show');
            toggle.classList.remove('active');
        });
    });
}

setupDropdown('typeDropdown', 'typeMenu');
setupDropdown('locationDropdown', 'locationMenu');
//setupDropdown('timeDropdown', 'timeMenu');  // removed time dropdown

document.addEventListener('click', () => {
    document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.remove('show'));
    document.querySelectorAll('.dropdown-toggle').forEach(t => t.classList.remove('active'));
});

// ============================================
// Filter Functionality
// ============================================
let activeType = 'all';
let activeCountry = 'all';
let showUpcomingOnly = false; // replaces time filter

function updateMarkers() {
    markerClusters.clearLayers();

    markers.forEach(marker => {
        const matchesType = activeType === 'all' || marker.options.type === activeType;
        const matchesCountry = activeCountry === 'all' || marker.options.country === activeCountry;
        const matchesUpcoming = !showUpcomingOnly || (marker.options.rawDate && !isPastDate(marker.options.rawDate));

        if (matchesType && matchesCountry && matchesUpcoming) {
            markerClusters.addLayer(marker);
        }
    });
}

document.querySelectorAll('[data-filter]').forEach(btn => {
    btn.addEventListener('click', function() {
        activeType = this.dataset.filter;
        updateMarkers();
    });
});

document.querySelectorAll('[data-country]').forEach(btn => {
    btn.addEventListener('click', function() {
        activeCountry = this.dataset.country;
        updateMarkers();
    });
});

const upcomingCheckbox = document.getElementById('upcomingOnly');
if (upcomingCheckbox) {
    upcomingCheckbox.addEventListener('change', function() {
        showUpcomingOnly = this.checked;
        updateMarkers();
    });
}

// ============================================
// Initial marker state
// ============================================
updateMarkers();
</script>
