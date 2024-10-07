import secureLocalStorage from "react-secure-storage";

export const saveToLocalStorage = (nameState, state) => {
  try {
    const serializedState = JSON.stringify(state);
    secureLocalStorage.setItem(nameState, serializedState);
  } catch (error) {
    console.error("Error saving to Local Storage:", error);
  }
};

export const loadFromLocalStorage = (nameState) => {
  try {
    const serializedState = secureLocalStorage.getItem(nameState);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error("Error loading from Local Storage:", error);
    return undefined;
  }
};
