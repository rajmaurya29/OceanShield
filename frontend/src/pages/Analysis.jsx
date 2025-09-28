import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
} from "react-leaflet";
import L from "leaflet";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "leaflet/dist/leaflet.css";

// Priority colors
const priorityColors = {
  High: "red",
  Medium: "orange",
  Low: "green",
  Critical: "purple",
};

// Category colors
const categoryColors = {
  Tsunami: "#ff4d6d",
  "Storm Surge": "#ff7f50",
  "High Waves": "#1e90ff",
  "Swell Surge": "#00bcd4",
  "Coastal Flooding": "#0077b6",
  "Coastal Currents": "#48cae4",
  "Abnormal Sea Behaviour": "#90e0ef",
  "Coastal Erosion / Damage": "#6a4c93",
  "Social Media Trends": "#f4a261",
};

// Custom pin icon generator
function createPinIcon(priority) {
  return L.divIcon({
    className: "custom-pin",
    html: `
      <div style="
        background:${priorityColors[priority]};
        width:20px;
        height:20px;
        border-radius:50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 2px solid white;
      "></div>
    `,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -30],
  });
}

// 20 problem data around New Delhi
const problemData = [
  {
    id: 1,
    title: "Sea Retreat Observed",
    category: "Tsunami",
    priority: "Critical",
    lat: 13.0827,
    lng: 80.2707, // Chennai Marina Beach
  },
  {
    id: 2,
    title: "Cyclone Surge Flooding",
    category: "Storm Surge",
    priority: "High",
    lat: 9.9312,
    lng: 76.2673, // Kochi
  },
  {
    id: 3,
    title: "Fishing Boats Struggling",
    category: "High Waves",
    priority: "Medium",
    lat: 17.6868,
    lng: 83.2185, // Visakhapatnam
  },
  {
    id: 4,
    title: "Beach Road Flooded",
    category: "Swell Surge",
    priority: "High",
    lat: 12.9141,
    lng: 74.8560, // Mangaluru
  },
  {
    id: 5,
    title: "Water Entering Houses",
    category: "Coastal Flooding",
    priority: "Critical",
    lat: 8.5241,
    lng: 76.9366, // Thiruvananthapuram
  },
  {
    id: 6,
    title: "Strong Rip Currents",
    category: "Coastal Currents",
    priority: "High",
    lat: 19.8135,
    lng: 85.8312, // Puri Beach
  },
  {
    id: 7,
    title: "Unusual Bubbling Water",
    category: "Abnormal Sea Behaviour",
    priority: "Medium",
    lat: 21.6278,
    lng: 87.5076, // Digha, West Bengal
  },
  {
    id: 8,
    title: "Sand Dunes Washed Away",
    category: "Coastal Erosion / Damage",
    priority: "High",
    lat: 15.5527,
    lng: 73.7517, // Baga Beach, Goa
  },
  {
    id: 9,
    title: "Cyclone Alert Trending",
    category: "Social Media Trends",
    priority: "Low",
    lat: 18.5204,
    lng: 73.8567, // Pune (monitoring centre inland)
  },
  {
    id: 10,
    title: "High Waves Near Lighthouse",
    category: "High Waves",
    priority: "High",
    lat: 10.5667,
    lng: 72.6417, // Minicoy, Lakshadweep
  },
  {
    id: 11,
    title: "Coastal Flooded Farmlands",
    category: "Coastal Flooding",
    priority: "Critical",
    lat: 22.5726,
    lng: 88.3639, // Sundarbans near Kolkata
  },
  {
    id: 12,
    title: "Swell Surge in Jetty Area",
    category: "Swell Surge",
    priority: "Medium",
    lat: 11.7401,
    lng: 92.6586, // Port Blair, Andamans
  },
  {
    id: 13,
    title: "Abnormal Foam on Sea",
    category: "Abnormal Sea Behaviour",
    priority: "Low",
    lat: 13.3409,
    lng: 74.7421, // Udupi, Karnataka
  },
  {
    id: 14,
    title: "Erosion Threatening Road",
    category: "Coastal Erosion / Damage",
    priority: "High",
    lat: 9.4981,
    lng: 76.3388, // Alleppey, Kerala
  },
  {
    id: 15,
    title: "Fishermen Pulled by Currents",
    category: "Coastal Currents",
    priority: "Critical",
    lat: 22.3107,
    lng: 69.0144, // Okha, Gujarat
  },
  {
    id: 16,
    title: "Storm Surge Damaged Huts",
    category: "Storm Surge",
    priority: "High",
    lat: 20.9517,
    lng: 85.0985, // Jagatsinghpur, Odisha
  },
  {
    id: 17,
    title: "Sea Water Receding Rapidly",
    category: "Tsunami",
    priority: "Critical",
    lat: 11.6234,
    lng: 92.7265, // Nicobar Islands
  },
  {
    id: 18,
    title: "High Wave Warnings",
    category: "High Waves",
    priority: "Medium",
    lat: 23.2410,
    lng: 69.6669, // Mandvi Beach, Gujarat
  },
  {
    id: 19,
    title: "Social Media Flood Reports",
    category: "Social Media Trends",
    priority: "Low",
    lat: 28.6139,
    lng: 77.2090, // Delhi (HQ monitoring feed)
  },
  {
    id: 20,
    title: "Coastal Erosion at Fishing Village",
    category: "Coastal Erosion / Damage",
    priority: "High",
    lat: 20.2961,
    lng: 85.8245, // Konark, Odisha
  },
  {
    id: 21,
    title: "Unusual Sea Retreat at Juhu Beach",
    category: "Tsunami",
    priority: "Critical",
    lat: 19.0989,
    lng: 72.8260, // Juhu Beach
  },
  {
    id: 22,
    title: "Storm Surge Flooding in Colaba",
    category: "Storm Surge",
    priority: "High",
    lat: 18.9076,
    lng: 72.8140, // Colaba
  },
  {
    id: 23,
    title: "High Waves at Marine Drive",
    category: "High Waves",
    priority: "Medium",
    lat: 18.9432,
    lng: 72.8237, // Marine Drive
  },
  {
    id: 24,
    title: "Swell Surge in Worli Sea Face",
    category: "Swell Surge",
    priority: "High",
    lat: 18.9910,
    lng: 72.8176, // Worli
  },
  {
    id: 25,
    title: "Flooded Houses in Versova",
    category: "Coastal Flooding",
    priority: "Critical",
    lat: 19.1340,
    lng: 72.8124, // Versova
  },
  {
    id: 26,
    title: "Dangerous Rip Currents near Gorai",
    category: "Coastal Currents",
    priority: "High",
    lat: 19.2500,
    lng: 72.7830, // Gorai Beach
  },
  {
    id: 27,
    title: "Foamy Sea Water at Mahim",
    category: "Abnormal Sea Behaviour",
    priority: "Medium",
    lat: 19.0436,
    lng: 72.8401, // Mahim
  },
  {
    id: 28,
    title: "Erosion Threat at Madh Island",
    category: "Coastal Erosion / Damage",
    priority: "High",
    lat: 19.1801,
    lng: 72.7956, // Madh Island
  },
  {
    id: 29,
    title: "Social Media Flooding Alerts",
    category: "Social Media Trends",
    priority: "Low",
    lat: 18.9750,
    lng: 72.8258, // South Mumbai
  },
  {
    id: 30,
    title: "High Waves Crashing on Bandra Fort",
    category: "High Waves",
    priority: "High",
    lat: 19.0466,
    lng: 72.8194, // Bandra Fort
  },
  {
    id: 31,
    title: "Storm Surge at Gateway of India",
    category: "Storm Surge",
    priority: "Critical",
    lat: 18.9220,
    lng: 72.8347, // Gateway of India
  },
  {
    id: 32,
    title: "Sea Water Overflow at Haji Ali",
    category: "Coastal Flooding",
    priority: "High",
    lat: 18.9716,
    lng: 72.8087, // Haji Ali
  },
  {
    id: 33,
    title: "Sudden Swell at Girgaon Chowpatty",
    category: "Swell Surge",
    priority: "Medium",
    lat: 18.9543,
    lng: 72.8128, // Chowpatty
  },
  {
    id: 34,
    title: "Sand Loss in Aksa Beach",
    category: "Coastal Erosion / Damage",
    priority: "High",
    lat: 19.1810,
    lng: 72.7950, // Aksa Beach
  },
  {
    id: 35,
    title: "Rip Currents at Manori",
    category: "Coastal Currents",
    priority: "Critical",
    lat: 19.2150,
    lng: 72.7900, // Manori
  },
  {
    id: 36,
    title: "Foam Layer on Arabian Sea",
    category: "Abnormal Sea Behaviour",
    priority: "Low",
    lat: 19.0300,
    lng: 72.8200, // Near Bandra Sea
  },
  {
    id: 37,
    title: "Coastal Flooding in Navi Mumbai",
    category: "Coastal Flooding",
    priority: "High",
    lat: 19.0330,
    lng: 73.0297, // Navi Mumbai
  },
  {
    id: 38,
    title: "Tsunami Drill Alert",
    category: "Tsunami",
    priority: "Medium",
    lat: 18.9500,
    lng: 72.8200, // South Mumbai (training alert)
  },
  {
    id: 39,
    title: "Storm Surge in Alibaug",
    category: "Storm Surge",
    priority: "High",
    lat: 18.6416,
    lng: 72.8722, // Alibaug, Raigad
  },
  {
    id: 40,
    title: "High Waves in Murud Beach",
    category: "High Waves",
    priority: "Medium",
    lat: 18.3286,
    lng: 72.9646, // Murud, Raigad
  },
];
// Chart data: problems by year & category
const chartData = [
  { 
    year: 2019, 
    Tsunami: 2, 
    "Storm Surge": 3, 
    "High Waves": 4, 
    "Swell Surge": 2, 
    "Coastal Flooding": 3, 
    "Coastal Currents": 2, 
    "Abnormal Sea Behaviour": 1, 
    "Coastal Erosion / Damage": 2, 
    "Social Media Trends": 1 
  },
  { 
    year: 2020, 
    Tsunami: 3, 
    "Storm Surge": 4, 
    "High Waves": 6, 
    "Swell Surge": 3, 
    "Coastal Flooding": 4, 
    "Coastal Currents": 3, 
    "Abnormal Sea Behaviour": 2, 
    "Coastal Erosion / Damage": 3, 
    "Social Media Trends": 2 
  },
  { 
    year: 2021, 
    Tsunami: 4, 
    "Storm Surge": 6, 
    "High Waves": 7, 
    "Swell Surge": 4, 
    "Coastal Flooding": 6, 
    "Coastal Currents": 5, 
    "Abnormal Sea Behaviour": 3, 
    "Coastal Erosion / Damage": 4, 
    "Social Media Trends": 3 
  },
  { 
    year: 2022, 
    Tsunami: 5, 
    "Storm Surge": 8, 
    "High Waves": 9, 
    "Swell Surge": 6, 
    "Coastal Flooding": 7, 
    "Coastal Currents": 6, 
    "Abnormal Sea Behaviour": 4, 
    "Coastal Erosion / Damage": 6, 
    "Social Media Trends": 5 
  },
  { 
    year: 2023, 
    Tsunami: 6, 
    "Storm Surge": 10, 
    "High Waves": 12, 
    "Swell Surge": 8, 
    "Coastal Flooding": 9, 
    "Coastal Currents": 7, 
    "Abnormal Sea Behaviour": 5, 
    "Coastal Erosion / Damage": 8, 
    "Social Media Trends": 7 
  },
];

export default function Analysis() {
  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h2 className="text-2xl font-bold mb-4">📊 Coastal Hazard Analysis Dashboard</h2>

      {/* Map */}
      <div className="h-[500px] rounded-lg overflow-hidden mb-8 shadow-lg border border-gray-700">
        <MapContainer
          center={[18.9200, 72.8300]} // Mumbai as center
          zoom={6}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {problemData.map((p) => (
            <Marker
              key={p.id}
              position={[p.lat, p.lng]}
              icon={createPinIcon(p.priority)}
            >
              <Tooltip direction="top" offset={[0, -20]} opacity={1} className="custom-tooltip">
                <div>
                  <b>{p.title}</b> <br />
                  Category:{" "}
                  <span style={{ color: categoryColors[p.category] }}>{p.category}</span>
                  <br />
                  Priority:{" "}
                  <span style={{ color: priorityColors[p.priority], fontWeight: "bold" }}>
                    {p.priority}
                  </span>
                </div>
              </Tooltip>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Line Chart */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700">
        <h3 className="text-xl font-semibold mb-4">📈 Hazards by Category Over Years</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="year" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <RechartsTooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", color: "#fff" }} />
            <Legend />
            {Object.keys(categoryColors).map((cat) => (
              <Line
                key={cat}
                type="monotone"
                dataKey={cat}
                stroke={categoryColors[cat]}
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Tooltip Styling */}
      <style>{`
        .leaflet-tooltip.custom-tooltip {
          background-color: #1e293b;
          color: white;
          border: 1px solid #334155;
          border-radius: 8px;
          padding: 6px 10px;
          font-size: 12px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.4);
        }
      `}</style>
    </div>
  );
}
