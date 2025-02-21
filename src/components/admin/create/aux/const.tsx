export const handleFileChange = (setArquivo:React.Dispatch<React.SetStateAction<File | undefined>>, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
        setArquivo(e.target.files[0])
    }
}