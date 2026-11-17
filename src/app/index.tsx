import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

const DATA = [
  {
    id: '1',
    title: 'O que é o ultrassom terapêutico?',
    description: 'Um recurso da fisioterapia que usa ondas sonoras para apoiar diferentes tratamentos.',
  },
  {
    id: '2',
    title: 'Como funciona a aplicação?',
    description: 'O profissional movimenta o aplicador sobre a região escolhida, com gel e parâmetros adequados.',
  }
]

export default function HomePage() {
  const [busca, setBusca] = useState("");
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const normalizedSearch = busca.trim().toLowerCase();
  const filteredArticles = DATA.filter((item) =>
    item.title.toLowerCase().includes(normalizedSearch) &&
    (!selectedArticleId || item.id === selectedArticleId)
  );

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.container}
    >
      <View style={styles.topBar}>
        <SearchBar
          value={busca}
          selectedArticleId={selectedArticleId}
          onChangeText={(text) => {
            setBusca(text);
            setSelectedArticleId(null);
          }}
          onSelectArticle={(item) => {
            setBusca(item.title);
            setSelectedArticleId(item.id);
          }}
        />
        <LetterAcessibility />
      </View>
      <View style={styles.headerContainer}>
        <Text accessibilityRole="header" style={styles.titulo}>Ultrassom Terapêutico</Text>
        <Text accessibilityRole="header" style={styles.subTitulo}>Conceitos, parâmetros e cuidados explicados de forma simples. Use a busca acima ou toque em um tema.</Text>
      </View>
      <View style={styles.articlesList}>
        {filteredArticles.map((item) => (
          <Articles
            key={item.id}
            title={item.title}
            description={item.description}
          />
        ))}
      </View>
    </ScrollView>
  );
}

function SearchBar({
  value,
  selectedArticleId,
  onChangeText,
  onSelectArticle,
}: {
  value: string;
  selectedArticleId: string | null;
  onChangeText: (text: string) => void;
  onSelectArticle: (item: (typeof DATA)[number]) => void;
}) {
  const normalizedSearch = value.trim().toLowerCase();
  const filteredArticles = DATA.filter((item) =>
    item.title.toLowerCase().includes(normalizedSearch)
  );
  const showSuggestions = normalizedSearch.length > 0 && selectedArticleId === null;

  return (
    <View style={styles.searchBarContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Pesquisar..."
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
      />
      {showSuggestions && (
        <View style={styles.searchResults}>
          {filteredArticles.length > 0 ? (
            filteredArticles.map((item) => (
              <Pressable
                key={item.id}
                accessibilityRole="button"
                accessibilityHint="Mostra este artigo na lista."
                onPress={() => onSelectArticle(item)}
                style={styles.searchResult}
              >
                <Text style={styles.searchResultText}>{item.title}</Text>
              </Pressable>
            ))
          ) : (
            <Text style={styles.noSearchResults}>Nenhum artigo encontrado.</Text>
          )}
        </View>
      )}
    </View>
  );
}

export function LetterAcessibility() {
  const [selectedSize, setSelectedSize] = useState<"decrease" | "increase" | null>(null);

  return (
    <View style={styles.containerLetterAcessibility}>
      <View style={styles.letterBox}>
        <Text style={styles.letrasText}>Letras:</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ selected: selectedSize === "decrease" }}
          onPress={() => setSelectedSize("decrease")}
        >
          <Text style={[
            styles.letterText,
            selectedSize === "decrease" && styles.letterTextSelected,
          ]}>A-</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ selected: selectedSize === "increase" }}
          onPress={() => setSelectedSize("increase")}
        >
          <Text style={[
            styles.letterText,
            styles.letterTextSpaced,
            selectedSize === "increase" && styles.letterTextSelected,
          ]}>A+</Text>
        </Pressable>
      </View>
    </View>
  )
}

export function Articles({
  title,
  description,
  onPress,
}: {
  title: string;
  description: string;
  onPress?: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${title}. ${description}`}
      accessibilityHint="A navegação para o artigo ainda não está configurada."
      onPress={onPress}
      style={({ pressed }) => [
        styles.articleCard,
        pressed && styles.articleCardPressed,
      ]}
    >
      <View
        style={styles.articleImage}
      >
        <Text style={styles.imagePlaceholder}>Imagine uma imagem aqui</Text>
      </View>
      <View style={styles.articleText}>
        <Text style={styles.articleTitle}>{title}</Text>
        <Text style={styles.articleDescription}>{description}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingTop: 32,
    paddingBottom: 32,
    backgroundColor: "#f7f7f7",
  },
  articlesList: {
    width: "90%",
    maxWidth: 520,
    alignItems: "center",
    gap: 20,
    paddingTop: 32,
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
  searchResults: {
    marginTop: 6,
    borderWidth: 1,
    borderColor: "#c2c5ca",
    borderRadius: 10,
    backgroundColor: "#ffffff",
    overflow: "hidden",
  },
  searchResult: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  searchResultText: {
    color: "#1f2937",
    fontSize: 15,
  },
  noSearchResults: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: "#4b5563",
    fontSize: 14,
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
  letterTextSelected: {
    backgroundColor: "#6bd396",
    borderColor: "#6bd396",
    color: "#ffffff",
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
  headerContainer: {
    alignItems: "center",
  },
  titulo: {
    fontSize: 42,
    fontWeight: "bold",
    marginBottom: 16,
    paddingVertical: 12,
    fontFamily: "comic-sans",
  },
  subTitulo: {
    width: "90%",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
    paddingVertical: 10,
    fontFamily: "arial",
  },
  articleCard: {
    width: "100%",
    maxWidth: 380,
    height: 240,
    borderWidth: 1,
    borderColor: "#6bd396",
    borderRadius: 13,
    overflow: "hidden",
    backgroundColor: "#ffffff",
  },
  articleCardPressed: {
    opacity: 0.85,
  },
  articleImage: {
    height: "50%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6bd396",
  },
  imagePlaceholder: {
    color: "#000000",
    fontSize: 14,
  },
  articleText: {
    height: "50%",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  articleTitle: {
    marginBottom: 6,
    color: "#1f2937",
    fontSize: 16,
    fontWeight: "bold",
  },
  articleDescription: {
    color: "#4b5563",
    fontSize: 13,
    lineHeight: 18,
  },
});
