import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { Modal, StyleSheet, TouchableOpacity, Switch, FlatList } from "react-native";
import { useConduitModal } from "@/context/ConduitBendingModal";
import { Button } from "@react-navigation/elements";
import useCheckForFloat from "@/hooks/useCheckForFloat";
import { WireSizeTypes, ConduitSizeTables } from "@/data/ConduitSizeTables";

export default function ConduitFill() {

    const [WireSize, setWireSize] = useState("Wire Size");
    const [WireType, setWireType] = useState("Wire Type");
    const [ConduitType, setConduitType] = useState("Conduit Type");
    const [NumberOfWires, setNumberOfWires] = useState("");
    const [LeadSheath, setLeadSheath] = useState(false);
    const [ConduitSize, setConduitSize] = useState("");
    const [ConduitFill, setConduitFill] = useState("");
    const [Data, setData] = useState<string[]>([]);

    const [WireTypeModalVisible, setWireTypeModalVisible] = useState(false);
    const [WireSizeModalVisible, setWireSizeModalVisible] = useState(false);
    const [ConduitModalVisible, setConduitModalVisible] = useState(false);
    const { closeModal } = useConduitModal();

    function WireSelectionModal() {
        const keys = Object.keys(WireSizeTypes);
        setData(keys);
        console.log(Data);
        setWireTypeModalVisible(true);
    };

    function SetWireSelection(item: string) {
        setWireType(item);
        setWireTypeModalVisible(false);
    };

    function SizeSelectionModal() {
        const keys = Object.keys(WireSizeTypes[WireType]);
        setData(keys);
        console.log(keys);
        setWireSizeModalVisible(true);
    };

    function SetSizeSelection(item: string) {
        setWireSize(item);
        setWireSizeModalVisible(false);
    };

    function ConduitSelectionModal() {
        setConduitModalVisible(true);
        const keys = Object.keys(ConduitSizeTables);
        setData(keys);
    };

    function SetConduitSelection(item: string) {
        setConduitType(item);
        setConduitModalVisible(false);
    };

    function Calculate() {
        if (WireType !== "Wire Type" && WireSize !== "Wire Size" && ConduitType !== "Conduit Type") {
            let WireCrossSection = WireSizeTypes[WireType][WireSize] * Number(NumberOfWires);
            console.log(Number(NumberOfWires));
            console.log(WireCrossSection);
            let ConduitSizes = (Object.keys(ConduitSizeTables[ConduitType])).map(Number);
            console.log(ConduitSizes);
            if (!LeadSheath) {
                if (Number(NumberOfWires) >= 3) {
                    for (let i = 0; i < ConduitSizes.length; i++) {
                        if (WireCrossSection <= (.4 * Number([ConduitSizes[i]]))) {
                            console.log("Code Reached here.")
                            setConduitFill(String(Number((WireCrossSection / ConduitSizes[i]).toFixed(4)) * 100) + "%");
                            console.log(ConduitSizeTables[ConduitType][ConduitSizes[i]]);
                            setConduitSize(String(ConduitSizeTables[ConduitType][ConduitSizes[i]]));
                            return;
                        }
                        else {
                            setConduitSize("N/A");
                            setConduitFill("N/A");
                        }
                    }
                }
                else if (Number(NumberOfWires) == 2) {
                    for (let i = 0; i < ConduitSizes.length; i++) {
                        if (WireCrossSection <= (.31 * Number([ConduitSizes[i]]))) {
                            console.log("Code Reached here.")
                            setConduitFill(String(Number((WireCrossSection / ConduitSizes[i]).toFixed(4)) * 100) + "%");
                            console.log(ConduitSizeTables[ConduitType][ConduitSizes[i]]);
                            setConduitSize(String(ConduitSizeTables[ConduitType][ConduitSizes[i]]));
                            return;
                        }
                        else {
                            setConduitSize("N/A");
                            setConduitFill("N/A");
                        }
                    }
                }
                else if (Number(NumberOfWires) == 1) {
                    for (let i = 0; i < ConduitSizes.length; i++) {
                        if (WireCrossSection <= (.53 * Number([ConduitSizes[i]]))) {
                            console.log("Code Reached here.")
                            setConduitFill(String(Number((WireCrossSection / ConduitSizes[i]).toFixed(4)) * 100) + "%");
                            console.log(ConduitSizeTables[ConduitType][ConduitSizes[i]]);
                            setConduitSize(String(ConduitSizeTables[ConduitType][ConduitSizes[i]]));
                            return;
                        }
                        else {
                            setConduitSize("N/A");
                            setConduitFill("N/A");
                        }
                    }
                }
            } else {
                if (Number(NumberOfWires) > 4) {
                    for (let i = 0; i < ConduitSizes.length; i++) {
                        if (WireCrossSection <= (.35 * Number([ConduitSizes[i]]))) {
                            console.log("Code Reached here.")
                            setConduitFill(String(Number((WireCrossSection / ConduitSizes[i]).toFixed(4)) * 100) + "%");
                            console.log(ConduitSizeTables[ConduitType][ConduitSizes[i]]);
                            setConduitSize(String(ConduitSizeTables[ConduitType][ConduitSizes[i]]));
                            return;
                        }
                        else {
                            setConduitSize("N/A");
                            setConduitFill("N/A");
                        }
                    }
                }
                else if (Number(NumberOfWires) == 4) {
                    for (let i = 0; i < ConduitSizes.length; i++) {
                        if (WireCrossSection <= (.38 * Number([ConduitSizes[i]]))) {
                            console.log("Code Reached here.")
                            setConduitFill(String(Number((WireCrossSection / ConduitSizes[i]).toFixed(4)) * 100) + "%");
                            console.log(ConduitSizeTables[ConduitType][ConduitSizes[i]]);
                            setConduitSize(String(ConduitSizeTables[ConduitType][ConduitSizes[i]]));
                            return;
                        }
                        else {
                            setConduitSize("N/A");
                            setConduitFill("N/A");
                        }
                    }
                }
                else if (Number(NumberOfWires) == 3) {
                    for (let i = 0; i < ConduitSizes.length; i++) {
                        if (WireCrossSection <= (.4 * Number([ConduitSizes[i]]))) {
                            console.log("Code Reached here.")
                            setConduitFill(String(Number((WireCrossSection / ConduitSizes[i]).toFixed(4)) * 100) + "%");
                            console.log(ConduitSizeTables[ConduitType][ConduitSizes[i]]);
                            setConduitSize(String(ConduitSizeTables[ConduitType][ConduitSizes[i]]));
                            return;
                        }
                        else {
                            setConduitSize("N/A");
                            setConduitFill("N/A");
                        }
                    }
                }
                else if (Number(NumberOfWires) == 2) {
                    for (let i = 0; i < ConduitSizes.length; i++) {
                        if (WireCrossSection <= (.3 * Number([ConduitSizes[i]]))) {
                            console.log("Code Reached here.")
                            setConduitFill(String(Number((WireCrossSection / ConduitSizes[i]).toFixed(4)) * 100) + "%");
                            console.log(ConduitSizeTables[ConduitType][ConduitSizes[i]]);
                            setConduitSize(String(ConduitSizeTables[ConduitType][ConduitSizes[i]]));
                            return;
                        }
                        else {
                            setConduitSize("N/A");
                            setConduitFill("N/A");
                        }
                    }
                }
                else if (Number(NumberOfWires) == 1) {
                    for (let i = 0; i < ConduitSizes.length; i++) {
                        if (WireCrossSection <= (.55 * Number([ConduitSizes[i]]))) {
                            console.log("Code Reached here.")
                            setConduitFill(String(Number((WireCrossSection / ConduitSizes[i]).toFixed(4)) * 100) + "%");
                            console.log(ConduitSizeTables[ConduitType][ConduitSizes[i]]);
                            setConduitSize(String(ConduitSizeTables[ConduitType][ConduitSizes[i]]));
                            return;
                        }
                        else {
                            setConduitSize("N/A");
                            setConduitFill("N/A");
                        }
                    }
                }
            }
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
                    <ThemedText type="title" style={{ padding: 20 }}>Conduit Fill Sizing</ThemedText>
                    <ThemedView style={styles.display}>
                        <TouchableOpacity onPress={() => WireSelectionModal()} style={styles.button}>
                            <ThemedText type="subtitle">{WireType}</ThemedText>
                        </TouchableOpacity>
                    </ThemedView>
                    {WireType !== "Wire Type" &&
                        <ThemedView style={styles.display}>
                            <TouchableOpacity onPress={() => SizeSelectionModal()} style={styles.button}>
                                <ThemedText type="subtitle">{WireSize}</ThemedText>
                            </TouchableOpacity>
                        </ThemedView>
                    }
                    {WireSize !== "Wire Size" &&
                        <ThemedView style={styles.display}>
                            <TouchableOpacity onPress={() => ConduitSelectionModal()} style={styles.button}>
                                <ThemedText type="subtitle">{ConduitType}</ThemedText>
                            </TouchableOpacity>
                        </ThemedView>
                    }
                    <ThemedView style={styles.row}>
                        <ThemedText type="subtitle">Number of Wires</ThemedText>
                        <ThemedTextInput
                            style={styles.input}
                            editable
                            inputMode="decimal"
                            onChangeText={(text) => setNumberOfWires(useCheckForFloat(text))}
                            value={NumberOfWires.toString()}
                            returnKeyType="done"
                        />
                    </ThemedView>
                    <ThemedView style={styles.row}>
                        <ThemedText type="subtitle">Are the conductors lead-sheathed?</ThemedText>
                        <Switch
                            trackColor={{ false: "#767577", true: "#C8C8C8" }}
                            thumbColor={LeadSheath ? '#f4f3f4' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={setLeadSheath}
                            value={LeadSheath}
                        />
                    </ThemedView>
                    {ConduitType !== "Conduit Type" &&
                        <ThemedView style={styles.display}>
                            <TouchableOpacity onPress={() => Calculate()} style={styles.button}>
                                <ThemedText type="subtitle">Calculate</ThemedText>
                            </TouchableOpacity>
                        </ThemedView>
                    }
                    <ThemedView style={styles.display}>
                        <ThemedText type="subtitle" style={{ padding: 10 }}>Minimum Conduit Size</ThemedText>
                        <ThemedText type="subtitle" style={{ padding: 10 }}>{ConduitSize}mm³</ThemedText>
                        <ThemedText type="subtitle" style={{ padding: 10 }}>Conduit Fill</ThemedText>
                        <ThemedText type="subtitle" style={{ padding: 10 }}>{ConduitFill}</ThemedText>
                    </ThemedView>
                </ThemedView>
                <Button onPress={closeModal}>
                    Close
                </Button>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={WireTypeModalVisible}

                >
                    <SafeAreaView style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                        <ThemedView style={styles.scrollview}>
                            <Button onPress={() => setWireTypeModalVisible(false)}>
                                Close
                            </Button>
                            <FlatList
                                style={styles.flatList}
                                data={Data}
                                renderItem={({ item }) => (
                                    <TouchableOpacity style={styles.flatListButton} onPress={() => { SetWireSelection(item) }}>
                                        <ThemedText>{item}</ThemedText>
                                    </TouchableOpacity>
                                )}
                            />
                        </ThemedView>
                    </SafeAreaView>
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={WireSizeModalVisible}

                >
                    <SafeAreaView style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                        <ThemedView style={styles.scrollview}>
                            <Button onPress={() => setWireSizeModalVisible(false)}>
                                Close
                            </Button>
                            <FlatList
                                style={styles.flatList}
                                data={Data}
                                renderItem={({ item }) => (
                                    <TouchableOpacity style={styles.flatListButton} onPress={() => { SetSizeSelection(item) }}>
                                        <ThemedText>{item}</ThemedText>
                                    </TouchableOpacity>
                                )}
                            />
                        </ThemedView>
                    </SafeAreaView>
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={ConduitModalVisible}

                >
                    <SafeAreaView style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                        <ThemedView style={styles.scrollview}>
                            <Button onPress={() => setConduitModalVisible(false)}>
                                Close
                            </Button>
                            <FlatList
                                style={styles.flatList}
                                data={Data}
                                renderItem={({ item }) => (
                                    <TouchableOpacity style={styles.flatListButton} onPress={() => { SetConduitSelection(item) }}>
                                        <ThemedText>{item}</ThemedText>
                                    </TouchableOpacity>
                                )}
                            />
                        </ThemedView>
                    </SafeAreaView>
                </Modal>

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
    flatList: {
        width: '100%',
        height: '50%',
        padding: 10,
    },
    scrollview: {
        width: '100%',
        height: '50%',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 20,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    flatListButton: {
        flex: 1,
        backgroundColor: '#007AFF',
        width: '100%',
        padding: 10,
        borderRadius: 20,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

});