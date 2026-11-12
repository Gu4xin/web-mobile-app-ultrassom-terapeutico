import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Pressable } from "react-native";

export default function HomePage() {
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <SearchBar />
        <LetterAcessibility />
      </View>
    </View>
  );
}

function SearchBar() {
  const [busca, setBusca] = useState("");

  return (
    <View style={styles.searchBarContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Pesquisar..."
        value={busca}
        onChangeText={setBusca}
        returnKeyType="search"
      />
      {busca.length > 0 && (
        <Text style={styles.searchText}>{busca}</Text>
      )}
    </View>
    
  );
}

export function LetterAcessibility() {
  return (
    <View style={styles.containerLetterAcessibility}>
      <View style={styles.letterBox}>
        <Text style={styles.letrasText}>Letras:</Text>
        <Pressable>
          <Text style={styles.letterText}>A-</Text>
        </Pressable>
        <Pressable>
          <Text style={[styles.letterText, styles.letterTextSpaced]}>A+</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 32,
    backgroundColor: "#f7f7f7",
  },
  topBar: {
    width: "90%",
    maxWidth: 520,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  searchBarContainer: {
    flex: 1,
    minWidth: 0,
  },
  containerLetterAcessibility: {
    marginLeft: 12,
  },
  searchInput: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#c2c5ca",
    borderRadius: 10,
    backgroundColor: "#ffffff",
    fontSize: 16,
  },
  searchText: {
    width: "100%",
    marginTop: 12,
    color: "#c7c7c7",
  },
  letterBox: {
    flexDirection: "row",
  },
  letterText: {
    fontSize: 16,
    color: "#333333",
    borderWidth: 1,
    borderColor: "#c2c5ca",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  letrasText: {
    fontSize: 16,
    color: "#333333",
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  letterTextSpaced: {
    marginLeft: 8,
  },
});
