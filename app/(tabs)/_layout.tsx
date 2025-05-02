import { Tabs } from "expo-router";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";
import Player from "@/components/Player";

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<>
			<Player />

			{/* TABS */}
			<Tabs
				screenOptions={{
					tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
					headerShown: false,
					tabBarButton: HapticTab,
					tabBarBackground: TabBarBackground,
					tabBarStyle: Platform.select({
						ios: {
							position: "absolute",
						},
						default: {},
					}),
				}}>
				<Tabs.Screen
					name="index"
					options={{
						title: "Home",
						tabBarIcon: ({ color }) => (
							<AntDesign name="home" size={24} color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name="library"
					options={{
						title: "Library",
						tabBarIcon: ({ color }) => (
							<MaterialIcons name="library-music" size={24} color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name="settings"
					options={{
						title: "Settings",
						tabBarIcon: ({ color }) => (
							<Feather name="settings" size={24} color={color} />
						),
					}}
				/>
			</Tabs>
		</>
	);
}
