
function Citycard({ Citycard }) {
  return (
    <a
      href={Citycard?.link}
      className="flex min-h-[56px] items-center justify-center rounded-xl border border-gray-300 px-3 py-4 text-center text-sm font-semibold text-gray-700 transition hover:border-gray-400 hover:shadow-sm"
    >
      {Citycard?.text}
    </a>
  );
}

export default Citycard;
