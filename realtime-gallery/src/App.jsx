import { useState } from "react";
import Gallery from "./components/Gallery";
import ImageModal from "./components/ImageModal";
import Feed from "./components/Feed";

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="flex min-h-screen">
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-center my-4">
          Real-Time Gallery
        </h1>

        <Gallery onSelectImage={setSelectedImage} />
      </div>

      <Feed />

      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
}
