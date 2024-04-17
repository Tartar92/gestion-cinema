import mongoose, { Schema, Document } from 'mongoose';
import IDirector, { directorModel } from './Realisateur';
 
export default interface IFilm extends Document{
    title: string,
    releaseYear: number,
    genre: string,
    directors: IDirector[],
}
 
const filmSchema: Schema = new mongoose.Schema({
    title: String,
    releaseYear: Number,
    genre: String,
    directors: directorModel.schema
});
 
const filmModel = mongoose.model<IFilm>('Film', filmSchema);
 
export { filmModel };