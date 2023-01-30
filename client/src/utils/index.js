import { surpriseMePrompts } from '../constants'
import FileSaver from 'file-saver'; 
import { download } from '../assets';

export function getRandomPrompt(prompt) {
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
    const getRandomPrompt = surpriseMePrompts[randomIndex]; 

    if(getRandomPrompt === prompt) getRandomPrompt(prompt);

    return getRandomPrompt
}


export async function downloadImage(_id, photo) {
    FileSaver.saveAs(photo, `download-${_id}.jpeg`);
}