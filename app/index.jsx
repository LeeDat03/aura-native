import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { Link } from "expo-router";

import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-5xl font-pblack">Aura!</Text>
      <StatusBar style="auto" />
      <Link href="/profile">Go to proifle</Link>
    </View>
  );
}
