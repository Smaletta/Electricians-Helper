import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import * as mathjs from "mathjs";
import useCheckForFloat from "@/hooks/useCheckForFloat";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";


export default function Transformer() {
  const [V, setV] = useState('');
  const [I, setI] = useState('');
  const [VS, setVS] = useState('');
  const [IS, setIS] = useState('');
  const [P, setP] = useState('');

  const [selectSinglePhase, setSelectSinglePhase] = useState(false);
  const [selectThreePhase, setSelectThreePhase] = useState(false);
  const [selectV, setSelectV] = useState(false);
  const [selectI, setSelectI] = useState(false);
  const [selectVS, setSelectVS] = useState(false);
  const [selectIS, setSelectIS] = useState(false);  
  const [selectP, setSelectP] = useState(false);

  const [selection, setSelection] = useState<string[]>([]);

  useEffect(() => {
    if (selectV && selectI) {
    }
    else if (selectV && selectVS) {
    }
    else if (selectV && selectP) {
    }
    else if (selectI && selectVS) {
    }
    else if (selectI && selectP) {
    }
    else if (selectVS && selectP) {
    }
  }, [V, I, VS, IS, P]);

  function Clear() {
    setV('');
    setI('');
    setVS('');
    setIS('');
    setP('');
    setSelectV(false);
    setSelectI(false);
    setSelectVS(false);
    setSelectIS(false);
    setSelectP(false);
    setSelection([]);
  }

  function selectPhase(button: string) {
    if (button === 'Single') {
      setSelectSinglePhase(true);
      setSelectThreePhase(false);
    }
    else if (button === 'Three') {
      setSelectSinglePhase(false);
      setSelectThreePhase(true);
    }
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
    setSelectVS(currentSelection.includes('VS'));
    setSelectIS(currentSelection.includes('IS'));
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
          <ThemedView style={styles.display}>
            <ThemedText type="title">Transformers</ThemedText>
            <ThemedView style={styles.row}>
            <TouchableOpacity style={selectSinglePhase === true ? styles.selectedButton : styles.button} onPress={() => selectPhase("Single")}>
              <ThemedText type="default">Single Phase</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={selectThreePhase === true ? styles.selectedButton : styles.button} onPress={() => selectPhase("Three")}>
              <ThemedText type="default">Three Phase</ThemedText>
            </TouchableOpacity>
            </ThemedView>
            <ThemedText type='default' style={{padding: 20}}>Select two of the following to calculate the other two</ThemedText>
          </ThemedView>
          <ThemedText type="subtitle">Primary Voltage</ThemedText>
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
          <ThemedText type="subtitle">Primary FLA</ThemedText>
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
          <ThemedText type="subtitle">Secondary Voltage</ThemedText>
          <ThemedView style={styles.row}>
            <TouchableOpacity style={selectVS === true ? styles.selectedButton : styles.button} onPress={() => select("VS")}>
              <ThemedText type="default">Select</ThemedText>
            </TouchableOpacity>
            <ThemedTextInput
              style={styles.input}
              editable={selectVS}
              inputMode="decimal"
              onChangeText={(text) => setVS(text)}
              value={useCheckForFloat(VS)}
              returnKeyType="done"
            />
          </ThemedView>
                    <ThemedText type="subtitle">Secondary FLA</ThemedText>
          <ThemedView style={styles.row}>
            <TouchableOpacity style={selectIS === true ? styles.selectedButton : styles.button} onPress={() => select("IS")}>
              <ThemedText type="default">Select</ThemedText>
            </TouchableOpacity>
            <ThemedTextInput
              style={styles.input}
              editable={selectIS}
              inputMode="decimal"
              onChangeText={(text) => setIS(text)}
              value={useCheckForFloat(IS)}
              returnKeyType="done"
            />
          </ThemedView>
          <ThemedText type="subtitle">Transformer Rating in KVA</ThemedText>
          <ThemedView style={styles.row}>
            <TouchableOpacity style={selectP === true ? styles.selectedButton : styles.button} onPress={() => select("P")}>
              <ThemedText type="default">Select</ThemedText>
            </TouchableOpacity>
            <ThemedTextInput
              style={styles.input}
              editable
              inputMode="decimal"
              onChangeText={(text) => setP(text)}
              value={useCheckForFloat(P)}
              returnKeyType="done"
            />
          </ThemedView>
          <TouchableOpacity style={styles.button} onPress={Clear}>
            <ThemedText type="subtitle">Clear</ThemedText>
          </TouchableOpacity>
        </ThemedView >
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