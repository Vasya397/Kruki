import { Telegraf, Markup } from "telegraf";
import baza from "./baza.json" assert { type: "json" };
import shuffle from "./shuffle.js";
import answerStik from "./answerStik.json" assert { type: "json" };
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const token = "7919809731:AAHR9IPjbFtZondrgGKtZrP5d6L_b_vsTvA";
const mongo_URL = "mongodb://localhost:27017/Kruki";
const bot = new Telegraf(token);

// Начало базы
let db;
async function connectDB() {
  try {
    const client = new MongoClient(mongo_URL);
    await client.connect();
    db = client.db("Kruki");
    console.log("✅ Успешное подключение к MongoDB");
  } catch (error) {
    console.error("Ошибка подключения к MongoDB:", error);
  }
}

async function saveTestResult(userId, correctAnswers) {
  try {
    const collection = db.collection("user_results");

    const existingUser = await collection.findOne({ userId });

    if (existingUser) {
      await collection.updateOne({ userId }, { $set: { correctAnswers } });
      console.log(`📄 Данные обновлены для пользователя ${userId}`);
    } else {
      await collection.insertOne({ userId, correctAnswers });
      console.log(`✅ Данные добавлены для пользователя ${userId}`);
    }
  } catch (error) {
    console.error("Ошибка сохранения данных в MongoDB:", error);
  }
}
// База данных

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
});

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

    saveTestResult(userId, numTrueAnswer);

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
      { text: question.answer[3], callback_data: "false_4" },
    ],
    [
      { text: question.answer[0], callback_data: "true_answer" },
      { text: question.answer[1], callback_data: "false_2" },
    ],
  ];
  const mixer0 = shuffle(answer[0]);
  const mixer1 = shuffle(answer[1]);
  ctx.replyWithSticker(question.sticker);
  setTimeout(() => {
    ctx.reply(question.text, {
      reply_markup: {
        inline_keyboard: [mixer1, mixer0],
      },
    });
  }, 300);
}

(async () => {
  await connectDB();
  bot.launch();
  console.log("🤖 Бот запущен!");
})();
