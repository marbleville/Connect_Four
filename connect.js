const { Client, MessageEmbed } = require('discord.js');
const bot = new Client();
const token = 'ODcxODM5MDYzOTgyODkxMTE5.YQhJZg.hRJXaPNOw7qKVsRrQmNXXddJJAc';
const Prefix = '-';
let game; 

bot.on('ready', () => {
    console.log('Bot Online');
    bot.user.setActivity('Connect Four | -play');
})

bot.on('messageCreate', message => {
    let args = message.content.substring(Prefix.length).split(" ");
    if (!message.content.startsWith(Prefix)) return;

    switch(args[0]) {
        case 'play':
            game = new Game(message);
            game.showBoard();
            break;
    }
})

bot.on('messageReactionAdd', (messageReaction, user) => {
    if(user.bot)  return;
    const { message, emoji } = messageReaction;

    let col;
    if (emoji.name == '🔴') col = 0;
    if (emoji.name == '🟠') col = 1;
    if (emoji.name == '🟡') col = 2;
    if (emoji.name == '🟢') col = 3;
    if (emoji.name == '🔵') col = 4;
    if (emoji.name == '🟣') col = 5;
    if (emoji.name == '🟤') col = 6;

    game.board[game.lowest(col)][col] = '🟡';
    game.showBoard();
})

class Game {
    constructor(m) {
        this._board = [
            ['⚫', '⚫', '⚫', '⚫', '⚫', '⚫', '⚫'],
            ['⚫', '⚫', '⚫', '⚫', '⚫', '⚫', '⚫'],
            ['⚫', '⚫', '⚫', '⚫', '⚫', '⚫', '⚫'],
            ['⚫', '⚫', '⚫', '⚫', '⚫', '⚫', '⚫'],
            ['⚫', '⚫', '⚫', '⚫', '⚫', '⚫', '⚫'],
            ['⚫', '⚫', '⚫', '⚫', '⚫', '⚫', '⚫']
        ];
        this._p1 = m.member;
        this._p2 = undefined;
        this._channel = m.channel;
    }

    get board() {
        return this._board;
    }

    get channel() {
        return this._channel;
    }

    get p1() {
        return this._p1;
    }

    get p2() {
        return this._p2;
    }

    lowest(c) {
        for (var i = 5; i >= 0; i--) {
            if (this._board[i][c] == '⚫') {
                return i;
            }
        }
    }

    showBoard() {
        let c = 1; 
        let s = '';
        const Embed = new MessageEmbed();          
        this._board.forEach(row => {
            row.forEach(tile => {
                if (c % 7 == 0) s += tile + '\n\n';
                else s += tile + '-----';
                c++;
            })
        })
        Embed.addField('Current Board', s);
        this._channel.send(Embed).then(sentEmbed => {
            sentEmbed.react('🔴');
            sentEmbed.react('🟠');
            sentEmbed.react('🟡');
            sentEmbed.react('🟢');
            sentEmbed.react('🔵');
            sentEmbed.react('🟣');
            sentEmbed.react('🟤');
        })
    }

    test() {
        console.log(this._board);
    }
}

bot.login(token);
