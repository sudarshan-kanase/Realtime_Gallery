import { useState } from "react";
import Gallery from "./components/Gallery";
import ImageModal from "./components/ImageModal";
import Feed from "./components/Feed";

// Root App component
// Manages selected image state and overall layout
export default function App() {
  // State to track currently selected image for modal
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    // Main layout container
    <div className="flex min-h-screen bg-gray-100">
      {/* Main content area */}
      <div className="flex-1">
        {/* App header */}
        <header className="bg-white shadow-sm py-4">
          <h1 className="text-2xl font-bold text-center text-gray-800">
            Real-Time Gallery
          </h1>
        </header>

        {/* Gallery section */}
        <main className="max-w-7xl mx-auto">
          <Gallery onSelectImage={setSelectedImage} />
        </main>
      </div>

      {/* Live feed sidebar */}
      <aside className="hidden md:block">
        <Feed />
      </aside>

      {/* Image modal */}
      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
}
