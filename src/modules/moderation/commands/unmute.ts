import * as Discord from "discord.js";

var { muted } = require("../../../roles.json");

module.exports.run = async (message: Discord.Message) => {
  message.delete();

  if (message.mentions.users.size == 0) {
    message
      .reply("Please mention the user you want to unmute.")
      .then((msg: Discord.Message) => msg.delete({ timeout: 10 * 1000 }));
    return;
  }

  if (
    !message.guild.members
      .get(message.mentions.users.first().id)
      .roles.has(muted)
  ) {
    message
      .reply("This user is not muted.")
      .then((msg: Discord.Message) => msg.delete({ timeout: 10 * 1000 }));
    return;
  }

  message.guild.members
    .get(message.mentions.users.first().id)
    .roles.remove(muted)
    .then(() => {
      message
        .reply(`Successfully unmuted **${message.mentions.users.first().tag}**`)
        .then((msg: Discord.Message) => msg.delete({ timeout: 10 * 1000 }));
    });
};

module.exports.config = {
  name: "unmute",
  description: "Unmutes a user.",
  permLevel: 2
};
