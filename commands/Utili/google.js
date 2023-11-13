const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("google")
    .setDescription("Fait une recherche Google.")
    .addStringOption((option) =>
      option
        .setName("query")
        .setDescription("Le texte à rechercher sur Google")
        .setRequired(true)
    ),
  async execute(interaction) {
    const searchText = interaction.options.getString("query");

    // Remplace les espaces par des plus (+) pour l'URL Google.
    const searchQuery = searchText.replace(/ /g, "+");

    // Créé le lien de recherche Google.
    const googleSearchURL = `https://www.google.com/search?q=${searchQuery}`;
    await interaction.reply({ content: googleSearchURL });
  },
};
