const activeDismissibleLayers: Array<{ id: symbol; close: () => void }> = [];

function registerDismissibleLayer(id: symbol, close?: () => void) {
  const currentIndex = activeDismissibleLayers.findIndex((layer) => layer.id === id);

  if (currentIndex !== -1) activeDismissibleLayers.splice(currentIndex, 1);
  if (close) activeDismissibleLayers.push({ id, close });
}

function unregisterDismissibleLayer(id: symbol) {
  const currentIndex = activeDismissibleLayers.findIndex((layer) => layer.id === id);
  if (currentIndex !== -1) activeDismissibleLayers.splice(currentIndex, 1);
}

function isTopDismissibleLayer(id: symbol) {
  return activeDismissibleLayers.at(-1)?.id === id;
}

export {
  isTopDismissibleLayer,
  registerDismissibleLayer,
  unregisterDismissibleLayer,
};
