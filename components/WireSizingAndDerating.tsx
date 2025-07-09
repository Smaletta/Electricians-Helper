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
import { AmbientTemperatureDerating, WireSizeCopper, WireSizeAluminum } from "@/data/WireSizeTables";


export default function WireSizingAndDerating() {
    const [A, setA] = useState("");
    const [Termination, setTermination] = useState("");
    const [AmbientTempSwitch, setAmbientTempSwitch] = useState(false);
    const [AmbientTemp, setAmbientTemp] = useState("");
    const [ConductorMaterial, setConductorMaterial] = useState(true);
    const [NumberOfConductorsSwitch, setNumberOfConductorsSwitch] = useState(false);
    const [NumberOfConductors, setNumberOfConductors] = useState("");
    const [WireSize, setWireSize] = useState("");

    const { closeModal } = useConduitModal();

    function WireSizeCalculation() {
        var Amp = Number(A);
        const Ter = Number(Termination);
        const CondMat = {
            Copper: ConductorMaterial,
            Aluminum: !ConductorMaterial
        }
        var result = 0;
        if (A === "") {
            return alert("Please enter an Ampere rating.");
        }
        if (Termination === "") {
            return alert("Please select a termination.");
        }
        if (AmbientTempSwitch === true) {
            Amp = (Amp / AmbientTemperatureDerating[Ter][(Number(AmbientTemp))]);
        }
        if (NumberOfConductorsSwitch === true) {
            if (NumberOfConductors === "") {
                return alert("Please enter a number of conductors.");
            }
            if (Number(NumberOfConductors) < 4) {
                Amp = Amp
            }
            if (Number(NumberOfConductors) >= 4 && Number(NumberOfConductors) < 7) {
                Amp = Amp / 0.8;
            }
            if (Number(NumberOfConductors) >= 7 && Number(NumberOfConductors) < 25) {
                Amp = Amp / 0.7;
            }
            if (Number(NumberOfConductors) >= 25 && Number(NumberOfConductors) < 43) {
                Amp = Amp / 0.6;
            }
            if (Number(NumberOfConductors) >= 43) {
                Amp = Amp / 0.5;
            }
        }
        if (CondMat.Copper === true) {
            while (WireSizeCopper[Ter][Amp] === undefined) {
                Amp = mathjs.round(Amp);
                Amp += 1;
            }
            result = parseFloat(WireSizeCopper[Ter][Amp]);
        } else {
            while (WireSizeAluminum[Ter][Amp] === undefined) {
                Amp = mathjs.round(Amp);
                Amp += 1;
            }
            result = parseFloat(WireSizeAluminum[Ter][Amp]);
        }
        return setWireSize(result.toString());
    }

    function toggleMaterialSwitch() {
        if (ConductorMaterial === true) {
            setConductorMaterial(false);
        } else {
            setConductorMaterial(true);
        }
    };
    const changeSelectedTerminationButton = (temp: string) => {
        setTermination(temp);
        console.log(temp);
    };

    const toggleAmbientTempSwitch = () => {
        if (AmbientTempSwitch === true) {
            setAmbientTempSwitch(false);
        } else {
            setAmbientTempSwitch(true);
        }
    }

    const changeSelectedAmbientTempButton = (temp: string) => {
        setAmbientTemp(temp);
        console.log(temp);
    };

    const toggleNumberOfConductorsSwitch = () => {
        if (NumberOfConductorsSwitch === true) {
            setNumberOfConductorsSwitch(false);
        } else {
            setNumberOfConductorsSwitch(true);
        }
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
                    <ThemedText type="title" style={{ padding: 20 }}>Wire Sizing and Derating</ThemedText>
                    <ThemedView style={styles.switch}>
                        <ThemedText type="subtitle">Aluminum</ThemedText>
                        <Switch
                            trackColor={{ false: "#767577", true: "#B87333" }}
                            thumbColor={ConductorMaterial ? '#f4f3f4' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleMaterialSwitch}
                            value={ConductorMaterial}
                        />
                        <ThemedText type="subtitle">Copper    </ThemedText>
                    </ThemedView>
                    <ThemedView style={styles.row}>
                        <ThemedText type="subtitle">Ampacity</ThemedText>
                        <ThemedTextInput
                            style={styles.input}
                            editable
                            inputMode="decimal"
                            onChangeText={(text) => setA(useCheckForFloat(text))}
                            value={A.toString()}
                            returnKeyType="done"
                        />
                    </ThemedView>
                    <ThemedView style={styles.row}>
                        <ThemedText type="subtitle">Termination Rating</ThemedText>
                        <TouchableOpacity
                            style={Termination === "60" ? styles.selectedButton : styles.button}
                            onPress={() => changeSelectedTerminationButton("60")}
                        >
                            <ThemedText type="default">60° C</ThemedText>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={Termination === "75" ? styles.selectedButton : styles.button}
                            onPress={() => changeSelectedTerminationButton("75")}
                        >
                            <ThemedText type="default">75° C</ThemedText>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={Termination === "90" ? styles.selectedButton : styles.button}
                            onPress={() => changeSelectedTerminationButton("90")}
                        >
                            <ThemedText type="default">90° C</ThemedText>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={Termination === "110" ? styles.selectedButton : styles.button}
                            onPress={() => changeSelectedTerminationButton("110")}
                        >
                            <ThemedText type="default">110° C</ThemedText>
                        </TouchableOpacity>
                    </ThemedView>
                    <ThemedView style={styles.row}>
                        <ThemedText type="subtitle">Ambient Temperature</ThemedText>
                        <Switch
                            trackColor={{ false: "#767577", true: "#C8C8C8" }}
                            thumbColor={AmbientTempSwitch ? '#f4f3f4' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleAmbientTempSwitch}
                            value={AmbientTempSwitch}
                        />
                    </ThemedView>
                    {AmbientTempSwitch &&
                        <ThemedView style={styles.row}>
                            <TouchableOpacity
                                style={AmbientTemp === "35" ? styles.selectedButton : styles.button}
                                onPress={() => changeSelectedAmbientTempButton("35")}
                            >
                                <ThemedText type="default">35°C</ThemedText>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={AmbientTemp === "40" ? styles.selectedButton : styles.button}
                                onPress={() => changeSelectedAmbientTempButton("40")}
                            >
                                <ThemedText type="default">40°C</ThemedText>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={AmbientTemp === "45" ? styles.selectedButton : styles.button}
                                onPress={() => changeSelectedAmbientTempButton("45")}
                            >
                                <ThemedText type="default">45°C</ThemedText>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={AmbientTemp === "50" ? styles.selectedButton : styles.button}
                                onPress={() => changeSelectedAmbientTempButton("50")}
                            >
                                <ThemedText type="default">50°C</ThemedText>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={AmbientTemp === "55" ? styles.selectedButton : styles.button}
                                onPress={() => changeSelectedAmbientTempButton("55")}
                            >
                                <ThemedText type="default">55°C</ThemedText>
                            </TouchableOpacity>
                            {Termination !== "60" &&
                                <>
                                    <TouchableOpacity
                                        style={AmbientTemp === "60" ? styles.selectedButton : styles.button}
                                        onPress={() => changeSelectedAmbientTempButton("60")}
                                    >
                                        <ThemedText type="default">60°C</ThemedText>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={AmbientTemp === "65" ? styles.selectedButton : styles.button}
                                        onPress={() => changeSelectedAmbientTempButton("65")}
                                    >
                                        <ThemedText type="default">65°C</ThemedText>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={AmbientTemp === "70" ? styles.selectedButton : styles.button}
                                        onPress={() => changeSelectedAmbientTempButton("70")}
                                    >
                                        <ThemedText type="default">70°C</ThemedText>
                                    </TouchableOpacity>
                                </>
                            }
                        </ThemedView>
                    }
                    <ThemedView style={styles.row}>
                        <ThemedText type="subtitle">Number of Conductors</ThemedText>
                        <Switch
                            trackColor={{ false: "#767577", true: "#C8C8C8" }}
                            thumbColor={NumberOfConductorsSwitch ? '#f4f3f4' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleNumberOfConductorsSwitch}
                            value={NumberOfConductorsSwitch}
                        />
                    </ThemedView>
                    {NumberOfConductorsSwitch &&
                        <ThemedView style={styles.row}>
                            <ThemedTextInput
                                style={styles.input}
                                editable
                                inputMode="numeric"
                                onChangeText={(text) => setNumberOfConductors(useCheckForFloat(text))}
                                value={NumberOfConductors.toString()}
                                returnKeyType="done"
                            />
                        </ThemedView>
                    }
                    <ThemedView style={styles.display}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => WireSizeCalculation()}
                        >
                            <ThemedText type="default">Calculate Wire Size</ThemedText>
                        </TouchableOpacity>
                        <ThemedText type="subtitle" style={{ padding: 10 }}>Wire Size</ThemedText>
                        <ThemedText type="subtitle" style={{ padding: 10 }}>{WireSize}</ThemedText>
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
    button: {
        backgroundColor: '#007AFF',
        padding: 5,
        borderRadius: 15,
        alignItems: 'center',

    },
    selectedButton: {
        backgroundColor: '#003366',
        padding: 5,
        borderRadius: 15,
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