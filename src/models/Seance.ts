import mongoose, { Schema, Document } from 'mongoose';
import IFilm, { filmModel } from './Film';
 
export default interface ISession extends Document{
    film: IFilm
    date: Date,
    time: string,
    availableSeats: number
}
 
const sessionSchema: Schema = new mongoose.Schema({
    film: filmModel.schema,
    date: Date,
    time: String,
    availableSeats: Number
});
 
const sessionModel = mongoose.model<ISession>('Seance', sessionSchema);
 
export { sessionModel };