import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Modal, StyleSheet, TouchableOpacity } from "react-native";
import { useConduitModal } from "@/context/ConduitBendingModal";
import CustomAngleBends from "@/components/CustomAngleBends";
import RegularAngleBends from "@/components/RegularAngleBends";
import LimitedSpaceAngleCalculator from "@/components/LimitedSpaceAngleCalculator";
import { useState } from "react";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";


export default function Conduit() {
    const { modalVisible, openModal } = useConduitModal();
    const [content, setContent] = useState(<></>);
    


    const setActiveContent = (content: React.JSX.Element) => {
        setContent(content);
    };

    const customAngleBends = () => {
        setActiveContent(<CustomAngleBends />);
        openModal();
    };

    const regularAngleBends = () => {
        setActiveContent(<RegularAngleBends />);
        openModal();
    };

    const limitedSpaceAngleCalculator = () => {
        setActiveContent(<LimitedSpaceAngleCalculator />);
        openModal();
    }

    return (
        <SafeAreaProvider>
                <ThemedView
                    style={{
                        flex: 1,
                        justifyContent: "space-evenly",
                        alignItems: "center",
                    }}
                >
                    <TouchableOpacity onPress={customAngleBends} style={styles.button}>
                        <ThemedText>Custom Angle Bends</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={regularAngleBends} style={styles.button}>
                        <ThemedText>Regular Angle Bends</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={limitedSpaceAngleCalculator} style={styles.button}>
                        <ThemedText>Limited Space Angle Calculator</ThemedText>
                    </TouchableOpacity>
                    <Modal
                        visible={modalVisible}
                        transparent={true}
                        animationType="slide">
                        <ThemedView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            {content}
                        </ThemedView>
                    </Modal>
                </ThemedView>
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