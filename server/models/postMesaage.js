import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String],
        default: [],
    },
    // New comments are { _id, authorId, name, text, createdAt }; older ones are plain "Name : text" strings.
    comments: {
        type: [mongoose.Schema.Types.Mixed],
        default: [],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;