const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
.setName("shiru")
.setDescription("Une commande pour rentre hommage à shiru."),
async execute(interaction) {
    await interaction.reply("Shiru est ");
},
};