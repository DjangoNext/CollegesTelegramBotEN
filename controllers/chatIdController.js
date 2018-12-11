ChatId = require('../models/chatId');

exports.new = function (chatId, status) {

    ChatId.findOne({ chatId: chatId }, function (err, adventure) {
        if (err) { return console.log("err", err) }
        console.log(adventure);
    });

    let contact = new ChatId();
    contact.chatId = chatId
    contact.status = status || 1
// save the contact and check for errors
    contact.save(function (err) {
        if (err) { return console.log('error', err) }
        console.log('New chatId')
    });
};

exports.get = function (chatId, status) {
    ChatId.get(function (err, chatIds) {
        if (err) { return console.log('error', err); }
        console.log(chatIds);
    });
};