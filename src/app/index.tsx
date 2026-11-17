import { StyleSheet, View } from "react-native";
import { AppText, HomeContents, PageFooter, PageFrame, PageHeader, palette, SearchPanel } from "../components/ui";

export default function HomePage() {
  return (
    <PageFrame>
      <PageHeader />
      <View style={styles.hero}>
        <View style={styles.heroCopy}>
          <View style={styles.eyebrowRow}>
            <View style={styles.eyebrowLine} />
            <AppText style={styles.eyebrow}>UM GUIA PARA ESTUDANTES</AppText>
          </View>
          <AppText accessibilityRole="header" style={styles.title}>Ultrassom{`\n`}terapêutico, sem{`\n`}mistério.</AppText>
          <AppText style={styles.description}>
            Conceitos, aplicações e cuidados para entender o recurso com clareza — e estudar com responsabilidade.
          </AppText>
        </View>
        <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={styles.heroArt}>
          <View style={styles.artDiscOuter}>
            <View style={styles.artDiscMiddle}>
              <View style={styles.artDiscInner} />
            </View>
          </View>
          <View style={styles.artBeamOne} />
          <View style={styles.artBeamTwo} />
          <View style={styles.artBeamThree} />
          <View style={styles.artPanel}>
            <AppText style={styles.artPanelLabel}>CAMPO DE ESTUDO</AppText>
            <AppText style={styles.artPanelValue}>01 — 04</AppText>
            <AppText style={styles.artPanelNote}>conceito · prática · segurança</AppText>
          </View>
          <AppText style={styles.artNumber}>US</AppText>
        </View>
      </View>

      <SearchPanel />

      <View style={styles.topicsHeading}>
        <View>
          <AppText style={styles.sectionEyebrow}>EXPLORE O GUIA</AppText>
          <AppText accessibilityRole="header" style={styles.topicsTitle}>Comece por aqui</AppText>
        </View>
        <AppText style={styles.topicCount}>04 TEMAS</AppText>
      </View>
      <View style={styles.topicList}>
        <HomeContents />
      </View>

      <View style={styles.disclaimer}>
        <View style={styles.disclaimerMark}><View style={styles.disclaimerDot} /></View>
        <View style={styles.disclaimerCopy}>
          <AppText style={styles.disclaimerTitle}>Conhecimento com contexto</AppText>
          <AppText style={styles.disclaimerText}>
            Material educativo, não clínico. Parâmetros dependem do equipamento, do contexto e da avaliação profissional.
          </AppText>
        </View>
      </View>
      <PageFooter />
    </PageFrame>
  );
}

const styles = StyleSheet.create({
  hero: { minHeight: 318, marginBottom: 27, borderRadius: 22, backgroundColor: "#E8F1E9", overflow: "hidden", padding: 22, justifyContent: "space-between" },
  heroCopy: { zIndex: 2 },
  eyebrowRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 15 },
  eyebrowLine: { width: 18, height: 2, backgroundColor: palette.green, borderRadius: 2 },
  eyebrow: { color: palette.greenDeep, fontSize: 9, letterSpacing: 1, fontWeight: "800" },
  title: { color: palette.ink, fontSize: 38, lineHeight: 43, fontWeight: "800", letterSpacing: -1.2 },
  description: { maxWidth: 320, color: "#536B60", fontSize: 14, lineHeight: 21, marginTop: 12 },
  heroArt: { position: "absolute", width: 190, height: 180, right: -13, bottom: -5, alignItems: "center", justifyContent: "center" },
  artDiscOuter: { width: 138, height: 138, borderRadius: 70, borderWidth: 1, borderColor: "#A8CDB1", alignItems: "center", justifyContent: "center", transform: [{ rotate: "-24deg" }] },
  artDiscMiddle: { width: 99, height: 99, borderRadius: 50, borderWidth: 1, borderColor: "#8EBB9A", alignItems: "center", justifyContent: "center" },
  artDiscInner: { width: 56, height: 56, borderRadius: 28, backgroundColor: "#CFE3D3", borderWidth: 10, borderColor: "#DDECE0" },
  artBeamOne: { position: "absolute", width: 138, height: 1, backgroundColor: "#9EC5A7", transform: [{ rotate: "26deg" }] },
  artBeamTwo: { position: "absolute", width: 138, height: 1, backgroundColor: "#9EC5A7", transform: [{ rotate: "-26deg" }] },
  artBeamThree: { position: "absolute", width: 1, height: 138, backgroundColor: "#9EC5A7" },
  artPanel: { position: "absolute", bottom: 11, left: 3, paddingVertical: 7, paddingHorizontal: 10, borderRadius: 10, backgroundColor: "rgba(245,248,244,0.88)" },
  artPanelLabel: { color: palette.muted, fontSize: 7, fontWeight: "800", letterSpacing: 0.8 },
  artPanelValue: { color: palette.greenDeep, fontSize: 13, fontWeight: "800", marginTop: 2 },
  artPanelNote: { color: palette.muted, fontSize: 7, marginTop: 1 },
  artNumber: { position: "absolute", top: 18, right: 25, color: "#A7C8AD", fontSize: 16, fontWeight: "800", letterSpacing: 1.5 },
  topicsHeading: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 13 },
  sectionEyebrow: { color: palette.green, fontSize: 9, letterSpacing: 1.2, fontWeight: "800" },
  topicsTitle: { color: palette.ink, fontSize: 24, fontWeight: "800", marginTop: 4 },
  topicCount: { color: palette.muted, fontSize: 9, fontWeight: "700", letterSpacing: 0.7, paddingBottom: 4 },
  topicList: { gap: 0 },
  disclaimer: { flexDirection: "row", alignItems: "center", gap: 12, marginTop: 9, paddingVertical: 15, paddingHorizontal: 14, borderRadius: 14, backgroundColor: palette.warningSoft },
  disclaimerMark: { width: 28, height: 28, borderRadius: 10, backgroundColor: "#EBDCC1", alignItems: "center", justifyContent: "center" },
  disclaimerDot: { width: 7, height: 7, borderWidth: 1.5, borderColor: palette.warning, borderRadius: 4 },
  disclaimerCopy: { flex: 1 },
  disclaimerTitle: { color: "#72502E", fontSize: 12, fontWeight: "800" },
  disclaimerText: { color: "#765F46", fontSize: 11, lineHeight: 17, marginTop: 3 },
});
