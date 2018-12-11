const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const config = {
  port: 2020
}

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer'); // v1.0.5
const upload = multer(); // for parsing multipart/form-data

// const MongoClient = require('mongodb').MongoClient;
let mongoose = require('mongoose');
// const assert = require('assert');
// const url = 'mongodb://localhost:27017';
// const client = new MongoClient(url);

// Use connect method to connect to the Server
mongoose.connect('mongodb://localhost:27017/chatIDs');
var db = mongoose.connection;
const ChatIdController = require('./controllers/chatIdController')

const token = '723797921:AAHcpj_LBdmJv247T2FsnqrLIRl_tgOUB2w';
const bot = new TelegramBot(token, {polling: true});

  // 
  // Server Api
  // 

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.post(`/createorderphone`, upload.array(), (req, res) => {
    const { locale, phone, message } = req.body
    let str = 'Новая заявка на перезвон, данные:\n'
    // str += `*Имя формы*: ${body.formname}\n` || ''
    str += locale  ? `*Язык*:  ${locale}\n` : ''
    str += phone   ? `*Телефон*:  ${phone}\n` : ''
    str += message ? `*Сообщение*:  ${message}\n` : ''

    ChatIdController.get(users => {
      users.forEach(user => {
        bot.sendMessage(user.chat_id, str, { parse_mode: "markdown" })
      })
    })
    res.send('OK')
  });

  app.listen(config.port, function () {
    console.log(`Example app listening on port ${config.port}!`);
  });

  // 
  // Bot
  // 

  bot.onText(/\/echo (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[1];
    console.log(msg);
    // bot.editMessageReplyMarkup({}, {
    //   chat_id: msg.chat.id,
    //   message_id: msg.message_id
    // })
    let str = `[inline *mention* of a user](tg://user?id=123456789), _${chatId}_`
    bot.sendMessage(chatId, str, { parse_mode: "markdown" })
  });

  bot.onText(/\/new/, (msg, match) => {
    const chatId = msg.chat.id;
    ChatIdController.new(chatId)
    bot.sendMessage(chatId, `Ваш аккаунт создан, ${chatId}`);
  })

  bot.onText(/\/ras (\d+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[1];

    bot.sendMessage(chatId, `Погоди, спрошу у сервера...\nКстати, твой ID чата: ${chatId}`)

    setTimeout(()=> {bot.sendMessage(chatId, `Пример расписания для ${resp} группы:
    *Понедельник*:
      _Физ-ра_
      _Алгебра_
      _Химия_
      _Английский_
    *Вторник*:
      _Казахский язык_
      _Русская литература_
      _Физика_
    *Среда*:
      __
      _НВП_
      _История_
      _Казахская литература_
    *Четверг*:
      _Обществознание_
      _Алгебра_
      _Физ-ра_
      _Русский язык_
    *Пятница*:
      _Казахский язык_
      _Геометрия_
      _География_
      _Химия_`, { parse_mode: "markdown" })}, 500)
  })

  bot.onText(/\/commands/, (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[1];

    bot.sendMessage(chatId,
      `Список возможных команд:
    /start - Запускает бота
    /ras <номер_группы> - узнать расписание на неделю у вашей группы`);
  });

  // Listen for any kind of message. There are different kinds of
  // messages.
  // bot.on('message', (msg) => {
  //   const chatId = msg.chat.id;

  //   // send a message to the chat acknowledging receipt of their message
  //   bot.sendMessage(chatId, "serfges");
  // });
