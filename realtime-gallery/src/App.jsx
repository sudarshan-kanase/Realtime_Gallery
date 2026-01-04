// App.jsx
import { useState } from "react";
import Gallery from "./components/Gallery";
import ImageModal from "./components/ImageModal";
import Feed from "./components/Feed";

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1">
        <header className="bg-white shadow-sm">
          <h1 className="text-3xl font-bold text-center py-4">
            🖼️ Real-Time Gallery
          </h1>
          <p className="text-center text-gray-600 mb-2">
            Click on any image to react and comment in real-time!
          </p>
        </header>

        <Gallery onSelectImage={setSelectedImage} />
      </div>

      {/* Feed Sidebar */}
      <Feed />

      {/* Image Modal */}
      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
}