# freefiresuper

Um módulo para Node.js, capaz de interagir com a API do jogo Garena Free Fire.


## Tecnologias

 - [Node.js](https://nodejs.org/en/)
 - [Needle](https://www.npmjs.com/package/needle)

##  Funcionalidades

- Pegar informações sobre algum jogador
- Pegar informações sobre a versão do jogo
- Pegar informações sobre os servidores do jogo


## Instalação

Instalando `freefiresuper` com npm:

```bash
  npm install freefiresuper
```

Instalando `freefiresuper` com yarn:

```bash
  yarn add freefiresuper
```
    
## Uso/Exemplos

Pegando uma nova versão caso ela exista: 

```javascript
const freefire = require("freefiresuper");

freefire.getVersionInfo().then((versionInfo)=>{
    if(versionInfo.newVersionAvailable == true){ 
        console.log(versionInfo.newVersion);
    }else{
        console.log(versionInfo.currentVersion);
    }
});
```

Pegando o nome de algum jogador usando o seu ID:

```javascript
const freefire = require("freefiresuper");

// Pegando o nome do jogador 123456789
freefire.getPlayerInfo("123456789").then((playerInfo)=>{
    console.log(playerInfo.profile.nickname);
});
```


## Documentação

#### `getVersionInfo()`:
- Retorna informações sobre a versão do jogo.

#### `getPlayerInfo(playerId)`:
- Retorna informações sobre algum jogador.

#### `getServerStatus(serverName)`:
- Retorna informações sobre algum servidor.s disponíveis!

### `getServerStatusAll()`
- Retorna a informação sobre todos os servidores.

## Autores

- [@shay444ofc](https://github.com/shay444ofc)
- [@neodouglas](https://github.com/neodouglas)


## Etiquetas

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)