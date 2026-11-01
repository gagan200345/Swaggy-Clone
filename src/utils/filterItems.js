export function filterItems(items, vegFilter, search = "") {
  const list = items || [];
  const q = search.trim().toLowerCase();

  return list.filter((food) => {
    const info = food?.card?.info;
    if (!info) return false;

    // Veg / Non-veg
    if (vegFilter !== null && vegFilter !== undefined) {
      if (Boolean(info.isVeg) !== vegFilter) return false;
    }

    // Search (naam par)
    if (q && !info.name?.toLowerCase().includes(q)) return false;

    return true;
  });
}

// Total kitne items match hue (empty state ke liye)
export function countMatches(sections, vegFilter, search) {
  let total = 0;

  sections.forEach((section) => {
    const card = section?.card?.card;
    total += filterItems(card?.itemCards, vegFilter, search).length;

    (card?.categories || []).forEach((cat) => {
      total += filterItems(cat?.itemCards, vegFilter, search).length;
    });
  });

  return total;
}