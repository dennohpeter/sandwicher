import { Context, Markup, Telegraf } from 'telegraf';
import { config } from '../config';

import { normalizeMessage } from "../helpers/telegram";

//create an instance of telegraf
const bot = new Telegraf(config.BOT_TOKEN);

bot.use(async (ctx: Context, next) => {

    try {
        let userId = ctx.message?.from.id || '';
        if (config.WHITELISTED_USERS.includes(userId.toString())) {
            await next();
            return;
        } else {
            return ctx.reply('You are not allowed to use this bot');
        }
    } catch (error) {
        console.log(error);
    }

});

/**
 * 
 * @param message the message to be sent to telegrams
 */
const sendMessage = async (message: string) => {
    try {
        for (const id of config.WHITELISTED_USERS) {
            await bot.telegram.sendMessage(id, normalizeMessage(message), {
                parse_mode: 'MarkdownV2',
                disable_web_page_preview: true,
            });
        }
    } catch (error) {
        console.error(error);
    }
};

export { bot, sendMessage };
