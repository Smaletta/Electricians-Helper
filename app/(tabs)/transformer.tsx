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
  const [selectI, setSelectI] = useState(false);
  const [selectIS, setSelectIS] = useState(false);
  const [selectP, setSelectP] = useState(false);

  const [selection, setSelection] = useState<string[]>([]);

  useEffect(() => {
    if (selectSinglePhase) {

      if (selectI) {
        setIS(String(parseFloat(V)/parseFloat(VS)*parseFloat(I)));
        setP(String(parseFloat(V)*parseFloat(I)));
      }
      else if (selectIS) {
        setI(String(parseFloat(VS)/parseFloat(V)*parseFloat(IS)));
        setP(String(parseFloat(VS)*parseFloat(IS)));
      }
      else if (selectP) {
        setI(String(parseFloat(P)/parseFloat(V)));
        setIS(String(parseFloat(P)/parseFloat(VS)));
      }
    }
    else if (selectThreePhase) {
        if (selectI) {
          setIS(String(mathjs.round(parseFloat(V)/parseFloat(VS)*parseFloat(I), 2)));
          setP(String(mathjs.round(parseFloat(V)*parseFloat(I)*3, 2)));
        }
        else if (selectIS) {
          setI(String(mathjs.round(parseFloat(VS)/parseFloat(V)*parseFloat(IS), 2)));
          setP(String(mathjs.round(parseFloat(VS)*parseFloat(IS)*3, 2)));
        }
        else if (selectP) {
          setI(String(mathjs.round(parseFloat(P)/parseFloat(V)/3, 2)));
          setIS(String(mathjs.round(parseFloat(P)/parseFloat(VS)/3, 2)));
        }
      }
    }, [V, I, VS, IS, P]);

  function Clear() {
    setV('');
    setI('');
    setVS('');
    setIS('');
    setP('');
    setSelectI(false);
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
    if (currentSelection.length == 1) {
      currentSelection.shift();
      currentSelection.push(button);
    };
    if (currentSelection.length < 1) {
      currentSelection.push(button)
    };
    if (currentSelection.length > 1) {
      currentSelection.shift();
    };
    setSelection(currentSelection);
    setSelectI(currentSelection.includes('I'));
    setSelectIS(currentSelection.includes('IS'));
    setSelectP(currentSelection.includes('P'));
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
            <ThemedText type='default' style={{ padding: 20, textAlign: 'center' }}>Both primary and secondary voltages are required.{'\n'}Use a single selection to calculate the other two.</ThemedText>
          </ThemedView>
          <ThemedText type="subtitle">Primary {selectThreePhase && "Phase"} Voltage</ThemedText>
          <ThemedView style={styles.display}>
            <ThemedTextInput
              style={styles.input}
              editable
              inputMode="decimal"
              onChangeText={(text) => setV(text)}
              value={useCheckForFloat(V)}
              returnKeyType="done"
            />
          </ThemedView>
          <ThemedText type="subtitle">Secondary {selectThreePhase && "Phase"} Voltage</ThemedText>
          <ThemedView style={styles.display}>
            <ThemedTextInput
              style={styles.input}
              editable
              inputMode="decimal"
              onChangeText={(text) => setVS(text)}
              value={useCheckForFloat(VS)}
              returnKeyType="done"
            />
          </ThemedView>
          <ThemedText type="subtitle">Primary {selectThreePhase && "Phase"} Current</ThemedText>
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
          <ThemedText type="subtitle">Secondary {selectThreePhase && "Phase"} Current</ThemedText>
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
          <ThemedText type="subtitle">Transformer Rating</ThemedText>
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