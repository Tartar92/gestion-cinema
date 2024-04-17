import { Router, Request, Response } from "express";
import IDirector, { directorModel } from "../models/Realisateur";
 
 
const router = Router();
 
 
router.get('/', async (req: Request, res: Response) => {
  try {
    const realisateurs = await directorModel.find();
    res.status(200).json(realisateurs);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});
 
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const realisateur = await directorModel.findById(req.params.id);
    if (!realisateur) return res.status(404).send('Realisateur not found');
    res.json(realisateur);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});
 
router.post('/', async (req: Request, res: Response) => {
  try {
    const realisateur: IDirector = req.body;
    const newRealisateur = new directorModel(realisateur);
    await newRealisateur.save();
    res.status(201).json(newRealisateur);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});
 
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const director = await directorModel.findById(req.params.id);
    if (!director) return res.status(404).send('Realisateur not found');
    await directorModel.findByIdAndDelete(req.params.id);
    res.send('Realisateur deleted');
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});
 
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const realisateur = await directorModel.findById(req.params.id);
    if (!realisateur) return res.status(404).send('Realisateur not found');
    await directorModel.findByIdAndUpdate(req.params.id, req.body);
    res.send('Realisateur updated');
  }
  catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});
 
export default router