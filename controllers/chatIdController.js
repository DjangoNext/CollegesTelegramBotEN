ChatId = require('../models/chatId');

exports.new = function (chat_id, status) {
    ChatId.findOne({ chat_id: chat_id }, function (err, adventure) {
        if (err) { return console.log("err", err) }
        if(!adventure) {
            let contact = new ChatId();
            contact.chat_id = chat_id
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
        ChatId.deleteOne({ chatId: 200221422 }, function (err) {
      if (err) return handleError(err);
      // deleted at most one tank document
    });
};