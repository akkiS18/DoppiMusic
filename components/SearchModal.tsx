import { Colors } from "@/constants/Colors";
import { searchModalAtom } from "@/hooks/useModals";
import { searchTrack } from "@/hooks/useTracks";
import { useAtom } from "jotai";
import {
	View,
	Text,
	Modal,
	StyleSheet,
	TextInput,
	ScrollView,
	Pressable,
	Keyboard,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { DeezerTrack } from "@/types/track";
import TrackBox from "@/shared/TrackBox";
import { Ionicons } from "@expo/vector-icons";

export default function SearchModal() {
	const [tracks, setTracks] = useState<DeezerTrack[]>([]);
	const [query, setQuery] = useState("");

	const [open, setOpen] = useAtom(searchModalAtom);
	const insets = useSafeAreaInsets();

	const getTracks = async () => {
		if (query !== "") {
			const data: DeezerTrack[] = await searchTrack(query);

			setTracks(data);
			// console.log(data[0].id);
		}
	};

	useEffect(() => {
		getTracks();
	}, [query]);

	return (
		<Modal
			animationType="slide"
			visible={open}
			transparent={true}
			onRequestClose={() => setOpen(!open)}>
			{/* SEARCH BOX */}
			<View
				style={[StyleSheet.absoluteFill, s.modal, { paddingTop: insets.top }]}>
				<View style={s.searchBox}>
					{query.length > 0 && (
						<Pressable onPress={() => setQuery("")} style={s.clearBtn}>
							<Ionicons name="close-circle" size={30} color="#888" />
						</Pressable>
					)}
					<TextInput
						style={s.inp}
						placeholder="Type to search..."
						value={query}
						onChangeText={setQuery}
						autoFocus={true}
					/>
					<Text onPress={() => setOpen(false)} style={s.cancel}>
						Cancel
					</Text>
				</View>
			</View>

			{/* SUGGESTIONS */}
			{tracks && tracks.length > 0 && (
				<ScrollView
					style={s.scroll}
					keyboardShouldPersistTaps="handled"
					onScrollBeginDrag={Keyboard.dismiss}
					contentContainerStyle={{ paddingBottom: 50 }}>
					<View style={s.tracksBox}>
						<TrackBox tracks={tracks} />
					</View>
				</ScrollView>
			)}
		</Modal>
	);
}

const s = StyleSheet.create({
	modal: {
		position: "absolute",
		zIndex: 99,
		backgroundColor: Colors.dark.background,
		padding: 15,
	},
	searchBox: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
	cancel: {
		color: Colors.dark.text,
		fontSize: 18,
	},
	inp: {
		flex: 1,
		height: 60,
		backgroundColor: Colors.dark.sc,
		borderRadius: 20,
		paddingHorizontal: 15,
		fontSize: 18,
		color: Colors.dark.text,
	},
	clearBtn: {
		position: "absolute",
		right: 80,
		zIndex: 99,
	},
	scroll: {
		flex: 1,
		zIndex: 99,
		marginTop: 130,
	},
	tracksBox: {
		gap: 3,
	},
});
