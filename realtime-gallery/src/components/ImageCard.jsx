import EmojiBar from "./EmojiBar";

// ImageModal component
// Displays a selected image in a full-screen modal with emoji reactions
export default function ImageModal({ image, onClose }) {
  // Temporary user ID (used only for demo/testing)
  const userId = "user_" + Math.floor(Math.random() * 1000);

  return (
    // Modal overlay
    <div
      className="
        fixed inset-0
        bg-black/70
        flex items-center justify-center
        z-50
        backdrop-blur-sm
      "
    >
      {/* Modal container */}
      <div
        className="
          bg-white
          rounded-xl
          max-w-3xl
          w-full
          p-4
          relative
          shadow-xl
          animate-fadeIn
        "
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="
            absolute top-3 right-3
            text-xl font-bold
            text-gray-600
            hover:text-black
            transition
          "
        >
          ✕
        </button>

        {/* Selected image */}
        <img
          src={image.urls.regular}
          alt={image.alt_description}
          className="
            w-full
            rounded-lg
            max-h-[70vh]
            object-contain
          "
        />

        {/* Emoji reactions section */}
        <div className="mt-4">
          <EmojiBar imageId={image.id} userId={userId} />
        </div>
      </div>
    </div>
  );
}
