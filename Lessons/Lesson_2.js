import { Telegraf } from "telegraf";

function Lesson_2(ctx, buttonData) {

    if (buttonData === "lesson_2") {
        ctx.reply('УРОК ВТОРОЙ.\nВ этом уроке мы начнём изучать первые крюки. Но для начала нужно узнать как обозначается длительность звучания знамени.' ,
            {
                reply_markup: {
                    inline_keyboard: [[{ text: "Дальше", callback_data: "Further_2_1" }]],
                },
            }
        );
    }

    if (buttonData === "Further_2_1") {
        ctx.reply('Длительность.\nДлительность указавает как долго поётся знамя. Длительность можно прохлопать. Её мы будем обозначать так:\n4/4 - 4 хлопка\n1/2 - 2 хлопка\n1/4 - 1 хлопок\n1/8 - меньше 1 хлопка',
            {
                reply_markup: {
                    inline_keyboard: [[{ text: "Дальше", callback_data: "Further_2_2" }]],
                },
            }
        );
    }

    if (buttonData === "Further_2_2") {
        return ctx.replyWithPhoto('https://i.yapx.ru/YfG3z.png', {
            caption: 'Название знамени: Крюк; 1 звук c длительностью 1/2',
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'Дальше', callback_data: 'Further_2_3' }
                    ]
                ]
            }
        });
    }

    if (buttonData === "Further_2_3") {
        return ctx.replyWithPhoto('https://i.yapx.ru/YfG8O.png', {
            caption: 'Название знамени: Крюк с отсечкой; 1 звук c длительностью 1/4',
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'Дальше', callback_data: 'Further_2_4' }
                    ]
                ]
            }
        });
    }

    if (buttonData === "Further_2_4") {
        return ctx.replyWithPhoto('https://i.yapx.ru/Yf9cT.png', {
            caption: 'Название знамени: Крюк с задержкой; 1 звук c длительностью 4/4',
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'Дальше', callback_data: 'Further_2_5' }
                    ]
                ]
            }
        });
    }

    if (buttonData === "Further_2_5") {
        return ctx.replyWithPhoto('https://i.yapx.ru/Yf9e8.png', {
            caption: 'Название знамени: Крюк с ломкой; 2 звука вверх по 1/4',
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'Дальше', callback_data: 'Further_2_6' }
                    ]
                ]
            }
        });
    }

    if (buttonData === "Further_2_6") {
        return ctx.replyWithPhoto('https://i.yapx.ru/Yf9iA.png', {
            caption: 'Название знамени: Крюк с подчашием; 2 звука в вниз по 1/2',
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'Дальше', callback_data: 'Further_2_7' }
                    ]
                ]
            }
        });
    }

    if (buttonData === "Further_2_7") {
        return ctx.replyWithPhoto('https://i.yapx.ru/Yf9qK.png', {
            caption: 'Название знамени: Крюк с подвёрткой; 2 звука в вниз по 1/4',
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'Дальше', callback_data: 'Further_2_8' }
                    ]
                ]
            }
        });
    } 

    if (buttonData === "Further_2_8") {
        return ctx.replyWithPhoto('https://i.yapx.ru/Yf90P.png', {
            caption: 'Название знамени: Параклит; 1 звук в 1/2',
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'Дальше', callback_data: 'Further_2_9' }
                    ]
                ]
            }
        });
    }

    if (buttonData === "Further_2_9") {
        return ctx.replyWithPhoto('https://i.yapx.ru/Yf91H.png', {
            caption: 'Название знамени: Параклит с отсечкой; 1 звук в 1/4',
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'Дальше', callback_data: 'Further_2_10' }
                    ]
                ]
            }
        });
    }

    if (buttonData === "Further_2_10") {
        return ctx.replyWithPhoto('https://i.yapx.ru/Yf92z.png', {
            caption: 'Название знамени: Параклит с задержкой; 1 звук в 4/4',
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'Дальше', callback_data: 'Further_2_11' }
                    ]
                ]
            }
        });
    }

    if (buttonData === "Further_2_11") {
        return ctx.replyWithPhoto('https://i.yapx.ru/Yf94S.png', {
            caption: 'Название знамени: Параклит с подчашием; 2 звука вниз по 1/2',
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'Дальше', callback_data: 'Further_2_12' }
                    ]
                ]
            }
        });
    }

    if (buttonData === "Further_2_12") {
        return ctx.replyWithPhoto('https://i.yapx.ru/Yf94u.png', {
            caption: 'Название знамени: Параклит с подвёрткой; 2 звука вниз по 1/4',
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'Дальше', callback_data: 'Further_2_13' }
                    ]
                ]
            }
        });
    }

    if (buttonData === "Further_2_13") {
        return ctx.replyWithPhoto('https://i.yapx.ru/YgABc.png', {
            caption:'Второй урок окончен!!!) \nТы большой молодец!!! В этом уроке ты узнал 11 знамён) Это табличка со всеми знамёнами из этого урока. Для закрепления просмотри урок ещё раз! Также пройди тест к этому уроку, чтобы узнать как ты его запомнил!!!)',
                reply_markup: {
                    inline_keyboard: [[{ text: "Следущий урок", callback_data: "lessons" },{ text: "Пройти тест", callback_data: "button_test" }]],
                },
            }
        );
    }
};

export default Lesson_2;