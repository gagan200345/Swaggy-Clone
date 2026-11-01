
function Footer() {
  const companyLinks = [
    "About Us",
    "Swiggy Corporate",
    "Careers",
    "Team",
    "Swiggy One",
    "Swiggy Instamart",
  ];

  const contactLinks = [
    "Help & Support",
    "Partner With Us",
    "Ride With Us",
  ];

  const legalLinks = [
    "Terms & Conditions",
    "Cookie Policy",
    "Privacy Policy",
  ];

  const cities = [
    "Bangalore",
    "Gurgaon",
    "Hyderabad",
    "Delhi",
    "Mumbai",
    "Pune",
  ];

  const lifeLinks = [
    "Explore With Swiggy",
    "Swiggy News",
    "Snackables",
  ];

  const socialLinks = [
    { symbol: "in", label: "LinkedIn" },
    { symbol: "◎", label: "Instagram" },
    { symbol: "f", label: "Facebook" },
    { symbol: "𝕏", label: "X" },
  ];

  function renderLinks(links) {
    return links.map((link) => (
      <li key={link}>
        <a
          href="https://www.swiggy.com"
          className="transition-colors hover:text-orange-600"
        >
          {link}
        </a>
      </li>
    ));
  }

  return (
    <footer className="bg-[#f0f0f5] text-gray-700">
      <div className="mx-auto w-[90%] max-w-[1200px] py-12">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">

          {/* Swiggy Logo */}
          <div className="col-span-2 sm:col-span-1">
            <a
              href="https://www.swiggy.com"
              className="mb-3 inline-flex items-center gap-3 text-3xl font-extrabold text-orange-600"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-600 text-white">
                S
              </span>
              Swiggy
            </a>

            <p className="mt-2 text-sm text-gray-600">
              © 2026 Swiggy Limited
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-5 font-bold text-gray-950">
              Company
            </h3>
            <ul className="space-y-4 text-sm">
              {renderLinks(companyLinks)}
            </ul>
          </div>

          {/* Contact and Legal */}
          <div>
            <h3 className="mb-5 font-bold text-gray-950">
              Contact us
            </h3>
            <ul className="space-y-4 text-sm">
              {renderLinks(contactLinks)}
            </ul>

            <h3 className="mb-5 mt-8 font-bold text-gray-950">
              Legal
            </h3>
            <ul className="space-y-4 text-sm">
              {renderLinks(legalLinks)}
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h3 className="mb-5 font-bold text-gray-950">
              Available in:
            </h3>
            <ul className="space-y-4 text-sm">
              {renderLinks(cities)}
            </ul>

            <button
              type="button"
              className="mt-5 rounded-lg border border-gray-300 px-3 py-2 text-sm transition hover:border-gray-500"
            >
              685 cities⌄
            </button>
          </div>

          {/* Life and Social Links */}
          <div>
            <h3 className="mb-5 font-bold text-gray-950">
              Life at Swiggy
            </h3>
            <ul className="space-y-4 text-sm">
              {renderLinks(lifeLinks)}
            </ul>

            <h3 className="mb-4 mt-10 font-bold text-gray-950">
              Social Links
            </h3>

            <div className="flex items-center gap-3">
              {socialLinks.map(({ symbol, label }) => (
                <a
                  key={label}
                  href="https://www.swiggy.com"
                  aria-label={label}
                  title={label}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-base font-bold text-gray-700 transition hover:bg-orange-600 hover:text-white"
                >
                  {symbol}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* App Download Section */}
        <div className="mt-12 border-t border-gray-300 pt-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <h2 className="text-center text-xl font-bold text-gray-700 md:text-left">
              For better experience, download the Swiggy app now
            </h2>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://www.swiggy.com"
                className="rounded-xl bg-black px-6 py-3 text-center text-white transition hover:bg-gray-800"
              >
                <span className="text-xs">Download on the</span>
                <p className="text-lg font-bold">App Store</p>
              </a>

              <a
                href="https://www.swiggy.com"
                className="rounded-xl bg-black px-6 py-3 text-center text-white transition hover:bg-gray-800"
              >
                <span className="text-xs">GET IT ON</span>
                <p className="text-lg font-bold">Google Play</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
