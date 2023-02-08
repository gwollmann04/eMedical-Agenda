import fs from 'fs'

import { extractFileData, buildFilePath } from '@/src/helpers/apiHandlers'

function handler(req, res) {
  const appointmentId = req?.query?.appointmentId

  if (req?.method === 'DELETE') {
    const filePath = buildFilePath('appointments')
    const data = extractFileData(filePath)
    const newData = data.filter((item) => item.id !== Number(appointmentId))
    fs.writeFileSync(filePath, JSON.stringify(newData))
    res.status(201).json({ message: 'Success!', appointmentData: newData })
  }

  if (req?.method === 'PUT') {
    const appointmentData = req.body
    const filePath = buildFilePath('appointments')
    const data = extractFileData(filePath)
    const newData = data.map((item) => {
      if (item.id === Number(appointmentId)) {
        item.patientName = appointmentData.patientName
        item.doctorName = appointmentData.doctorName
        item.dateTime = appointmentData.date
      }
      return item
    })
    fs.writeFileSync(filePath, JSON.stringify(newData))
    res.status(201).json({ message: 'Success!', appointmentData: newData })
  }
}

export default handler
