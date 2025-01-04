function importImageAsync(url: string, action: any) {
    fetch(url).then(response => response.blob()).then(blob => {
        let reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                action(reader.result);
            }
        };
        reader.readAsDataURL(blob);
    });
}


export {
    importImageAsync,
}