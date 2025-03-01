import { Telegraf } from "telegraf";

const token = "7919809731:AAHR9IPjbFtZondrgGKtZrP5d6L_b_vsTvA";
const bot = new Telegraf(token);

function Lesson_1(ctx, buttonData) {

    if (buttonData === "lesson_1") {
        ctx.reply('УРОК ПЕРВЫЙ.\nПри рассматривании отдельно каждаго знамени в современных певческих книгах можно увидеть, что оно состоит, кроме основного (тернаго) знамени, из (красных) помет и особых (черных же) знаков, находящихся при знаменах. Прежде всего рассмотрим, что такое помета.',
            {
                reply_markup: {
                    inline_keyboard: [[{ text: "Дальше", callback_data: "Further_1_1" }]],
                },
            }
        );
    }

    if (buttonData === "Further_1_1") {
        return ctx.reply(
            'ПОМЕТА.\nСлово „помета" происходить от глагола „помечать", ею помечается звуковая высота каждаго знамени. Красныя (киноварныя) пометы вошли в употребление в позднейшее время, а именно в XVII веке. Певцы древних времен исполняли песнопьния по основному (черному) знамени без красных помет, так как основное знамя имеет свои особые признаки, дающие ясное представление о высоте звука, изображеннаго знамением. Об этих признаках будеть говориться в своём месте. Помета же служить вспомогательным указанием высоты звуков.',
            {
                reply_markup: {
                    inline_keyboard: [[{ text: "Дальше", callback_data: "Further_1_2" }]],
                },
            }
        );
    }

    if (buttonData === "Further_1_2") {
        return ctx.replyWithPhoto('https://i.yapx.ru/YYaeC.png', {
            caption: 'Вот такие пометы бывают!',
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'Дальше', callback_data: 'Further_1_3' }
                    ]
                ]
            }
        });
    }

    if (buttonData === "Further_1_3") {
        return ctx.replyWithPhoto('https://i.yapx.ru/Yd4kV.png',{
            caption: 'Пометы составляли начала полных слов, употреблявшихся в педагогике пения, современной происхождению самих помет. Эти пометы называются „степенными", потому что указывают степень высоты звука.',
                reply_markup: {
                    inline_keyboard: [[{ text: "Дальше", callback_data: "Further_1_4" }]],
                },
            }
        );
    }

    if (buttonData === "Further_1_4") {
        return  ctx.replyWithPhoto('https://i.yapx.ru/YcvvV.png', {
            caption: 'Название степеных помет.\nПометы эти пишутся с левой стороны знамён (крюков) и бывает при каждом знамени не более одной пометы, будет ли само знамя обозначать один или несколько звуков. Причем помета указывает высший звук в знамени.',
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'Дальше', callback_data: 'Further_1_5' }
                    ]
                ]
            }
        });
    }

    if (buttonData === "Further_1_5") {
        return ctx.replyWithPhoto('https://i.yapx.ru/YeR0f.png', {
            caption:'Другие пометы',
                reply_markup: {
                    inline_keyboard: [[{ text: "Дальше", callback_data: "Further_1_6" }]],
                },
            }
        );
    }

    if (buttonData === "Further_1_6") {
        return ctx.replyWithPhoto('https://i.yapx.ru/YfGW7.png', {
            caption:'Особые знаки \nОни приставляются к знаменам.',
                reply_markup: {
                    inline_keyboard: [[{ text: "Дальше", callback_data: "Further_1_7" }]],
                },
            }
        );
    }

    if (buttonData === "Further_1_7") {
        return ctx.replyWithPhoto('https://i.yapx.ru/YefRA.png', {
            caption:'Первый урок окончен!!!) \nТы большой молодец!!! Продолжай в том же духе! Это табличка со всеми пометами. Для закрепления урока просмотри его ещё раз! Также мы советуем пройти тест к этому уроку или ты можешь пройти следущий урок) ',
                reply_markup: {
                    inline_keyboard: [[{ text: "Уроки", callback_data: "lessons" },{ text: "Пройти тест", callback_data: "button_test" }]],
                },
            }
        );
    }
};

export default Lesson_1;