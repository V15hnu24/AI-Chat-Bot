import mongoose from "mongoose";
import dbConnect from "../../utils/dbConnect";
import Turn from "../../models/turn";
import Thread from "@/models/thread";
import { GoogleGenerativeAI } from "@google/generative-ai";

dbConnect();

const updateThread = async (threadId, turn) => {
  try {
    const thread = await Thread.findById(threadId);
    if (thread.numberOfTurns === 0) {
      thread.head = turn.prompt;
      thread.turnIds = [turn._id];
    } else {
      thread.turnIds.push(turn._id);
    }
    thread.numberOfTurns += 1;
    await thread.save();
  } catch (error) {
    console.log(error);
  }
};

const deleteEmptyThreads = async () => {
  try {
    const threads = await Thread.find({});
    for (let i = 0; i < threads.length; i++) {
      if (threads[i].numberOfTurns === 0) {
        console.log("Deleting thread: ", threads[i]);
        await Thread.findByIdAndDelete(threads[i]._id);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const handler = async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const turns = await Turn.find({});
        res.status(200).json({ success: true, data: turns });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const prompt = req.body.prompt;
        // const response = `Bot: Thanks for your message - ${prompt}`;
        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);

        const model = genAI.getGenerativeModel({ model: "gemini-pro"});

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const response_text = response.text();


        const turn = await Turn({
          response: response_text,
          prompt: prompt,
        });
        await turn.save();
        console.log(turn);

        await updateThread(req.body.threadId, turn);

        /*
        Interim solution to delete empty threads (threads with no turns) created initally during the load of the page.
        This is a temporary solution to avoid the creation of empty threads.
        The final solution would be to avoid the creation of empty threads.
        This solution is not efficient and should be replaced by a more efficient solution when the application is more stable and the scale of the application is larger.
        */
        await deleteEmptyThreads();

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
