// Software Concept: Svelte local store for passing data across multiple pages
import { writable } from 'svelte/store';

export const name = writable(null);
export const starttime = writable(null);
export const besttimes = writable([]);
export const bestoverall = writable(" only one user has submitted times. Please input more availability!");