"use client";
import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState(null);
  const [format, setFormat] = useState("ogg");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  async function handleUpload() {
    if (!file) {
      alert("Pilih file dulu");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("format", format);

      const res = await fetch("https://mj-backend-production-65b0.up.railway.app/convert", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error("Server error");
      }

      setResult(data);
    } catch (e) {
      setError("Terjadi error");
    }

    setLoading(false);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>MJ Roblox Studio</h1>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <select onChange={(e) => setFormat(e.target.value)}>
        <option value="ogg">OGG</option>
        <option value="mp3">MP3</option>
        <option value="wav">WAV</option>
        <option value="flac">FLAC</option>
      </select>

      <br /><br />

      <button onClick={handleUpload}>
        {loading ? "Processing..." : "Convert"}
      </button>

      {error && <p>{error}</p>}

      {result && (
        <div>
          <p>Format: {result.format}</p>
          <p>Backspeed: {result.backspeed}</p>
          <a href={result.url}>Download</a>
        </div>
      )}
    </div>
  );
}
