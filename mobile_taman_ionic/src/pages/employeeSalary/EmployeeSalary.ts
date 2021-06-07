export interface EmployeeSalary {
  id: number;
  userId: number;
  actualAttendance: number;
  totalSalary: number;
  taxableIncome: number;
  insuranceSalary: number;
  actualSalary: number;
  paymentStatus: String;
  year: number;
  user: {
      fullName: String,
      code: String,
      position: String,
      email :string,
      phoone : string
      company: {
        name: String,
      }
  }
  
  
}
