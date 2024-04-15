# Challenge Bitcoins

Este um desafio  que mostra em tempo real os preços das criptomoedas usando a API [CoinGenko](https://www.coingecko.com/pt/api/documentation).

- [x] No topo abaixo do header conter 7 cards listado as moedas `bitcoin`, `cardano`, `cosmos`, `dacxi`, `ethereum`, `solana` e `terra luna 2` com seus respectivos preços em reais e dólar.
- [x] Ao pressionar um dos cards abrira um modal com a opção de filtra por uma data e hora a cotação em real e dólar da moeda.
- [x] Uma tabela com o nome, o preço e a variação (%) de 50 moedas por capitalização.
- [x] Aplicação atualiza os preços das moedas dos cards e da tabela a cada 5 minutos `MILI_SEC = 60000 * 5`.

## Estrutura de pastas

- `src`
  - `@types`: Tipagem dos objetos
  - `assets/`: Recursos de img
    - `img`: Upload de imagens
  - `components/`: Componentes da aplicação
    - `Dialog`: Componentes de dialog
  - `composables`: Funções encapsuladas reutilizáveis
  - `infra`: Axios Adapter
  - `libs`: Biblioteca auxiliar
  - `router`: Rotas das paginas
  - `services`: Gateway da aplicação
  - `views`: Páginas da aplicação
- `.eslintrc.json`: Configurações do ESLint
- `.prettierrc`: Configurações do Prettier
- `tailwind.config.js`: Configurações do tailwind
- `vite.config.js`: Configurações do vite

## Iniciando o projeto

```bash
# clone project
$ git clone https://github.com/helenapaixao/Challenge_Bitcoin.git

# go to folder
$ cd vue-coins

# install dependencies
$ yarn install

# serve with hot reload at localhost:4000
$ yarn dev
```

## Tecnologias

- [Vite](https://vitejs.dev/)
- [Vue3](https://vuejs.org/)
- [Vue-Router](https://router.vuejs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Tailwindcss](https://tailwindcss.com/)
- [Eslint](https://eslint.org/)
- [Eslint-plugin-vue](https://eslint.vuejs.org/)
- [Prettier](https://prettier.io/)
- [Husky](https://typicode.github.io/husky/#/)
- [Animate.css](https://animate.style/)
- [CoinGecko](https://www.coingecko.com/pt/api/documentation)

### Ferramentas recomendadas

- [VSCode](https://code.visualstudio.com/)
- [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Vite](https://marketplace.visualstudio.com/items?itemName=antfu.vite)

---

2024 - [github.com/helenapaixao](https://github.com/helenapaixao)
