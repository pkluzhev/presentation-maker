function setBase64Image(event: React.ChangeEvent<HTMLInputElement>, callbackFunction: Function) {
    const target = event.target as HTMLInputElement & {
        files: FileList
    }
    const reader = new FileReader()
    reader.onload = () => {
        if (typeof reader.result === "string") {
            callbackFunction(reader.result)
        }
    }
    reader.readAsDataURL(target.files[0])
}

export {
    setBase64Image,
}