const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("Information sur l'utilisateur"),
  async execute(interaction) {
    await interaction.reply(
      `Cette commande à été faite par ${interaction.user.username}, qui à rejoint le ${interaction.member.joinedAt}.`
    );
  },
};
