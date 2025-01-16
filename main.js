import { Telegraf, Markup } from "telegraf"

const token = '7919809731:AAHR9IPjbFtZondrgGKtZrP5d6L_b_vsTvA'
const img = 'https://avatars.mds.yandex.net/i?id=5ae54804d32f39bf0d047ba7636851b3_l-10931123-images-thumbs&n=13'


const bot = new Telegraf(token)

bot.command('start', (ctx) => {
    ctx.reply(
        'Привет, давай изучать крюки!Вызовите эту команду "/Izuchat_Kruki"',
    )
})

bot.command('Izuchat_Kruki', (ctx) => {
    ctx.reply(
        'Что это за крюк'
    )
})

bot.launch()