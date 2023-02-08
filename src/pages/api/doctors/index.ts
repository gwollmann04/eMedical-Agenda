import fs from 'fs'

import { extractFileData, buildFilePath } from '@/src/helpers/apiHandlers'

export function extractDoctorstData(filePath: string) {
  const fileData = fs.readFileSync(filePath)
  const data = JSON.parse(String(fileData))
  return data
}

function handler(req, res) {
  const filePath = buildFilePath('doctors')
  const data = extractFileData(filePath)
  res.status(200).json({ doctors: data })
}

export default handler
