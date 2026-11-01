function Shimmer() {
  return (
    <div className="container mx-auto flex flex-wrap gap-6 p-6">
      {Array(12).fill("").map((_, i) => (
        <div key={i} className="w-60">
          <div className="w-60 h-40 rounded-2xl bg-gray-200 animate-pulse"></div>
          <div className="w-40 h-4 mt-3 rounded bg-gray-200 animate-pulse"></div>
          <div className="w-28 h-3 mt-2 rounded bg-gray-200 animate-pulse"></div>
        </div>
      ))}
    </div>
  );
}

export default Shimmer;