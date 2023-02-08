export const validateDate = (date) => {
  const today = new Date()
  const isValidDate =
    today.getTime() > date.getTime() ||
    date.getHours() < 8 ||
    date.getHours() > 19 ||
    date.getMinutes() !== 0
  return isValidDate
}

export const validatePatientName = (patientName) => {
  const isValidName =
    !patientName || patientName?.trim() === '' || /\d/.test(patientName)
  return isValidName
}

export const validateDoctorName = (doctorName) => {
  const isValidName = doctorName === 'Escolha o(a) médico(a)'
  return isValidName
}

export const validateDayAvailable = (startDate, appointments, doctorName) => {
  const isAvailableDate = appointments?.find(
    (appointment) =>
      new Date(appointment.dateTime).getTime() === startDate.getTime() &&
      appointment.doctorName === doctorName.doctorName,
  )
  return !!isAvailableDate
}
