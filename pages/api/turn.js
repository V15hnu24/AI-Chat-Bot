import mongoose from 'mongoose';
import dbConnect from '../../utils/dbConnect';
import Turn from '../../models/turn';

dbConnect();

const handler = async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const turns = await Turn.find({});
                res.status(200).json({ success: true, data: turns });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'POST':
            try {
                const prompt = req.body.prompt;
                const response = `Bot: Thanks for your message - ${prompt}`;
                const turn = await Turn({
                    response: response,
                    prompt: prompt,
                });
                await turn.save();
                console.log(turn);
                res.status(201).json({ success: true, data: turn });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
};

export default handler;
