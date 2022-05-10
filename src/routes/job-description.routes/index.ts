/* eslint-disable @typescript-eslint/no-var-requires */
import { Router } from 'express';

const router = Router();

router.use('/job-description', require('./job-description'));
router.use('/job-description/thread', require('./thread'));

module.exports = router;
