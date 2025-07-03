import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import * as  mathjs from "mathjs";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useConduitModal } from "@/context/ConduitBendingModal";
import { Button } from "@react-navigation/elements";
import useCheckForFloat from "@/hooks/useCheckForFloat";


export default function RegularAngleBends() {
    const [a, setA] = useState("");
    const [b, setB] = useState("");
    const [c, setC] = useState("");
    const { closeModal } = useConduitModal();
    const [selectedButton, setSelectedButton] = useState("");

    useEffect(() => {
        if (parseFloat(a) !== 0 && parseFloat(b) !== 0) {
            const result = parseFloat(a) / mathjs.sin(mathjs.unit(parseFloat(b), "deg"));
            console.log(result);
            setC(String(mathjs.round(result, 2)));
        }
    }, [a, b, c]);

    const changeSelectedButton = (angle: string) => {
        setB(angle);
        setSelectedButton(angle);
        console.log(selectedButton);
    };

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
                        <ThemedText type="subtitle">Angle of Bend</ThemedText>
                        <TouchableOpacity
                            style={selectedButton === "10" ? styles.selectedButton : styles.button}
                            onPress={() => changeSelectedButton("10")}
                        >
                            <ThemedText>10°</ThemedText>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={selectedButton === "22.5" ? styles.selectedButton : styles.button}
                            onPress={() => changeSelectedButton("22.5")}
                        >
                            <ThemedText>22.5°</ThemedText>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={selectedButton === "30" ? styles.selectedButton : styles.button}
                            onPress={() => changeSelectedButton("30")}
                        >
                            <ThemedText>30°</ThemedText>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={selectedButton === "45" ? styles.selectedButton : styles.button}
                            onPress={() => changeSelectedButton("45")}
                        >
                            <ThemedText>45°</ThemedText>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={selectedButton === "60" ? styles.selectedButton : styles.button}
                            onPress={() => changeSelectedButton("60")}
                        >
                            <ThemedText>60°</ThemedText>
                        </TouchableOpacity>
                    </ThemedView>
                    <ThemedView style={styles.display}>
                        <ThemedText type="subtitle" style={{ padding: 10 }}>Distance Between Marks</ThemedText>
                        <ThemedText type="subtitle" style={{ padding: 10 }}>{useCheckForFloat(c)}</ThemedText>
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
    radio: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        
    },
    selectedButton: {
        backgroundColor: '#003366',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
        display: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
    },

});