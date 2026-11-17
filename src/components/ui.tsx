import { useState } from "react";
import { Alert, Linking, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { usePathname, useRouter } from "expo-router";
import type { ReactNode } from "react";
import type { TextProps } from "react-native";
import { ARTICLES, type Article, type Reference, searchArticles } from "./content";
import { useAccessibility } from "./accessibility";

export const palette = {
  paper: "#F5F8F4",
  surface: "#FFFFFF",
  ink: "#19362D",
  muted: "#63776E",
  green: "#287653",
  greenDeep: "#1D5C40",
  greenSoft: "#E4F0E8",
  greenPale: "#EFF6F0",
  line: "#D8E4DA",
  warning: "#8B5E30",
  warningSoft: "#F6EEDF",
};

export function AppText({ style, ...props }: TextProps) {
  const { scale } = useAccessibility();
  const flatStyle = StyleSheet.flatten(style);
  const baseSize = typeof flatStyle?.fontSize === "number" ? flatStyle.fontSize : 16;
  const scaledLineHeight = typeof flatStyle?.lineHeight === "number" ? flatStyle.lineHeight * scale : undefined;
  return <Text {...props} style={[style, { fontSize: baseSize * scale, lineHeight: scaledLineHeight }]} />;
}

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <View style={styles.brand}>
      <View style={styles.brandGlyph}>
        <View style={styles.glyphWave} />
        <View style={styles.glyphDot} />
      </View>
      {!compact && (
        <View>
          <AppText style={styles.brandName}>FISIO / SOM</AppText>
          <AppText style={styles.brandCaption}>GUIA DE ESTUDO</AppText>
        </View>
      )}
    </View>
  );
}

export function AccessibilityControls() {
  const { scale, decrease, increase } = useAccessibility();
  const [feedback, setFeedback] = useState("");
  const change = (direction: "decrease" | "increase") => {
    if (direction === "increase") increase();
    else decrease();
    setFeedback(direction === "increase" ? "Texto ampliado" : "Texto reduzido");
  };

  return (
    <View style={styles.accessibilityWrap}>
      <AppText style={styles.controlCaption}>Tamanho do texto</AppText>
      <View style={styles.accessibilityControls}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Diminuir texto. Tamanho atual ${Math.round(scale * 100)} por cento`}
          accessibilityHint="Reduz o tamanho do texto em todas as telas."
          onPress={() => change("decrease")}
          style={({ pressed }) => [styles.sizeButton, pressed && styles.pressed]}
        >
          <AppText style={styles.sizeButtonText}>A−</AppText>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Aumentar texto. Tamanho atual ${Math.round(scale * 100)} por cento`}
          accessibilityHint="Aumenta o tamanho do texto em todas as telas."
          onPress={() => change("increase")}
          style={({ pressed }) => [styles.sizeButton, styles.plusButton, pressed && styles.pressed]}
        >
          <AppText style={styles.sizeButtonText}>A+</AppText>
        </Pressable>
      </View>
      <AppText accessibilityLiveRegion="polite" style={styles.feedback}>{feedback}</AppText>
    </View>
  );
}

export function PageHeader({ showBack = false }: { showBack?: boolean }) {
  const router = useRouter();
  const goHome = () => router.replace("/");
  const goBack = () => {
    if (router.canGoBack()) router.back();
    else goHome();
  };
  return (
    <View style={styles.headerBlock}>
      <View style={styles.header}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Ir para o início"
          onPress={goHome}
          style={({ pressed }) => [styles.brandButton, pressed && styles.pressed]}
        >
          <BrandMark />
        </Pressable>
        {showBack ? (
          <View style={styles.headerActions}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Voltar à tela anterior"
              onPress={goBack}
              style={({ pressed }) => [styles.headerLink, pressed && styles.pressed]}
            >
              <AppText style={styles.headerLinkText}>‹  Voltar</AppText>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Ir para o início"
              onPress={goHome}
              style={({ pressed }) => [styles.homeButton, pressed && styles.pressed]}
            >
              <AppText style={styles.homeButtonText}>Início</AppText>
            </Pressable>
          </View>
        ) : (
          <View style={styles.headerBadge}>
            <AppText style={styles.headerBadgeText}>MATERIAL EDUCATIVO</AppText>
          </View>
        )}
      </View>
      <AccessibilityControls />
    </View>
  );
}

export function PageFrame({ children }: { children: ReactNode }) {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.pageContent}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.contentWidth}>{children}</View>
    </ScrollView>
  );
}

export function TopicCard({ article, featured = false }: { article: Article; featured?: boolean }) {
  const router = useRouter();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${article.title}. ${article.summary}`}
      accessibilityHint="Abre este tema de estudo."
      onPress={() => router.push(article.route)}
      style={({ pressed }) => [
        styles.topicCard,
        featured && styles.featuredCard,
        pressed && styles.pressedCard,
      ]}
    >
      <View style={[styles.cardNumber, featured && styles.featuredNumber]}>
        <AppText style={[styles.cardNumberText, featured && styles.featuredNumberText]}>{article.number}</AppText>
      </View>
      <View style={styles.cardCopy}>
        <AppText style={styles.cardEyebrow}>{article.shortTitle.toLocaleUpperCase("pt-BR")}</AppText>
        <AppText style={styles.cardTitle}>{article.title}</AppText>
        <AppText style={styles.cardSummary}>{article.summary}</AppText>
      </View>
      <AppText style={styles.cardArrow}>›</AppText>
    </Pressable>
  );
}

export function SearchPanel() {
  const router = useRouter();
  const { scale } = useAccessibility();
  const [query, setQuery] = useState("");
  const results = searchArticles(query);
  const isSearching = query.trim().length > 0;

  return (
    <View style={styles.searchSection}>
      <AppText style={styles.searchLabel}>ENCONTRE UM TEMA</AppText>
      <View style={styles.searchInputWrap}>
        <AppText style={styles.searchGlyph}>⌕</AppText>
        <TextInput
          accessibilityLabel="Buscar nos conteúdos"
          accessibilityHint="Pesquisa títulos, resumos e tópicos em todo o guia."
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={() => {
            if (results[0]) router.push(results[0].route);
          }}
          returnKeyType="search"
          placeholder="Ex.: frequência, segurança, gel..."
          placeholderTextColor={palette.muted}
          style={[styles.searchInput, { fontSize: 15 * scale }]}
        />
        {isSearching && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Limpar busca"
            onPress={() => setQuery("")}
            style={styles.clearButton}
          >
            <AppText style={styles.clearButtonText}>Limpar</AppText>
          </Pressable>
        )}
      </View>
      {isSearching ? (
        <View style={styles.searchResults}>
          <AppText style={styles.resultsCaption}>
            {results.length === 1 ? "1 tema encontrado" : `${results.length} temas encontrados`}
          </AppText>
          {results.length > 0 ? (
            results.map((article) => (
              <Pressable
                key={article.id}
                accessibilityRole="button"
                accessibilityLabel={`Abrir ${article.title}`}
                onPress={() => router.push(article.route)}
                style={({ pressed }) => [styles.searchResult, pressed && styles.pressed]}
              >
                <View style={styles.resultIndex}><AppText style={styles.resultIndexText}>{article.number}</AppText></View>
                <View style={styles.resultCopy}>
                  <AppText style={styles.searchResultTitle}>{article.title}</AppText>
                  <AppText style={styles.searchResultSummary} numberOfLines={2}>{article.summary}</AppText>
                </View>
                <AppText style={styles.cardArrow}>›</AppText>
              </Pressable>
            ))
          ) : (
            <View style={styles.emptyState}>
              <View style={styles.emptyMark} />
              <AppText style={styles.emptyTitle}>Nenhum tema por aqui</AppText>
              <AppText style={styles.emptyText}>Tente outro termo ou escolha um assunto no guia abaixo.</AppText>
            </View>
          )}
        </View>
      ) : null}
    </View>
  );
}

export function ArticleScreen({ article }: { article: Article }) {
  return (
    <PageFrame>
      <PageHeader showBack />
      <View style={styles.articleHero}>
        <AppText style={styles.articleKicker}>CADERNO {article.number}  /  ULTRASSOM TERAPÊUTICO</AppText>
        <AppText accessibilityRole="header" style={styles.articleHeading}>{article.title}</AppText>
        <AppText style={styles.articleLead}>{article.summary}</AppText>
        <View style={styles.articleMeta}>
          <View style={styles.metaRule} />
          <AppText style={styles.metaText}>LEITURA EDUCATIVA · {article.sections.length} TÓPICOS</AppText>
        </View>
      </View>

      <View style={styles.articleBody}>
        {article.sections.map((section, index) => (
          <View key={section.heading} style={styles.articleSection}>
            <View style={styles.sectionIndex}>
              <AppText style={styles.sectionIndexText}>{String(index + 1).padStart(2, "0")}</AppText>
            </View>
            <View style={styles.sectionCopy}>
              <AppText accessibilityRole="header" style={styles.sectionHeading}>{section.heading}</AppText>
              <AppText style={styles.sectionBody}>{section.body}</AppText>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.educationNote}>
        <View style={styles.noteStripe} />
        <View style={styles.noteCopy}>
          <AppText style={styles.noteTitle}>Importante</AppText>
          <AppText style={styles.noteBody}>
            Conteúdo para estudo. Não substitui avaliação profissional, orientações institucionais nem o manual do fabricante.
          </AppText>
        </View>
      </View>

      <View style={styles.referencesBlock}>
        <AppText style={styles.referencesEyebrow}>PARA LEITURA E CONSULTA</AppText>
        <AppText accessibilityRole="header" style={styles.referencesTitle}>Referências</AppText>
        {article.references.map((reference) => (
          <ReferenceLink key={reference.url} reference={reference} />
        ))}
      </View>
      <PageFooter />
    </PageFrame>
  );
}

function ReferenceLink({ reference }: { reference: Reference }) {
  const open = async () => {
    try {
      await Linking.openURL(reference.url);
    } catch {
      Alert.alert("Link indisponível", "Não foi possível abrir esta referência neste momento.");
    }
  };
  return (
    <Pressable
      accessibilityRole="link"
      accessibilityLabel={`${reference.title}. ${reference.publication}`}
      accessibilityHint="Abre a referência em uma página externa."
      onPress={open}
      style={({ pressed }) => [styles.referenceLink, pressed && styles.pressed]}
    >
      <View style={styles.referenceCopy}>
        <AppText style={styles.referenceTitle}>{reference.title}</AppText>
        <AppText style={styles.referencePublication}>{reference.publication}</AppText>
      </View>
      <AppText style={styles.externalMark}>↗</AppText>
    </Pressable>
  );
}

export function PageFooter() {
  const router = useRouter();
  return (
    <View style={styles.footer}>
      <BrandMark compact />
      <AppText style={styles.footerText}>Estudo responsável, com contexto.</AppText>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Voltar ao início"
        onPress={() => router.replace("/")}
        style={({ pressed }) => [styles.footerHome, pressed && styles.pressed]}
      >
        <AppText style={styles.footerHomeText}>Voltar ao início  ↑</AppText>
      </Pressable>
    </View>
  );
}

const NAV_ITEMS = [
  { label: "Início", route: "/" as const, mark: "⌂" },
  { label: "O que é", route: "/o-que-e" as const, mark: "01" },
  { label: "Aplicações", route: "/aplicacoes" as const, mark: "02" },
  { label: "Parâmetros", route: "/parametros" as const, mark: "03" },
  { label: "Segurança", route: "/seguranca" as const, mark: "04" },
];

export function BottomNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View accessibilityRole="tablist" style={styles.bottomNav}>
      {NAV_ITEMS.map((item) => {
        const selected = pathname === item.route;
        return (
          <Pressable
            key={item.route}
            accessibilityRole="tab"
            accessibilityLabel={`Abrir ${item.label}`}
            accessibilityState={{ selected }}
            onPress={() => router.push(item.route)}
            style={({ pressed }) => [
              styles.navItem,
              selected && styles.navItemSelected,
              pressed && styles.pressed,
            ]}
          >
            <AppText style={[styles.navMark, selected && styles.navMarkSelected]}>{item.mark}</AppText>
            <AppText numberOfLines={1} style={[styles.navLabel, selected && styles.navLabelSelected]}>
              {item.label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

export function HomeContents() {
  const articles = ARTICLES;
  return <>{articles.map((article, index) => <TopicCard key={article.id} article={article} featured={index === 0} />)}</>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: palette.paper },
  pageContent: { flexGrow: 1, alignItems: "center", paddingHorizontal: 20, paddingTop: 20, paddingBottom: 36 },
  contentWidth: { width: "100%", maxWidth: 760 },
  header: {
    minHeight: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 9,
  },
  headerBlock: { marginBottom: 24 },
  brandButton: { paddingVertical: 4, paddingRight: 6 },
  brand: { flexDirection: "row", alignItems: "center", gap: 10 },
  brandGlyph: {
    width: 38, height: 38, borderRadius: 13, backgroundColor: palette.green,
    alignItems: "center", justifyContent: "center", overflow: "hidden",
  },
  glyphWave: { width: 21, height: 10, borderTopWidth: 2, borderBottomWidth: 2, borderColor: "#E8F4E9", transform: [{ skewY: "-20deg" }] },
  glyphDot: { position: "absolute", width: 5, height: 5, borderRadius: 3, backgroundColor: "#B9DCC5", top: 8, right: 8 },
  brandName: { color: palette.ink, fontSize: 14, fontWeight: "800", letterSpacing: 1.2 },
  brandCaption: { color: palette.muted, fontSize: 9, fontWeight: "700", letterSpacing: 1.55, marginTop: 2 },
  headerBadge: { paddingHorizontal: 10, paddingVertical: 7, borderRadius: 20, backgroundColor: palette.greenSoft },
  headerBadgeText: { color: palette.greenDeep, fontSize: 9, fontWeight: "700", letterSpacing: 0.8 },
  headerActions: { flexDirection: "row", alignItems: "center", gap: 8 },
  headerLink: { paddingVertical: 9, paddingHorizontal: 8 },
  headerLinkText: { color: palette.greenDeep, fontSize: 14, fontWeight: "600" },
  homeButton: { paddingVertical: 9, paddingHorizontal: 14, backgroundColor: palette.greenSoft, borderRadius: 18 },
  homeButtonText: { color: palette.greenDeep, fontSize: 13, fontWeight: "700" },
  pressed: { opacity: 0.65 },
  pressedCard: { opacity: 0.78 },
  accessibilityWrap: { alignItems: "flex-end" },
  controlCaption: { color: palette.muted, fontSize: 10, fontWeight: "600", marginBottom: 5 },
  accessibilityControls: { flexDirection: "row", gap: 6 },
  sizeButton: { minWidth: 42, minHeight: 38, paddingHorizontal: 10, borderWidth: 1, borderColor: palette.line, backgroundColor: palette.surface, borderRadius: 11, alignItems: "center", justifyContent: "center" },
  plusButton: { backgroundColor: palette.greenSoft, borderColor: "#C7DECC" },
  sizeButtonText: { color: palette.greenDeep, fontSize: 15, fontWeight: "700" },
  feedback: { minHeight: 13, color: palette.muted, fontSize: 9, marginTop: 3 },
  searchSection: { marginBottom: 28 },
  searchLabel: { color: palette.greenDeep, fontSize: 10, letterSpacing: 1.2, fontWeight: "800", marginBottom: 9 },
  searchInputWrap: { minHeight: 54, flexDirection: "row", alignItems: "center", paddingHorizontal: 15, borderRadius: 15, borderWidth: 1, borderColor: palette.line, backgroundColor: palette.surface },
  searchGlyph: { color: palette.green, fontSize: 24, marginRight: 8, lineHeight: 29 },
  searchInput: { flex: 1, minWidth: 0, paddingVertical: 13, color: palette.ink, fontSize: 15 },
  clearButton: { paddingHorizontal: 4, paddingVertical: 8 },
  clearButtonText: { color: palette.greenDeep, fontSize: 12, fontWeight: "700" },
  searchResults: { paddingHorizontal: 12, paddingTop: 10, paddingBottom: 4, borderBottomLeftRadius: 15, borderBottomRightRadius: 15, borderWidth: 1, borderTopWidth: 0, borderColor: palette.line, backgroundColor: palette.surface },
  resultsCaption: { color: palette.muted, fontSize: 11, fontWeight: "600", paddingHorizontal: 4, paddingBottom: 3 },
  searchResult: { flexDirection: "row", alignItems: "center", gap: 11, paddingVertical: 11, paddingHorizontal: 4, borderBottomWidth: 1, borderBottomColor: palette.greenPale },
  resultIndex: { width: 30, height: 30, borderRadius: 10, alignItems: "center", justifyContent: "center", backgroundColor: palette.greenSoft },
  resultIndexText: { color: palette.greenDeep, fontSize: 10, fontWeight: "800" },
  resultCopy: { flex: 1 },
  searchResultTitle: { color: palette.ink, fontSize: 13, fontWeight: "700" },
  searchResultSummary: { color: palette.muted, fontSize: 11, lineHeight: 16, marginTop: 2 },
  emptyState: { alignItems: "center", paddingVertical: 22, paddingHorizontal: 14 },
  emptyMark: { width: 30, height: 30, borderRadius: 15, backgroundColor: palette.greenSoft, borderWidth: 7, borderColor: "#D0E5D5", marginBottom: 10 },
  emptyTitle: { color: palette.ink, fontSize: 14, fontWeight: "700", textAlign: "center" },
  emptyText: { maxWidth: 260, color: palette.muted, fontSize: 12, lineHeight: 18, textAlign: "center", marginTop: 5 },
  topicCard: { flexDirection: "row", alignItems: "flex-start", gap: 13, padding: 16, borderRadius: 16, borderWidth: 1, borderColor: palette.line, backgroundColor: palette.surface, marginBottom: 11 },
  featuredCard: { backgroundColor: palette.greenPale, borderColor: "#C5DDCA" },
  cardNumber: { width: 35, height: 35, borderRadius: 12, alignItems: "center", justifyContent: "center", backgroundColor: palette.greenPale },
  featuredNumber: { backgroundColor: palette.green },
  cardNumberText: { color: palette.greenDeep, fontSize: 11, fontWeight: "800" },
  featuredNumberText: { color: "#F4FAF5" },
  cardCopy: { flex: 1 },
  cardEyebrow: { color: palette.green, fontSize: 9, fontWeight: "800", letterSpacing: 1, marginBottom: 5 },
  cardTitle: { color: palette.ink, fontSize: 16, fontWeight: "700", lineHeight: 21 },
  cardSummary: { color: palette.muted, fontSize: 12, lineHeight: 18, marginTop: 5 },
  cardArrow: { color: palette.green, fontSize: 26, fontWeight: "300", lineHeight: 28, paddingLeft: 4 },
  articleHero: { paddingTop: 13, paddingBottom: 30 },
  articleKicker: { color: palette.green, fontSize: 10, fontWeight: "800", letterSpacing: 1.3, marginBottom: 17 },
  articleHeading: { color: palette.ink, fontSize: 35, fontWeight: "800", letterSpacing: -1, lineHeight: 42 },
  articleLead: { maxWidth: 620, color: palette.muted, fontSize: 16, lineHeight: 25, marginTop: 13 },
  articleMeta: { flexDirection: "row", alignItems: "center", gap: 10, marginTop: 22 },
  metaRule: { width: 30, height: 2, borderRadius: 1, backgroundColor: palette.green },
  metaText: { color: palette.muted, fontSize: 9, fontWeight: "700", letterSpacing: 1 },
  articleBody: { borderTopWidth: 1, borderTopColor: palette.line, paddingTop: 4 },
  articleSection: { flexDirection: "row", gap: 14, paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: palette.line },
  sectionIndex: { width: 30, height: 30, borderRadius: 10, backgroundColor: palette.greenSoft, alignItems: "center", justifyContent: "center", marginTop: 1 },
  sectionIndexText: { color: palette.greenDeep, fontSize: 10, fontWeight: "800" },
  sectionCopy: { flex: 1 },
  sectionHeading: { color: palette.ink, fontSize: 18, fontWeight: "700", lineHeight: 25, marginBottom: 7 },
  sectionBody: { color: "#40594E", fontSize: 15, lineHeight: 24 },
  educationNote: { flexDirection: "row", marginTop: 22, backgroundColor: palette.greenSoft, borderRadius: 14, overflow: "hidden" },
  noteStripe: { width: 4, backgroundColor: palette.green },
  noteCopy: { flex: 1, paddingHorizontal: 15, paddingVertical: 14 },
  noteTitle: { color: palette.greenDeep, fontSize: 13, fontWeight: "800", marginBottom: 4 },
  noteBody: { color: "#40594E", fontSize: 13, lineHeight: 20 },
  referencesBlock: { marginTop: 32 },
  referencesEyebrow: { color: palette.green, fontSize: 9, fontWeight: "800", letterSpacing: 1.2 },
  referencesTitle: { color: palette.ink, fontSize: 23, fontWeight: "800", marginTop: 6, marginBottom: 13 },
  referenceLink: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 13, paddingHorizontal: 14, marginBottom: 8, borderRadius: 13, borderWidth: 1, borderColor: palette.line, backgroundColor: palette.surface },
  referenceCopy: { flex: 1 },
  referenceTitle: { color: palette.greenDeep, fontSize: 13, fontWeight: "700", lineHeight: 18 },
  referencePublication: { color: palette.muted, fontSize: 11, lineHeight: 16, marginTop: 4 },
  externalMark: { color: palette.green, fontSize: 19, fontWeight: "600" },
  footer: { flexDirection: "row", alignItems: "center", flexWrap: "wrap", gap: 12, paddingTop: 22, marginTop: 28, borderTopWidth: 1, borderTopColor: palette.line },
  footerText: { flex: 1, minWidth: 145, color: palette.muted, fontSize: 11 },
  footerHome: { paddingVertical: 7, paddingHorizontal: 2 },
  footerHomeText: { color: palette.greenDeep, fontSize: 12, fontWeight: "700" },
  bottomNav: { minHeight: 64, flexDirection: "row", alignItems: "center", justifyContent: "space-around", paddingHorizontal: 4, paddingTop: 5, borderTopWidth: 1, borderTopColor: palette.line, backgroundColor: palette.surface },
  navItem: { flex: 1, minWidth: 0, minHeight: 50, alignItems: "center", justifyContent: "center", borderRadius: 12, paddingHorizontal: 2, paddingVertical: 4 },
  navItemSelected: { backgroundColor: palette.greenPale },
  navMark: { color: palette.muted, fontSize: 10, lineHeight: 14, fontWeight: "800" },
  navMarkSelected: { color: palette.greenDeep },
  navLabel: { maxWidth: "100%", color: palette.muted, fontSize: 9, lineHeight: 13, fontWeight: "600", marginTop: 2 },
  navLabelSelected: { color: palette.greenDeep, fontWeight: "800" },
});
