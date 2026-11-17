export type Section =
  | { type: 'text'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'table'; headers: string[]; rows: string[][] };

export type Topic = {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  sections: { heading: string; blocks: Section[] }[];
};

export const DISCLAIMER =
  'Conteúdo educativo. Não substitui avaliação clínica nem o julgamento do profissional habilitado. Confira sempre protocolos atualizados e o manual do seu equipamento.';

export const topics: Topic[] = [
  {
    id: 'fundamentos',
    title: 'O que é o ultrassom',
    subtitle: 'Princípios físicos e efeitos',
    icon: '🔊',
    color: '#2E7D9A',
    sections: [
      {
        heading: 'Definição',
        blocks: [
          {
            type: 'text',
            text: 'O ultrassom terapêutico usa ondas sonoras de alta frequência (acima de 20 kHz, geralmente 1 a 3 MHz), geradas por um cristal piezoelétrico no transdutor, para transferir energia aos tecidos.',
          },
        ],
      },
      {
        heading: 'Efeitos térmicos',
        blocks: [
          {
            type: 'list',
            items: [
              'Aumento da extensibilidade do colágeno',
              'Aumento do fluxo sanguíneo local',
              'Redução da rigidez articular',
              'Modulação da dor',
            ],
          },
        ],
      },
      {
        heading: 'Efeitos não térmicos',
        blocks: [
          {
            type: 'list',
            items: [
              'Cavitação estável',
              'Microcorrentes acústicas',
              'Aumento da permeabilidade de membrana',
              'Estímulo à síntese de proteínas e reparo tecidual',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'indicacoes',
    title: 'Indicações',
    subtitle: 'Quando utilizar',
    icon: '✅',
    color: '#3A8F5C',
    sections: [
      {
        heading: 'Principais indicações',
        blocks: [
          {
            type: 'list',
            items: [
              'Tendinopatias e tenossinovites',
              'Bursites',
              'Contraturas e encurtamentos de tecidos moles',
              'Cicatrizes e aderências (fase de remodelação)',
              'Reparo de lesões em tecidos moles (fase inflamatória/proliferativa, com parâmetros atenuados)',
              'Espasmo muscular e pontos-gatilho',
              'Consolidação óssea (protocolos de baixa intensidade pulsada, conforme evidência e prescrição)',
              'Fonoforese para auxiliar a penetração de fármacos tópicos',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'contraindicacoes',
    title: 'Contraindicações',
    subtitle: 'Quando NÃO utilizar',
    icon: '⛔',
    color: '#C0392B',
    sections: [
      {
        heading: 'Contraindicações absolutas',
        blocks: [
          {
            type: 'list',
            items: [
              'Neoplasia maligna na região de aplicação',
              'Trombose venosa profunda ou tromboflebite',
              'Gestação: região abdominal/lombar e pélvica',
              'Olhos, gônadas e coração (região precordial em cardiopatas)',
              'Marca-passo e dispositivos eletrônicos implantados na área',
              'Infecção aguda e foco infeccioso ativo',
              'Epífises de crescimento abertas (crianças)',
            ],
          },
        ],
      },
      {
        heading: 'Precauções',
        blocks: [
          {
            type: 'list',
            items: [
              'Alteração de sensibilidade térmica ou dolorosa',
              'Insuficiência circulatória/vascular periférica',
              'Implantes metálicos e próteses (preferir modo pulsado e movimento constante)',
              'Pele lesionada ou com cicatrização recente',
              'Áreas com hemorragia ou risco de sangramento',
              'Pacientes sem capacidade de relatar desconforto',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'parametros',
    title: 'Parâmetros',
    subtitle: 'Frequência, intensidade, modo e tempo',
    icon: '⚙️',
    color: '#8E5BB5',
    sections: [
      {
        heading: 'Frequência',
        blocks: [
          {
            type: 'table',
            headers: ['Frequência', 'Profundidade', 'Uso'],
            rows: [
              ['1 MHz', '3–5 cm', 'Tecidos profundos'],
              ['3 MHz', '1–2 cm', 'Tecidos superficiais'],
            ],
          },
        ],
      },
      {
        heading: 'Modo de emissão',
        blocks: [
          {
            type: 'table',
            headers: ['Modo', 'Ciclo de trabalho', 'Efeito predominante'],
            rows: [
              ['Contínuo', '100%', 'Térmico'],
              ['Pulsado', '20–50%', 'Não térmico (fase aguda/subaguda)'],
            ],
          },
        ],
      },
      {
        heading: 'Intensidade e dose (referências usuais)',
        blocks: [
          {
            type: 'table',
            headers: ['Fase', 'Intensidade típica', 'Modo'],
            rows: [
              ['Aguda', '0,1–0,5 W/cm²', 'Pulsado'],
              ['Subaguda', '0,5–1,0 W/cm²', 'Pulsado/contínuo'],
              ['Crônica', '1,0–2,0 W/cm²', 'Contínuo'],
            ],
          },
          {
            type: 'text',
            text: 'Tempo: em geral 3 a 10 minutos por área equivalente a 2 × ERA (área de radiação efetiva do transdutor). Frequência de sessões: 2 a 5 vezes por semana, conforme prescrição.',
          },
        ],
      },
      {
        heading: 'Técnica de aplicação',
        blocks: [
          {
            type: 'list',
            items: [
              'Use gel acoplante em quantidade adequada',
              'Mantenha o cabeçote em movimento lento e contínuo (técnica dinâmica)',
              'Mantenha o transdutor perpendicular à pele',
              'Técnica estacionária só com intensidade muito baixa e por pouco tempo',
              'Interrompa se houver dor, queimação ou desconforto',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'boas-praticas',
    title: 'Segurança e boas práticas',
    subtitle: 'Cuidados antes, durante e depois',
    icon: '🛡️',
    color: '#D68910',
    sections: [
      {
        heading: 'Antes',
        blocks: [
          {
            type: 'list',
            items: [
              'Avaliação completa e triagem de contraindicações',
              'Teste de sensibilidade térmica',
              'Higienização da pele e do cabeçote',
              'Explicação do procedimento ao paciente',
            ],
          },
        ],
      },
      {
        heading: 'Durante',
        blocks: [
          {
            type: 'list',
            items: [
              'Não ligar o equipamento sem acoplamento (cabeçote no ar)',
              'Observar o relato do paciente continuamente',
              'Evitar sobre proeminências ósseas com intensidade alta',
            ],
          },
        ],
      },
      {
        heading: 'Depois',
        blocks: [
          {
            type: 'list',
            items: [
              'Limpar o gel e desinfetar o transdutor',
              'Registrar parâmetros e resposta do paciente',
              'Reavaliar a necessidade de ajuste do protocolo',
            ],
          },
        ],
      },
    ],
  },
];
