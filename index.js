const Discord = require('discord.js')
const fs = require('node:fs');
const path = require('node:path');
const { Collection, Client, Events, ActivityType } = require('discord.js')
const client = new Discord.Client({intents: 3276799}) 
const { token } = require('./config.json')
const PREFIX = "!"

// path to commands
client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

client.on('ready', () => {
    console.log(`Le bot ${client.user.tag} est en ligne !`);
	client.user.setPresence({
		activities:[{
			name: ` discord.gg/Fairytailfr`, 
			type: ActivityType.Custom}], // Playing, Competing, Custom, Listening, Streaming, Watching
			
		status: "dnd", // online, offline, idle, dnd
	});
	
});

client.on('messageCreate', (message) => {
    if (message.content === '!test') {
      message.channel.send('pong');
    }
  });

client.login(token);