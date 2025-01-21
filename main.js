import { Telegraf, Markup } from "telegraf";
import baza from "./baza.json" assert { type: "json" };

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

const userProgress = {};

bot.on("callback_query", (ctx) => {
  const userId = ctx.from.id;
  userProgress[userId] = 0;

  sendQuestion(ctx, userId);
});

let numAnswer = 0;

bot.on("text", (ctx) => {
  const userId = ctx.from.id;

  const userAnswer = ctx.message.text;
  const currentQuestionIndex = userProgress[userId];
  const currentQuestion = baza[currentQuestionIndex];

  if (currentQuestion.answer.includes(userAnswer)) {
    userProgress[userId] + 1;
    numAnswer++;
  } else {
    userProgress[userId] + 1;
  }

  if (userProgress[userId] !== undefined) {
    userProgress[userId]++;

    if (userProgress[userId] < baza.length) {
      sendQuestion(ctx, userId);
    } else {
      ctx.reply(`Ты ответил на ${numAnswer} из ${baza.length}`);
      delete userProgress[userId];
    }
  }
});

function sendQuestion(ctx, userId) {
  const question = baza[userProgress[userId]];
  ctx.reply(question.text);
  ctx.replyWithSticker(question.sticker);
}

bot.launch();
