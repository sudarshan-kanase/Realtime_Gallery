import EmojiBar from "./EmojiBar";

export default function ImageModal({ image, onClose }) {
  const userId = "user_" + Math.floor(Math.random() * 1000);

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-3xl w-full p-4 relative">

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl font-bold"
        >
          ✕
        </button>

        <img
          src={image.urls.regular}
          alt={image.alt_description}
          className="w-full rounded"
        />

        {/* 🔥 Emoji Reactions */}
        <EmojiBar imageId={image.id} userId={userId} />
      </div>
    </div>
  );
}
