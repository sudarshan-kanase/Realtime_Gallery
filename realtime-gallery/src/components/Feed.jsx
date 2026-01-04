import { db } from "../api/instantdb";

// Feed component
// Displays the latest reactions and comments in real-time
export default function Feed() {
  // Query recent reactions and comments from InstantDB
  const { data } = db.useQuery({
    reactions: {
      $: {
        order: { createdAt: "desc" }, // Sort reactions by latest first
        limit: 10,                    // Limit to last 10 reactions
      },
    },
    comments: {
      $: {
        order: { createdAt: "desc" }, // Sort comments by latest first
        limit: 10,                    // Limit to last 10 comments
      },
    },
  });

  return (
    <div
      className="
        p-4 
        w-72 
        bg-gray-50 
        border-l 
        space-y-4
      "
    >
      {/* Feed title */}
      <h3 className="font-semibold text-gray-800">
        Live Feed
      </h3>

      {/* Reactions section */}
      <div className="space-y-2">
        {data?.reactions?.map((r) => (
          <div
            key={r.id}
            className="
              flex items-center gap-2
              text-sm
              bg-white
              px-3 py-2
              rounded-lg
              shadow-sm
            "
          >
            <span>Reaction</span>
            <span className="text-lg">{r.emoji}</span>
          </div>
        ))}
      </div>

      {/* Comments section */}
      <div className="space-y-2">
        {data?.comments?.map((c) => (
          <div
            key={c.id}
            className="
              text-sm
              bg-white
              px-3 py-2
              rounded-lg
              shadow-sm
              text-gray-700
            "
          >
            Comment added
          </div>
        ))}
      </div>
    </div>
  );
}
