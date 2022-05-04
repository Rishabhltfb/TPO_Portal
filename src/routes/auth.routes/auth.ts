/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
// import AuthService from "../../services/auth.services/auth.service";
import ResponseAdapter from '../../utils/response-adapter';

const router = Router();
// const authService = new AuthService();
const responseAdapter = new ResponseAdapter();

router.post(
  '/signin',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const { email, name, password } = req.body;
    const ip = req.headers['x-forwarded-for']?.toString() || req.socket.remoteAddress || req.ip || '';

    const response = {};
    // const response = await authService.signIn(email, name, ip, password);
    res.status(200).send(responseAdapter.sendSuccessResponse('Signin Successful', response));
  }),
);

module.exports = router;
