import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet with Vite
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// @ts-expect-error - Leaflet icon fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const deliveryZones = [
  { name: 'Floristería Alex (Cunit)', lat: 41.1984, lng: 1.6347, isMain: true },
  { name: 'Cubelles', lat: 41.2058, lng: 1.6764 },
  { name: 'Segur de Calafell', lat: 41.1875, lng: 1.5583 },
  { name: 'Calafell', lat: 41.2000, lng: 1.5667 },
  { name: 'El Vendrell', lat: 41.2167, lng: 1.5333 },
  { name: 'Vilanova i la Geltrú', lat: 41.2236, lng: 1.7264 },
  { name: 'Sitges', lat: 41.2372, lng: 1.8117 },
  { name: 'Vilafranca del Penedès', lat: 41.3458, lng: 1.6972 },
  { name: 'Sant Sadurní d\'Anoia', lat: 41.4250, lng: 1.7833 },
];

export default function DeliveryMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map centered on Cunit
    const map = L.map(mapRef.current, {
      center: [41.25, 1.65],
      zoom: 10,
      scrollWheelZoom: false,
    });

    mapInstanceRef.current = map;

    // Add custom styled tiles (CartoDB Positron for a clean look)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20,
    }).addTo(map);

    // Custom icon for main location
    const mainIcon = L.divIcon({
      className: 'custom-marker',
      html: `
        <div style="
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #445534 0%, #667a54 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(68, 85, 52, 0.4);
          border: 3px solid white;
        ">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
          </svg>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    });

    // Custom icon for delivery zones
    const zoneIcon = L.divIcon({
      className: 'custom-marker',
      html: `
        <div style="
          width: 24px;
          height: 24px;
          background: #8da574;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(141, 165, 116, 0.4);
          border: 2px solid white;
        ">
        </div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });

    // Add markers for each zone
    deliveryZones.forEach((zone) => {
      const marker = L.marker([zone.lat, zone.lng], {
        icon: zone.isMain ? mainIcon : zoneIcon,
      }).addTo(map);

      marker.bindPopup(`
        <div style="font-family: system-ui; padding: 4px;">
          <strong style="color: #343e2d; font-size: 14px;">${zone.name}</strong>
          ${zone.isMain ? '<br><span style="color: #667a54; font-size: 12px;">📍 Nuestra tienda</span>' : ''}
        </div>
      `);
    });

    // Draw delivery area circle
    L.circle([41.22, 1.65], {
      radius: 25000,
      color: '#8da574',
      fillColor: '#8da574',
      fillOpacity: 0.1,
      weight: 2,
      dashArray: '5, 10',
    }).addTo(map);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-lg border border-olive-100">
      <div
        ref={mapRef}
        className="h-[400px] w-full"
        style={{ zIndex: 1 }}
      />
      {/* Map overlay info */}
      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg border border-olive-100 z-[1000]">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-3 h-3 rounded-full bg-olive-700 border-2 border-white shadow"></div>
          <span className="font-medium text-olive-800">Floristería Alex</span>
        </div>
        <div className="flex items-center gap-2 text-sm mt-1">
          <div className="w-3 h-3 rounded-full bg-primary-400 border-2 border-white shadow"></div>
          <span className="text-olive-600">Zona de reparto</span>
        </div>
      </div>
    </div>
  );
}
