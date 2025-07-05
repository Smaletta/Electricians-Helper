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

export default function DCMotor() {
  const { closeModal } = useMotorModal();
  const [V, setV] = useState('');
  const [I, setI] = useState('');
  const [HP, setHP] = useState('');
  const [P, setP] = useState('');
  const [EF, setEF] = useState('');

  const [selectV, setSelectV] = useState(false);
  const [selectI, setSelectI] = useState(false);
  const [selectHP, setSelectHP] = useState(false);
  const [selectP, setSelectP] = useState(false);
  const [selectEF, setSelectEF] = useState(false);

  const [selection, setSelection] = useState<string[]>([]);

  useEffect(() => {
    if (selectV && selectI && selectHP) {
      setP(String(parseFloat(V) * parseFloat(I)));
      setEF(String(parseFloat(P) / (parseFloat(HP) * 746)));
    }
    else if (selectV && selectI && selectP) {
      setP(String(parseFloat(V) * parseFloat(I)));
    }
    else if (selectV && selectI && selectEF) {
      setP(String(parseFloat(V) * parseFloat(I)));
    }
    else if (selectV && selectHP && selectP) {
    }
    else if (selectV && selectHP && selectEF) {
    }
    else if (selectV && selectP && selectEF) {
    }
    else if (selectI && selectHP && selectP) {
    }
    else if (selectI && selectHP && selectEF) {
    }
    else if (selectI && selectP && selectEF) {
    }
    else if (selectHP && selectP && selectEF) {
    }
  }, [V, I, HP, P, EF]);

  function Clear() {
    setV('');
    setI('');
    setHP('');
    setP('');
    setEF('');
    setSelectV(false);
    setSelectI(false);
    setSelectHP(false);
    setSelectP(false);
    setSelectEF(false);
    setSelection([]);
  }

  function select(button: string) {
    var currentSelection = selection;
    if (currentSelection.includes(button)) {
      return
    }
    console.log(currentSelection.length);
    if (currentSelection.length == 3) {
      currentSelection.shift();
      currentSelection.push(button);
    };
    if (currentSelection.length < 3) {
      currentSelection.push(button)
    };
    if (currentSelection.length > 3) {
      currentSelection.shift();
    };
    setSelection(currentSelection);
    setSelectV(currentSelection.includes('V'));
    setSelectI(currentSelection.includes('I'));
    setSelectHP(currentSelection.includes('HP'));
    setSelectP(currentSelection.includes('P'));
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
          <ThemedText type="subtitle">Horsepower</ThemedText>
          <ThemedView style={styles.row}>
            <TouchableOpacity style={selectHP === true ? styles.selectedButton : styles.button} onPress={() => select("HP")}>
              <ThemedText type="default">Select</ThemedText>
            </TouchableOpacity>
            <ThemedTextInput
              style={styles.input}
              editable={selectHP}
              inputMode="decimal"
              onChangeText={(text) => setHP(text)}
              value={useCheckForFloat(HP)}
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
          <ThemedText type="subtitle">Efficiency Factor</ThemedText>
          <ThemedView style={styles.row}>
            <TouchableOpacity style={selectEF === true ? styles.selectedButton : styles.button} onPress={() => select("EF")}>
              <ThemedText type="default">Select</ThemedText>
            </TouchableOpacity>
            <ThemedTextInput
              style={styles.input}
              editable={selectEF}
              inputMode="decimal"
              onChangeText={(text) => setEF(text)}
              value={useCheckForFloat(EF)}
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