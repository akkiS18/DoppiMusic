import { View, ScrollView } from "react-native";
import ImportButton from "@/shared/ImportButton";
import DeviceTrackBox from "@/shared/DeviceTrackBox";
import * as DocumentPicker from "expo-document-picker";
import { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";
import { screen } from "@/constants/options";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MySongs() {
	const [deviceTracks, setDeviceTracks] = useState<
		DocumentPicker.DocumentPickerAsset[] | any
	>([]);
	const [refresh, setRefresh] = useState(false);

	const copyFileToAppStorage = async (
		pickedFile: DocumentPicker.DocumentPickerAsset
	) => {
		const filename = pickedFile.name;
		const newPath = `${FileSystem.documentDirectory}${filename}`;

		await FileSystem.copyAsync({
			from: pickedFile.uri,
			to: newPath,
		});

		return {
			name: filename,
			uri: newPath,
			size: pickedFile.size,
			mimeType: pickedFile.mimeType,
		};
	};

	const pickMusicFile = async () => {
		const result = await DocumentPicker.getDocumentAsync({
			type: "audio/*",
			copyToCacheDirectory: true,
			multiple: true,
		});

		if (!result.canceled) {
			const savedFiles = await copyMultipleFiles(result.assets);
			await saveFilesToStorage(savedFiles);
			// console.log(savedFiles);
		} else {
			console.log("Foydalanuvchi fayl tanlamadi");
		}
	};

	const copyMultipleFiles = async (pickedFiles: any) => {
		const copiedFiles = await Promise.all(
			pickedFiles.map(async (file: any) => {
				try {
					return await copyFileToAppStorage(file);
				} catch (error) {
					console.error("Fayl nusxalashda xatolik:", error);
					return null;
				}
			})
		);

		// null bo‘lgan (xatolik bo‘lgan) fayllarni chiqarib yuborish
		return copiedFiles.filter(Boolean);
	};

	const saveFilesToStorage = async (
		files: DocumentPicker.DocumentPickerAsset[]
	) => {
		try {
			const json = JSON.stringify(files);
			await AsyncStorage.setItem("savedSongs", json);
			setRefresh(!refresh);
		} catch (e) {
			console.error("Qo‘shiqlarni saqlashda xatolik:", e);
		}
	};

	const getSavedSongs = async () => {
		try {
			const json = await AsyncStorage.getItem("savedSongs");
			return json != null ? JSON.parse(json) : [];
		} catch (e) {
			console.error("Saqlangan qo‘shiqlarni olishda xatolik:", e);
			return [];
		}
	};

	useEffect(() => {
		const loadSongs = async () => {
			const saved = await getSavedSongs();
			setDeviceTracks(saved);
		};

		loadSongs();
	}, [refresh]);

	return (
		<>
			{/* IMPORT FROM FILE */}
			<ImportButton onPress={pickMusicFile} />

			{/* TRACKS FROM DEVICE */}
			{deviceTracks && deviceTracks.length > 0 && (
				<ScrollView
					style={s.scroll}
					contentContainerStyle={{ paddingBottom: 180 }}>
					<View style={s.tracksBox}>
						<DeviceTrackBox tracks={deviceTracks} />
					</View>
				</ScrollView>
			)}
		</>
	);
}

const s = StyleSheet.create({
	main: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-around",
		flexWrap: "wrap",
		gap: 20,
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
	tHeader: {
		color: Colors.dark.icon,
		fontSize: 18,
	},
	line: {
		backgroundColor: "white",
		height: 2,
		position: "absolute",
		bottom: 0,
		zIndex: 99,
		width: screen.width * 0.33,
	},
	scroll: {
		width: "100%",
		height: "100%",
		zIndex: 99,
	},
	tracksBox: {
		gap: 3,
	},
});
