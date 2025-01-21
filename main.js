import { Telegraf, Markup } from "telegraf";
import baza from "./baza.json" assert { type: "json" };
import shuffle from "./shuffle.js";

const token = "7919809731:AAHR9IPjbFtZondrgGKtZrP5d6L_b_vsTvA";

const bot = new Telegraf(token);

bot.start((ctx) => {
  return ctx.reply("Привет, давай изучать крюки!", {
    reply_markup: {
      inline_keyboard: keyboard,
    },
  });
});

const keyboard = [[{ text: "Пройти тест", callback_data: "button_click" }]];

const userProgress = {}

bot.on("callback_query", (ctx) => {
  const userId = ctx.from.id;
  const buttonData = ctx.callbackQuery.data;

  if (userProgress[userId] === undefined) {
    userProgress[userId] = 0;
  }

  if (buttonData === 'true_answer') {
    userProgress[userId]++;
  }
  if (buttonData === 'false_2') {
    userProgress[userId]++;
  }
  if (buttonData === 'false_3') {
    userProgress[userId]++;
  }
  if (buttonData === 'false_4') {
    userProgress[userId]++;
  }


  if (userProgress[userId] < baza.length) {
    sendQuestion(ctx, userId);
  } else {
    ctx.reply("Тест завершен!");
    delete userProgress[userId];
  }
});

function sendQuestion(ctx, userId) {
  const question = baza[userProgress[userId]];
  const answer = [
    { text: question.answer[0], callback_data: 'true_answer' },
    { text: question.answer[1], callback_data: 'false_2' },
    { text: question.answer[2], callback_data: 'false_3' },
    { text: question.answer[3], callback_data: 'false_4' }
  ]
  const mixer = shuffle(answer)
  ctx.replyWithSticker(question.sticker);
  ctx.reply(question.text,
    {
      reply_markup: {
        inline_keyboard: [
          mixer
        ]
      }
    }
  )
}

bot.launch();