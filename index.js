const needle = require("needle");
const core_data = require("./core/core.json");

async function getServerStatus(serverName) {
  let live = await needle("get", core_data.servers.live);
  let advance = await needle("get", core_data.servers.advance);
  let review = await needle("get", core_data.servers.review);

  switch (serverName) {
    case "live":
      return { isOn: live.statusCode != 503 };
    case "advance":
      return { isOn: advance.statusCode != 503 };
    case "review":
      return { isOn: review.statusCode != 503 };
  }
}

async function getServerStatusAll() {
  let live = await needle("get", core_data.servers.live);
  let advance = await needle("get", core_data.servers.advance);
  let review = await needle("get", core_data.servers.review);

  return {
    live: { isOn: live.statusCode != 503 },
    advance: { isOn: advance.statusCode != 503 },
    review: { isOn: review.statusCode != 503 },
  };
}

async function getVersionInfo() {
  let response = await needle("get", core_data.version.check);

  switch (response.body.news) {
    case "true":
      return {
        newVersionAvailable: true,
        currentVersion: response.body.last,
        newVersion: response.body.version,
      };
    case "false":
      return {
        newVersionAvailable: false,
        currentVersion: response.body.last,
      };
  }
}

function format_nick(body) {
  return {
    nickname: body.nick_atual,
    region: body.region,
    date: body.data,
    nickHist: body.nicks_anteriores,
  };
}

async function getPlayerInfo(playerId) {
  let nickRequest = await needle("get", core_data.player.nick + playerId);

  switch (nickRequest.statusCode) {
    case 200:
      data = format_nick(nickRequest.body);

      return {
        profile: {
          nickname: data.nickname,
        },
        account: {
          region: data.region,
          creationDate: data.date.includes("@") ? null : data.date,
        },
        history: {
          nicknames: data.nickHist,
        },
      };
    case 404 || 500:
      return {
        error: "invalid_uid",
      };
  }
}

module.exports = {
  getServerStatus,
  getServerStatusAll,
  getVersionInfo,
  getPlayerInfo,
};
