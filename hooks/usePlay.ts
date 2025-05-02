import { DeezerTrack } from "@/types/track";
import { Sound } from "expo-av/build/Audio";
import { atom } from "jotai";
import * as DocumentPicker from "expo-document-picker";
import { static_data } from "@/shared/data";

export const currentIndexAtom = atom<number>(0);

export const soundAtom = atom<Sound | null>(null);
export const playAtom = atom(false);
export const loadingAtom = atom(false)
export const statusAtom = atom<any>(null)

export const curPlaylistAtom = atom<
	DeezerTrack[] | DocumentPicker.DocumentPickerAsset[] | any
>(static_data);
