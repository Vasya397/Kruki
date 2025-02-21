import { Telegraf } from "telegraf";

function Lesson_2(ctx, buttonData) {

    if (buttonData === "lesson_2") {
        ctx.reply('УРОК Второй.\n',
            {
                reply_markup: {
                    inline_keyboard: [[{ text: "Дальше", callback_data: "Further_1_1" }]],
                },
            }
        );
    }
};

export default Lesson_2;