import os
import logging
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup, InlineQueryResultArticle, InputTextMessageContent
from telegram.ext import Application, CommandHandler, InlineQueryHandler, ContextTypes

logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s", level=logging.INFO
)
logger = logging.getLogger(__name__)

# Yapılandırma
TOKEN = os.environ.get("BOT_TOKEN")
MINI_APP_URL = "https://kibble-sol.github.io/Kibble/"
PHOTO_URL = "https://kibble-sol.github.io/Kibble/assets/logo.png"

# Resmi Linkler
TWITTER_URL = "https://x.com/kibblesol"
TELEGRAM_URL = "https://t.me/kibblesol"
WEBSITE_URL = "https://kibble-sol.github.io/Kibble/"
CA_ADDRESS = "GÜNCELLENECEK_SOLANA_CA_ADRESI"

WELCOME_CAPTION = (
    "🐾 *Welcome to Kibble!* 🦴\n\n"
    "Step into the pack! Feed, play, and grow your companion in the Kibble ecosystem.\n\n"
    "Tap the button below to jump into the Mini App directly within Telegram!"
)

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    keyboard = [
        [InlineKeyboardButton("🚀 Launch Mini App", url=MINI_APP_URL)],
        [InlineKeyboardButton("🌐 Official Links", callback_data="show_links")]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)

    try:
        await update.message.reply_photo(
            photo=PHOTO_URL,
            caption=WELCOME_CAPTION,
            reply_markup=reply_markup,
            parse_mode="Markdown"
        )
    except Exception as e:
        logger.warning(f"Resimli mesaj gonderilemedi: {e}")
        await update.message.reply_text(
            text=WELCOME_CAPTION,
            reply_markup=reply_markup,
            parse_mode="Markdown"
        )

async def ca(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    text = (
        "📄 *Official Contract Address (CA):*\n\n"
        f"`{CA_ADDRESS}`\n\n"
        "⚠️ _Always verify links and addresses through official Kibble channels._"
    )
    await update.message.reply_text(text=text, parse_mode="Markdown")

async def links(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    text = (
        "🔗 *Official Kibble Links*\n\n"
        "Stay connected with the pack across our official channels:\n\n"
        f"• 🌐 [Website]({WEBSITE_URL})\n"
        f"• 🐦 [X (Twitter)]({TWITTER_URL})\n"
        f"• 💬 [Telegram Channel]({TELEGRAM_URL})"
    )
    keyboard = [
        [
            InlineKeyboardButton("🌐 Website", url=WEBSITE_URL),
            InlineKeyboardButton("🐦 X (Twitter)", url=TWITTER_URL)
        ],
        [InlineKeyboardButton("💬 Telegram", url=TELEGRAM_URL)]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text(text=text, reply_markup=reply_markup, parse_mode="Markdown", disable_web_page_preview=True)

async def inline_query(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    query = update.inline_query.query
    results = [
        InlineQueryResultArticle(
            id="kibble_app",
            title="🐾 Launch Kibble Mini App",
            description="Play and explore Kibble directly on Telegram!",
            thumbnail_url=PHOTO_URL,
            input_message_content=InputTextMessageContent(
                message_text=WELCOME_CAPTION,
                parse_mode="Markdown"
            ),
            reply_markup=InlineKeyboardMarkup([
                [InlineKeyboardButton("🚀 Launch Mini App", url=MINI_APP_URL)],
                [InlineKeyboardButton("🌐 Official Links", url=WEBSITE_URL)]
            ])
        )
    ]
    await update.inline_query.answer(results, cache_time=10)

def main() -> None:
    if not TOKEN:
        raise ValueError("BOT_TOKEN ortam değişkeni bulunamadı!")

    app = Application.builder().token(TOKEN).build()

    app.add_handler(CommandHandler("start", start))
    app.add_handler(CommandHandler("ca", ca))
    app.add_handler(CommandHandler("links", links))
    app.add_handler(CommandHandler("link", links))  # /link ve /links ikisini de yakalar
    app.add_handler(InlineQueryHandler(inline_query))

    logger.info("Kibble Bot başarıyla başlatıldı.")
    app.run_polling()

if __name__ == "__main__":
    main()

