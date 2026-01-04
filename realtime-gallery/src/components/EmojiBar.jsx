import { db } from "../api/instantdb";
import { getUserId } from "../store/user";

// List of available reaction emojis
const EMOJIS = ["❤️", "🔥", "👍", "😂"];

// EmojiBar component
// Allows users to add emoji reactions to an image
// Displays all reactions for the given image
export default function EmojiBar({ imageId }) {
  // Get the currently logged-in user's ID
  const userId = getUserId();

  // Fetch reactions related to the given imageId from InstantDB
  const { data } = db.useQuery({
    reactions: {
      $: {
        where: { imageId },          // Filter reactions by image ID
        order: { createdAt: "asc" }, // Sort reactions by creation time
      },
    },
  });

  // Fallback to empty array if reactions are not yet loaded
  const reactions = data?.reactions || [];

  // Add a new emoji reaction
  const addReaction = async (emoji) => {
    // Create a new reaction entry in InstantDB
    await db.transact([
      db.tx.reactions({
        imageId,              // Related image ID
        emoji,                // Selected emoji reaction
        userId,               // User who reacted
        createdAt: Date.now() // Timestamp of reaction
      }),
    ]);
  };

  return (
    <div className="flex items-center gap-4 mt-4">
      {/* Emoji selection buttons */}
      <div className="flex gap-3">
        {EMOJIS.map((e) => (
          <button
            key={e}
            onClick={() => addReaction(e)}
            className="
              text-2xl
              p-2
              rounded-full
              hover:bg-gray-100
              hover:scale-125
              transition
              active:scale-110
            "
          >
            {e}
          </button>
        ))}
      </div>

      {/* Display list of reactions */}
      <div className="flex gap-2 items-center">
        {reactions.map((r) => (
          <span
            key={r.id}
            className="
              text-lg
              bg-gray-100
              px-2 py-1
              rounded-full
            "
          >
            {r.emoji}
          </span>
        ))}
      </div>
    </div>
  );
}
