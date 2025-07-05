import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Modal, StyleSheet, TouchableOpacity } from "react-native";
import { useMotorModal } from "@/context/MotorCalculationModal";
import DCMotor from "@/components/DCMotor";
import SinglePhaseAC from "@/components/SinglePhaseAC";
import ThreePhaseAC from "@/components/ThreePhaseAC";
import { useState } from "react";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";


export default function Motor() {
    const { modalVisible, openModal } = useMotorModal();
    const [content, setContent] = useState(<></>);
    


    const setActiveContent = (content: React.JSX.Element) => {
        setContent(content);
    };

    const DCMotorButton = () => {
        setActiveContent(<DCMotor />);
        openModal();
    };

    const SinglePhaseACButton = () => {
        setActiveContent(<SinglePhaseAC />);
        openModal();
    };

    const ThreePhaseACButton = () => {
        setActiveContent(<ThreePhaseAC />);
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
                    <TouchableOpacity onPress={DCMotorButton} style={styles.button}>
                        <ThemedText type="subtitle">DC Motor</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={SinglePhaseACButton} style={styles.button}>
                        <ThemedText type="subtitle">Single Phase AC</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ThreePhaseACButton} style={styles.button}>
                        <ThemedText type="subtitle">Three Phase AC</ThemedText>
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