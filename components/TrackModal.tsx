import { Colors } from "@/constants/Colors";
import { trackModalAtom } from "@/hooks/useModals";
import { useAtom } from "jotai";
import {
	View,
	Modal,
	StyleSheet,
	Image,
	TouchableOpacity,
	Pressable,
	Text,
	ActivityIndicator,
} from "react-native";
import { curPlaylistAtom, currentIndexAtom, loadingAtom } from "@/hooks/usePlay";
import { AntDesign } from "@expo/vector-icons";
import { useTrackPlayer } from "@/hooks/useTrackPlayer";
import { FontAwesome6 } from "@expo/vector-icons";
import Slider from "@/shared/Slider";
import SliderPlayback from "@/shared/Slider";

export default function TrackModal() {
	const [curIndex, setcurIndex] = useAtom(currentIndexAtom);
	const [curPlaylist, setCurPlaylist] = useAtom(curPlaylistAtom);
	const [open, setOpen] = useAtom(trackModalAtom);
	const { isPlay, pause, resume, next, prev } = useTrackPlayer(curPlaylist);
	const [isLoading, setIsLoading] = useAtom(loadingAtom);

	return (
		<Modal
			animationType="slide"
			visible={open}
			transparent={true}
			onRequestClose={() => setOpen(!open)}>
			<Pressable
				style={[StyleSheet.absoluteFill, s.main]}
				onPress={() => setOpen(!open)}>
				{/* IMAGE */}
				{curPlaylist[curIndex]?.album ? (
					<Image
						source={{ uri: curPlaylist[curIndex].album.cover_big }}
						resizeMode="cover"
						style={s.img}
					/>
				) : (
					<View
						style={[s.img, { alignItems: "center", justifyContent: "center" }]}>
						<FontAwesome6 name="music" size={100} color={Colors.dark.icon} />
					</View>
				)}

				<View style={s.title}>
					<Text style={s.text}>
						{curPlaylist[curIndex]?.title
							? `${curPlaylist[curIndex]?.title} - ${curPlaylist[curIndex]?.artist.name}`
							: curPlaylist[curIndex]?.name}
					</Text>
					{isLoading && (
						<ActivityIndicator size={"small"} color={Colors.dark.icon} />
					)}
				</View>

				{/* SLIDER */}
				<SliderPlayback />

				{/* FOOTER */}
				<Pressable style={s.box}>
					<TouchableOpacity>
						<AntDesign name="retweet" size={24} color={Colors.dark.pr} />
					</TouchableOpacity>

					<TouchableOpacity onPress={prev}>
						<AntDesign name="banckward" size={24} color={Colors.dark.pr} />
					</TouchableOpacity>

					<TouchableOpacity onPress={isPlay ? pause : resume}>
						{isPlay ? (
							<AntDesign name="pausecircle" size={70} color={Colors.dark.pr} />
						) : (
							<AntDesign name="play" size={70} color={Colors.dark.pr} />
						)}
					</TouchableOpacity>

					<TouchableOpacity onPress={next}>
						<AntDesign name="forward" size={24} color={Colors.dark.pr} />
					</TouchableOpacity>

					<TouchableOpacity>
						<AntDesign name="hearto" size={24} color={Colors.dark.pr} />
					</TouchableOpacity>
				</Pressable>
			</Pressable>
		</Modal>
	);
}

const s = StyleSheet.create({
	main: {
		position: "absolute",
		zIndex: 90,
		backgroundColor: Colors.dark.background,
		alignItems: "center",
		justifyContent: "space-between",
		paddingBottom: 100,
	},
	img: {
		width: "70%",
		height: "70%",
		borderEndEndRadius: 150,
		borderEndStartRadius: 150,
		backgroundColor: Colors.dark.sc,
	},
	box: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		zIndex: 99,
		gap: 30,
	},
	title: {
		flexDirection: "row",
		width: "80%",
		overflow: "hidden",
		gap: 10,
		justifyContent: "center",
	},
	text: {
		color: Colors.dark.text,
		fontSize: 18,
		textAlign: "center",
	},
});
