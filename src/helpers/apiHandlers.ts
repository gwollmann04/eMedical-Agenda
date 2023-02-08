import fs from 'fs'
import path from 'path'

export const extractFileData = (filePath: string) => {
    const fileData = fs.readFileSync(filePath)
    const data = JSON.parse(String(fileData))
    return data
  }

  export function buildFilePath(file: string) {
    return path.join(process.cwd(), 'src', 'data', `${file}.json`)
  }