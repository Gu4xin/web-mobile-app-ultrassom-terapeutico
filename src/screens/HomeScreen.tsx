import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DISCLAIMER, topics } from '../data/content';
import type { RootStackParamList } from '../navigation/types';
import { useAccessibility } from '../context/AccessibilityContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const [query, setQuery] = useState('');
  const { fontScale, setFontScale } = useAccessibility();

  const filteredTopics = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return topics;
    return topics.filter((topic) =>
      JSON.stringify(topic).toLowerCase().includes(normalizedQuery),
    );
  }, [query]);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.toolbar}>
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>⌕</Text>
          <TextInput
            style={[styles.search, { fontSize: 15 * fontScale }]}
            placeholder="Buscar: gestação, calor, joelho..."
            placeholderTextColor="#74878A"
            value={query}
            onChangeText={setQuery}
            clearButtonMode="while-editing"
            accessibilityLabel="Buscar conteúdo"
          />
        </View>
        <View
          style={styles.fontControls}
          accessibilityRole="group"
          accessibilityLabel="Tamanho das letras"
        >
          <Text style={[styles.fontLabel, { fontSize: 12 * fontScale }]}>
            Letras:
          </Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Diminuir letras"
            accessibilityState={{ disabled: fontScale <= 1 }}
            disabled={fontScale <= 1}
            onPress={() =>
              setFontScale(Math.max(1, Number((fontScale - 0.1).toFixed(1))))
            }
            style={({ pressed }) => [
              styles.fontButton,
              fontScale <= 1 && styles.disabledFontButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={[styles.fontButtonText, { fontSize: 16 * fontScale }]}>
              A−
            </Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Aumentar letras"
            accessibilityState={{ disabled: fontScale >= 1.3 }}
            disabled={fontScale >= 1.3}
            onPress={() =>
              setFontScale(Math.min(1.3, Number((fontScale + 0.1).toFixed(1))))
            }
            style={({ pressed }) => [
              styles.fontButton,
              styles.activeFontButton,
              fontScale >= 1.3 && styles.disabledFontButton,
              pressed && styles.pressed,
            ]}
          >
            <Text
              style={[
                styles.fontButtonText,
                styles.activeFontButtonText,
                { fontSize: 16 * fontScale },
              ]}
            >
              A+
            </Text>
          </Pressable>
        </View>
      </View>
      <FlatList
        data={filteredTopics}
        keyExtractor={(topic) => topic.id}
        numColumns={2}
        columnWrapperStyle={styles.column}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={[styles.empty, { fontSize: 15 * fontScale }]}>
            Nenhum resultado encontrado.
          </Text>
        }
        ListHeaderComponent={
          <View style={styles.intro}>
            <Text style={[styles.eyebrow, { fontSize: 12 * fontScale }]}>
              GUIA DE CONSULTA · FISIOTERAPIA
            </Text>
            <Text style={[styles.heading, { fontSize: 34 * fontScale }]}>
              Ultrassom terapêutico
            </Text>
            <Text style={[styles.description, { fontSize: 16 * fontScale }]}>
              Conceitos, parâmetros e cuidados explicados de forma simples. Use
              a busca acima ou toque em um tema.
            </Text>
            <Text style={[styles.helperText, { fontSize: 14 * fontScale }]}>
              Selecione um tema para abrir o conteúdo completo.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`${item.title}. ${item.subtitle}`}
            onPress={() => navigation.navigate('Topic', { id: item.id })}
            style={({ pressed }) => [
              styles.card,
              pressed && styles.pressed,
            ]}
          >
            <View style={[styles.iconBox, { backgroundColor: item.color }]}>
              <Text style={{ fontSize: 26 * fontScale }}>
                {item.icon}
              </Text>
            </View>
            <View style={styles.cardText}>
              <Text style={[styles.title, { fontSize: 15 * fontScale }]}>
                {item.title}
              </Text>
              <Text style={[styles.subtitle, { fontSize: 12 * fontScale }]}>
                {item.subtitle}
              </Text>
            </View>
            <Text style={[styles.chevron, { fontSize: 24 * fontScale }]}>
              ›
            </Text>
          </Pressable>
        )}
        ListFooterComponent={
          <Text style={[styles.disclaimer, { fontSize: 12 * fontScale }]}>
            {DISCLAIMER}
          </Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3FBF9' },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#F8FDFC',
    borderBottomWidth: 1,
    borderBottomColor: '#E1EFEC',
  },
  searchBox: {
    flex: 1,
    minWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#DCE8E6',
    backgroundColor: '#fff',
  },
  searchIcon: { fontSize: 23, color: '#60777A', marginRight: 7 },
  search: {
    flex: 1,
    minWidth: 0,
    paddingVertical: 12,
    color: '#183438',
  },
  fontControls: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  fontLabel: { color: '#183438', fontWeight: '600' },
  fontButton: {
    minWidth: 42,
    height: 46,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DCE8E6',
    backgroundColor: '#fff',
  },
  activeFontButton: { backgroundColor: '#087F83', borderColor: '#087F83' },
  disabledFontButton: { opacity: 0.45 },
  fontButtonText: { color: '#183438', fontWeight: '700' },
  activeFontButtonText: { color: '#fff' },
  intro: {
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 28,
    paddingBottom: 18,
  },
  eyebrow: {
    color: '#087F83',
    fontWeight: '800',
    letterSpacing: 1.4,
    textAlign: 'center',
  },
  heading: {
    marginTop: 8,
    color: '#163438',
    fontFamily: 'Georgia',
    fontWeight: '700',
    textAlign: 'center',
  },
  description: {
    maxWidth: 440,
    marginTop: 10,
    color: '#667B7D',
    lineHeight: 24,
    textAlign: 'center',
  },
  helperText: { marginTop: 14, color: '#60777A', textAlign: 'center' },
  list: { paddingHorizontal: 16, paddingBottom: 20, gap: 12 },
  column: { gap: 12 },
  card: {
    flex: 1,
    minHeight: 104,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 13,
    borderRadius: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#DCE8E6',
    shadowColor: '#173A3D',
    shadowOpacity: 0.05,
    shadowRadius: 7,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  pressed: { opacity: 0.7 },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: { flex: 1, minWidth: 0 },
  title: { fontWeight: '700', color: '#183438' },
  subtitle: { color: '#6C8082', marginTop: 4 },
  chevron: { color: '#90A3A4' },
  empty: { textAlign: 'center', color: '#6C8082', marginTop: 40 },
  disclaimer: {
    color: '#74878A',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 17,
  },
});
