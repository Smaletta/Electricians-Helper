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


export default function CustomAngleBends() {
    const [a, setA] = useState("");
    const [b, setB] = useState("");
    const [c, setC] = useState("");
    const [angleA, setAngleA] = useState("");
    const [angleB, setAngleB] = useState("");
    const angleC = 90
    const { closeModal } = useConduitModal();

    useEffect(() => {
        if (parseFloat(a) !== 0 && parseFloat(b) !== 0) {
            const result = parseFloat(a) / mathjs.sin(mathjs.unit(parseFloat(b), "deg"));
            console.log(result);
            setC(result.toFixed(2));
        }
    }, [a, b, c]);

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
                    <ThemedText type="title" style={{padding: 20}}>Custom Angle Bend</ThemedText>
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
                        <ThemedText type="subtitle">Angle of Bend</ThemedText>
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