import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import * as  mathjs from "mathjs";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, Switch } from "react-native";
import { useConduitModal } from "@/context/ConduitBendingModal";
import { Button } from "@react-navigation/elements";
import useCheckForFloat from "@/hooks/useCheckForFloat";


export default function VoltageDrop() {
    const [V, setV] = useState("");
    const [I, setI] = useState("");
    const [CS, setCS] = useState("");
    const [CM, setCM] = useState(true);
    const [P, setP] = useState(true);
    const [L, setL] = useState("");
    const [selectedButton, setSelectedButton] = useState("");
    const { closeModal } = useConduitModal();

    const changeSelectedButton = (size: string) => {
        setCS(size);
        setSelectedButton(size);
        console.log(selectedButton);
    };

    type ConductorMaterial = 'copper' | 'aluminum';
    type PhaseType = 'single' | 'three';

    interface CableParams {
        voltage: number;
        current: number;
        conductorSize: string;
        conductorMaterial: ConductorMaterial;
        phase: PhaseType;
        allowableVoltageDropPercent?: number;
    }

    const conductorResistance: Record<ConductorMaterial, Record<string, number>> = {
        copper: {
            "14 AWG": 0.00827,
            "12 AWG": 0.005211,
            "10 AWG": 0.003277,
            "8 AWG": 0.002061,
            "6 AWG": 0.001296,
            "4 AWG": 0.000815,
            "2 AWG": 0.000512,
            "1/0 AWG": 0.000324,
            "2/0 AWG": 0.000256,
        },
        aluminum: {
            "14 AWG": 0.01314,
            "12 AWG": 0.00828,
            "10 AWG": 0.00522,
            "8 AWG": 0.00328,
            "6 AWG": 0.00207,
            "4 AWG": 0.0013,
            "2 AWG": 0.00082,
            "1/0 AWG": 0.00051,
            "2/0 AWG": 0.00041,
        }
    };

    function toggleMaterialSwitch() {
        if (CM === true) {
            setCM(false);
        } else {
            setCM(true);
        }
    }

    function togglePhaseSwitch() {
        if (P === true) {
            setP(false);
        } else {
            setP(true);
        }
    }
    function calculateMaxCableRun(params: CableParams): void {
        const {
            voltage,
            current,
            conductorSize,
            conductorMaterial,
            phase,
            allowableVoltageDropPercent = 3
        } = params;

        const resistance = conductorResistance[conductorMaterial][conductorSize];
        const maxVoltageDrop = voltage * (allowableVoltageDropPercent / 100);
        const multiplier = phase === 'single' ? 2 : Math.sqrt(3);
        const maxLength = maxVoltageDrop / (multiplier * current * resistance);
        console.log(voltage, current, conductorSize, conductorMaterial, phase, maxLength);
        return setL(String(maxLength.toFixed(2)));
    }


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
                    <ThemedText type="title" style={{ padding: 20 }}>Voltage Drop Calculator</ThemedText>
                    <ThemedView style={styles.row}>
                        <ThemedText type="subtitle">Voltage</ThemedText>
                        <ThemedTextInput
                            style={styles.input}
                            editable
                            inputMode="decimal"
                            onChangeText={(text) => setV(useCheckForFloat(text))}
                            value={V.toString()}
                            returnKeyType="done"
                        />
                    </ThemedView>
                    <ThemedView style={styles.row}>
                        <ThemedText type="subtitle">Current</ThemedText>
                        <ThemedTextInput
                            style={styles.input}
                            editable
                            inputMode="decimal"
                            onChangeText={(text) => setI(useCheckForFloat(text))}
                            value={I.toString()}
                            returnKeyType="done"
                        />
                    </ThemedView>
                    <ThemedText type="subtitle">Conductor Material</ThemedText>
                    <ThemedView style={styles.switch}>
                        <ThemedText type="subtitle">Aluminum</ThemedText>
                        <Switch
                            trackColor={{ false: "#767577", true: "#B87333" }}
                            thumbColor={CM ? '#f4f3f4' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleMaterialSwitch}
                            value={CM}
                        />
                        <ThemedText type="subtitle">Copper    </ThemedText>
                    </ThemedView>
                    <ThemedText type="subtitle">Conductor Size</ThemedText>
                    <ThemedView style={styles.row}>
                        <TouchableOpacity
                            style={selectedButton === "14 AWG" ? styles.selectedButton : styles.button}
                            onPress={() => changeSelectedButton("14 AWG")}
                        >
                            <ThemedText>14 </ThemedText>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={selectedButton === "12 AWG" ? styles.selectedButton : styles.button}
                            onPress={() => changeSelectedButton("12 AWG")}
                        >
                            <ThemedText>12 </ThemedText>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={selectedButton === "10 AWG" ? styles.selectedButton : styles.button}
                            onPress={() => changeSelectedButton("10 AWG")}
                        >
                            <ThemedText>10 </ThemedText>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={selectedButton === "8 AWG" ? styles.selectedButton : styles.button}
                            onPress={() => changeSelectedButton("8 AWG")}
                        >
                            <ThemedText> 8 </ThemedText>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={selectedButton === "6 AWG" ? styles.selectedButton : styles.button}
                            onPress={() => changeSelectedButton("6 AWG")}
                        >
                            <ThemedText> 6 </ThemedText>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={selectedButton === "4 AWG" ? styles.selectedButton : styles.button}
                            onPress={() => changeSelectedButton("4 AWG")}
                        >
                            <ThemedText> 4 </ThemedText>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={selectedButton === "2 AWG" ? styles.selectedButton : styles.button}
                            onPress={() => changeSelectedButton("2 AWG")}
                        >
                            <ThemedText> 2 </ThemedText>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={selectedButton === "1/0 AWG" ? styles.selectedButton : styles.button}
                            onPress={() => changeSelectedButton("1/0 AWG")}
                        >
                            <ThemedText>1/0</ThemedText>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={selectedButton === "2/0 AWG" ? styles.selectedButton : styles.button}
                            onPress={() => changeSelectedButton("2/0 AWG")}
                        >
                            <ThemedText>2/0</ThemedText>
                        </TouchableOpacity>
                    </ThemedView>
                    <ThemedText type="subtitle">Phase</ThemedText>
                    <ThemedView style={styles.switch}>
                        <ThemedText type="subtitle">Single Phase</ThemedText>
                        <Switch
                            trackColor={{ false: "#767577", true: "#B87333" }}
                            thumbColor={P ? '#f4f3f4' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={togglePhaseSwitch}
                            value={P}
                        />
                        <ThemedText type="subtitle">Three Phase</ThemedText>
                    </ThemedView>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {calculateMaxCableRun({ voltage: Number(V), current: Number(I), conductorSize: selectedButton, conductorMaterial: (CM ? 'copper' : 'aluminum'), phase: (P ? 'three' : 'single') })}}
                    >
                        <ThemedText>Calculate</ThemedText>
                    </TouchableOpacity>
                    <ThemedView style={styles.display}>
                        <ThemedText type="subtitle" style={{ padding: 10 }}>Maximum Length</ThemedText>
                        <ThemedText type="subtitle" style={{ padding: 10 }}>{L}</ThemedText>
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
        borderRadius: 20,
        alignItems: 'center',

    },
    selectedButton: {
        backgroundColor: '#003366',
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
    },
    display: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
    },
    switch: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        padding: 10,
        justifyContent: 'space-evenly'
    },

});