# freefiresuper
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

Um módulo para Node.js, capaz de interagir com a API do jogo Garena Free Fire.


## Tecnologias

 - [Node.js](https://nodejs.org/en/)
 - [Needle](https://www.npmjs.com/package/needle)

##  Funcionalidades

- Pegar informações gerais sobre o jogo
- Pegar informações sobre jogadores e guildas

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

Pegando informações gerais sobre o jogo: 

```javascript
const freefire = require("freefiresuper");

freefire.version.overview().then((info)=>{
    console.log("Versão do APK: "+info.version);
    let serverStatus = info.isServerOpen ? "Sim" : "Não"
    console.log("Servidor Aberto? "+serverStatus);
});
```

Pegando informações de um jogador pelo seu ID:

```javascript
const freefire = require("freefiresuper");

freefire.player.searchPlayerById("123456789", "BR").then((player)=>{
    console.log("Apelido: "+player.nickname);
    console.log("Nível: "+player.level);
    console.log("Likes: "+player.liked);
    // Abrindo perfil do jogador e retornando todas as informações
    player.profile().then((profile)=>{
        console.log(profile);
    });
    // Checando se o jogador foi banido
    player.checkBanned().then((isBanned)=>{
        if(isBanned){
            console.log("O jogador está banido.");
        }else{
            console.log("Esse jogador não está banido.");
        }
    });
    // Pegando estatísticas do jogador
    player.stats("BR_CAREER").then((stats)=>{
        console.log(stats.soloStats)
    });
});
```
Pegando uma lista de jogadores pelo apelido:
```javascript
const freefire = require("freefiresuper");

freefire.player.searchPlayerByNickname("abcdefg", "BR").then((players)=>{
    // Lista de jogadores com apelidos parecidos
    console.log(players);
    // Percorrendo a lista e pegando o apelido de cada um
    for(player of players){
        console.log("Apelido: "+player.nickname)
    }
});
```
Pegando informações sobre uma guilda pelo ID:
```javascript
const freefire = require("freefiresuper");

freefire.guild.searchGuildById("2012676417", "BR").then((guild)=>{
    console.log("Nome da Guilda: "+guild.clanInfo.clanName);
    console.log("ID do Líder: "+guild.clanInfo.captainId);
});
```

## Documentação

#### `freefire.version.overview()`:
- Retorna informações gerais sobre o jogo.

#### `freefire.player.searchPlayerById(playerId, region)`:
- Retorna um objeto `Player` com informações sobre algum jogador.

#### `freefire.player.searchPlayerByNickname(nickname, region)`:
- Retorna uma lista contendo vários jogadores com apelidos parecidos

#### `freefire.guild.searchGuildById(guildId, region)`:
- Retorna um objeto com informações sobre uma guilda

#### Objeto `Player`:
##### `Player.stats(match_mode)`:
- Retorna as estatísticas do jogador
##### `Player.profile()`:
- Retorna todas as informações do jogador
##### `Player.checkBanned()`:
- Retorna um `Boolean` indicando se o jogador está banido ou não

Modos disponíveis para `player.stats(match_mode)`:
- BR_CAREER => Carreira Battle Royale
- BR_CLASSIC => Battle Royale Clássico
 - BR_RANKED => Battle Royale Ranqueado

## Autores

- [@shay444ofc](https://github.com/shay444ofc)
- [@neodouglas](https://github.com/neodouglas)
