ChatId = require('../models/chatId');

exports.new = function (chatId, status) {
    let contact = new ChatId();
    contact.chatId = chatId
    contact.status = status || 1
// save the contact and check for errors
    contact.save(function (err) {
        if (err) { console.log('error', err) }
        console.log('New chatId')
    });
};

exports.get = function (chatId, status) {
    ChatId.get(function (err, chatIds) {
        if (err) {  console.log('error', err); }
        console.log(chatIds);
    });
    ChatId.deleteOne({ chatId: 200221422 }, function (err) {
      if (err) return handleError(err);
      // deleted at most one tank document
    });
};