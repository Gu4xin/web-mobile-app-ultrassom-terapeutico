import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  topicId: string;
  color: string;
};

function TissueLayers({ color }: { color: string }) {
  return (
    <View style={styles.layers}>
      <View style={[styles.layer, { backgroundColor: `${color}30` }]} />
      <View style={[styles.layer, { backgroundColor: `${color}55` }]} />
      <View style={[styles.layer, { backgroundColor: `${color}80` }]} />
    </View>
  );
}

export default function TopicIllustration({ topicId, color }: Props) {
  if (topicId === 'fundamentos') {
    return (
      <View
        style={styles.card}
        accessible
        accessibilityLabel="Ilustração esquemática: transdutor emitindo ondas em direção aos tecidos"
      >
        <Text style={styles.eyebrow}>COMO A ENERGIA CHEGA AO TECIDO</Text>
        <View style={styles.diagramRow}>
          <View style={styles.transducer}>
            <Text style={styles.transducerIcon}>◉</Text>
            <Text style={styles.transducerLabel}>Transdutor</Text>
          </View>
          <View style={styles.waveGroup}>
            <View style={[styles.wave, { width: 12, backgroundColor: color }]} />
            <View style={[styles.wave, { width: 20, backgroundColor: color }]} />
            <View style={[styles.wave, { width: 28, backgroundColor: color }]} />
          </View>
          <View style={styles.tissue}>
            <TissueLayers color={color} />
            <Text style={styles.diagramLabel}>Tecidos</Text>
          </View>
        </View>
        <Text style={styles.caption}>Representação educativa, fora de escala.</Text>
      </View>
    );
  }

  if (topicId === 'indicacoes') {
    return (
      <View
        style={styles.card}
        accessible
        accessibilityLabel="Ilustração esquemática de tendão, músculo e tecido mole"
      >
        <Text style={styles.eyebrow}>ESTRUTURAS DE TECIDO MOLE</Text>
        <View style={styles.featureRow}>
          <View style={styles.feature}>
            <View style={[styles.featureIcon, { backgroundColor: `${color}18` }]}>
              <Text style={styles.emoji}>🦴</Text>
            </View>
            <Text style={styles.featureLabel}>Tendão</Text>
          </View>
          <View style={styles.feature}>
            <View style={[styles.featureIcon, { backgroundColor: `${color}18` }]}>
              <Text style={styles.emoji}>💪</Text>
            </View>
            <Text style={styles.featureLabel}>Músculo</Text>
          </View>
          <View style={styles.feature}>
            <View style={[styles.featureIcon, { backgroundColor: `${color}18` }]}>
              <Text style={styles.emoji}>〰️</Text>
            </View>
            <Text style={styles.featureLabel}>Outros tecidos</Text>
          </View>
        </View>
        <Text style={styles.caption}>A indicação depende de avaliação profissional.</Text>
      </View>
    );
  }

  if (topicId === 'contraindicacoes') {
    return (
      <View
        style={styles.card}
        accessible
        accessibilityLabel="Ilustração de alerta: avaliar contraindicações e precauções antes da aplicação"
      >
        <View style={styles.alertRow}>
          <View style={[styles.alertIcon, { backgroundColor: `${color}18` }]}>
            <Text style={[styles.alertMark, { color }]}>!</Text>
          </View>
          <View style={styles.alertText}>
            <Text style={styles.alertTitle}>Avalie antes de aplicar</Text>
            <Text style={styles.caption}>
              Confira contraindicações, precauções e protocolos atualizados.
            </Text>
          </View>
        </View>
      </View>
    );
  }

  if (topicId === 'parametros') {
    return (
      <View
        style={styles.card}
        accessible
        accessibilityLabel="Comparação esquemática das frequências de 1 e 3 megahertz e suas profundidades de referência"
      >
        <Text style={styles.eyebrow}>FREQUÊNCIA E PROFUNDIDADE</Text>
        <View style={styles.frequencyRow}>
          <View style={styles.frequencyItem}>
            <View style={styles.frequencyHeading}>
              <Text style={[styles.frequencyTitle, { color }]}>1 MHz</Text>
              <Text style={styles.frequencyDepth}>3–5 cm</Text>
            </View>
            <TissueLayers color={color} />
            <View style={[styles.depthBar, { backgroundColor: color, width: '88%' }]} />
            <Text style={styles.caption}>Mais profundo</Text>
          </View>
          <View style={styles.frequencyItem}>
            <View style={styles.frequencyHeading}>
              <Text style={[styles.frequencyTitle, { color }]}>3 MHz</Text>
              <Text style={styles.frequencyDepth}>1–2 cm</Text>
            </View>
            <TissueLayers color={color} />
            <View style={[styles.depthBar, { backgroundColor: color, width: '48%' }]} />
            <Text style={styles.caption}>Mais superficial</Text>
          </View>
        </View>
        <Text style={styles.caption}>Valores de referência; siga a prescrição e o manual do equipamento.</Text>
      </View>
    );
  }

  return (
    <View
      style={styles.card}
      accessible
      accessibilityLabel="Etapas ilustradas de segurança: antes, durante e depois do procedimento"
    >
      <Text style={styles.eyebrow}>CUIDADOS EM CADA ETAPA</Text>
      <View style={styles.stepsRow}>
        {[
          { number: '1', label: 'Antes', detail: 'Avaliar' },
          { number: '2', label: 'Durante', detail: 'Observar' },
          { number: '3', label: 'Depois', detail: 'Registrar' },
        ].map((step) => (
          <View key={step.number} style={styles.step}>
            <View style={[styles.stepNumber, { backgroundColor: color }]}>
              <Text style={styles.stepNumberText}>{step.number}</Text>
            </View>
            <Text style={styles.stepTitle}>{step.label}</Text>
            <Text style={styles.caption}>{step.detail}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 8,
    gap: 14,
    borderWidth: 1,
    borderColor: '#E8EDF1',
  },
  eyebrow: {
    color: '#6B7785',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  diagramRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  transducer: {
    width: 78,
    height: 66,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F4F6',
    gap: 2,
  },
  transducerIcon: { fontSize: 24, color: '#2B3640' },
  transducerLabel: { fontSize: 10, color: '#52606D', fontWeight: '600' },
  waveGroup: { flex: 1, alignItems: 'center', gap: 5 },
  wave: { height: 4, borderRadius: 2, opacity: 0.8 },
  tissue: { width: 78, alignItems: 'center', gap: 6 },
  layers: { width: '100%', gap: 3 },
  layer: { height: 12, borderRadius: 4 },
  diagramLabel: { fontSize: 11, color: '#52606D', fontWeight: '600' },
  caption: { fontSize: 11, lineHeight: 16, color: '#7A8692' },
  featureRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 8,
  },
  feature: { flex: 1, alignItems: 'center', gap: 7 },
  featureIcon: {
    width: 54,
    height: 54,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: { fontSize: 26 },
  featureLabel: {
    fontSize: 11,
    color: '#52606D',
    textAlign: 'center',
    fontWeight: '600',
  },
  alertRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  alertIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertMark: { fontSize: 32, fontWeight: '800' },
  alertText: { flex: 1, gap: 4 },
  alertTitle: { fontSize: 15, fontWeight: '700', color: '#2B3640' },
  frequencyRow: { flexDirection: 'row', gap: 14 },
  frequencyItem: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#F6F8FA',
    gap: 8,
  },
  frequencyHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    gap: 4,
  },
  frequencyTitle: { fontSize: 16, fontWeight: '800' },
  frequencyDepth: { fontSize: 11, color: '#52606D' },
  depthBar: { height: 6, borderRadius: 3 },
  stepsRow: { flexDirection: 'row', justifyContent: 'space-around' },
  step: { flex: 1, alignItems: 'center', gap: 5 },
  stepNumber: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: { color: '#fff', fontSize: 15, fontWeight: '800' },
  stepTitle: { fontSize: 12, color: '#2B3640', fontWeight: '700' },
});
