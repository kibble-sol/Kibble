import os
import logging
from telegram import (
    Update,
    InlineKeyboardButton,
    InlineKeyboardMarkup,
    InlineQueryResultArticle,
    InputTextMessageContent,
    WebAppInfo
)
from telegram.ext import (
    Application,
    CommandHandler,
    InlineQueryHandler,
    ContextTypes
)

logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s", level=logging.INFO
)
logger = logging.getLogger(__name__)

BOT_TOKEN = os.getenv("BOT_TOKEN")
MINI_APP_URL = "https://kibble-sol.github.io/Kibble/"
COMMUNITY_URL = "https://t.me/kibblesol"
TWITTER_URL = "https://x.com/kibblesol"

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_first_name = update.effective_user.first_name

    caption = (
        f"🐾 *Welcome to Kibble, {user_first_name}!* 🐶\n\n"
        "Turning Solana trading volume into real-world food for stray animals.\n\n"
        "🥣 *Features:*\n"
        "• Tap to fill the food bowl & earn weekly points\n"
        "• Direct Solana Phantom integration\n"
        "• 100% on-chain transparency & shelter relief\n\n"
        "Tap below to enter the portal!"
    )

    keyboard = [
        [
            InlineKeyboardButton("🥣 Play Kibble Mini App", web_app=WebAppInfo(url=MINI_APP_URL))
        ],
        [
            InlineKeyboardButton("💬 Community", url=COMMUNITY_URL),
            InlineKeyboardButton("🐾 Twitter / X", url=TWITTER_URL)
        ]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)

    await update.message.reply_text(
        text=caption,
        reply_markup=reply_markup,
        parse_mode="Markdown"
    )

async def ca_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    ca_text = (
        "🐾 *$KIBBLE Official Contract Address:*\n\n"
        "`SOON_ON_LAUNCH_DAY`\n\n"
        "⚠️ *Safety Warning:* Always verify the mint authority is revoked. Never buy unofficial tokens!"
    )
    keyboard = [
        [InlineKeyboardButton("🥣 Launch Mini App", web_app=WebAppInfo(url=MINI_APP_URL))]
    ]
    await update.message.reply_text(
        text=ca_text,
        reply_markup=InlineKeyboardMarkup(keyboard),
        parse_mode="Markdown"
    )

async def inline_query(update: Update, context: ContextTypes.DEFAULT_TYPE):
    results = [
        InlineQueryResultArticle(
            id="kibble_share",
            title="🐾 Share Kibble Mini App",
            description="Invite friends to tap and feed stray animals on Solana!",
            thumbnail_url="https://kibble-sol.github.io/Kibble/maskot.jpg",
            input_message_content=InputTextMessageContent(
                message_text=(
                    "🐶 *FEED THE DOG. KIBBLE IS THE WAY.*\n\n"
                    "Join the weekly leaderboard and turn on-chain momentum into real animal food bowls! 🥣🐾"
                ),
                parse_mode="Markdown"
            ),
            reply_markup=InlineKeyboardMarkup([
                [InlineKeyboardButton("🥣 Play Now", web_app=WebAppInfo(url=MINI_APP_URL))],
                [InlineKeyboardButton("💬 Join Community", url=COMMUNITY_URL)]
            ])
        )
    ]

    await update.inline_query.answer(results, cache_time=1)

def main():
    if not BOT_TOKEN:
        raise ValueError("BOT_TOKEN ortam değişkeni bulunamadı!")

    app = Application.builder().token(BOT_TOKEN).build()

    app.add_handler(CommandHandler("start", start))
    app.add_handler(CommandHandler("kibble", start))
    app.add_handler(CommandHandler("ca", ca_command))
    app.add_handler(InlineQueryHandler(inline_query))

    logger.info("Kibble Bot başarıyla başlatıldı.")
    app.run_polling()

if __name__ == "__main__":
    main()

