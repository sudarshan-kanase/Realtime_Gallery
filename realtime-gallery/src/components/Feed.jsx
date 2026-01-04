import { db } from "../api/instantdb";

export default function Feed() {
  const { data } = db.useQuery({
    reactions: { $: { order: { createdAt: "desc" }, limit: 10 } },
    comments: { $: { order: { createdAt: "desc" }, limit: 10 } },
  });

  return (
    <div className="p-4 border-l w-72">
      <h3 className="font-bold mb-2">Live Feed</h3>

      {data?.reactions?.map((r) => (
        <p key={r.id} className="text-sm border-b py-1">
          Reaction {r.emoji}
        </p>
      ))}

      {data?.comments?.map((c) => (
        <p key={c.id} className="text-sm border-b py-1">
          Comment added
        </p>
      ))}
    </div>
  );
}
