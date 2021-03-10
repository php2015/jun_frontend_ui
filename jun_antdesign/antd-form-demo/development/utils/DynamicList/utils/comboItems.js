


export default function comboItems({
  dynamicList,
  mapPropsList
}) {
  const dynamicIdArray = Object.keys(dynamicList).reverse();
  const originItemArray = dynamicIdArray.map((tempId) => (dynamicList[tempId]));
  const dynamicItemArray = dynamicIdArray.map((tempId) => ({ tempId, ...dynamicList[tempId] }))

  const mapIdArray = Object.keys(mapPropsList || {}).reverse();
  const mapOriginItemArray = mapIdArray.map((tempId) => (mapPropsList[tempId]));
  const mapDynamicItemArray = mapIdArray.map((tempId) => ({ tempId, ...mapPropsList[tempId] }));

  return {
    idArray: dynamicIdArray.concat(mapIdArray),
    originArray: originItemArray.concat(mapOriginItemArray),
    dynamicArray: dynamicItemArray.concat(mapDynamicItemArray)
  };
};