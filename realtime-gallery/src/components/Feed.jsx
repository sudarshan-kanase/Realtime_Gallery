import { useEffect, useState } from "react";
import { db } from "../api/instantdb";

export default function Feed() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // subscribe gives realtime updates
    const unsubscribe = db.subscribe(
      {
        reactions: {
          $: {
            order: { createdAt: "desc" },
            limit: 10,
          },
        },
        comments: {
          $: {
            order: { createdAt: "desc" },
            limit: 10,
          },
        },
      },
      (snapshot) => {
        setData(snapshot);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-4 w-72 bg-gray-50 border-l space-y-4">
      <h3 className="font-semibold text-gray-800">Live Feed</h3>

      {/* Reactions */}
      <div className="space-y-2">
        {data?.reactions?.map((r) => (
          <div
            key={r.id}
            className="bg-white px-3 py-2 rounded shadow-sm"
          >
            Reaction {r.emoji}
          </div>
        ))}
      </div>

      {/* Comments */}
      <div className="space-y-2">
        {data?.comments?.map((c) => (
          <div
            key={c.id}
            className="bg-white px-3 py-2 rounded shadow-sm"
          >
            Comment added
          </div>
        ))}
      </div>
    </div>
  );
}
