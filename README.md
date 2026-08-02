
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

programado inteiramente por Eduardo Reis 

Este projeto foi desenvolvido exclusivamente para uso institucional da Gostay. A reproducao, distribuicao ou utilizacao comercial por terceiros depende de autorizacao previa da empresa.
