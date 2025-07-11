import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Modal, StyleSheet, TouchableOpacity } from "react-native";
import { useWireModal } from "@/context/WireCalcModal";
import { useState } from "react";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import VoltageDrop from "@/components/VoltageDrop";
import WireSizingAndDerating from "@/components/WireSizingAndDerating";
import ConduitFill from "@/components/ConduitFill";


export default function Wire() {
    const { modalVisible, openModal } = useWireModal();
    const [content, setContent] = useState(<></>);
    


    const setActiveContent = (content: React.JSX.Element) => {
        setContent(content);
    };

    const voltageDrop = () => {
        setActiveContent(<VoltageDrop />);
        openModal();
    };

    const wireSizingAndDerating = () => {
        setActiveContent(<WireSizingAndDerating />);
        openModal();
    };

    const conduitFill = () => {
        setActiveContent(<ConduitFill />);
        openModal();
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
                <ThemedView
                    style={{
                        flex: 1,
                        justifyContent: "space-evenly",
                        alignItems: "center",
                    }}
                >
                    <TouchableOpacity onPress={voltageDrop} style={styles.button}>
                        <ThemedText type="subtitle">Voltage Drop Calculator</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={wireSizingAndDerating} style={styles.button}>
                        <ThemedText type="subtitle">Wire Sizing And Derating</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={conduitFill} style={styles.button}>
                        <ThemedText type="subtitle">Conduit Fill Calculator</ThemedText>
                    </TouchableOpacity>
                    </ThemedView>
                </SafeAreaView>
                    <Modal
                        visible={modalVisible}
                        transparent={true}
                        animationType="slide">
                        <ThemedView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            {content}
                        </ThemedView>
                    </Modal>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: 20,
        height: "auto",
        alignItems: 'center',
        justifyContent: 'center',
        width: '75%',
        backgroundColor: '#007AFF',
        borderRadius: 20
    }

});