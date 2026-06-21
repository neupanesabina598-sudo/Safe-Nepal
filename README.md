# Safe Nepal – Tourist Safety & Civic Reporting System

An interactive browser-based geospatial web application designed to improve tourism safety and civic grievance reporting across Nepal. Built with Leaflet.js for web mapping, Turf.js for spatial analysis, and modern web technologies for a responsive user experience.

## Project Overview

**Title:** Safe Nepal – Tourist Safety & Civic Reporting System

**Study Area:** Federal Democratic Republic of Nepal (7 Provinces, 77 Districts)

**Purpose:**
To provide a unified geospatial platform where tourists and local citizens can:

* Explore tourist destinations across Nepal
* Report safety concerns and civic issues with location information
* Perform spatial analysis directly in the browser
* Plan routes and access administrative boundary information
* Support authorities such as Tourist Police Nepal and Hello Sarkar through location-based reporting

---

## Key Technologies

| Layer                      | Technologies                   |
| -------------------------- | ------------------------------ |
| Frontend                   | HTML5, CSS3, JavaScript (ES6+) |
| Mapping                    | Leaflet.js 1.9.4               |
| Spatial Analysis           | Turf.js v6                     |
| Data Storage               | Browser LocalStorage           |
| Backend (Future Extension) | Node.js, Express.js            |
| Data Formats               | GeoJSON, JSON                  |

---

## Features

### Maps & Layers

#### Base Maps

* OpenStreetMap (OSM)
* Google Satellite
* OpenTopoMap (Topographic)
* CartoDB Dark Map

#### Administrative Boundary Layers

* Country Boundary
* Province Boundary
* District Boundary
* Municipality Boundary
* Ward Boundary

#### Tourism & Destination Layer

* Heritage Sites
* Religious Sites
* Major Cities
* Trekking Destinations
* National Tourism Attractions

---

## Spatial Analysis Tools (Turf.js)

### Distance Measurement

Calculate geodesic distance between two selected points.

### Buffer Analysis

Generate a 20 km safety or influence zone around any selected location.

### Nearest Location Finder

Identify the nearest tourist destination from a selected point.

### Area Calculator

Calculate polygon area directly on the map.

---

## Tourism & Reporting Tools

### Safety & Civic Reporting

Users can submit location-based reports including:

* Tourist Safety Issues
* Infrastructure Problems
* Public Complaints
* Emergency Situations
* Environmental Concerns

### Safety Levels

* Safe
* Moderate
* Danger

### Multi-Step Reporting Form

Collects:

* Location
* District
* Report Type
* Safety Level
* Rating
* Description
* Optional Photo

---

## Attribute & Navigation Tools

### Live Search

Search destinations, provinces, districts, municipalities, and wards.

### Explore Nepal

Quick navigation to:

* Kathmandu Durbar Square
* Bhaktapur Durbar Square
* Patan Durbar Square
* Pashupatinath Temple
* Boudhanath Stupa
* Swayambhunath
* Pokhara
* Chitwan
* Everest Region
* Lumbini

### Route Planning

Generate routes between selected locations with distance estimation.

### Dashboard & Statistics

Display:

* Total Reports
* Safe Reports
* Moderate Reports
* Danger Reports

### CSV Export

Download all submitted reports in CSV format.

---

## Running Locally

```bash
# Clone Repository
git clone https://github.com/your-repository/safe-nepal.git

# Open Project Folder
cd safe-nepal

# Run using VS Code Live Server
or

# Open index.html directly in browser
```

---

## Project Structure

```plaintext
safe-nepal/
│
├── index.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── app.js
│   ├── map.js
│   ├── spatial.js
│   ├── reports.js
│   └── routes.js
│
├── data/
│   ├── nepal_country.geojson
│   ├── provinces.geojson
│   ├── districts.geojson
│   ├── municipalities.geojson
│   ├── wards.geojson
│   └── destinations.json
│
├── assets/
│   ├── images/
│   └── icons/
│
├── README.md
│
└── logo.png
```

---

## Project Outcomes

### 4 Base Maps

OSM, Satellite, Topographic, Dark

### 5 Administrative Layers

Country, Province, District, Municipality, Ward

### 4 Spatial Analysis Tools

Distance, Buffer, Nearest Location, Area

### 7+ Attribute Tools

Search, Route Planning, Reporting, Dashboard, CSV Export, Explore Nepal, Filtering

---

## Future Enhancements

* Node.js + Express Backend Integration
* PostgreSQL/PostGIS Database
* Multi-user Authentication
* Real-time Reporting Dashboard
* Mobile Application
* Government Authority Integration
* Emergency Notification System
* AI-Based Risk Analysis

---

## Project Team

**Sabina Neupane**
Geomatics Engineering
Kathmandu University

**Dipesh Prajapati**
Geomatics Engineering
Kathmandu University

### Supervisor

**Er. Suman Baral**

---

### Motto

**"Mapping Accountability Across Nepal"**
