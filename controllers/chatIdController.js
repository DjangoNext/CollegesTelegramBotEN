ChatId = require('../models/chatId');

exports.new = function (chatId, status) {

    ChatId.findOne({ chatId: chatId }, function (err, adventure) {
        if (err) { return console.log("err", err) }
        if(!adventure) {
            let contact = new ChatId();
            contact.chatId = chatId
            contact.status = status || 1
            contact.save(function (err) {
                if (err) { return console.log('error', err) }
                console.log('New chatId!')
            });
        } else {
            console.log('Exist!');
        }
    });

};

exports.get = function (callback) {
    ChatId.get(function (err, chatIds) {
        if (err) { return console.log('error', err); }
        callback(chatIds);
    });
};