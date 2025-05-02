import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import TrackBox from "@/shared/TrackBox";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { searchModalAtom } from "@/hooks/useModals";
import { useAtom } from "jotai";
import SearchModal from "@/components/SearchModal";
import { static_data } from "@/shared/data";

export default function HomeScreen() {
	const [open, setOpen] = useAtom(searchModalAtom);

	return (
		<>
			<TouchableOpacity style={s.btn} onPress={() => setOpen(!open)}>
				<FontAwesome name="search" size={24} color="black" />
			</TouchableOpacity>

			<SearchModal />

			<ParallaxScrollView
				headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
				headerImage={
					<Image
						source={require("@/assets/images/sg.jpg")}
						resizeMode="cover"
						style={s.sg}
					/>
				}>
				{/* TRACKS */}
				<TrackBox tracks={static_data} />
			</ParallaxScrollView>
		</>
	);
}

const s = StyleSheet.create({
	sg: {
		width: "100%",
		height: "100%",
	},
	btn: {
		position: "absolute",
		backgroundColor: Colors.dark.icon,
		bottom: 180,
		right: 20,
		width: 60,
		height: 60,
		zIndex: 10,
		borderRadius: "50%",
		alignItems: "center",
		justifyContent: "center",
		boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.8)",
	},
});
