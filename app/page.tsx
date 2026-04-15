"use client";
import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState("ogg");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!file) return alert("Pilih file dulu");

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("format", format);

      const res = await fetch("http://localhost:5000/convert", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Server error");

      setResult(data);
    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h1 className="text-xl font-bold mb-4 text-center">
          MJ Roblox Studio
        </h1>

        <input
          type="file"
          accept="audio/*"
          className="mb-3 w-full"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <select
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        >
          <option value="ogg">OGG (Default)</option>
          <option value="mp3">MP3</option>
          <option value="wav">WAV</option>
          <option value="flac">FLAC</option>
        </select>

        <button
          onClick={handleUpload}
          className="w-full bg-black text-white py-2 rounded"
        >
          {loading ? "Processing..." : "Convert"}
        </button>

        {error && (
          <p className="text-red-500 mt-3 text-sm">{error}</p>
        )}

        {result && (
          <div className="mt-4 p-3 border rounded text-sm">
            <p><b>Format:</b> {result.format}</p>
            <p><b>Speed:</b> 2.3x</p>
            <p><b>Amplify:</b> -4dB</p>
            <p><b>Backspeed:</b> {result.backspeed}</p>

            <a
              href={result.url}
              download
              className="block mt-3 text-blue-500 underline"
            >
              Download Audio
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
