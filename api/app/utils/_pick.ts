const pick = (object: Record<string, any>, keys: string[]) => {
  return keys.reduce((obj: any, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {});
};

export default pick;
