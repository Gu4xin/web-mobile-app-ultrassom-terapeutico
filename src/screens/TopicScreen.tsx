import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DISCLAIMER, topics } from '../data/content';
import type { Section } from '../data/content';
import type { RootStackParamList } from '../navigation/types';
import TopicIllustration from '../components/TopicIllustration';
import { useAccessibility } from '../context/AccessibilityContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Topic'>;

function Block({
  block,
  color,
  fontScale,
}: {
  block: Section;
  color: string;
  fontScale: number;
}) {
  if (block.type === 'text') {
    return (
      <Text
        style={[
          styles.body,
          { fontSize: 15 * fontScale, lineHeight: 22 * fontScale },
        ]}
      >
        {block.text}
      </Text>
    );
  }

  if (block.type === 'list') {
    return (
      <View style={styles.blockList}>
        {block.items.map((item, index) => (
          <View key={`${index}-${item}`} style={styles.listRow}>
            <View style={[styles.dot, { backgroundColor: color }]} />
            <Text
              style={[
                styles.body,
                styles.listText,
                { fontSize: 15 * fontScale, lineHeight: 22 * fontScale },
              ]}
            >
              {item}
            </Text>
          </View>
        ))}
      </View>
    );
  }

  return (
    <View style={styles.table}>
      <View style={[styles.tableRow, { backgroundColor: color }]}>
        {block.headers.map((header, index) => (
          <Text
            key={`${index}-${header}`}
            style={[
              styles.cell,
              styles.headerCell,
              { fontSize: 13 * fontScale },
            ]}
          >
            {header}
          </Text>
        ))}
      </View>
      {block.rows.map((row, rowIndex) => (
        <View
          key={rowIndex}
          style={[
            styles.tableRow,
            rowIndex % 2 === 1 && styles.alternateRow,
          ]}
        >
          {row.map((cell, cellIndex) => (
            <Text
              key={`${cellIndex}-${cell}`}
              style={[styles.cell, { fontSize: 13 * fontScale }]}
            >
              {cell}
            </Text>
          ))}
        </View>
      ))}
    </View>
  );
}

export default function TopicScreen({ route }: Props) {
  const { fontScale } = useAccessibility();
  const topic = topics.find((item) => item.id === route.params.id);

  if (!topic) {
    return (
      <View style={styles.notFound}>
        <Text
          style={[
            styles.body,
            { fontSize: 15 * fontScale, lineHeight: 22 * fontScale },
          ]}
        >
          Este conteúdo não foi encontrado.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={[styles.header, { backgroundColor: topic.color }]}>
        <Text style={[styles.headerIcon, { fontSize: 36 * fontScale }]}>
          {topic.icon}
        </Text>
        <Text style={[styles.headerTitle, { fontSize: 22 * fontScale }]}>
          {topic.title}
        </Text>
        <Text style={[styles.headerSubtitle, { fontSize: 14 * fontScale }]}>
          {topic.subtitle}
        </Text>
      </View>

      <TopicIllustration topicId={topic.id} color={topic.color} />

      {topic.sections.map((section, index) => (
        <View key={`${index}-${section.heading}`} style={styles.section}>
          <Text
            style={[
              styles.heading,
              { color: topic.color, fontSize: 16 * fontScale },
            ]}
          >
            {section.heading}
          </Text>
          {section.blocks.map((block, blockIndex) => (
            <Block
              key={`${section.heading}-${blockIndex}`}
              block={block}
              color={topic.color}
              fontScale={fontScale}
            />
          ))}
        </View>
      ))}

      <Text style={[styles.disclaimer, { fontSize: 12 * fontScale }]}>
        {DISCLAIMER}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3FBF9' },
  scrollContent: { padding: 16 },
  header: {
    borderRadius: 18,
    padding: 20,
    alignItems: 'center',
    marginBottom: 8,
  },
  headerIcon: { fontSize: 36 },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '800',
    marginTop: 6,
    textAlign: 'center',
  },
  headerSubtitle: {
    color: '#ffffffd0',
    fontSize: 14,
    marginTop: 2,
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginTop: 12,
    gap: 10,
  },
  heading: { fontWeight: '700' },
  body: { fontSize: 15, lineHeight: 22, color: '#2B3640' },
  blockList: { gap: 8 },
  listRow: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  listText: { flex: 1 },
  dot: { width: 8, height: 8, borderRadius: 4, marginTop: 8 },
  table: {
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E1E5EA',
  },
  tableRow: { flexDirection: 'row' },
  alternateRow: { backgroundColor: '#F3F5F8' },
  cell: { flex: 1, padding: 10, fontSize: 13, color: '#2B3640' },
  headerCell: { color: '#fff', fontWeight: '700' },
  disclaimer: {
    color: '#74878A',
    textAlign: 'center',
    marginVertical: 20,
    lineHeight: 17,
  },
  notFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
});
