import {
	Text,
	TouchableOpacity,
	StyleSheet,
	TouchableOpacityProps,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { Colors } from "@/constants/Colors";

export default function ImportButton(props: TouchableOpacityProps) {
	return (
		<TouchableOpacity {...props} style={s.btn}>
			<Feather name="folder-plus" size={30} color={Colors.dark.text} />
			<Text style={s.text}>Import from device</Text>
		</TouchableOpacity>
	);
}

const s = StyleSheet.create({
	btn: {
		width: "90%",
		height: 70,
		marginVertical: 10,
		backgroundColor: Colors.dark.sc,
		borderRadius: 20,
		alignItems: "center",
		flexDirection: "row",
		paddingHorizontal: 20,
		gap: 30,
		marginHorizontal: 15,
	},
	text: {
		color: Colors.dark.text,
		fontSize: 22,
		fontWeight: "semibold",
	},
});
