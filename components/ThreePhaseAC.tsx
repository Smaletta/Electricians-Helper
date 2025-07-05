import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import * as mathjs from "mathjs";
import useCheckForFloat from "@/hooks/useCheckForFloat";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Button } from "@react-navigation/elements";
import { useMotorModal } from "@/context/MotorCalculationModal";

export default function ThreePhaseAC() {
  const { closeModal } = useMotorModal();
  const [V, setV] = useState('');
  const [I, setI] = useState('');
  const [R, setR] = useState('');
  const [P, setP] = useState('');
  const [PF, setPF] = useState('');
  const [EF, setEF] = useState('');

  const [selectV, setSelectV] = useState(false);
  const [selectI, setSelectI] = useState(false);
  const [selectR, setSelectR] = useState(false);
  const [selectP, setSelectP] = useState(false);
  const [selectPF, setSelectPF] = useState(false);
  const [selectEF, setSelectEF] = useState(false);

  const [selection, setSelection] = useState<string[]>([]);

  useEffect(() => {
    if (selectV && selectI) {
      setR(String(parseFloat(V) / parseFloat(I)));
      setP(String(parseFloat(V) * parseFloat(I)));
    }
    else if (selectV && selectR) {
      setI(String(parseFloat(V) / parseFloat(R)));
      setP(String(parseFloat(V) ** 2 * parseFloat(R)));
    }
    else if (selectV && selectP) {
      setI(String(parseFloat(P) / parseFloat(V)));
      setR(String(parseFloat(P) / parseFloat(V) ** 2));
    }
    else if (selectI && selectR) {
      setV(String(parseFloat(I) * parseFloat(R)));
      setP(String(parseFloat(I) ** 2 * parseFloat(R)));
    }
    else if (selectI && selectP) {
      setV(String(parseFloat(P) / parseFloat(I)));
      setR(String(parseFloat(P) / parseFloat(I) ** 2));
    }
    else if (selectR && selectP) {
      setV(String(mathjs.sqrt(parseFloat(P) * parseFloat(R))));
      setI(String(mathjs.sqrt(parseFloat(P) / parseFloat(R))));
    }
  }, [V, I, R, P]);

  function Clear() {
    setV('');
    setI('');
    setR('');
    setP('');
    setPF('');
    setEF('');
    setSelectV(false);
    setSelectI(false);
    setSelectR(false);
    setSelectP(false);
    setSelectPF(false);
    setSelectEF(false);
    setSelection([]);
  }

  function select(button: string) {
    var currentSelection = selection;
    if (currentSelection.includes(button)) {
      return
    }
    console.log(currentSelection.length);
    if (currentSelection.length == 2) {
      currentSelection.shift();
      currentSelection.push(button);
    };
    if (currentSelection.length < 2) {
      currentSelection.push(button)
    };
    if (currentSelection.length > 2) {
      currentSelection.shift();
    };
    setSelection(currentSelection);
    setSelectV(currentSelection.includes('V'));
    setSelectI(currentSelection.includes('I'));
    setSelectR(currentSelection.includes('R'));
    setSelectP(currentSelection.includes('P'));
    setSelectPF(currentSelection.includes('PF'));
    setSelectEF(currentSelection.includes('EF'));
    console.log(selection);
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
          <ThemedText type="subtitle">Voltage</ThemedText>
          <ThemedView style={styles.row}>
            <TouchableOpacity style={selectV === true ? styles.selectedButton : styles.button} onPress={() => select("V")}>
              <ThemedText type="default">Select</ThemedText>
            </TouchableOpacity>
            <ThemedTextInput
              style={styles.input}
              editable={selectV}
              inputMode="decimal"
              onChangeText={(text) => setV(text)}
              value={useCheckForFloat(V)}
              returnKeyType="done"
            />
          </ThemedView>
          <ThemedText type="subtitle">Amperage</ThemedText>
          <ThemedView style={styles.row}>
            <TouchableOpacity style={selectI === true ? styles.selectedButton : styles.button} onPress={() => select("I")}>
              <ThemedText type="default">Select</ThemedText>
            </TouchableOpacity>
            <ThemedTextInput
              style={styles.input}
              editable={selectI}
              inputMode="decimal"
              onChangeText={(text) => setI(text)}
              value={useCheckForFloat(I)}
              returnKeyType="done"
            />
          </ThemedView>
          <ThemedText type="subtitle">Resistance</ThemedText>
          <ThemedView style={styles.row}>
            <TouchableOpacity style={selectR === true ? styles.selectedButton : styles.button} onPress={() => select("R")}>
              <ThemedText type="default">Select</ThemedText>
            </TouchableOpacity>
            <ThemedTextInput
              style={styles.input}
              editable={selectR}
              inputMode="decimal"
              onChangeText={(text) => setR(text)}
              value={useCheckForFloat(R)}
              returnKeyType="done"
            />
          </ThemedView>
          <ThemedText type="subtitle">Power</ThemedText>
          <ThemedView style={styles.row}>
            <TouchableOpacity style={selectP === true ? styles.selectedButton : styles.button} onPress={() => select("P")}>
              <ThemedText type="default">Select</ThemedText>
            </TouchableOpacity>
            <ThemedTextInput
              style={styles.input}
              editable={selectP}
              inputMode="decimal"
              onChangeText={(text) => setP(text)}
              value={useCheckForFloat(P)}
              returnKeyType="done"
            />
          </ThemedView>
          <ThemedText type="subtitle">Power Factor</ThemedText>
          <ThemedView style={styles.row}>
            <TouchableOpacity style={selectPF === true ? styles.selectedButton : styles.button} onPress={() => select("PF")}>
              <ThemedText type="default">Select</ThemedText>
            </TouchableOpacity>
            <ThemedTextInput
              style={styles.input}
              editable={selectPF}
              inputMode="decimal"
              onChangeText={(text) => setPF(text)}
              value={useCheckForFloat(PF)}
              returnKeyType="done"
            />
          </ThemedView>
          <TouchableOpacity style={styles.button} onPress={Clear}>
            <ThemedText type="subtitle">Clear</ThemedText>
          </TouchableOpacity>
        </ThemedView >
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
        width: '75%',
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
    });