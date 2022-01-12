const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    u: {type: String, unique: true, alias: 'username'},
    e: {type: String, trim: true, index:true, required: true, unique: true, alias: "email"},
    p: {type: String, required: true, alias: 'password'},
    status: {type: String, enum: ["Pending", "Active"], default: "Pending"},
    confirmationCode: {type: String, unique: true}
})

UserSchema.methods.isCorrectPassword = function(password, callback){
    bcrypt.compare(password, this.password, function(err, same) {
      if (err) {
        callback(err);
      } else {
        callback(err, same);
      }
    });
  }

UserSchema.pre('save', function(next) {
    // Check if document is new or a new password has been set
    if (this.isNew || this.isModified('password')) {
      // Saving reference to this because of changing scopes
      const document = this;
      bcrypt.hash(document.password, 10,
        function(err, hash) {
        if (err) {
          next(err);
        }
        else {
          document.password = hash;
          next();
        }
      });
    } else {
      next();
    }
  });

module.exports = mongoose.model('User', UserSchema)