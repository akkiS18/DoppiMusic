import Favorites from "@/components/Favorites";
import MySongs from "@/components/MySongs";
import { Colors } from "@/constants/Colors";
import { screen } from "@/constants/options";
import { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Library() {
	const [active, setActive] = useState(0);

	const insets = useSafeAreaInsets();
	const linePosition = (screen.width - 30) / 2;

	return (
		<View style={[s.main, { paddingTop: insets.top }]}>
			{/* HEADER */}
			<View style={s.header}>
				{active === 0 && <View style={[s.line, { left: 0 }]} />}
				{active === 1 && <View style={[s.line, { left: linePosition }]} />}

				<TouchableOpacity onPress={() => setActive(0)} style={s.btn}>
					<Text style={[s.tHeader, active === 0 && { color: "white" }]}>
						My Songs
					</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => setActive(1)} style={s.btn}>
					<Text style={[s.tHeader, active === 1 && { color: "white" }]}>
						Favorites
					</Text>
				</TouchableOpacity>
			</View>

			{active === 0 && <MySongs />}
			{active === 1 && <Favorites />}
		</View>
	);
}

const s = StyleSheet.create({
	main: {
		flex: 1,
		gap: 20,
		alignItems: "center",
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		width: screen.width - 30,
		height: 60,
		borderBottomWidth: 1,
		borderBottomColor: Colors.dark.icon,
	},
	btn: {
		flex: 1,
		paddingVertical: 15,
	},
	tHeader: {
		color: Colors.dark.icon,
		fontSize: 18,
		textAlign: "center",
	},
	line: {
		backgroundColor: "white",
		height: 2,
		position: "absolute",
		bottom: 0,
		zIndex: 99,
		width: (screen.width - 30) * 0.5,
	},
});
