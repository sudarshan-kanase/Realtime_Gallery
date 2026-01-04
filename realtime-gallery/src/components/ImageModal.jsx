import EmojiBar from "./EmojiBar";
import Comments from "./Comments";

// ImageModal component
// Shows selected image in a centered modal with reactions and comments
export default function ImageModal({ image, onClose }) {
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
          p-4
          rounded-xl
          max-w-3xl
          w-full
          relative
          shadow-xl
        "
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="
            absolute top-3 right-3
            text-xl
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
          alt={image.alt_description || ""}
          className="
            rounded-lg
            w-full
            max-h-[70vh]
            object-contain
          "
        />

        {/* Emoji reactions */}
        <div className="mt-4">
          <EmojiBar imageId={image.id} />
        </div>

        {/* Comments section */}
        <div className="mt-4">
          <Comments imageId={image.id} />
        </div>
      </div>
    </div>
  );
}
