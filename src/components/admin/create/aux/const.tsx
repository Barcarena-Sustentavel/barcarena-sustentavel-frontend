export const handleFileChange = (setArquivo:React.Dispatch<React.SetStateAction<string>>, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
        setArquivo(e.target.files[0].name)
    }
}