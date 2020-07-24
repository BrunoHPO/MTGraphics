const simplifyData = item => {
    const { name, convertedManaCost, power, toughness, types, colors, uuid } = item;
    return {
      name: name,
      manaCost: convertedManaCost,
      atk: power,
      def: toughness,
      type: types,
      color: colors,
      id: uuid
    }
  }
  
  module.exports = simplifyData;