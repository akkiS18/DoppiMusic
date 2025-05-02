import { View, Text, StyleSheet, Pressable } from "react-native";
import { Colors } from "@/constants/Colors";
import { Ionicons, FontAwesome6 } from "@expo/vector-icons";
import { useAtom } from "jotai";
import {
	curPlaylistAtom,
	currentIndexAtom,
	loadingAtom,
} from "@/hooks/usePlay";
import { useTrackPlayer } from "@/hooks/useTrackPlayer";
import * as DocumentPicker from "expo-document-picker";

export default function DeviceTrackBox({
	tracks,
}: {
	tracks: DocumentPicker.DocumentPickerAsset[];
}) {
	const [curIndex, setcurIndex] = useAtom(currentIndexAtom);
	const [curPlaylist, setCurPlaylist] = useAtom(curPlaylistAtom);
	const { load } = useTrackPlayer(curPlaylist);
	const [isLoading, setIsLoading] = useAtom(loadingAtom);

	const play = async (item: DocumentPicker.DocumentPickerAsset) => {
		if (!isLoading) {
			setCurPlaylist(tracks);
			load(item);
		}
	};

	return (
		<>
			{tracks.length > 0 &&
				tracks.map(
					(item: DocumentPicker.DocumentPickerAsset, index: number) => (
						<Pressable
							key={index}
							style={s.box}
							onPress={() => play(item)}
							disabled={isLoading}>
							{/* LEFT */}
							<View style={s.left}>
								<View style={s.img}>
									<FontAwesome6 name="music" size={30} color={Colors.dark.sc} />
								</View>
								<Text style={s.title}>{item.name}</Text>
							</View>

							{/* RIGHT */}
							<View style={s.right}>
								{curPlaylist[curIndex]?.name === item.name && (
									<Ionicons name="stats-chart" size={24} color="black" />
								)}
							</View>
						</Pressable>
					)
				)}
		</>
	);
}

const s = StyleSheet.create({
	box: {
		backgroundColor: Colors.dark.sc,
		height: 70,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		padding: 15,
		paddingLeft: 0,
		overflow: "hidden",
		gap: 5,
	},
	left: {
		width: "80%",
		flexDirection: "row",
		gap: 10,
		alignItems: "center",
		justifyContent: "flex-start",
	},
	img: {
		width: 70,
		height: 70,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: Colors.dark.icon,
	},
	title: {
		color: "#fff",
		fontSize: 16,
		width: "80%",
	},
	right: {
		width: "20%",
		flexDirection: "row",
		gap: 10,
		justifyContent: "flex-end",
	},
});
