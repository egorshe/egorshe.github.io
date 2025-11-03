---
layout: default
title: Maps
permalink: /maps/
---

<!-- Leaflet CSS -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css" />

<h1 class="page-title">Maps</h1>
<p class="page-intro">
    Explore Baltic research through geography. Click markers on the interactive map to discover posts and projects connected to specific locations across Estonia, Latvia, Lithuania, and beyond.
</p>

<div class="map-container">
    <div class="map-controls">
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
    </div>

    <div id="map"></div>
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

<script>
// ============================================
// Map Initialization
// ============================================
const map = L.map('map', {
    zoomControl: false  // Disable default zoom control
}).setView([57.5, 25.0], 6);

// Add zoom control to right side (will be centered with CSS)
L.control.zoom({
    position: 'bottomright'
}).addTo(map);

// CartoDB Positron - Clean, minimal style perfect for academic use
// Theme switching handled automatically by CSS
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap contributors © CARTO',
    maxZoom: 19
}).addTo(map);

// ============================================
// Generate locations from Jekyll posts
// Supports both old (lat/lng) and new (coords) formats
// Supports single location and multiple locations per post
// ============================================

// Helper function to parse coordinates
function parseCoords(loc) {
    // New format: coords string "56.9496, 24.1052" or array [56.9496, 24.1052]
    if (loc.coords) {
        if (typeof loc.coords === 'string') {
            const parts = loc.coords.split(',').map(s => parseFloat(s.trim()));
            return { lat: parts[0], lng: parts[1] };
        } else if (Array.isArray(loc.coords)) {
            return { lat: loc.coords[0], lng: loc.coords[1] };
        }
    }
    // Old format: separate lat/lng
    return { lat: loc.lat, lng: loc.lng };
}

const locations = [
    // Posts with multiple locations (conferences, events spanning cities)
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
            description: {{ loc.description | default: post.excerpt | strip_html | truncatewords: 15 | jsonify }},
            url: {{ post.url | jsonify }}
        },
        {% endfor %}
    {% elsif post.location %}
    // Posts with single location (backward compatibility)
    {
        title: {{ post.title | jsonify }},
        lat: {{ post.location.coords[0] | default: post.location.lat }},
        lng: {{ post.location.coords[1] | default: post.location.lng }},
        coords: {{ post.location.coords | jsonify }},
        country: {{ post.location.country | jsonify }},
        type: "posts",
        excerpt: {{ post.excerpt | strip_html | truncatewords: 20 | jsonify }},
        url: {{ post.url | jsonify }}
    },
    {% endif %}
    {% endfor %}

    // Projects (typically single location)
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

    // Digest with multiple locations (conferences, festivals)
    {% for item in site.digest %}
    {% if item.locations %}
        {% for loc in item.locations %}
        {
            title: {{ item.title | jsonify }},
            subtitle: {{ loc.venue | default: loc.city | jsonify }},
            lat: {{ loc.coords[0] | default: loc.lat }},
            lng: {{ loc.coords[1] | default: loc.lng }},
            coords: {{ loc.coords | jsonify }},
            country: {{ loc.country | jsonify }},
            type: "digest",
            date: {{ loc.date | default: item.date | date: "%B %d, %Y" | jsonify }},
            description: {{ loc.description | default: item.excerpt | strip_html | truncatewords: 15 | jsonify }},
            url: {{ item.url | jsonify }}
        },
        {% endfor %}
    {% elsif item.location %}
    // Digest with single location (backward compatibility)
    {
        title: {{ item.title | jsonify }},
        lat: {{ item.location.coords[0] | default: item.location.lat }},
        lng: {{ item.location.coords[1] | default: item.location.lng }},
        coords: {{ item.location.coords | jsonify }},
        country: {{ item.location.country | jsonify }},
        type: "digest",
        excerpt: {{ item.excerpt | strip_html | truncatewords: 20 | jsonify }},
        url: {{ item.url | jsonify }}
    },
    {% endif %}
    {% endfor %}
].filter(loc => loc.title); // Remove empty entries

// Parse coordinates from either format
locations.forEach(location => {
    if (location.coords && !location.lat) {
        const parsed = parseCoords(location);
        location.lat = parsed.lat;
        location.lng = parsed.lng;
    }
});

// ============================================
// Marker Creation
// ============================================
let markers = [];

function getMarkerColor(type) {
    const colors = {
        posts: '#cc0000',
        projects: '#75ade8',
        digest: '#ee802f'
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

locations.forEach(location => {
    const marker = L.marker([location.lat, location.lng], {
        icon: createCustomIcon(location.type),
        country: location.country,
        type: location.type
    }).addTo(map);

    const typeLabel = location.type === 'posts' ? 'Field Notes' :
                     location.type.charAt(0).toUpperCase() + location.type.slice(1);

    // Build popup content with support for multiple location fields
    let popupHTML = '<div class="marker-popup">';
    popupHTML += `<div class="popup-title">${location.title}</div>`;

    // Show venue/city if available (for multi-location posts)
    if (location.subtitle) {
        popupHTML += `<div class="popup-venue">${location.subtitle}</div>`;
    }

    // Show date if available (for events/conferences)
    if (location.date) {
        popupHTML += `<div class="popup-date">${location.date}</div>`;
    }

    popupHTML += `<div class="popup-meta">${typeLabel} • ${location.country.charAt(0).toUpperCase() + location.country.slice(1)}</div>`;
    popupHTML += `<div class="popup-excerpt">${location.description || location.excerpt}</div>`;
    popupHTML += `<a href="${location.url}" class="popup-link">Read more →</a>`;
    popupHTML += '</div>';

    marker.bindPopup(popupHTML);
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

        // Close all dropdowns
        document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.remove('show'));
        document.querySelectorAll('.dropdown-toggle').forEach(t => t.classList.remove('active'));

        // Toggle current dropdown
        if (!isOpen) {
            menu.classList.add('show');
            toggle.classList.add('active');
        }
    });

    items.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();

            // Update active state
            items.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            // Update button text
            toggle.textContent = item.textContent;

            // Close dropdown
            menu.classList.remove('show');
            toggle.classList.remove('active');
        });
    });
}

setupDropdown('typeDropdown', 'typeMenu');
setupDropdown('locationDropdown', 'locationMenu');

// Close dropdowns when clicking outside
document.addEventListener('click', () => {
    document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.remove('show'));
    document.querySelectorAll('.dropdown-toggle').forEach(t => t.classList.remove('active'));
});

// ============================================
// Filter Functionality
// ============================================
let activeType = 'all';
let activeCountry = 'all';

function updateMarkers() {
    markers.forEach(marker => {
        const matchesType = activeType === 'all' || marker.options.type === activeType;
        const matchesCountry = activeCountry === 'all' || marker.options.country === activeCountry;

        if (matchesType && matchesCountry) {
            marker.addTo(map);
        } else {
            map.removeLayer(marker);
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
</script>
