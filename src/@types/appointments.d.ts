export declare type AppointmentsTableType = {
  appointments: Array<{
    id: number
    doctorName: string
    patientName: string
    dateTime: string
  }>,
  doctors: Array<{
    id: number
    doctorName: string
    patientsTreated: string
  }>
  filterByDoctor?: boolean
  doctorNameToFilter?: string
}
