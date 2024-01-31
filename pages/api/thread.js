import dbConnect from "@/utils/dbConnect";
import Thread from "@/models/thread";

dbConnect();

const handler = async (req, res) => {
    const { method } = req;

    switch (method) {
        case "GET":
            try {
                const threads = await Thread.find({});
                res.status(200).json({ success: true, data: threads });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case "POST":
            try {
                const thread = await Thread.create(req.body);
                res.status(201).json({ success: true, data: thread });
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