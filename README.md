# 🎨 Party Ticket Web

Aplicação Angular desenvolvida para consumir a Party Ticket API, com autenticação JWT, gerenciamento de usuários, eventos, convidados e compras.
A interface foi construída com foco em usabilidade e controle de acesso de acordo com o papel do usuário (ROLE_USER, ROLE_ADMIN).

## 🧰 Tecnologias utilizadas

* Angular 17
* TypeScript
* Angular
* JWT (JSON Web Token)
* HTML5 / CSS3

## 📦 Funcionalidades

- Login e cadastro de usuários com integração à API (JWT);
- Controle de acesso baseado em roles (Admin/User);
- CRUD completo de baladas/eventos, convidados e ingressos;
- Paginação e tabelas dinâmicas;
- Máscaras e validações;

## 🔐 Segurança

- Autenticação persistida via JWT armazenado no localStorage;
- Interceptor HTTP adicionando o token automaticamente em cada requisição;
- Bloqueio de ações (criar, editar, excluir) para usuários não administradores nas tabelas de eventos.

## 🚀 Como executar

Clone o repositório:

git clone https://github.com/JP3015/party-ticket-web.git
cd party-ticket-frontend


Instale as dependências:

```
npm install
```

Execute a aplicação:

```
ng serve
```

Acesse em: http://localhost:4200
