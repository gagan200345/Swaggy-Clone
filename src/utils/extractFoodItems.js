export const extractFoodItems = (menuCards = []) => {
  const map = new Map();

  const addItems = (itemCards = []) => {
    itemCards.forEach((entry) => {
      const info = entry?.card?.info;
      if (!info?.id || map.has(info.id)) return;

      map.set(info.id, {
        id: info.id,
        name: info.name || "",
        description: info.description || "",
        category: info.category || "",
        price: (info.price ?? info.defaultPrice ?? 0) / 100,
        isVeg: info.isVeg === 1,
        imageId: info.imageId,
      });
    });
  };

  menuCards.forEach((c) => {
    const card = c?.card?.card;
    addItems(card?.itemCards); // direct items
    card?.categories?.forEach((cat) => addItems(cat?.itemCards)); // nested items
  });

  return Array.from(map.values());
};