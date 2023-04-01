import { RequestHandler } from "express";
import job from "../models/job";
import JobBodyType from "../types/job";
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getJobs: RequestHandler = async (req, res, next) => {
    try {
        const jobs = await job.find().exec();
        res.status(200).json(jobs);
    } catch (error) {
        next(error);
    }
}

export const getJob: RequestHandler = async (req, res, next) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            throw createHttpError(400, 'Invalid job Id')
        }
        const selectedJob = await job.findById(req.params.id).exec();
        console.log(selectedJob)
        if (!selectedJob) {
            throw createHttpError(404, `Given Id- ${req.params.id} is not found in the data base`);
        }
        res.status(200).json(selectedJob);
    } catch (error) {
        next(error)
    }
}

export const createJob: RequestHandler<unknown, unknown, JobBodyType, unknown> = async (req, res, next) => {
    const { title, jobType, createdBy, description } = req.body
    try {
        const newJob = await job.create({
            title: title,
            jobType: jobType,
            createdBy: createdBy,
            description: description
        });
        res.status(200).json(newJob);
    } catch (error) {
        next(error);
    }
}
type jobTypes = 'PURCHASE' | 'ORDER'

interface jobUpdateParams {
    id: string
}

interface jobUpdateBody {
    title: string,
    jobType: jobTypes,
    createdBy: string,
    description: string
}

export const updateJob: RequestHandler<jobUpdateParams, unknown, jobUpdateBody, unknown> = async (req, res, next) => {
    const jobId = req.params.id;
    const newJobTitle = req.body.title;
    const newJobType = req.body.jobType;
    const newCreatedBy = req.body.createdBy;
    const newDescription = req.body.description

    try {
        if (!mongoose.isValidObjectId) {
            throw createHttpError(400, `Given job id - ${jobId} is not a valid id`)
        }
        if (!newJobTitle) {
            throw createHttpError(400, 'Job title is missing in the body')
        }
        if (!newJobType) {
            throw createHttpError(400, 'JobTitle is missing in the body')
        }
        if (!newCreatedBy) {
            throw createHttpError(400, 'CreatedBy is missing in the body')
        }
        if (!newDescription) {
            throw createHttpError(400, 'Description is missing in the body')
        }

        const updatingJob = await job.findById(jobId).exec();

        if (!updatingJob) {
            throw createHttpError('404', `Given Job id - ${jobId} is not found in the database`)
        }

        updatingJob.title = newJobTitle;
        updatingJob.jobType = newJobType;
        updatingJob.createdBy = newCreatedBy;
        updatingJob.description = newDescription;

        const updatedJob = await updatingJob.save();
        res.status(200).json(updatedJob)
    } catch (error) {
        next(error)
    }
}

export const deleteJob: RequestHandler = async (req, res, next) => {
    const jobId = req.params.id;
    try {
        if (!mongoose.isValidObjectId) {
            throw createHttpError(400, `Given job id - ${jobId} is not a valid id`)
        }
        const deletingJob = await job.findById(jobId).exec();

        if (!deletingJob) {
            throw createHttpError('404', `Given Job id - ${jobId} is not found in the database`)
        }
        const deletedJob = await job.findByIdAndDelete(jobId);
        res.status(204).json(deletedJob);
    } catch (error) {
        next(error)
    }
}