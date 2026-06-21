const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

console.log('🚀 Starting SafeKTM Server...');

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Check if frontend folder exists
const frontendPath = path.join(__dirname, '../frontend');
console.log(`📁 Frontend path: ${frontendPath}`);

if (fs.existsSync(frontendPath)) {
  console.log('✅ Frontend folder found');
  app.use(express.static(frontendPath));
} else {
  console.log('⚠️ Frontend folder not found at:', frontendPath);
}

// Data file path
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'reports.json');

console.log(`📊 Data directory: ${DATA_DIR}`);

// Initialize data file
if (!fs.existsSync(DATA_DIR)) {
  console.log('📁 Creating data directory...');
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

if (!fs.existsSync(DATA_FILE)) {
  console.log('📄 Creating data file...');
  fs.writeFileSync(DATA_FILE, JSON.stringify({ reports: [] }, null, 2));
}

// Read reports
function readReports() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('❌ Error reading reports:', error.message);
    return { reports: [] };
  }
}

// Write reports
function writeReports(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('❌ Error writing reports:', error.message);
    return false;
  }
}

// ─── API ENDPOINTS ───

// Get all reports
app.get('/api/reports', (req, res) => {
  console.log('📋 GET /api/reports');
  const data = readReports();
  res.json(data);
});

// Get statistics
app.get('/api/stats', (req, res) => {
  console.log('📊 GET /api/stats');
  const data = readReports();
  const reports = data.reports;
  const stats = {
    total: reports.length,
    danger: reports.filter(r => r.safety === 'danger').length,
    moderate: reports.filter(r => r.safety === 'moderate').length,
    safe: reports.filter(r => r.safety === 'safe').length,
    byType: {}
  };
  reports.forEach(r => {
    if (r.types && Array.isArray(r.types)) {
      r.types.forEach(type => {
        stats.byType[type] = (stats.byType[type] || 0) + 1;
      });
    }
  });
  res.json(stats);
});

// Create a new report
app.post('/api/reports', (req, res) => {
  console.log('📝 POST /api/reports');
  const data = readReports();
  const newReport = {
    id: Date.now(),
    ...req.body,
    createdAt: new Date().toISOString()
  };
  data.reports.push(newReport);
  if (writeReports(data)) {
    console.log(`✅ Report ${newReport.id} created`);
    res.status(201).json(newReport);
  } else {
    console.log('❌ Failed to save report');
    res.status(500).json({ error: 'Failed to save report' });
  }
});

// Delete a report
app.delete('/api/reports/:id', (req, res) => {
  console.log(`🗑️ DELETE /api/reports/${req.params.id}`);
  const data = readReports();
  const index = data.reports.findIndex(r => r.id === parseInt(req.params.id));
  if (index === -1) {
    console.log(`❌ Report ${req.params.id} not found`);
    return res.status(404).json({ error: 'Report not found' });
  }
  data.reports.splice(index, 1);
  if (writeReports(data)) {
    console.log(`✅ Report ${req.params.id} deleted`);
    res.json({ message: 'Report deleted successfully' });
  } else {
    console.log('❌ Failed to delete report');
    res.status(500).json({ error: 'Failed to delete report' });
  }
});

// Get reports by district
app.get('/api/reports/district/:district', (req, res) => {
  console.log(`🏛️ GET /api/reports/district/${req.params.district}`);
  const data = readReports();
  const district = req.params.district.toLowerCase();
  const filtered = data.reports.filter(r => 
    r.district && r.district.toLowerCase() === district
  );
  res.json({ reports: filtered });
});

// Get reports by safety level
app.get('/api/reports/safety/:level', (req, res) => {
  console.log(`🟢 GET /api/reports/safety/${req.params.level}`);
  const data = readReports();
  const level = req.params.level;
  const filtered = data.reports.filter(r => r.safety === level);
  res.json({ reports: filtered });
});

// Get nearby reports (simple version)
app.get('/api/reports/nearby', (req, res) => {
  const { lat, lng, radius } = req.query;
  if (!lat || !lng || !radius) {
    return res.status(400).json({ error: 'Missing parameters' });
  }
  
  console.log(`📍 GET /api/reports/nearby?lat=${lat}&lng=${lng}&radius=${radius}`);
  const data = readReports();
  const nearby = data.reports.filter(r => {
    const d = calculateDistance(
      parseFloat(lat), parseFloat(lng),
      r.lat, r.lng
    );
    return d <= parseFloat(radius);
  });
  res.json({ reports: nearby });
});

// Helper: Calculate distance between two points (in km)
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Serve the main HTML file
app.get('/', (req, res) => {
  console.log('🏠 GET /');
  const indexPath = path.join(__dirname, '../frontend/index.html');
  console.log(`📄 Serving: ${indexPath}`);
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    console.log('❌ index.html not found!');
    res.status(404).send('Frontend not found. Please create frontend/index.html');
  }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log('');
  console.log('═══════════════════════════════════════════════');
  console.log('🚀 SafeKTM Server Started Successfully!');
  console.log('═══════════════════════════════════════════════');
  console.log(`🌐 Server: http://localhost:${PORT}`);
  console.log(`📁 Data file: ${DATA_FILE}`);
  console.log(`📁 Frontend: ${frontendPath}`);
  console.log('═══════════════════════════════════════════════');
  console.log('');
  console.log('Press Ctrl+C to stop the server');
});

// Error handling
app.on('error', (error) => {
  console.error('❌ Server error:', error.message);
});

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught exception:', error.message);
});