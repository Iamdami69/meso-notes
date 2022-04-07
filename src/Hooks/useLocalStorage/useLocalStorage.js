export function useLocalStorage() {
  const SetLocalStorage = (itemName, itemToSet) => {
    localStorage.setItem(itemName, JSON.stringify(itemToSet));
  };
  const GetLocalStorage = (itemToGet) => {
    return JSON.parse(localStorage.getItem(itemToGet));
  };

  return {
    SetLocalStorage,
    GetLocalStorage
  };
}
