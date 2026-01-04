
export default function Feed() {
  const { data } = db.useQuery({
    reactions: { $: { order: { createdAt: "desc" }, limit: 5 } },
    comments: { $: { order: { createdAt: "desc" }, limit: 5 } },
  });

  return (
    <div className="w-72 p-4 border-l bg-gray-50">
      <h3 className="font-bold mb-3">Live Feed</h3>

      <div className="space-y-2 text-sm">
        {data?.reactions?.map((r) => (
          <div key={r.id}>❤️ Reaction added</div>
        ))}

        {data?.comments?.map((c) => (
          <div key={c.id}>💬 Comment added</div>
        ))}
      </div>
    </div>
  );
}
