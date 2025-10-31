'use client';

import { useMemo, useState } from 'react';
import { BookOpen, Eye, Star, Trophy } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface Flashcard {
  id: number;
  categoria: string;
  frente: string;
  verso: string;
  dificuldade: 'básico' | 'intermediário';
}

type ModoDeJogo = 'menu' | 'estudo' | 'jogo' | 'resultado';

type FlashcardResultado = Flashcard & { acertou: boolean };

const flashcards: Flashcard[] = [
  {
    id: 1,
    categoria: 'Conceitos Fundamentais',
    frente: 'O que é Religião?',
    verso:
      'Conjunto de crenças, práticas, símbolos e valores que conectam indivíduos e comunidades a algo considerado sagrado ou transcendente. Manifesta-se de formas diversas em diferentes culturas.',
    dificuldade: 'básico'
  },
  {
    id: 2,
    categoria: 'Conceitos Fundamentais',
    frente: "O que significa o conceito de 'Sagrado'?",
    verso:
      'Aquilo que é separado do comum, que inspira reverência e respeito. O sagrado varia entre tradições: pode ser um ser divino, a natureza, antepassados ou princípios éticos.',
    dificuldade: 'básico'
  },
  {
    id: 3,
    categoria: 'Cristianismo',
    frente: 'Quais são os principais fundamentos do Cristianismo?',
    verso:
      'Crença em um Deus único, nos ensinamentos de Jesus Cristo como filho de Deus e salvador, na Bíblia como texto sagrado, e em valores como amor ao próximo, perdão e caridade.',
    dificuldade: 'básico'
  },
  {
    id: 4,
    categoria: 'Islamismo',
    frente: 'Quais são os Cinco Pilares do Islamismo?',
    verso:
      '1) Shahada (profissão de fé), 2) Salat (orações diárias), 3) Zakat (caridade), 4) Sawm (jejum no Ramadã), 5) Hajj (peregrinação a Meca). São práticas fundamentais para muçulmanos.',
    dificuldade: 'intermediário'
  },
  {
    id: 5,
    categoria: 'Judaísmo',
    frente: 'O que é a Torá no Judaísmo?',
    verso:
      'É o texto mais sagrado do Judaísmo, composto pelos cinco primeiros livros da Bíblia Hebraica. Contém leis, narrativas e ensinamentos que guiam a vida judaica.',
    dificuldade: 'básico'
  },
  {
    id: 6,
    categoria: 'Budismo',
    frente: 'O que são as Quatro Nobres Verdades do Budismo?',
    verso:
      '1) A vida envolve sofrimento, 2) O sofrimento tem causa (desejo/apego), 3) É possível cessar o sofrimento, 4) Existe um caminho para cessá-lo (Nobre Caminho Óctuplo).',
    dificuldade: 'intermediário'
  },
  {
    id: 7,
    categoria: 'Hinduísmo',
    frente: 'O que é Dharma no Hinduísmo?',
    verso:
      'Conceito central que significa dever, retidão, lei cósmica e ordem moral. Refere-se ao caminho correto de viver de acordo com princípios éticos e espirituais.',
    dificuldade: 'intermediário'
  },
  {
    id: 8,
    categoria: 'Religiões Afro-brasileiras',
    frente: 'O que caracteriza o Candomblé?',
    verso:
      'Religião afro-brasileira que cultua orixás (divindades da natureza), valoriza ancestralidade africana, usa música e dança em rituais, e preserva tradições iorubás, bantos e jejes.',
    dificuldade: 'intermediário'
  },
  {
    id: 9,
    categoria: 'Religiões Afro-brasileiras',
    frente: 'O que é a Umbanda?',
    verso:
      'Religião brasileira que sintetiza elementos africanos, indígenas, católicos e espíritas. Cultua orixás e entidades (caboclos, pretos-velhos), praticando caridade e desenvolvimento espiritual.',
    dificuldade: 'intermediário'
  },
  {
    id: 10,
    categoria: 'Religiões Indígenas',
    frente: 'Como as religiões indígenas brasileiras concebem o sagrado?',
    verso:
      'O sagrado está integrado à natureza, aos espíritos dos ancestrais e seres da floresta. Há profundo respeito pela Terra, rituais xamânicos e transmissão oral de conhecimentos.',
    dificuldade: 'intermediário'
  },
  {
    id: 11,
    categoria: 'Conceitos Fundamentais',
    frente: 'O que é Pluralismo Religioso?',
    verso:
      'Reconhecimento e respeito pela coexistência de múltiplas tradições religiosas em uma sociedade, valorizando a diversidade como riqueza cultural e direito fundamental.',
    dificuldade: 'básico'
  },
  {
    id: 12,
    categoria: 'Direitos e Ética',
    frente: 'O que é Laicidade do Estado?',
    verso:
      'Princípio que separa Estado e religiões, garantindo liberdade de crença e não-crença. O Estado não adota religião oficial e deve tratar todas com igualdade e respeito.',
    dificuldade: 'intermediário'
  },
  {
    id: 13,
    categoria: 'Direitos e Ética',
    frente: 'O que é Intolerância Religiosa?',
    verso:
      'Discriminação, perseguição ou violência contra pessoas por suas crenças religiosas. É crime e viola direitos humanos fundamentais de liberdade de consciência e crença.',
    dificuldade: 'básico'
  },
  {
    id: 14,
    categoria: 'Conceitos Fundamentais',
    frente: 'O que são Ritos Religiosos?',
    verso:
      'Práticas cerimoniais que marcam momentos importantes (nascimento, passagem, morte) ou celebram o sagrado. Incluem orações, danças, cantos, oferendas e gestos simbólicos.',
    dificuldade: 'básico'
  },
  {
    id: 15,
    categoria: 'Diálogo Inter-religioso',
    frente: 'Por que o diálogo inter-religioso é importante?',
    verso:
      'Promove respeito mútuo, combate preconceitos, constrói paz social e permite que diferentes tradições contribuam para valores comuns como justiça, compaixão e solidariedade.',
    dificuldade: 'intermediário'
  },
  {
    id: 16,
    categoria: 'Filosofias de Vida',
    frente: 'Pessoas sem religião podem ter princípios éticos?',
    verso:
      'Sim! Filosofias seculares baseiam-se em razão, ciência, direitos humanos e valores universais. Ateísmo, agnosticismo e humanismo secular são exemplos de visões não-religiosas da vida.',
    dificuldade: 'básico'
  },
  {
    id: 17,
    categoria: 'Símbolos e Práticas',
    frente: 'O que são Textos Sagrados?',
    verso:
      'Escrituras consideradas revelações divinas ou sabedorias ancestrais. Exemplos: Bíblia (cristãos), Alcorão (muçulmanos), Torá (judeus), Vedas (hindus), Tripitaka (budistas).',
    dificuldade: 'básico'
  },
  {
    id: 18,
    categoria: 'Cultura e Sociedade',
    frente: 'Como religiões influenciam a cultura?',
    verso:
      'Moldam arte, música, arquitetura, festividades, valores morais, leis e práticas sociais. Exemplos: Natal, Ramadã, Diwali, festas juninas, carnaval (influências religiosas diversas).',
    dificuldade: 'intermediário'
  },
  {
    id: 19,
    categoria: 'Símbolos e Práticas',
    frente: 'O que são Lideranças Religiosas?',
    verso:
      'Pessoas que orientam comunidades de fé: padres, pastores, rabinos, imãs, monges, pais/mães-de-santo, pajés. Têm papel de ensino, ritual e, frequentemente, ação social.',
    dificuldade: 'básico'
  },
  {
    id: 20,
    categoria: 'Direitos e Ética',
    frente: 'O que é Liberdade de Crença?',
    verso:
      'Direito humano fundamental de escolher, praticar ou mudar de religião, ou não ter religião alguma, sem sofrer discriminação, perseguição ou imposição.',
    dificuldade: 'básico'
  }
];

const categorias = [...new Set(flashcards.map((card) => card.categoria))];

const coresPorCategoria: Record<string, string> = {
  'Conceitos Fundamentais': 'bg-blue-100 text-blue-800',
  Cristianismo: 'bg-purple-100 text-purple-800',
  Islamismo: 'bg-green-100 text-green-800',
  Judaísmo: 'bg-indigo-100 text-indigo-800',
  Budismo: 'bg-orange-100 text-orange-800',
  Hinduísmo: 'bg-red-100 text-red-800',
  'Religiões Afro-brasileiras': 'bg-amber-100 text-amber-800',
  'Religiões Indígenas': 'bg-teal-100 text-teal-800',
  'Direitos e Ética': 'bg-pink-100 text-pink-800',
  'Diálogo Inter-religioso': 'bg-cyan-100 text-cyan-800',
  'Filosofias de Vida': 'bg-slate-100 text-slate-800',
  'Símbolos e Práticas': 'bg-violet-100 text-violet-800',
  'Cultura e Sociedade': 'bg-lime-100 text-lime-800'
};

export default function HomePage() {
  const [modo, setModo] = useState<ModoDeJogo>('menu');
  const [cardAtual, setCardAtual] = useState(0);
  const [virado, setVirado] = useState(false);
  const [pontos, setPontos] = useState(0);
  const [cardsJogados, setCardsJogados] = useState<FlashcardResultado[]>([]);
  const [embaralhados, setEmbaralhados] = useState<Flashcard[]>([]);

  const cardsEmUso = useMemo(
    () => (modo === 'jogo' ? (embaralhados.length ? embaralhados : flashcards) : flashcards),
    [embaralhados, modo]
  );

  const card = cardsEmUso[cardAtual];

  const iniciarEstudo = () => {
    setModo('estudo');
    setCardAtual(0);
    setVirado(false);
  };

  const embaralharCards = () => {
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5);
    setEmbaralhados(shuffled);
    return shuffled;
  };

  const iniciarJogo = () => {
    const shuffled = embaralharCards();
    setModo('jogo');
    setCardAtual(0);
    setVirado(false);
    setPontos(0);
    setCardsJogados([]);
    setEmbaralhados(shuffled);
  };

  const voltarMenu = () => {
    setModo('menu');
    setVirado(false);
    setCardAtual(0);
  };

  const proximoCard = () => {
    const proximaPosicao = cardAtual + 1;
    if (proximaPosicao < cardsEmUso.length) {
      setCardAtual(proximaPosicao);
      setVirado(false);
    } else if (modo === 'jogo') {
      setModo('resultado');
    } else {
      setCardAtual(0);
      setVirado(false);
    }
  };

  const responderJogo = (acertou: boolean) => {
    const cartas = embaralhados.length ? embaralhados : flashcards;
    const atual = cartas[cardAtual];
    if (!atual) return;

    setCardsJogados((prev) => [...prev, { ...atual, acertou }]);
    if (acertou) {
      setPontos((prev) => prev + (atual.dificuldade === 'intermediário' ? 15 : 10));
    }
    proximoCard();
  };

  const getCorCategoria = (categoria: string) => coresPorCategoria[categoria] ?? 'bg-gray-100 text-gray-800';

  if (!card && modo !== 'menu' && modo !== 'resultado') {
    return null;
  }

  if (modo === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6 md:p-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h1 className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
              Religião e Diversidade
            </h1>
            <p className="mt-3 text-lg text-gray-600 md:text-xl">Explore perspectivas plurais e inclusivas sobre religião.</p>
            <p className="mt-2 text-sm text-gray-500">Alinhado à BNCC | Ensino Médio | Educação não confessional</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="cursor-pointer transition-all hover:-translate-y-2 hover:shadow-2xl" onClick={iniciarEstudo}>
              <CardContent className="p-8 text-center">
                <BookOpen className="mx-auto mb-4 h-16 w-16 text-indigo-600" />
                <h2 className="mb-3 text-2xl font-bold text-gray-800">Modo Estudo</h2>
                <p className="mb-4 text-gray-600">
                  Explore todos os {flashcards.length} flashcards no seu ritmo. Ideal para aprender novos conceitos sobre religião e diversidade.
                </p>
                <div className="rounded-lg bg-indigo-50 p-3">
                  <p className="text-sm font-semibold text-indigo-700">✓ Todos os cards em sequência</p>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer transition-all hover:-translate-y-2 hover:shadow-2xl" onClick={iniciarJogo}>
              <CardContent className="p-8 text-center">
                <Trophy className="mx-auto mb-4 h-16 w-16 text-purple-600" />
                <h2 className="mb-3 text-2xl font-bold text-gray-800">Modo Jogo</h2>
                <p className="mb-4 text-gray-600">
                  Teste seus conhecimentos! Cards embaralhados com sistema de pontuação. Avalie se acertou ou não cada resposta.
                </p>
                <div className="rounded-lg bg-purple-50 p-3">
                  <p className="text-sm font-semibold text-purple-700">✓ Pontuação por dificuldade</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 rounded-lg bg-white p-6 shadow-xl">
            <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-800">
              <Star className="text-yellow-500" /> Categorias Incluídas
            </h3>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
              {categorias.map((categoria) => (
                <div key={categoria} className={`${getCorCategoria(categoria)} rounded-lg px-3 py-2 text-center text-sm font-medium`}>
                  {categoria}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-lg border-l-4 border-indigo-500 bg-gradient-to-r from-gray-50 to-gray-100 p-6 shadow">
            <h3 className="mb-2 font-bold text-gray-800">📝 Créditos e Licença</h3>
            <p className="mb-1 text-sm text-gray-700">
              <strong>Autor:</strong> Uipirangi Franklin da Silva Câmara
            </p>
            <p className="mb-1 text-sm text-gray-700">
              <strong>Desenvolvido com:</strong> Claude (Anthropic)
            </p>
            <p className="mb-2 text-sm text-gray-600">Alinhado à BNCC - Base Nacional Comum Curricular</p>
            <div className="flex items-center gap-2 rounded bg-white px-3 py-2 text-xs text-gray-600">
              <span>📄</span>
              <span>Licença Creative Commons - Permite compartilhamento e adaptação com atribuição</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (modo === 'resultado') {
    const acertos = cardsJogados.filter((card) => card.acertou).length;
    const porcentagem = cardsJogados.length ? Math.round((acertos / cardsJogados.length) * 100) : 0;

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6 md:p-8">
        <div className="mx-auto max-w-2xl">
          <Card className="shadow-2xl">
            <CardContent className="p-12 text-center">
              <Trophy className="mx-auto mb-6 h-24 w-24 text-yellow-500" />
              <h2 className="mb-4 text-4xl font-bold text-gray-800">Jogo Finalizado!</h2>

              <div className="mb-6 rounded-xl bg-gradient-to-r from-purple-100 to-indigo-100 p-6">
                <p className="mb-2 text-6xl font-bold text-purple-600">{pontos}</p>
                <p className="text-xl text-gray-700">pontos conquistados</p>
              </div>

              <div className="mb-8 grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-green-50 p-4">
                  <p className="text-3xl font-bold text-green-600">{acertos}</p>
                  <p className="text-gray-600">Acertos</p>
                </div>
                <div className="rounded-lg bg-red-50 p-4">
                  <p className="text-3xl font-bold text-red-600">{cardsJogados.length - acertos}</p>
                  <p className="text-gray-600">Erros</p>
                </div>
              </div>

              <div className="mb-8">
                <div className="h-4 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-1000"
                    style={{ width: `${porcentagem}%` }}
                  />
                </div>
                <p className="mt-2 text-lg font-semibold text-gray-700">{porcentagem}% de aproveitamento</p>
              </div>

              <button
                onClick={voltarMenu}
                className="rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:from-indigo-700 hover:to-purple-700"
              >
                Voltar ao Menu
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6 md:p-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={voltarMenu}
            className="rounded-lg bg-white px-4 py-2 font-medium text-gray-700 shadow transition-all hover:shadow-md"
          >
            ← Voltar
          </button>
          <div className="flex items-center gap-4">
            {modo === 'jogo' && (
              <div className="rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 px-6 py-2 text-lg font-bold text-white shadow-lg">
                ⭐ {pontos} pontos
              </div>
            )}
            <div className="rounded-lg bg-white px-4 py-2 font-medium text-gray-700 shadow">
              {cardAtual + 1} / {cardsEmUso.length}
            </div>
          </div>
        </div>

        <Card className="min-h-[400px] cursor-pointer transform shadow-2xl transition-all hover:scale-[1.02]" onClick={() => setVirado((prev) => !prev)}>
          <CardContent className="p-12">
            <div className="mb-6 flex items-start justify-between">
              <span className={`${getCorCategoria(card!.categoria)} rounded-full px-4 py-2 text-sm font-semibold`}>
                {card!.categoria}
              </span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  card!.dificuldade === 'básico' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                }`}
              >
                {card!.dificuldade === 'básico' ? '⭐ Básico (10pts)' : '⭐⭐ Intermediário (15pts)'}
              </span>
            </div>

            <div className="flex min-h-[220px] items-center justify-center text-center">
              {!virado ? (
                <div>
                  <h3 className="mb-6 text-3xl font-bold text-gray-800">{card!.frente}</h3>
                  <div className="mt-8 flex items-center justify-center gap-2 text-gray-500">
                    <Eye className="h-5 w-5" />
                    <p className="text-sm">Clique para revelar a resposta</p>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-xl leading-relaxed text-gray-700">{card!.verso}</p>
                </div>
              )}
            </div>

            {modo === 'jogo' && virado && (
              <div className="mt-8 grid grid-cols-2 gap-4">
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    responderJogo(false);
                  }}
                  className="rounded-lg bg-red-500 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-red-600"
                >
                  ❌ Errei
                </button>
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    responderJogo(true);
                  }}
                  className="rounded-lg bg-green-500 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-green-600"
                >
                  ✓ Acertei
                </button>
              </div>
            )}

            {modo === 'estudo' && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    proximoCard();
                  }}
                  className="rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:from-indigo-700 hover:to-purple-700"
                >
                  {cardAtual < cardsEmUso.length - 1 ? 'Próximo Card →' : '↻ Recomeçar'}
                </button>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-6 rounded-lg bg-white p-4 text-center text-sm text-gray-600 shadow">
          <p>
            <strong>Dica:</strong> {modo === 'jogo'
              ? 'Leia a pergunta, pense na resposta e clique para verificar. Seja honesto ao avaliar!'
              : 'Explore cada card com atenção. Clique para virar e descobrir mais!'}
          </p>
        </div>
      </div>
    </div>
  );
}
