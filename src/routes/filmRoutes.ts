import { Router, Request, Response } from "express";
import IFilm, { filmModel } from "../models/Film";
 
 
const router = Router();
 
 
router.get('/', async (req: Request, res: Response) => {
  try {
    const movies = await filmModel.find();
    res.status(200).json(movies);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});
 
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const movie = await filmModel.findById(req.params.id);
    if (!movie) return res.status(404).send('Movie not found');
    res.json(movie);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});
 
router.post('/', async (req: Request, res: Response) => {
  try {
    const movie: IFilm = req.body;
    const newMovie = new filmModel(movie);
    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});
 
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const movie = await filmModel.findById(req.params.id);
    if (!movie) return res.status(404).send('Movie not found');
    await filmModel.findByIdAndDelete(req.params.id);
    res.send('Movie deleted');
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});
 
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const movie = await filmModel.findById(req.params.id);
    if (!movie) return res.status(404).send('Movie not found');
    await filmModel.findByIdAndUpdate(req.params.id, req.body);
    res.send('Movie updated');
  }
  catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});
 
export default router