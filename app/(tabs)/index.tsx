import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SectionList } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const DATA = [
  {
    title: "Electrical Formula",
    data: [
      "V = I x R,  V = P / I,  V = √ P x R",
      "I = V / R,  I = V / P,  I = √ P / R",
      "R = V / I,  R = P / V²,  R = P / I²",
      "P = V x I,  P = V² / R,  P = I² x R"
    ]
  },
  {
    title: "Conduit Angle Multipliers",
    data: [
      "10 = 5.8",  "22.5 = 2.6",  "30 = 2",  "45 = 1.4",  "60 = 1.2"
    ]
  },
  {
    title: "Other",
    data: [
      "Horsepower multiplier = 746",
      "Power Factor = 0.8 unless otherwise specified",
      "Efficiency Factor = 0.9 unless otherwise specified"
    ]
  }
];

export default function Index() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <ThemedView
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ThemedText type="title" style={{padding: 20}}>Quick Reference</ThemedText>
          <SectionList
            style={{ width: "100%", flex: 1 }}
            sections={DATA}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => (
              <ThemedView style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                padding: 5,
              }}>
                <ThemedText>{item}</ThemedText>
              </ThemedView>
            )}
            renderSectionHeader={({ section }) =>
              <ThemedView style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
              }}>
                <ThemedText type="subtitle">{section.title}</ThemedText>
              </ThemedView>
            }
          >
          </SectionList>
        </ThemedView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
