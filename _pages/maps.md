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

.reset-view-btn {
    display: none;
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
    font-size: 0.75rem;
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
    position: relative;
    min-width: 130px;
}

.upcoming-checkbox-container label.filter-label {
    display: block;
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--text-muted);
    margin-bottom: 0.25rem;
    font-weight: 600;
}

.upcoming-checkbox-wrapper {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.45rem 0.65rem;
    background: var(--bg-primary);
    border: 1px solid var(--border-light);
    border-radius: 3px;
    cursor: pointer;
    transition: all 0.15s ease;
    user-select: none;
}

.upcoming-checkbox-wrapper:hover {
    border-color: var(--border-gray);
    background: var(--bg-secondary);
}

.upcoming-checkbox-label {
    cursor: pointer;
    color: var(--text-primary);
    font-size: 0.85rem;
    flex: 1;
}

.upcoming-checkbox {
    accent-color: var(--accent-red);
    cursor: pointer;
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    margin: 0;
}

/* Dark mode checkbox - styled to match theme */
:root[data-theme="dark"] .upcoming-checkbox {
    accent-color: #ff6666;
    /* Custom styling for unchecked state */
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    border: 2px solid var(--border-gray);
    background-color: var(--bg-secondary);
    border-radius: 3px;
    position: relative;
}

:root[data-theme="dark"] .upcoming-checkbox:checked {
    background-color: #ff6666;
    border-color: #ff6666;
}

:root[data-theme="dark"] .upcoming-checkbox:checked::after {
    content: "✓";
    position: absolute;
    color: white;
    font-size: 12px;
    font-weight: bold;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

/* Light mode keeps native styling but with custom colors */
.upcoming-checkbox {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    border: 2px solid var(--border-gray);
    background-color: var(--bg-primary);
    border-radius: 3px;
    position: relative;
}

.upcoming-checkbox:checked {
    background-color: var(--accent-red);
    border-color: var(--accent-red);
}

.upcoming-checkbox:checked::after {
    content: "✓";
    position: absolute;
    color: white;
    font-size: 12px;
    font-weight: bold;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

/* Mobile optimizations */
@media (max-width: 768px) {
    .map-controls {
        gap: 0.5rem;
        flex-wrap: wrap;
    }

    .reset-view-btn {
        display: none;
    }

    .upcoming-checkbox-container {
        width: 100%;
    }
}
</style>

<h1 class="page-title">Maps</h1>
<p class="page-intro">
    Follow the geography of the Baltics to find research tied to specific locations. Click markers on the map to discover posts, projects, and events connected to specific locations across Estonia, Latvia, and Lithuania. Zoom out to go beyond the region.
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
            <label class="filter-label">Events</label>
            <div class="upcoming-checkbox-wrapper" onclick="document.getElementById('upcomingOnly').click(); event.stopPropagation();">
                <span class="upcoming-checkbox-label">Upcoming only</span>
                <input type="checkbox" id="upcomingOnly" class="upcoming-checkbox" onclick="event.stopPropagation();" />
            </div>
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
    
    <!-- Gallery Filter Controls -->
    <div class="gallery-filters">
        <div class="filter-dropdown">
            <label>Category</label>
            <button class="dropdown-toggle" id="categoryDropdown" aria-haspopup="true" aria-expanded="false">
                All Categories
            </button>
            <div class="dropdown-menu" id="categoryMenu">
                <button class="dropdown-item active" data-gallery-filter="category" data-value="all">All Categories</button>
                {% assign categories = site.data.maps | map: 'category' | uniq | sort %}
                {% for category in categories %}
                {% if category and category != '' %}
                <button class="dropdown-item" data-gallery-filter="category" data-value="{{ category }}">{{ category | capitalize }}</button>
                {% endif %}
                {% endfor %}
            </div>
        </div>

        <div class="filter-dropdown">
            <label>Country</label>
            <button class="dropdown-toggle" id="countryDropdown" aria-haspopup="true" aria-expanded="false">
                All Countries
            </button>
            <div class="dropdown-menu" id="countryMenu">
                <button class="dropdown-item active" data-gallery-filter="country" data-value="all">All Countries</button>
                {% assign countries = site.data.maps | map: 'country' | uniq | sort %}
                {% for country in countries %}
                {% if country and country != '' %}
                <button class="dropdown-item" data-gallery-filter="country" data-value="{{ country }}">{{ country | capitalize }}</button>
                {% endif %}
                {% endfor %}
            </div>
        </div>

        <div class="filter-dropdown">
            <label>Period</label>
            <button class="dropdown-toggle" id="periodDropdown" aria-haspopup="true" aria-expanded="false">
                All Periods
            </button>
            <div class="dropdown-menu" id="periodMenu">
                <button class="dropdown-item active" data-gallery-filter="period" data-value="all">All Periods</button>
                {% assign periods = site.data.maps | map: 'period' | uniq | sort %}
                {% for period in periods %}
                {% if period and period != '' %}
                <button class="dropdown-item" data-gallery-filter="period" data-value="{{ period }}">{{ period | capitalize | replace: '-', ' ' }}</button>
                {% endif %}
                {% endfor %}
            </div>
        </div>
    </div>

    <!-- Gallery Grid -->
    <div class="gallery-grid">
        {% for map in site.data.maps %}
        <div class="gallery-item" 
             data-category="{{ map.category | default: 'unknown' }}"
             data-country="{{ map.country | default: 'unknown' }}"
             data-period="{{ map.period | default: 'unknown' }}">
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

function parseDate(dateString) {
    if (!dateString) return null;

    // Handle various date range formats
    // Format 1: "2025-11-01-2025-11-04"
    const dashRangeMatch = dateString.match(/^(\d{4}-\d{2}-\d{2})-(\d{4}-\d{2}-\d{2})$/);
    if (dashRangeMatch) {
        return {
            start: new Date(dashRangeMatch[1]),
            end: new Date(dashRangeMatch[2]),
            isRange: true
        };
    }

    // Format 2: "2025-10-15 to 2025-10-17"
    const toRangeMatch = dateString.match(/(\d{4}-\d{2}-\d{2})\s+to\s+(\d{4}-\d{2}-\d{2})/);
    if (toRangeMatch) {
        return {
            start: new Date(toRangeMatch[1]),
            end: new Date(toRangeMatch[2]),
            isRange: true
        };
    }

    // Format 3: Natural language date like "October 15, 2026"
    // Try parsing as-is first
    const parsedDate = new Date(dateString);
    if (!isNaN(parsedDate.getTime())) {
        return {
            start: parsedDate,
            end: parsedDate,
            isRange: false
        };
    }

    return null;
}

function formatDateRange(dateString) {
    const dateInfo = parseDate(dateString);
    if (!dateInfo) return dateString; // Fallback to original

    const months = ['January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'];

    if (!dateInfo.isRange) {
        // Single date: "October 15, 2026"
        return `${months[dateInfo.start.getMonth()]} ${dateInfo.start.getDate()}, ${dateInfo.start.getFullYear()}`;
    }

    const startMonth = dateInfo.start.getMonth();
    const endMonth = dateInfo.end.getMonth();
    const startDay = dateInfo.start.getDate();
    const endDay = dateInfo.end.getDate();
    const startYear = dateInfo.start.getFullYear();
    const endYear = dateInfo.end.getFullYear();

    // Same month and year: "October 15–17, 2025"
    if (startMonth === endMonth && startYear === endYear) {
        return `${months[startMonth]} ${startDay}–${endDay}, ${startYear}`;
    }

    // Different months, same year: "October 23–November 5, 2025"
    if (startYear === endYear) {
        return `${months[startMonth]} ${startDay}–${months[endMonth]} ${endDay}, ${startYear}`;
    }

    // Different years: "December 28, 2025–January 3, 2026"
    return `${months[startMonth]} ${startDay}, ${startYear}–${months[endMonth]} ${endDay}, ${endYear}`;
}

function isUpcomingEvent(dateString) {
    if (!dateString) return false;
    const dateInfo = parseDate(dateString);
    if (!dateInfo) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Event is upcoming if end date is today or in the future
    return dateInfo.end >= today;
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
            date: null,
            rawDate: {{ loc.date | default: post.date | jsonify }},
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
        date: null,
        rawDate: {{ post.date | jsonify }},
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
            date: null,
            rawDate: {{ loc.date | default: item.date | jsonify }},
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
        date: null,
        rawDate: {{ item.date | jsonify }},
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

function getMarkerColor(type, isUpcoming) {
    if (isUpcoming && type === 'digest') {
        const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
        return isDarkMode ? '#4ade80' : '#046A38';
    }

    const colors = {
        posts: '#cc0000',
        projects: '#75ade8',
        digest: '#046A38'
    };
    return colors[type] || '#cc0000';
}

function createCustomIcon(type, isUpcoming) {
    const color = getMarkerColor(type, isUpcoming);
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

    if (location.rawDate) {
        const formattedDate = formatDateRange(location.rawDate);
        html += `<div class="popup-date">${formattedDate}</div>`;
    } else if (location.date) {
        html += `<div class="popup-date">${location.date}</div>`;
    }

    html += `<div class="popup-meta">${typeLabel} • ${location.country.charAt(0).toUpperCase() + location.country.slice(1)}</div>`;
    html += `<div class="popup-excerpt">${location.description || location.excerpt}</div>`;
    html += `<a href="${location.url}" class="popup-link">Read more →</a>`;
    html += '</div>';

    return html;
}

locations.forEach(location => {
    const isUpcoming = location.type === 'digest' && isUpcomingEvent(location.rawDate);

    const marker = L.marker([location.lat, location.lng], {
        icon: createCustomIcon(location.type, false),
        country: location.country,
        type: location.type,
        rawDate: location.rawDate,
        isUpcoming: isUpcoming
    });

    marker.bindPopup(createPopupContent(location));

    markerClusters.addLayer(marker);
    markers.push(marker);
});

// ============================================
// Dropdown Functionality (Interactive Map)
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

// Also setup gallery dropdowns
setupDropdown('categoryDropdown', 'categoryMenu');
setupDropdown('countryDropdown', 'countryMenu');
setupDropdown('periodDropdown', 'periodMenu');

document.addEventListener('click', () => {
    document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.remove('show'));
    document.querySelectorAll('.dropdown-toggle').forEach(t => t.classList.remove('active'));
});

// ============================================
// Filter Functionality (Interactive Map)
// ============================================
let activeType = 'all';
let activeCountry = 'all';
let showUpcomingOnly = false;

function updateMarkers() {
    markerClusters.clearLayers();

    markers.forEach(marker => {
        const matchesType = activeType === 'all' || marker.options.type === activeType;
        const matchesCountry = activeCountry === 'all' || marker.options.country === activeCountry;
        const matchesUpcoming = !showUpcomingOnly ||
            (marker.options.type === 'digest' && marker.options.isUpcoming);

        if (matchesType && matchesCountry && matchesUpcoming) {
            if (showUpcomingOnly && marker.options.type === 'digest') {
                marker.setIcon(createCustomIcon(marker.options.type, true));
            } else {
                marker.setIcon(createCustomIcon(marker.options.type, false));
            }
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

// Initial marker state
updateMarkers();

// ============================================
// Gallery Filtering with Progressive Disabling
// ============================================
(function() {
    // Build map data structure for quick lookups
    const galleryData = [];
    document.querySelectorAll('.gallery-item').forEach(item => {
        galleryData.push({
            element: item,
            category: item.dataset.category,
            country: item.dataset.country,
            period: item.dataset.period
        });
    });

    const galleryFilters = {
        category: 'all',
        country: 'all',
        period: 'all'
    };

    let lastChangedFilter = null; // Track which filter was changed last

    // Get available values for a filter type given current selections
    function getAvailableValues(filterType) {
        const availableValues = new Set();
        
        galleryData.forEach(item => {
            // Check if item matches OTHER filters (not the one we're checking)
            let matches = true;
            
            if (filterType !== 'category' && galleryFilters.category !== 'all') {
                matches = matches && item.category === galleryFilters.category;
            }
            if (filterType !== 'country' && galleryFilters.country !== 'all') {
                matches = matches && item.country === galleryFilters.country;
            }
            if (filterType !== 'period' && galleryFilters.period !== 'all') {
                matches = matches && item.period === galleryFilters.period;
            }
            
            if (matches) {
                availableValues.add(item[filterType]);
            }
        });
        
        return availableValues;
    }

    // Update which dropdown options are enabled/disabled
    function updateDropdownStates() {
        ['category', 'country', 'period'].forEach(filterType => {
            const menu = document.getElementById(`${filterType}Menu`);
            if (!menu) return;
            
            const availableValues = getAvailableValues(filterType);
            
            menu.querySelectorAll('[data-gallery-filter]').forEach(btn => {
                const value = btn.dataset.value;
                
                if (value === 'all' || availableValues.has(value)) {
                    btn.classList.remove('disabled');
                } else {
                    btn.classList.add('disabled');
                }
            });
        });
    }

    // Update gallery display
    function updateGalleryDisplay() {
        galleryData.forEach(item => {
            const matchesCategory = galleryFilters.category === 'all' || item.category === galleryFilters.category;
            const matchesCountry = galleryFilters.country === 'all' || item.country === galleryFilters.country;
            const matchesPeriod = galleryFilters.period === 'all' || item.period === galleryFilters.period;

            if (matchesCategory && matchesCountry && matchesPeriod) {
                item.element.classList.remove('hidden');
            } else {
                item.element.classList.add('hidden');
            }
        });
        
        // Update dropdown states to disable unavailable options
        updateDropdownStates();
    }

    // Setup gallery filter buttons
    document.querySelectorAll('[data-gallery-filter]').forEach(btn => {
        btn.addEventListener('click', function() {
            // Don't allow clicking disabled options
            if (this.classList.contains('disabled')) {
                return;
            }
            
            const filterType = this.dataset.galleryFilter;
            const filterValue = this.dataset.value;

            // Update filter state
            galleryFilters[filterType] = filterValue;
            lastChangedFilter = filterType;

            // Update display
            updateGalleryDisplay();
        });
    });

    // Initialize
    updateGalleryDisplay();
})();
</script>
