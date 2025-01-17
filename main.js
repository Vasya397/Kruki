import { Telegraf, Markup } from "telegraf";

const STICKER_ID = 'CAACAgIAAxkBAAELshlnijBYb5muDGZjYrpaBeDgiCulVQACfwoBAAHsKUhIgGGW2YO3xco2BA';
const token = "7919809731:AAHR9IPjbFtZondrgGKtZrP5d6L_b_vsTvA";

const bot = new Telegraf(token);

bot.command('Izuchat Kruki', (ctx) => {
    ctx.replyWithSticker(STICKER_ID);
    ctx.reply("Что это за крюк");
});

bot.start((ctx) => {
    return ctx.reply(
        'Привет, давай изучать крюки!',
        Markup.inlineKeyboard([
            Markup.button.callback("Пройти тест", "like"),
        ])
    )
})

bot.on("message", (ctx) => {
    ctx.reply("Неправильный ответ");

    console.log("Сообщение юзера:", ctx.message.sticker);
});

bot.launch();
