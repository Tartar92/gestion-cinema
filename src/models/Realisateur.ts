import mongoose, { Schema, Document } from 'mongoose';
 
 
export default interface IDirector extends Document{
    name: string,
    birthdate: Date,
    biography: string
}
 
const directorSchema: Schema = new mongoose.Schema({
    nom: String,
    birthdate: Date,
    biography: String
});
 
const directorModel = mongoose.model<IDirector>('Realisateur', directorSchema);
 
export { directorModel };