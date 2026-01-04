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
      {/* Image grid */}
      <div
        className="
          grid 
          grid-cols-2 
          md:grid-cols-4 
          gap-4
        "
      >
        {images.map((img) => (
          <div
            key={img.id} // ✅ now guaranteed unique
            className="
              overflow-hidden
              rounded-xl
              bg-gray-100
              shadow-sm
              hover:shadow-md
              transition
            "
          >
            <img
              src={img.urls.small}
              alt={img.alt_description || ""}
              onClick={() => onSelectImage(img)}
              className="
                w-full h-full
                object-cover
                cursor-pointer
                hover:scale-110
                transition-transform
                duration-300
              "
            />
          </div>
        ))}
      </div>

      {/* Load more button */}
      <div className="text-center mt-8">
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={loading}
          className="
            px-6 py-2
            bg-black
            text-white
            text-sm
            rounded-full
            hover:bg-gray-800
            transition
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      </div>
    </div>
  );
}
