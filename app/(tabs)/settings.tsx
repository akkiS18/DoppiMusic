import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Colors } from "@/constants/Colors";
import { Entypo, Ionicons, AntDesign, FontAwesome6 } from "@expo/vector-icons";

export default function Settings() {
	return (
		<ParallaxScrollView
			headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
			headerImage={
				<Image
					source={require("@/assets/images/icon.png")}
					resizeMode="cover"
					style={s.sg}
				/>
			}>
			<TouchableOpacity style={s.element}>
				<Text style={[s.text, { fontSize: 30 }]}>Sultonkhuja</Text>
				<Entypo name="chevron-right" size={30} color={Colors.dark.text} />
			</TouchableOpacity>
			<View style={s.box}>
				<TouchableOpacity style={s.element}>
					<Ionicons name="invert-mode" size={30} color={Colors.dark.text} />
					<Text style={s.text}>Display mode</Text>
				</TouchableOpacity>
				<TouchableOpacity style={s.element}>
					<FontAwesome6 name="headset" size={30} color={Colors.dark.text} />
					<Text style={s.text}>Support</Text>
				</TouchableOpacity>
				<TouchableOpacity style={s.element}>
					<AntDesign name="logout" size={30} color={"red"} />
					<Text style={[s.text, { color: "red" }]}>Logout</Text>
				</TouchableOpacity>
			</View>
		</ParallaxScrollView>
	);
}

const s = StyleSheet.create({
	sg: {
		width: 200,
		height: 200,
	},
	box: {
		alignItems: "center",
	},
	element: {
		flexDirection: "row",
		alignItems: "flex-end",
		width: "90%",
		padding: 20,
		gap: 20,
	},
	text: {
		color: Colors.dark.text,
		fontSize: 25,
	},
});
