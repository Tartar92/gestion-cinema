import { Router, Request, Response } from "express";
import ISession, { sessionModel } from "../models/Seance";
 
 
const router = Router();
 
 
router.get('/', async (req: Request, res: Response) => {
  try {
    const sessions = await sessionModel.find();
    res.status(200).json(sessions);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});
 
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const session = await sessionModel.findById(req.params.id);
    if (!session) return res.status(404).send('Session not found');
    res.json(session);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});
 
router.post('/', async (req: Request, res: Response) => {
  try {
    const session: ISession = req.body;
    const newSession = new sessionModel(session);
    await newSession.save();
    res.status(201).json(newSession);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});
 
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const session = await sessionModel.findById(req.params.id);
    if (!session) return res.status(404).send('Session not found');
    await sessionModel.findByIdAndDelete(req.params.id);
    res.send('Session deleted');
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});
 
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const session = await sessionModel.findById(req.params.id);
    if (!session) return res.status(404).send('Session not found');
    await sessionModel.findByIdAndUpdate(req.params.id, req.body);
    res.send('Session updated');
  }
  catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});
 
export default router