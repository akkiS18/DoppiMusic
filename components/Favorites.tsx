import TrackBox from "@/shared/TrackBox";
import { favorite_data } from "@/shared/data";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function Favorites() {
	return (
		<>
			<ScrollView
				contentContainerStyle={{ paddingBottom: 180 }}
				horizontal={false}
				style={{ width: "100%" }}>
				<View style={s.box}>
					<TrackBox tracks={favorite_data} />
				</View>
			</ScrollView>
		</>
	);
}

const s = StyleSheet.create({
	box: {
		gap: 3,
	},
});
