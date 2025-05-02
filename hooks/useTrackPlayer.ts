import { useEffect, useCallback, useRef } from "react";
import { Audio } from "expo-av";
import { useAtom } from "jotai";
import {
	curPlaylistAtom,
	currentIndexAtom,
	loadingAtom,
	playAtom,
	soundAtom,
} from "./usePlay";
import { playTrack } from "./useTracks";

export const useTrackPlayer = (playlist: any[]) => {
	const [sound, setSound] = useAtom(soundAtom);
	const [isPlay, setIsPlay] = useAtom(playAtom);
	const [curPlaylist] = useAtom(curPlaylistAtom);
	const [curIndex, setCurIndex] = useAtom(currentIndexAtom);
	const [isLoading, setIsLoading] = useAtom(loadingAtom);
	
	const playlistRef = useRef(playlist);
	const soundRef = useRef(sound);
	
	useEffect(() => {
		playlistRef.current = playlist;
	}, [playlist]);
	
	useEffect(() => {
		soundRef.current = sound;
	}, [sound]);

	const unloadSound = useCallback(async () => {
		if (soundRef.current) {
			try {
				await soundRef.current.stopAsync();
				await soundRef.current.unloadAsync();
			} catch (error) {
				console.log("Unload Error", error);
			}
		}
	}, []);

	const next = useCallback(async () => {
		const currentPlaylist = playlistRef.current;
		if (curIndex + 1 < currentPlaylist.length) {
			const newIndex = curIndex + 1;
			const track = currentPlaylist[newIndex];
			if (track) {
				load(track);
			}
		} else {
			await stop();
		}
	}, [curIndex]);

	const prev = useCallback(async () => {
		const currentPlaylist = playlistRef.current;
		if (curIndex > 0) {
			const newIndex = curIndex - 1;
			const track = currentPlaylist[newIndex];
			if (track) {
				load(track);
			}
		} else {
			await stop();
		}
	}, [curIndex]);

	const load = useCallback(
		async (curTrack: any) => {
			setIsLoading(true);

			await unloadSound();

			const track = curTrack.id ? await playTrack(curTrack.id) : curTrack;

			const { sound: newSound } = await Audio.Sound.createAsync(
				{ uri: curTrack.id ? track.preview : curTrack.uri },
				{
					shouldPlay: true,
					isLooping: false,
					progressUpdateIntervalMillis: 500,
				}
			);

			const newIndex = playlistRef.current.findIndex((item: any) =>
				item.id ? item.id === curTrack.id : item.name === curTrack.name
			);

			setCurIndex(newIndex);
			setSound(newSound);
			soundRef.current = newSound;
			setIsPlay(true);
			setIsLoading(false);

			// Status update handlerni to'g'ri o'rnatamiz
			newSound.setOnPlaybackStatusUpdate((status) => {
				if (status.isLoaded && status.didJustFinish && !status.isLooping) {
					console.log("Track finished, playing next");
					next(); 
				}
			});
		},
		[unloadSound, setCurIndex, setSound, setIsPlay, setIsLoading, next]
	);

	const resume = useCallback(async () => {
		if (soundRef.current) {
			await soundRef.current.playAsync();
			setIsPlay(true);
		} else if (curPlaylist[curIndex]) {
			await load(curPlaylist[curIndex]);
		}
	}, [curPlaylist, curIndex, load]);

	const pause = useCallback(async () => {
		if (soundRef.current) {
			await soundRef.current.pauseAsync();
			setIsPlay(false);
		}
	}, []);

	const stop = useCallback(async () => {
		if (soundRef.current) {
			await soundRef.current.stopAsync();
			setIsPlay(false);
		}
	}, []);

	useEffect(() => {
		Audio.setAudioModeAsync({
			staysActiveInBackground: false,
			allowsRecordingIOS: false,
			interruptionModeIOS: 1,
			playsInSilentModeIOS: true,
			shouldDuckAndroid: true,
			interruptionModeAndroid: 1,
			playThroughEarpieceAndroid: false,
		});

		return () => {
			// unloadSound();
		};
	}, [unloadSound]);

	return {
		isPlay,
		load,
		resume,
		pause,
		stop,
		next,
		prev,
		unload: unloadSound,
		sound,
	};
};