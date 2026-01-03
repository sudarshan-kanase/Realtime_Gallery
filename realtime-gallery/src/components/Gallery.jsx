import { useEffect, useState } from "react";
import { fetchImages } from "../api/unsplash";

export default function Gallery({ onSelectImage }) {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchImages(page);

        setImages((prev) => {
          // ✅ remove duplicates by id
          const existingIds = new Set(prev.map((i) => i.id));
          const uniqueNewImages = data.filter(
            (img) => !existingIds.has(img.id)
          );

          return [...prev, ...uniqueNewImages];
        });
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [page]);

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img) => (
          <img
            key={img.id} // ✅ now guaranteed unique
            src={img.urls.small}
            alt={img.alt_description || ""}
            onClick={() => onSelectImage(img)}
            className="rounded cursor-pointer hover:scale-105 transition"
          />
        ))}
      </div>

      <div className="text-center mt-6">
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={loading}
          className="px-4 py-2 bg-black text-white rounded"
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      </div>
    </div>
  );
}
