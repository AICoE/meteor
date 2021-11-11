import { LOCAL_STORAGE_METEORS_KEY } from './constants';
export const setMeteorsToLocalStorage = (meteors: string[]) => {
  localStorage.setItem(LOCAL_STORAGE_METEORS_KEY, JSON.stringify(meteors));
};

export const getMeteorsFromLocalStorage = (): string[] => JSON.parse(localStorage.getItem(LOCAL_STORAGE_METEORS_KEY) || '[]');
