import { Telegraf, Markup } from "telegraf";
import baza from "./baza.json" assert { type: "json" };
import shuffle from "./shuffle.js";
import answerStik from "./answerStik.json" assert { type: "json" };

const token = "7919809731:AAHR9IPjbFtZondrgGKtZrP5d6L_b_vsTvA";

const bot = new Telegraf(token);

bot.start((ctx) => {
  return ctx.reply("Привет, давай изучать крюки!", {
    reply_markup: {
      inline_keyboard: keyboard,
    },
  });
});

const keyboard = [[{ text: "Тесты", callback_data: "button_test" }]];

const userProgress = {};

let numTrueAnswer = 0;

bot.command("test", (ctx) => {
  return ctx.reply("Тесты", {
    reply_markup: {
      inline_keyboard: [[{ text: "Тест 1", callback_data: "button_click" }]],
    },
  });
})

bot.on("callback_query", (ctx) => {
  const userId = ctx.from.id;
  const buttonData = ctx.callbackQuery.data;

  if (buttonData === "button_test") {
    return ctx.reply("Тесты", {
      reply_markup: {
        inline_keyboard: [[{ text: "Тест 1", callback_data: "button_click" }]],
      },
    });
  }

  if (userProgress[userId] === undefined) {
    userProgress[userId] = 0;
  }

  if (buttonData === "true_answer") {
    userProgress[userId]++;
    numTrueAnswer++;
  }
  if (buttonData === "false_2") {
    userProgress[userId]++;
  }
  if (buttonData === "false_3") {
    userProgress[userId]++;
  }
  if (buttonData === "false_4") {
    userProgress[userId]++;
  }

  if (userProgress[userId] < baza.length) {
    sendQuestion(ctx, userId);
  } else {
    ctx.reply("Тест завершен!");

    if (numTrueAnswer >= 0 && numTrueAnswer <= 4) {
      ctx.reply(`Ты ответил на ${numTrueAnswer} из ${baza.length}`);
      ctx.replyWithSticker(answerStik.id_0_4);
    } else if (numTrueAnswer >= 5 && numTrueAnswer <= 7) {
      ctx.reply(`Ты ответил на ${numTrueAnswer} из ${baza.length}`);
      ctx.replyWithSticker(answerStik.id_5_7);
    } else if (numTrueAnswer >= 8 && numTrueAnswer <= 9) {
      ctx.reply(`Ты ответил на ${numTrueAnswer} из ${baza.length}`);
      ctx.replyWithSticker(answerStik.id_8_9);
    } else if (numTrueAnswer == 10) {
      ctx.reply(`Ты ответил на ${numTrueAnswer} из ${baza.length}`);
      ctx.replyWithSticker(answerStik.id_10);
    }
    delete userProgress[userId];
  }
});

function sendQuestion(ctx, userId) {
  const question = baza[userProgress[userId]];
  const answer = [
    [
      { text: question.answer[2], callback_data: "false_3" },
      { text: question.answer[3], callback_data: "false_4" },],
    [
      { text: question.answer[0], callback_data: "true_answer" },
      { text: question.answer[1], callback_data: "false_2" },]
  ];
  const mixer0 = shuffle(answer[0]);
  const mixer1 = shuffle(answer[1]);
  ctx.replyWithSticker(question.sticker);
  setTimeout(() => {
    ctx.reply(question.text, {
      reply_markup: {
        inline_keyboard: [
          mixer1,
          mixer0
        ],
      },
    });
  }, 300)
}

bot.launch();
