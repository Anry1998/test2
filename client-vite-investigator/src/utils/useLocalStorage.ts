import { useState, useEffect } from 'react';

function getStorageValue(key: string, defaultValue: string) {
	// getting stored value
	// Возвращает значение из локалсторедж, если оно там есть, либо возвращает дефолтное значение
	const saved = localStorage.getItem(key);
	// let initial
	// if (saved) {
	// 	initial = JSON.parse(saved);
	// }
	return saved || defaultValue;
}

export const useLocalStorage = (key: string, defaultValue: string) => {
	// таким образом в value храниться либо значение из локалсторедж либо  дефолтное значение
	const [value, setValue] = useState(() => {
		return getStorageValue(key, defaultValue);
	});

	useEffect(() => {
		// storing input name 
		// Следим за изменением value и key, если оно меняется, то Записываем в локалсторедж значение по нужному ключу
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	// возвращаем значение темы и функцию, ее меняющую
	return [value, setValue];
};


export const storage = {
	set<T>(key: string, value: T) {
	  localStorage.setItem(key, JSON.stringify(value));
	},
	get<T>(key: string): T | null {
	  return localStorage.getItem(key)
		? JSON.parse(localStorage.getItem(key) as string)
		: null;
	}
};
