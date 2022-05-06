/* eslint-disable @typescript-eslint/no-var-requires */
import { Router } from 'express';

const router = Router();

router.use('/job-description', require('./job-description'));

module.exports = router;
