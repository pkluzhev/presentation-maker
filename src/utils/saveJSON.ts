import { type Presentation } from "../store/types/PresentationTypes.ts";

function saveJSON(presentation: Presentation) {
    const blob = new Blob([JSON.stringify(presentation)], { type: 'application/json' });
    const fileName: string = presentation.title;
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${fileName}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export {
    saveJSON,
}