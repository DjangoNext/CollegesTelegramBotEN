const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer'); // v1.0.5
const upload = multer(); // for parsing multipart/form-data

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const config = {
  port: 2020
}

let lastUserChatId = ""

// replace the value below with the Telegram token you receive from @BotFather
const token = '723797921:AAHcpj_LBdmJv247T2FsnqrLIRl_tgOUB2w';
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];

  bot.sendMessage(chatId, chatId);
});

app.post(`/createorderphone`, upload.array(), (req, res) => {
  const { body } = req
  if (lastUserChatId) {
    let str = ''
    str += `Имя формы: ${body.formname}\n` || ''
    str += `Телефон: ${body.phone}\n` || ''
    str += `Сообщение: ${body.message}\n` || ''
    str += `Язык: ${body.locale}\n` || ''
    bot.sendMessage(lastUserChatId, str)
  }
  res.send('OK')
});

app.listen(config.port, function () {
  console.log(`Example app listening on port ${config.port}!`);
});

bot.onText(/\/ras (\d+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];

  lastUserChatId = msg.chat.id

  bot.sendMessage(chatId, 'Погоди, спрошу у сервера...')

  setTimeout(()=> {bot.sendMessage(chatId, `Пример расписания для ${resp} группы:
  Понедельник:
    - Физ-ра
    - Алгебра
    - Химия
    - Английский
  Вторник:
    - Казахский язык
    - Русская литература
    - Физика
  Среда:
    - 
    - НВП
    - История
    - Казахская литература
  Четверг:
    - Обществознание
    - Алгебра
    - Физ-ра
    - Русский язык
  Пятница:
    - Казахский язык
    - Геометрия
    - География
    - Химия`)}, 1000)
})

bot.onText(/\/commands/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];

  lastUserChatId = msg.chat.id

  bot.sendMessage(chatId,
    `Список возможных команд:
  /start - Запускает бота
  /raspisanie <номер_группы> - узнать расписание на неделю у вашей группы`);
});

// Listen for any kind of message. There are different kinds of
// messages.
// bot.on('message', (msg) => {
//   const chatId = msg.chat.id;

//   // send a message to the chat acknowledging receipt of their message
//   bot.sendMessage(chatId, "serfges");
// });