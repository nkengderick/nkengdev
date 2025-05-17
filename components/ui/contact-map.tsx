"use client";

import { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContactMapProps {
  className?: string;
  location?: {
    lat: number;
    lng: number;
    zoom?: number;
    name?: string;
  };
}

export function ContactMap({
  className,
  location = {
    lat: 4.1537, // Buea, Cameroon coordinates
    lng: 9.292,
    zoom: 14,
    name: "Molyko, Buea, Cameroon",
  },
}: ContactMapProps) {
  const t = useTranslations("contact.map");
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);

  useEffect(() => {
    // Function to initialize Google Maps
    const initMap = () => {
      if (!mapContainerRef.current) return;

      const mapOptions = {
        center: { lat: location.lat, lng: location.lng },
        zoom: location.zoom || 14,
        styles: [
          {
            featureType: "all",
            elementType: "labels.text.fill",
            stylers: [{ color: "#6c757d" }],
          },
          {
            featureType: "all",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#ffffff" }, { lightness: 15 }],
          },
          {
            featureType: "administrative",
            elementType: "geometry.fill",
            stylers: [{ color: "#f8f9fa" }],
          },
          {
            featureType: "administrative.country",
            elementType: "geometry.stroke",
            stylers: [{ color: "#dee2e6" }, { weight: 1.2 }],
          },
          {
            featureType: "administrative.land_parcel",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
          {
            featureType: "administrative.locality",
            elementType: "labels.text.fill",
            stylers: [{ color: "#3a86ff" }],
          },
          {
            featureType: "poi",
            elementType: "geometry",
            stylers: [{ color: "#e9ecef" }],
          },
          {
            featureType: "poi",
            elementType: "labels.text",
            stylers: [{ visibility: "simplified" }],
          },
          {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [{ color: "#6c757d" }],
          },
          {
            featureType: "poi.business",
            stylers: [{ visibility: "off" }],
          },
          {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [{ color: "#d8f3dc" }],
          },
          {
            featureType: "poi.park",
            elementType: "labels.text",
            stylers: [{ visibility: "off" }],
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#ffffff" }],
          },
          {
            featureType: "road",
            elementType: "labels.icon",
            stylers: [{ visibility: "off" }],
          },
          {
            featureType: "road.arterial",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
          {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [{ color: "#ced4da" }],
          },
          {
            featureType: "road.highway",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
          {
            featureType: "road.local",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
          {
            featureType: "transit",
            stylers: [{ visibility: "off" }],
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#c8e7fb" }],
          },
        ],
        disableDefaultUI: true,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true,
      };

      // Create new map instance
      mapRef.current = new google.maps.Map(mapContainerRef.current, mapOptions);

      // Custom marker icon
      const customIcon = {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: "#3B82F6",
        fillOpacity: 1,
        strokeWeight: 2,
        strokeColor: "#FFFFFF",
        scale: 10,
      };

      // Create marker
      markerRef.current = new google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map: mapRef.current,
        title: location.name || "My Location",
        animation: google.maps.Animation.DROP,
        icon: customIcon,
      });

      // Create info window
      const infoWindow = new google.maps.InfoWindow({
        content: `<div style="padding: 8px; text-align: center;">
          <h5 style="margin: 0 0 4px; font-weight: bold;">${
            location.name || "My Location"
          }</h5>
          <p style="margin: 0; font-size: 12px;">Nkengbeza Derick</p>
        </div>`,
      });

      // Open info window on marker click
      markerRef.current.addListener("click", () => {
        infoWindow.open(mapRef.current, markerRef.current);
      });

      // Initially open the info window
      setTimeout(() => {
        infoWindow.open(mapRef.current, markerRef.current);
      }, 1000);
    };

    // Load Google Maps API dynamically
    const loadGoogleMapsApi = () => {
      const googleMapsApiScript = document.getElementById("google-maps-api");

      if (!googleMapsApiScript) {
        const script = document.createElement("script");
        script.id = "google-maps-api";
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&callback=initMap`;
        script.defer = true;
        script.async = true;

        window.initMap = initMap;

        document.head.appendChild(script);
      } else if (window.google && window.google.maps) {
        initMap();
      }
    };

    loadGoogleMapsApi();

    return () => {
      // Clean up
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }
      delete window.initMap;
    };
  }, [location]);

  return (
    <div className={cn("relative", className)}>
      <div
        ref={mapContainerRef}
        className="w-full h-80 md:h-96 rounded-xl overflow-hidden shadow-md border border-border/50"
      ></div>

      {/* Fallback content if map doesn't load */}
      <div className="absolute inset-0 flex items-center justify-center bg-card/50 backdrop-blur-sm opacity-0 invisible group-[.map-error]:opacity-100 group-[.map-error]:visible transition-opacity">
        <div className="text-center p-4">
          <MapPin className="w-10 h-10 text-primary mx-auto mb-2" />
          <p className="font-medium mb-1">{location.name || "My Location"}</p>
          <p className="text-sm text-muted-foreground">{t("fallback")}</p>
        </div>
      </div>
    </div>
  );
}
