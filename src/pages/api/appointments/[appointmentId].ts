import fs from 'fs'
import path from 'path'

export function buildFilePath() {
  return path.join(process.cwd(), 'src', 'data', 'appointments.json')
}

export function extractAppointmentstData(filePath: string) {
  const fileData = fs.readFileSync(filePath)
  const data = JSON.parse(String(fileData))
  return data
}

function handler(req, res) {
  const appointmentId = req?.query?.appointmentId
  
  if (req?.method === 'DELETE') {
    const filePath = buildFilePath()
    const data = extractAppointmentstData(filePath)
    const newData = data.filter((item) => item.id !== Number(appointmentId))
    fs.writeFileSync(filePath, JSON.stringify(newData))
    res.status(201).json({ message: 'Success!', appointmentData: newData })
  }

  if (req?.method === 'PUT') {
    const filePath = buildFilePath()
    const data = extractAppointmentstData(filePath)
    const newData = data.filter((item) => item.id !== Number(appointmentId))
    fs.writeFileSync(filePath, JSON.stringify(newData))
    res.status(201).json({ message: 'Success!', appointmentData: newData })
  }
}

export default handler
