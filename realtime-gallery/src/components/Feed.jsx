import { db } from "../api/instantdb";

export default function Feed() {
  const { data } = db.useQuery({
    reactions: {
      $: { order: { createdAt: "desc" }, limit: 10 },
    },
    comments: {
      $: { order: { createdAt: "desc" }, limit: 10 },
    },
  });

  return (
    <div className="w-80 p-4 border-l bg-gray-50">
      <h3 className="font-bold mb-3">Live Feed</h3>

      <div className="space-y-2 text-sm">
        {data?.reactions?.map((r) => (
          <p key={r.id}>Reacted {r.emoji}</p>
        ))}

        {data?.comments?.map((c) => (
          <p key={c.id}>New comment added</p>
        ))}
      </div>
    </div>
  );
}
