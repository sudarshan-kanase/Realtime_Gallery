import { useEffect, useState } from "react";
import { fetchImages } from "../api/unsplash";

export default function Gallery({ onSelectImage }) {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchImages(page).then((data) =>
      setImages((prev) => [...prev, ...data])
    );
  }, [page]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {images.map((img) => (
        <img
          key={img.id}
          src={img.urls.small}
          onClick={() => onSelectImage(img)}
          className="rounded cursor-pointer hover:scale-105"
        />
      ))}

      <button
        onClick={() => setPage((p) => p + 1)}
        className="col-span-full bg-black text-white p-2 rounded"
      >
        Load More
      </button>
    </div>
  );
}
