import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Modal, StyleSheet, TouchableOpacity } from "react-native";
import { useConduitModal } from "@/context/ConduitBendingModal";
import { useState } from "react";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import VoltageDrop from "@/components/VoltageDrop";
import WireAmperage from "@/components/WireAmperage";
import ConduitFill from "@/components/ConduitFill";


export default function Conduit() {
    const { modalVisible, openModal } = useConduitModal();
    const [content, setContent] = useState(<></>);
    


    const setActiveContent = (content: React.JSX.Element) => {
        setContent(content);
    };

    const voltageDrop = () => {
        setActiveContent(<VoltageDrop />);
        openModal();
    };

    const wireAmperage = () => {
        setActiveContent(<WireAmperage />);
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
                    <TouchableOpacity onPress={wireAmperage} style={styles.button}>
                        <ThemedText type="subtitle">Wire Amperage Calculator</ThemedText>
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