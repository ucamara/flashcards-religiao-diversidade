# Flashcards: Religião e Diversidade

Aplicação web interativa construída com Next.js e Tailwind CSS para estudar diversidade religiosa a partir de um baralho de flashcards. O projeto oferece dois modos de uso:

- **Modo Estudo**: percorra todos os cards em sequência.
- **Modo Jogo**: cards embaralhados com pontuação baseada na dificuldade.

## Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior
- [pnpm](https://pnpm.io), [yarn](https://yarnpkg.com) ou npm (os exemplos abaixo usam `npm`)

## Instalação e execução

```bash
npm install
npm run dev
```

Abra <http://localhost:3000> no navegador para visualizar a aplicação.

Para gerar a build de produção:

```bash
npm run build
npm start
```

## Estrutura do projeto

- `app/` – páginas e layout com o App Router do Next.js.
- `components/ui/` – componentes reutilizáveis (ex.: cartão).
- `lib/` – utilitários de apoio (ex.: função `cn`).
- `tailwind.config.ts` – personalização do Tailwind CSS.

## Deploy

O projeto está preparado para deploy na [Vercel](https://vercel.com). Basta importar o repositório, definir o comando de build (`npm run build`) e utilizar a saída padrão `.next`.
