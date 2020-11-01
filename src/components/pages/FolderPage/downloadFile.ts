import fetch from 'node-fetch'

type FileDownload = {
  url: string
  folderPath: string
  filePath: string
}
export default async function downloadFile({ fs, url, folderPath, filePath }: FileDownload) {
  try {
    if (!fs.existsSync(folderPath)) {
      await fs.promises.mkdir(folderPath, { recursive: true })
    }

    const response = await fetch(url)
    const buffer = await response.buffer()
    await fs.promises.writeFile(filePath, buffer)
    console.info(`Downloaded "${filePath}"`)
  } catch (error) {
    console.error(error)
  }
}
