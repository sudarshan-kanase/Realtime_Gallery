import { db } from "../api/instantdb";
import { getUserId } from "../store/user";

const EMOJIS = ["❤️", "🔥", "👍", "😂"];

export default function EmojiBar({ imageId }) {
  const userId = getUserId();

  const { data } = db.useQuery({
    reactions: {
      $: {
        where: { imageId },
        order: { createdAt: "asc" },
      },
    },
  });

  const reactions = data?.reactions || [];

  const addReaction = async (emoji) => {
    await db.transact(
      db.tx.reactions({
        imageId,
        emoji,
        userId,
        createdAt: Date.now(),
      })
    );
    
  };

  

  return (
    <div className="flex items-center gap-4 mt-4">
      <div className="flex gap-3">
        {EMOJIS.map((e) => (
          <button
            key={e}
            onClick={() => addReaction(e)}
            className="text-2xl p-2 rounded-full hover:bg-gray-100 transition"
          >
            {e}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        {reactions.map((r) => (
          <span
            key={r.id}
            className="bg-gray-100 px-2 py-1 rounded-full"
          >
            {r.emoji}
          </span>
        ))}
      </div>
    </div>
  );

}