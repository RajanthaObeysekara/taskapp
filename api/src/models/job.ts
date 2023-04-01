import { InferSchemaType, Schema, model } from "mongoose";

const jobSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    jobType: {
        type: String,
        requrired: true,
        enum: ['PURCHASE', 'ORDER']
    },
    createdBy: {
        type: String,
        required: true
    },
    description:{
        type: String,
    }

}, { timestamps: true });

type Job = InferSchemaType<typeof jobSchema>;

export default model<Job>("Job", jobSchema)