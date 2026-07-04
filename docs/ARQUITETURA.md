# Sistema de Alerta Precoce de Cheias — Cursor Hackathon Moçambique

## 1. O Desafio (contexto)

Categoria escolhida: **1 — Alerta / Alerta Precoce**.

Construir uma ferramenta que use relatórios colaborativos (ou dados de sensores) sobre o
nível da água para enviar alertas a bairros em risco. Bónus avaliado: funcionar por
SMS/USSD ou offline. Requisitos obrigatórios do hackathon: construído no Cursor,
mobile-first, interface em português, funcional numa ligação 3G lenta, demonstração ao
vivo (não slides), repositório público, pitch de 3 minutos.

Critério de avaliação central: **uma funcionalidade a funcionar de ponta a ponta vale
mais do que cinco ecrãs parcialmente feitos.**

## 2. Visão geral da solução

Um sistema onde:

1. O **nível de água por bairro** é actualizado de duas formas:
   - Um **worker simulado de ingestão de sensores** (roda em background, gera leituras
     periódicas) — representa a versão futura com sensores reais.
   - Um **painel de administração** que força manualmente o nível — é a rede de
     segurança da demo (não depende de sorte do simulador acertar "PERIGO" no momento do pitch).
2. Quando um bairro atinge o nível **PERIGO**, o sistema dispara uma notificação via
   **ntfy.sh** (grátis, sem chave de API).
3. Utilizadores autenticados (via **Better Auth**, sessão anónima automática, com
   possibilidade de vincular email/senha depois) podem **subscrever bairros** e ver, em
   tempo real, um banner de alerta via **Server-Sent Events (SSE)** subscrito ao tópico ntfy.
4. Um **simulador de telefone (USSD/SMS)** permite testar o mesmo fluxo para quem não
   tem acesso à app — envia uma "mensagem" de texto, o sistema interpreta como comando e
   devolve uma resposta, tudo dentro da própria PWA, sem custo e sem depender de operadora real.

## 3. Stack tecnológica

| Camada | Tecnologia | Papel |
|---|---|---|
| Framework | Next.js (App Router) | SSR + Server Actions, sem API routes separadas |
| Estilo | Tailwind CSS | Mobile-first por padrão |
| Auth | Better Auth (plugin `anonymous`) | Sessão automática sem fricção; link a email/senha via `onLinkAccount` fica no roadmap |
| ORM / DB | Prisma + Postgres | Persistência de Bairro, Subscricao, Nível |
| Notificações | ntfy.sh | Dupla função: simula "SMS" (via POST recebido do simulador) e "push" (via SSE no browser) — zero custo, zero conta necessária |
| PWA | `manifest.json` + ícone | Instalável no ecrã principal; push nativo real fica no roadmap |

**Cortado deliberadamente do âmbito do hackathon** (por restrição de tempo, não por
desconhecimento): next-intl (só há uma língua no momento), TanStack Pacer/Store,
nuqs, Web Push nativo (VAPID + service worker), CRUD completo de bairros, histórico de
alertas, USSD real via operadora/agregador pago.

## 4. Modelo de dados

```prisma
enum NivelAgua {
  SECO
  TORNOZELO
  JOELHO
  CINTURA
  PERIGO
}

model Bairro {
  id           String       @id @default(cuid())
  nome         String       @unique
  nivel        NivelAgua    @default(SECO)
  atualizadoEm DateTime     @updatedAt
  subscricoes  Subscricao[]
}

model Subscricao {
  id       String @id @default(cuid())
  userId   String
  bairroId String
  bairro   Bairro @relation(fields: [bairroId], references: [id])
  @@unique([userId, bairroId])
}
```

O modelo `User` já existe via Better Auth — não é recriado aqui.

## 5. Fluxo principal (ponta a ponta)

```
Sensor simulado (setInterval)  OU  Admin força nível  OU  Simulador USSD
                    ↓
        Server Action reportarNivel(bairroId, nivel)
                    ↓
        Prisma actualiza Bairro.nivel
                    ↓
        Se nivel === PERIGO → POST https://ntfy.sh/<topico>
                    ↓
        Browsers com EventSource aberto (SSE) recebem o evento
                    ↓
        Banner vermelho aparece em tempo real na Home
```

## 6. Ecrãs

- **`/` (Home / User)** — lista de bairros com badge colorido por nível, botão
  "Subscrever" por bairro, banner de alerta em tempo real.
- **`/admin`** — botão "Forçar PERIGO" por bairro. Sem autenticação extra (só para demo).
- **`/simulador`** — mockup de ecrã de telemóvel; campo "número remetente" (texto livre,
  qualquer formato) + "mensagem"; comandos tipo `ALERTA <BAIRRO> <NIVEL>`, `SUB <BAIRRO>`,
  `STATUS`; resposta devolvida como texto simulando SMS recebido.

## 7. Riscos e mitigação

| Risco | Mitigação |
|---|---|
| ntfy.sh indisponível durante o pitch | Testar o tópico 10 min antes; ter o botão `/admin` como fallback visual mesmo sem notificação a chegar |
| Simulador de sensor não gera PERIGO a tempo | Botão manual em `/admin` sempre disponível como plano B ao vivo |
| Tempo insuficiente para o simulador USSD | É o último item da lista de prioridades — corta sem dó se faltar tempo |

## 8. Roadmap pós-hackathon (mencionar no pitch como "próximos passos")

- Vincular sessão anónima a email/senha (`onLinkAccount` do Better Auth — já suportado, só falta o ecrã)
- Push nativo real (VAPID + service worker) em vez de SSE
- USSD real via agregador (Africa's Talking) para chegar a telefones sem internet de verdade
- next-intl para línguas locais além do português
- CRUD completo de bairros + histórico de alertas + província como filtro geográfico
- Ingestão real de sensores de nível de água (hardware IoT)
