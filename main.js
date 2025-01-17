import { Telegraf, Markup } from "telegraf";


const STICKER_ID = 'CAACAgIAAxkBAAELshlnijBYb5muDGZjYrpaBeDgiCulVQACfwoBAAHsKUhIgGGW2YO3xco2BA';
const token = "7919809731:AAHR9IPjbFtZondrgGKtZrP5d6L_b_vsTvA";

const bot = new Telegraf(token);

const keyboard = [
    [{ text: 'Пройти тест', callback_data: 'button_click' }]
];


bot.on('callback_query', (ctx) => {
    ctx.answerCbQuery();
    ctx.replyWithSticker(STICKER_ID);
    ctx.reply("Что это за крюк");
});

bot.start((ctx) => {
    return ctx.reply(
        'Привет, давай изучать крюки!',
        {
            reply_markup: {
                inline_keyboard: keyboard
            }
        },

    )
})

bot.launch();
