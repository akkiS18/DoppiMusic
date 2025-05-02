import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "@/constants/Colors";
import { useAtom } from "jotai";
import { curPlaylistAtom, statusAtom } from "@/hooks/usePlay";
import Slider from "@react-native-community/slider";
import { Audio } from "expo-av";
import { useTrackPlayer } from "@/hooks/useTrackPlayer";
import { useEffect } from "react";

export default function SliderPlayback() {
	const [status, setStatus] = useAtom(statusAtom);
	const [curPlaylist, setCurPlaylist] = useAtom(curPlaylistAtom);

	const { sound } = useTrackPlayer(curPlaylist);

	useEffect(() => {
		if (sound) {
			sound.setOnPlaybackStatusUpdate((status) => {
				setStatus(status);
			});
		}
	}, [sound]);

	const formatTime = (millis: number) => {
		const totalSec = Math.floor(millis / 1000);
		const min = Math.floor(totalSec / 60);
		const sec = totalSec % 60;
		return `${min}:${sec < 10 ? "0" : ""}${sec}`;
	};

	const onChange = async (val: number) => {
		if (sound) {
			await sound.setPositionAsync(val);
		}
	};

	// if (!status?.isLoaded) {
	// 	return null;
	// }

	return (
		<View style={styles.box}>
			<View style={styles.sliderBox}>
				{!status?.isLoaded ? (
					<Slider
						style={{ flex: 1 }}
						minimumValue={0}
						maximumValue={1}
						value={0}
						minimumTrackTintColor={Colors.dark.pr}
						maximumTrackTintColor={Colors.dark.sc}
						thumbTintColor={Colors.dark.pr}
						onSlidingComplete={onChange}
					/>
				) : (
					<Slider
						style={{ flex: 1 }}
						minimumValue={0}
						maximumValue={status.durationMillis || 1}
						value={status.positionMillis || 0}
						minimumTrackTintColor={Colors.dark.pr}
						maximumTrackTintColor={Colors.dark.sc}
						thumbTintColor={Colors.dark.pr}
						onSlidingComplete={onChange}
					/>
				)}
			</View>

			<View style={styles.timeBox}>
				{!status?.isLoaded ? (
					<>
						<Text style={styles.time}>{formatTime(0)}</Text>
						<Text style={styles.time}>{formatTime(0)}</Text>
					</>
				) : (
					<>
						<Text style={styles.time}>
							{formatTime(status.positionMillis || 0)}
						</Text>
						<Text style={styles.time}>
							{formatTime(status.durationMillis || 0)}
						</Text>
					</>
				)}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	box: {
		width: "80%",
		padding: 16,
	},
	sliderBox: {
		flexDirection: "row",
		alignItems: "center",
	},
	timeBox: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 8,
	},
	time: {
		fontSize: 12,
		color: Colors.dark.text,
	},
});
