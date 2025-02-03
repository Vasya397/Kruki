import { Telegraf } from "telegraf";

const token = "7919809731:AAHR9IPjbFtZondrgGKtZrP5d6L_b_vsTvA";
const bot = new Telegraf(token);

function Lesson_1(ctx, buttonData) {

    if (buttonData === "lesson_1") {
        ctx.reply('УРОК ПЕРВЫЙ.\nПри рассматривании отдельно каждаго знамени в современных певческих книгах можно увидеть, что оно состоит, кроме основного (тернаго) знамени, из (красных) помет и особых (черных же) знаков, находящихся при знаменах. Прежде всего рассмотрим, что такое помета.',
            {
                reply_markup: {
                    inline_keyboard: [[{ text: "Дальше", callback_data: "Further_1" }]],
                },
            }
        );
    }

    if (buttonData === "Further_1") {
        return ctx.reply(
            'ПОМЕТА.\nСлово „помета" происходить от глагола „помечать", ею помечается звуковая высота каждаго знамени. Красныя (киноварныя) пометы вошли в употребление в позднейшее время, а именно в XVII веке. Певцы древних времен исполняли песнопьния по основному (черному) знамени без красных помет, так как основное знамя имеет свои особые признаки, дающие ясное представление о высоте звука, изображеннаго знамениемь. Об этих признаках будеть говориться в своём месте. Помета же служить вспомогательным указаниемь высоты звуков.',
            {
                reply_markup: {
                    inline_keyboard: [[{ text: "Дальше", callback_data: "Further_2" }]],
                },
            }
        );
    }

    if (buttonData === "Further_2") {
        return ctx.replyWithPhoto('https://i.yapx.ru/YYaeC.png', {
            caption: 'Вот такие пометы бывают!',
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'Дальше', callback_data: 'Further_3' }
                    ]
                ]
            }
        });
    }

    if (buttonData === "Further_3") {
        return ctx.reply(
            'Пометы составляли начала полных слов, употреблявшихся в педагогике пения, современной происхождению самих пометь.\n Г - от слова гораздо низко;\n H — от слова низко;\n C - от слова средним гласом\n м - от слова мрачно\n п - от выражения повыше мрачнаго согласия\n п - от слова высоко\n Эти помёты называются „степенными", потому что указывают степень высоты звука.',
            {
                reply_markup: {
                    inline_keyboard: [[{ text: "Дальше", callback_data: "Further_4" }]],
                },
            }
        );
    }

    if (buttonData === "Further_4") {
        return ctx.reply(
            '',
            {
                reply_markup: {
                    inline_keyboard: [[{ text: "Дальше", callback_data: "Further_5" }]],
                },
            }
        );
    }
};

export default Lesson_1;