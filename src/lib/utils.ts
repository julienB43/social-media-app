import { clsx, type ClassValue } from "clsx"
import moment from "moment";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(isoDate: string) {
    // Convertir la date ISO en objet moment
    const date = moment(isoDate);

    // Obtenir la différence de temps par rapport à maintenant
    const timeAgo = date.fromNow();

    return timeAgo;
}

export function checkIsLiked(likeList: string[], userId: string) {
  return likeList.includes(userId);
}