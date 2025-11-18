# 🥩 Coxão do Santinho – Sistema de Controle de Estoque

Sistema desenvolvido para gerenciamento de **produtos**, **estoque mínimo**, **usuários**, e **movimentações de entrada e saída**, com histórico completo e fácil visualização.

---

## 🚀 Tecnologias Utilizadas

### Backend
- Node.js  
- Express  
- PostgreSQL  
- pg / pgAdmin  
- CORS  

### Frontend
- React.js  
- CSS Puro  
- Fetch API  

---

## 🗂️ Estrutura do Banco de Dados

Banco: **saep_db**

### Tabela: `usuarios`

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | SERIAL | Chave primária |
| nome | TEXT | Nome do usuário |
| email | TEXT | E-mail único |
| senha | TEXT | Senha do usuário |

---

### Tabela: `produtos`

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | SERIAL | Chave primária |
| nome | TEXT | Nome do produto |
| quantidade | INTEGER | Quantidade em estoque |
| estoque_minimo | INTEGER | Quantidade mínima necessária |

---

### Tabela: `movimentacoes`

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | SERIAL | Chave primária |
| produto_id | INTEGER | FK → produtos(id) |
| usuario_id | INTEGER | FK → usuarios(id) |
| tipo | TEXT | 'entrada' ou 'saida' |
| quantidade | INTEGER | Quantidade movimentada |
| data_movimentacao | TIMESTAMP | Data da ação |
| observacao | TEXT | Observação opcional |

---

## 🌱 Seeds Iniciais

Inclui:

- 3 usuários: Ana, Bruno e Carla  
- 3 produtos oficiais: modelos da “meia meia meia”  
- Movimentações iniciais de entrada, saída e devolução  

---

## ▶️ Como Rodar o Backend-Santinho

### 1️⃣ Instalar dependências
```bash
npm install

npm i express cors pg

