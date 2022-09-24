# SSO Frontend

> Este é um SSO (Sistema de Autenticação Única) que permite que os usuários acessem todos os meus sites utilizando apenas uma conta.

### Ajustes e melhorias

O projeto ainda está em desenvolvimento e as próximas atualizações estão no [Projeto](https://github.com/users/maycon-jesus/projects/7/views/5

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:
* Você instalou a versão mais recente do [Node.js](https://nodejs.org/en/)

## 🚀 Instalando sso-frontend

Para instalar o sso-frontend, siga estas etapas:

```bash
# Instalando as dependências
npm install

# Realizando o build da aplicação
npm run build
```

### Definindo as variáveis de ambiente

Após o build é preciso definir as variáveis de ambiente. Para isso crie um arquivo chamado `.env` e coloque o seguinte conteúdo:

```
NEXT_PUBLIC_BASE_URL_API=""
```

#### Como obter as variáveis de ambiente

- **NEXT_PUBLIC_BASE_URL_API**: Essa é a url da api, você pode instalar ela a partir desse repositório [sso-api](https://github.com/maycon-jesus/sso-api)

## ☕ Usando sso-frontend

Para usar o sso-frontend, siga estas etapas:

```bash
npm run start
```
    