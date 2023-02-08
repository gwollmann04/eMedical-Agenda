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
  if (req.method === 'POST') {
    const email = req.body.email
    const feedbackText = req.body.text

    const newAppointment = {
      id: new Date().toISOString(),
      email: email,
      text: feedbackText,
    }

    // store that in a database or in a file
    const filePath = buildFilePath()
    const data = extractAppointmentstData(filePath)
    data.push(newAppointment)
    fs.writeFileSync(filePath, JSON.stringify(data))
    res.status(201).json({ message: 'Success!', appointment: newAppointment })
  } else {
    const filePath = buildFilePath()
    const data = extractAppointmentstData(filePath)
    res.status(200).json({ appointments: data })
  }
}

export default handler
