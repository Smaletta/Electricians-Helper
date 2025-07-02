import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import * as  mathjs from "mathjs";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useConduitModal } from "@/context/ConduitBendingModal";
import { Button } from "@react-navigation/elements";
import useCheckForFloat from "@/hooks/useCheckForFloat";


export default function LimitedSpaceAngleCalculator() {
    const [a, setA] = useState(0.0);
    const [b, setB] = useState(0.0);
    const [c, setC] = useState(0.0);
    const [angleA, setAngleA] = useState(0.0);
    const [angleB, setAngleB] = useState(0.0);
    const angleC = 90
    const { closeModal } = useConduitModal();

    useEffect(() => {
        if (a !== 0 && b !== 0) {
            const result = mathjs.sqrt(a * a + b * b);
            console.log("Distance Between Marks:", result);
            setC(Number(mathjs.round(result, 2)));
            const angleA = mathjs.atan(a / b) * (180 / Math.PI);
            console.log("Angle of Bend:", angleA);
            setAngleA(Number(mathjs.round(angleA, 2)));
            setAngleB(Number((90 - angleA)));
        }
    }, [a, b, c, angleA]);

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
                    <ThemedText type="title">Conduit Bending</ThemedText>
                    <ThemedView style={styles.row}>
                        <ThemedText type="subtitle">Obstacle Height</ThemedText>
                        <ThemedTextInput
                            style={styles.input}
                            editable
                            inputMode="decimal"
                            onChangeText={(text) => setA(useCheckForFloat(text))}
                            value={a.toString()}
                            returnKeyType="done"
                        />
                    </ThemedView>
                    <ThemedView style={styles.row}>
                        <ThemedText type="subtitle">Width of Limited Space</ThemedText>
                        <ThemedTextInput
                            style={styles.input}
                            editable
                            inputMode="decimal"
                            onChangeText={(text) => setB(useCheckForFloat(text))}
                            value={b.toString()}
                            returnKeyType="done"
                        />
                    </ThemedView>
                    <ThemedView style={styles.display}>
                        <ThemedText type="subtitle" style={{ padding: 10 }}>Distance Between Marks</ThemedText>
                        <ThemedText type="subtitle" style={{ padding: 10 }}>{c}</ThemedText>
                    </ThemedView>
                    <ThemedView style={styles.display}>
                        <ThemedText type="subtitle" style={{ padding: 10 }}>Angle</ThemedText>
                        <ThemedText type="subtitle" style={{ padding: 10 }}>{angleA}</ThemedText>
                    </ThemedView>
                </ThemedView>
                <Button onPress={closeModal}>
                    Close
                </Button>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    text: { fontSize: 18, marginBottom: 10 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        width: '50%',
        marginBottom: 20,
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
    },
        display: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
    },

});