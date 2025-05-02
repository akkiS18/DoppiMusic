import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { DeezerTrack } from "@/types/track";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useAtom } from "jotai";
import {
	curPlaylistAtom,
	currentIndexAtom,
	loadingAtom,
} from "@/hooks/usePlay";
import { useTrackPlayer } from "@/hooks/useTrackPlayer";

export default function TrackBox({ tracks }: { tracks: DeezerTrack[] }) {
	const [curIndex, setcurIndex] = useAtom(currentIndexAtom);
	const [curPlaylist, setCurPlaylist] = useAtom(curPlaylistAtom);
	const { load } = useTrackPlayer(curPlaylist);
	const [isLoading, setIsLoading] = useAtom(loadingAtom);

	const play = async (item: DeezerTrack) => {
		if (!isLoading) {
			setCurPlaylist(tracks);
			load(item);
		}
	};

	return (
		<>
			{tracks.length > 0 &&
				tracks.map((item: DeezerTrack) => (
					<Pressable
						key={item.id}
						style={s.box}
						onPress={() => play(item)}
						disabled={isLoading}>
						{/* LEFT */}
						<View style={s.left}>
							<Image source={{ uri: item.album.cover_big }} style={s.img} />
							<Text style={s.title}>
								{item.title} - {item.artist.name}
							</Text>
						</View>

						{/* RIGHT */}
						<View style={s.right}>
							{curPlaylist[curIndex]?.id === item.id && (
								<Ionicons name="stats-chart" size={24} color="black" />
							)}
						</View>
					</Pressable>
				))}
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
