require("dotenv").config();

const {
  REST,
  ROUTES,
  ApplicationCommandOptionType,
  ApplicationCommand,
} = require("discord.js");
const { Routes } = require("discord-api-types/v10");

const commands = [
  {
    name: "add",
    description: "adds two numbers",
    options: [
      {
        name: "first-number",
        description: "the first number",
        type: ApplicationCommandOptionType.Number,
        choices: [
          {
            name: "one",
            value: 1,
          },
          {
            name: "two",
            value: 2,
          },
          {
            name: "three",
            value: 3,
          },
        ],
        required: true,
      },
      {
        name: "second-number",
        description: "the first number",
        type: ApplicationCommandOptionType.Number,
        required: true,
      },
    ],
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
(async () => {
  try {
    console.log("Registering slash commands...");
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log("Slash commands were registered successfully!");
  } catch (error) {
    console.log(`there was an error: ${error}`);
  }
})();
