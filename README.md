```markdown
# Quiz Promocional Gostay

<div align="center">

![Gostay Logo](https://via.placeholder.com/200x100/001629/FFCB3D?text=GOSTAY)

**Plataforma interativa de quiz para captação de leads e engajamento em eventos presenciais**

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat&logo=supabase&logoColor=white)](https://supabase.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

</div>

---

## Sobre o Projeto

O Quiz Promocional Gostay e uma aplicacao web desenvolvida para maximizar o engajamento de participantes durante eventos presenciais da Gostay. Atraves de uma experiencia gamificada e intuitiva, o sistema permite que visitantes participem de um quiz interativo com ranking em tempo real e premiacoes diarias.

### Destaques

- Experiencia fluida com fluxo otimizado via QR Code
- Gamificacao com sistema de pontuacao e rankings diarios
- Inteligencia comercial para captacao de leads qualificados
- Seguranca com protecao de rotas e dados dos participantes
- Responsivo para qualquer dispositivo

---

## Objetivos Estrategicos

| Objetivo | Descricao |
|----------|-----------|
| Captacao de Leads | Coleta de dados qualificados durante eventos presenciais |
| Engajamento | Interacao ativa com visitantes do estande |
| Competitividade | Sistema de ranking para incentivar participacao |
| Metricas | Estatisticas individuais e coletivas de desempenho |
| Conversao | Direcionamento para plataforma oficial da Gostay |

---

## Fluxo da Aplicacao

```
QR Code
   |
   v
Cadastro
   |
   v
Instrucoes
   |
   v
Quiz
   |
   v
Resultado Individual
   |
   v
Correcao das Questoes
   |
   v
Ranking Diario
   |
   v
Plataforma Oficial da Gostay
```

---

## Funcionalidades Principais

### Sistema de Cadastro

- Validacao completa de dados (nome, e-mail, telefone)
- Armazenamento seguro no Supabase
- Controle anti-duplicidade por dia
- Feedback visual de validacao em tempo real

### Autenticacao por Sessao

Sistema proprio de controle de fluxo utilizando Session Storage:

```
Cadastro -> Instrucoes -> Quiz -> Resultado -> Correcao -> Ranking
     ^                                                      |
     +-------- Redirecionamento automatico -----------------+
```

Rotas protegidas garantem que o usuario siga a sequencia correta, redirecionando automaticamente para o cadastro em caso de tentativa de acesso indevido.

### Sistema de Quiz

- Banco de 100 questoes sobre Harmonizacao Orofacial
- Apresentacao dinamica e randomizada
- Temporizador por questao
- Calculo automatico de pontuacao
- Registro detalhado das respostas

### Resultado e Correcao

O sistema apresenta ao final do questionario:

- Quantidade de acertos e erros
- Tempo total gasto
- Percentual de desempenho

A correcao detalhada exibe:

- Enunciado completo de cada questao
- Resposta escolhida pelo participante
- Resposta correta com destaque visual
- Indicadores de acerto ou erro

### Ranking Diario

Criterios de classificacao:

1. Maior numero de acertos
2. Menor tempo de conclusao (desempate)

Destaques especiais:

- Top 3 do dia
- Posicao atual do participante
- Classificacao geral

---

## Estrutura do Banco de Dados

### Tabela: participantes

| Campo | Tipo | Descricao |
|-------|------|-----------|
| id | UUID | Identificador unico |
| nome | TEXT | Nome completo |
| email | TEXT | E-mail validado |
| telefone | TEXT | Telefone para contato |
| acertos | INTEGER | Quantidade de acertos |
| tempo_total | INTEGER | Tempo em segundos |
| data_cadastro | TIMESTAMP | Data da participacao |

---

## Regras de Negocio

### Controle de Participacao

- 1 tentativa por dia por participante
- Deteccao automatica de e-mail duplicado
- Redirecionamento inteligente para ranking

### Rankings Independentes

- Filtro automatico por data_cadastro
- Novo ranking a cada dia de evento
- Historico preservado sem necessidade de exclusao

### Gestao de Leads

```
Registros brutos:       Leads unicos apos filtro:
+-- Eduardo (Dia 1)     +-- Eduardo
+-- Eduardo (Dia 2)     +-- Marcelo
+-- Eduardo (Dia 3)     +-- Joao
+-- Marcelo (Dia 1)
+-- Joao (Dia 1)
```

---

## Stack Tecnologica

| Categoria | Tecnologias |
|-----------|-------------|
| Front-end | HTML5, CSS3, JavaScript (ES Modules) |
| Back-end | Supabase |
| Banco de Dados | PostgreSQL |
| Versionamento | Git, GitHub |

---

## Arquitetura do Projeto

```
quiz-gostay/
|
+-- assets/
|   +-- css/
|   |   +-- global.css          (Estilos globais e variaveis)
|   |   +-- index.css           (Pagina inicial e cadastro)
|   |   +-- quiz.css            (Interface do quiz)
|   |   +-- resultado.css       (Tela de resultados)
|   |   +-- correcao.css        (Correcao das questoes)
|   |   +-- ranking.css         (Ranking diario)
|   |
|   +-- js/
|   |   +-- config/
|   |   |   +-- supabase.js     (Configuracao do cliente)
|   |   +-- guards/
|   |   |   +-- protegerRotas.js (Protecao de fluxo)
|   |   +-- pages/
|   |   |   +-- cadastro.js     (Logica de cadastro)
|   |   |   +-- quiz.js         (Motor do quiz)
|   |   |   +-- resultado.js    (Calculo de desempenho)
|   |   |   +-- ranking.js      (Geracao de rankings)
|   |   +-- services/
|   |       +-- supabaseService.js (Comunicacao com BD)
|   |
|   +-- images/
|   |   +-- logo.png
|   |
|   +-- data/
|       +-- questions.js        (Banco de 100 questoes)
|
+-- index.html                  (Pagina inicial)
+-- quiz.html                   (Quiz interativo)
+-- resultado.html              (Resultado individual)
+-- correcao.html               (Correcao detalhada)
+-- ranking.html                (Ranking diario)
+-- README.md                   (Documentacao)
```

### Separacao de Responsabilidades

```
Pages -> Services -> Supabase
```

- Pages: controlam a interface e eventos do usuario
- Services: concentram toda comunicacao com o banco de dados
- Guards: responsaveis pela protecao das rotas
- Config: configuracao do cliente Supabase
- Data: armazenamento das perguntas do quiz

Essa organizacao facilita manutencao, escalabilidade e reutilizacao de codigo.

---

## Seguranca Implementada

| Medida | Implementacao |
|--------|---------------|
| Validacao de Input | Sanitizacao de dados do formulario |
| Protecao de Rotas | Guards por Session Storage |
| Autenticacao | Controle de sessao por fluxo |
| Anti-duplicidade | Restricao diaria por e-mail |
| RLS Supabase | Politicas de acesso ao banco |

---

## Possiveis Melhorias Futuras

- Painel administrativo para gestao de eventos
- Dashboard com metricas em tempo real
- Exportacao de leads em formato CSV e Excel
- Sistema de QR Code unico por participante
- Integracao com ferramentas de CRM
- Ranking em tempo real utilizando Supabase Realtime
- Area administrativa para gerenciamento das perguntas
- Sistema de multiplos eventos sem alteracoes no codigo

---

## Desenvolvedor

Projeto desenvolvido como solucao tecnologica para acoes promocionais da Gostay, com foco em experiencia do usuario, geracao de leads qualificados e gestao de rankings em eventos presenciais.

---

## Licenca

Copyright (c) Gostay. Todos os direitos reservados.

Este projeto foi desenvolvido exclusivamente para uso institucional da Gostay. A reproducao, distribuicao ou utilizacao comercial por terceiros depende de autorizacao previa da empresa.
```
