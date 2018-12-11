const mongoose = require('mongoose');

const chatIdSchema = mongoose.Schema({
    status: Number,
    chatId: Number,
    create_date: {
        type: Date,
        default: Date.now
    }
});
// Export Contact model
const ChatId = module.exports = mongoose.model('chatId', chatIdSchema);

module.exports.get = function (callback, limit) {
    ChatId.find(callback).limit(limit);
}