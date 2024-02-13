import dbConnect from "@/utils/dbConnect";
import Turn from "@/models/turn";

dbConnect();

const handler = async (req, res) => {
    const { method } = req;

    const id = req.query.id;

    switch (method) {
        case "GET":
            try {
                // find turn by id
                const turn = await Turn.findById(id);
                res.status(200).json({ success: true, data: turn});
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
