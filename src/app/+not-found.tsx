import { Pressable, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { AppText, PageFooter, PageFrame, PageHeader, palette } from "../components/ui";

export default function NotFoundPage() {
  const router = useRouter();
  return (
    <PageFrame>
      <PageHeader showBack />
      <View style={styles.emptyPage}>
        <View style={styles.mark}><AppText style={styles.markText}>?</AppText></View>
        <AppText style={styles.kicker}>PÁGINA NÃO ENCONTRADA</AppText>
        <AppText accessibilityRole="header" style={styles.heading}>Este caminho não faz parte do guia.</AppText>
        <AppText style={styles.body}>
          O conteúdo pode ter mudado de endereço. Volte ao início para escolher um tema de estudo.
        </AppText>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Ir para o início"
          onPress={() => router.replace("/")}
          style={({ pressed }) => [styles.homeCta, pressed && styles.pressed]}
        >
          <AppText style={styles.homeCtaText}>Voltar ao início  →</AppText>
        </Pressable>
      </View>
      <PageFooter />
    </PageFrame>
  );
}

const styles = StyleSheet.create({
  emptyPage: { minHeight: 390, justifyContent: "center", alignItems: "flex-start", paddingHorizontal: 7 },
  mark: { width: 46, height: 46, borderRadius: 16, backgroundColor: "#E4F0E8", alignItems: "center", justifyContent: "center", marginBottom: 20 },
  markText: { color: palette.greenDeep, fontSize: 23, fontWeight: "700" },
  kicker: { color: palette.green, fontSize: 10, fontWeight: "800", letterSpacing: 1.2, marginBottom: 9 },
  heading: { maxWidth: 440, color: palette.ink, fontSize: 32, fontWeight: "800", lineHeight: 39 },
  body: { maxWidth: 420, color: palette.muted, fontSize: 15, lineHeight: 23, marginTop: 12 },
  homeCta: { marginTop: 22, paddingVertical: 13, paddingHorizontal: 17, borderRadius: 13, backgroundColor: palette.green },
  homeCtaText: { color: "#F3F8F3", fontSize: 14, fontWeight: "700" },
  pressed: { opacity: 0.75 },
});
