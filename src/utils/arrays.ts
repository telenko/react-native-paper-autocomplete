export const areArraysShallowEqual = (arr1: any[], arr2: any): boolean => {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
};

export const areObjectsShallowEqual = (obj1: any, obj2: any): boolean => {
    const obj1Keys = Object.keys(obj1);
    if (obj1Keys.length !== Object.keys(obj2).length) {
        return false;
    }
    for (let key of obj1Keys) {
        if (obj1[key] !== obj2[key]) {
            return false;
        }
    }
    return true;
};