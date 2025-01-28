import { Telegraf, Markup } from "telegraf";
import baza from "./baza.json" assert { type: "json" };
import shuffle from "./shuffle.js";
import answerStik from "./answerStik.json" assert { type: "json" };
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import Lesson_1 from './Lessons/Lesson_1.js'

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
  return ctx.reply("Привет, давай изучать крюки! Здесь имеется много уроков, пройдя которые вы узнаете много крюков. Проходи по уроку в день и ты увидишь результат!!!🎼🎹🎤", {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "Урок 1", callback_data: "lesson_1" },
          { text: "Урок 2", callback_data: "button_test" }
        ],
        [
          { text: "Урок 3", callback_data: "button_test" },
          { text: "Урок 4", callback_data: "button_test" }
        ],
        [
          { text: "Урок 5", callback_data: "button_test" },
          { text: "Урок 6", callback_data: "button_test" }
        ]
      ],
    },
  });
});

const userProgress = {};

let numTrueAnswer = 0;

bot.command("test", (ctx) => {
  return ctx.reply("Тесты", {
    reply_markup: {
      inline_keyboard: [[{ text: "Тест 1", callback_data: "button_click" }]],
    },
  });
});

bot.command("kruki", (ctx) => {
  return ctx.reply("КРЮКИ́ (зна­мё­на), зна­ки, без­ли­ней­ных пев­че­ских но­та­ций. Крю­ко­вая (по назв. од­но­го из осн. зна­ков – крю­ка), она же стол­по­вая, или зна­мен­ная, но­та­ция ве­дёт своё про­ис­хо­ж­де­ние от ран­не­ви­зан­тий­ской но­та­ции и яв­ля­ет­ся осн. фор­мой др.-рус. муз. пись­мен­но­сти. Её отд. зна­ки со­хра­ни­ли греч. на­зва­ния (напр., па­ра­клит). Боль­шин­ст­во зна­ков по­лу­чи­ло рус. на­зва­ния, свя­зан­ные с их внеш­ним ви­дом: пал­ка, стре­ла, за­пя­тая и т. п. В раз­ви­тии крю­ко­вой но­та­ции вы­де­ля­ют 3 пе­рио­да: ран­ний (11–14 вв.), сред­ний (15 – нач. 17 вв.) и позд­ний (с сер. 17 в.). Но­та­ция пер­вых 2 пе­рио­дов в со­че­та­нии с мо­лит­во­слов­ным тек­стом по­зво­ля­ет су­дить о рит­ме пес­но­пе­ний, но их зву­ко­вы­сот­ная со­став­ляю­щая не под­да­ёт­ся де­шиф­ров­ке. В 17 в. в но­та­ции поя­ви­лась ла­доз­ву­ко­ряд­ная оп­ре­де­лён­ность бла­го­да­ря ки­но­вар­ным по­ме­там, за­тем ту­ше­вым признáкам, что ны­не по­зво­ля­ет рас­шиф­ро­вы­вать зву­ко­вы­сот­ную ли­нию. Раз­ли­ча­ют бес­по­мет­ные, по­мет­ные, од­но­вре­мен­но по­мет­ные и при­знач­ные крю­ко­вые ру­ко­пи­си.")
});


bot.on("callback_query", (ctx) => {
  const userId = ctx.from.id;
  const buttonData = ctx.callbackQuery.data;
  Lesson_1(ctx, buttonData)

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

  if (buttonData === "button_click") {
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
