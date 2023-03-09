import { persistBrowserSession } from "@macfja/svelte-persistent-store"
import { writable } from 'svelte/store';

export const name = writable(null);
export const starttime = writable(null);
export const besttimes = writable([]);
export const bestoverall = writable(" only one user has submitted times. Please input more availability!");