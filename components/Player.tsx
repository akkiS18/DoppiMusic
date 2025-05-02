import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Pressable,
	ActivityIndicator,
} from "react-native";
import { Entypo, FontAwesome6 } from "@expo/vector-icons";
import { useAtom } from "jotai";
import {
	curPlaylistAtom,
	currentIndexAtom,
	loadingAtom,
	playAtom,
} from "@/hooks/usePlay";
import { useTrackPlayer } from "@/hooks/useTrackPlayer";
import TrackModal from "./TrackModal";
import { trackModalAtom } from "@/hooks/useModals";

export default function Player() {
	const [curIndex, setcurIndex] = useAtom(currentIndexAtom);
	const [curPlaylist, setCurPlaylist] = useAtom(curPlaylistAtom);
	const { resume, pause, stop } = useTrackPlayer(curPlaylist);
	const [isPlay, setIsPlay] = useAtom(playAtom);
	const [open, setOpen] = useAtom(trackModalAtom);
	const [isLoading, setIsLoading] = useAtom(loadingAtom);

	return (
		<Pressable style={s.container} onPress={() => setOpen(!open)}>
			<TrackModal />
			<View style={s.left}>
				{curPlaylist[curIndex]?.title ? (
					<Text style={s.tSong}>
						{curPlaylist[curIndex].title} - {curPlaylist[curIndex].artist?.name}
					</Text>
				) : (
					<Text style={s.tSong}>{curPlaylist[curIndex]?.name}</Text>
				)}
				{isLoading && (
					<ActivityIndicator size={"small"} color={Colors.dark.sc} />
				)}
			</View>

			<TouchableOpacity style={s.right} onPress={isPlay ? pause : resume}>
				{isPlay ? (
					<FontAwesome6 name="pause" size={30} color={Colors.dark.sc} />
				) : (
					<Entypo name="controller-play" size={40} color={Colors.dark.sc} />
				)}
			</TouchableOpacity>
		</Pressable>
	);
}

const s = StyleSheet.create({
	container: {
		width: "95%",
		height: 70,
		alignSelf: "center",
		backgroundColor: Colors.dark.pr,
		position: "absolute",
		bottom: 90,
		zIndex: 10,
		borderRadius: 20,
		flexDirection: "row",
		overflow: "hidden",
		boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.8)",
	},
	left: {
		width: "80%",
		justifyContent: "flex-start",
		alignItems: "center",
		paddingLeft: 20,
		flexDirection: "row",
		gap: 10,
	},
	right: {
		width: "20%",
		alignItems: "center",
		justifyContent: "center",
	},
	tSong: {
		color: Colors.dark.sc,
		fontSize: 18,
		fontWeight: "bold",
	},
});
