import fs from 'fs'

import { extractFileData, buildFilePath } from '@/src/helpers/apiHandlers'

function handler(req, res) {
  const filePath = buildFilePath('appointments')
  const data = extractFileData(filePath)
  if (req.method === 'POST') {
    const appointmentData = req.body
    const indexOfLastEntry = data.length - 1

    const newAppointment = {
      patientName: appointmentData.patientName,
      doctorName: appointmentData.doctorName,
      dateTime: appointmentData.date,
      id: data[indexOfLastEntry].id + 1,
    }

    data.push(newAppointment)
    fs.writeFileSync(filePath, JSON.stringify(data))
    res.status(200).json({ message: 'Success!', appointments: data })
  } else {
    res.status(200).json({ appointments: data })
  }
}

export default handler
