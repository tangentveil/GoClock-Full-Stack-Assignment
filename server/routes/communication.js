import express from "express";
import { manufacturer, transporter, Allmessages } from "../controllers/communication.js";

const router = express.Router();

router.post('/send-message', manufacturer);
router.post('/send-reply', transporter);
router.get('/received-messages', Allmessages);

export default router;
