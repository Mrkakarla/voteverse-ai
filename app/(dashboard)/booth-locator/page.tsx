"use client";

import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const hasMapsKey = Boolean(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);

export default function BoothLocatorPage() {
  const [voterId, setVoterId] = useState("");
  const [loc, setLoc] = useState({ lat: 19.076, lng: 72.8777 });
  const [selectedBooth, setSelectedBooth] = useState<{ name: string; lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition((p) => setLoc({ lat: p.coords.latitude, lng: p.coords.longitude }));
  }, []);

  const booths = useMemo(
    () => [
      { name: "Govt School Booth", lat: loc.lat + 0.01, lng: loc.lng + 0.01 },
      { name: "Community Hall", lat: loc.lat - 0.008, lng: loc.lng + 0.004 },
      { name: "Ward Office", lat: loc.lat + 0.005, lng: loc.lng - 0.01 },
    ],
    [loc],
  );

  const findBooth = () => {
    const trimmedId = voterId.trim();
    if (!trimmedId) {
      toast.error("Enter a voter ID first");
      return;
    }

    const boothIndex = trimmedId.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0) % booths.length;
    const booth = booths[boothIndex];
    setSelectedBooth(booth);
    setLoc({ lat: booth.lat, lng: booth.lng });
    toast.success(`Showing ${booth.name}`);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Booth Locator</h2>
      <div className="card flex gap-2 p-4">
        <Input value={voterId} onChange={(e) => setVoterId(e.target.value)} placeholder="Enter voter ID" />
        <Button type="button" onClick={findBooth}>Find My Booth</Button>
      </div>

      {selectedBooth && (
        <div className="card p-4">
          <p className="text-sm text-slate-500">Nearest booth found</p>
          <p className="text-lg font-semibold">{selectedBooth.name}</p>
          <p className="text-sm text-slate-600">Coordinates: {selectedBooth.lat.toFixed(4)}, {selectedBooth.lng.toFixed(4)}</p>
        </div>
      )}

      {hasMapsKey ? (
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
          <GoogleMap mapContainerStyle={{ width: "100%", height: "420px" }} center={loc} zoom={12}>
            <MarkerF position={loc} />
            {booths.map((b) => <MarkerF key={b.name} position={{ lat: b.lat, lng: b.lng }} />)}
          </GoogleMap>
        </LoadScript>
      ) : (
        <div className="card p-4 text-sm text-slate-600">
          Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to enable the live map. Booth lookup still works and will identify a nearby booth below.
        </div>
      )}

      {!hasMapsKey && (
        <div className="grid gap-2 md:grid-cols-3">
          {booths.map((booth) => (
            <div key={booth.name} className="card p-3 text-sm">
              <p className="font-semibold">{booth.name}</p>
              <p className="text-slate-600">{booth.lat.toFixed(3)}, {booth.lng.toFixed(3)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
