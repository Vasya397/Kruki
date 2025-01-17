import { Telegraf, Markup } from "telegraf";

const token = "7919809731:AAHR9IPjbFtZondrgGKtZrP5d6L_b_vsTvA";

const bot = new Telegraf(token);

bot.start((ctx) => {
  ctx.reply("Привет, давай изучать крюки! Вызовите эту команду /Izuchat_Kruki");
});

bot.command("Izuchat_Kruki", (ctx) => {
  ctx.reply("Что это за крюк");
});

bot.on("message", (ctx) => {
  ctx.reply("Неправильный ответ");

  console.log("Сообщение юзера:", ctx.message.sticker);
});

bot.launch();
