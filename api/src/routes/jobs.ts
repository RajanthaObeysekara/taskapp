import express from "express";
import * as JobController from "../controllers/jobs";

const router = express.Router();

router.get('/', JobController.getJobs);
router.get('/:id', JobController.getJob)
router.post('/', JobController.createJob);
router.patch('/:id', JobController.updateJob);
router.patch('/:id', JobController.deleteJob);

export default router;