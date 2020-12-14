const { Schema, model } = require('mongoose');
const moment = require('moment');

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => moment(createdAtVal).format('MMM Do, YYYY at h:mm a')
    },
    username: {
      type: String,
      required: true
    },
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Reaction'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

ThoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
