import { useMemo, useState } from "react";
import { Pressable, SafeAreaView, ScrollView, Text, TextInput, View } from "react-native";
import { seedHomepageTiles } from "../../../packages/db/src/seed-data.js";
import { t } from "../../../packages/i18n/src/index.js";
import { mobileSurface } from "./mobile-surface.js";

export default function App() {
  const [locale] = useState<"tk" | "ru" | "en">("tk");
  const [active, setActive] = useState("home");
  const quickServices = useMemo(() => seedHomepageTiles, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f8f3" }}>
      <ScrollView contentContainerStyle={{ padding: 18, paddingBottom: 110 }}>
        <Text style={{ color: "#1fa873", fontSize: 34, fontWeight: "800" }}>Mirasly</Text>
        <TextInput
          placeholder={t(locale, "search.placeholder")}
          style={{ backgroundColor: "white", borderRadius: 18, marginVertical: 18, padding: 16 }}
        />
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
          {quickServices.map((tile) => (
            <Pressable
              key={tile.code}
              style={{ backgroundColor: "white", borderRadius: 16, minHeight: 92, padding: 14, width: "47%" }}
            >
              <Text style={{ fontWeight: "700" }}>{tile.title[locale]}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
      <View
        style={{
          alignItems: "center",
          backgroundColor: "white",
          bottom: 0,
          flexDirection: "row",
          justifyContent: "space-around",
          left: 0,
          padding: 12,
          position: "absolute",
          right: 0,
        }}
      >
        {mobileSurface.bottomNav.map((item) => (
          <Pressable
            key={item.key}
            onPress={() => setActive(item.key)}
            style={{
              backgroundColor: item.dominant ? "#1fa873" : "transparent",
              borderRadius: item.dominant ? 28 : 8,
              minWidth: item.dominant ? 58 : 48,
              padding: item.dominant ? 16 : 8,
            }}
          >
            <Text style={{ color: item.dominant ? "white" : active === item.key ? "#1fa873" : "#61746c" }}>
              {item.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}
