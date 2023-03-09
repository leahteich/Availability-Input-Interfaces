import { persistBrowserSession } from "@macfja/svelte-persistent-store"
import { writable } from 'svelte/store';

export const name = writable(null);
export const starttime = writable(null);
export const besttimes = writable([]);
export const bestoverall = writable(" there is not enough data to calculate a best time. Please input some times!");
export const allusers = persistBrowserSession(writable([]), "users");