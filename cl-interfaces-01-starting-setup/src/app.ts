class Department{
  
  name: string;
  private employees: string[] = [];

  constructor(n: string){
    this.name = n;
  }

  describe(this: Department){
      console.log("Department: " + this.name)
  }

  addEmployee(employee: string){
      this.employees.push(employee)
  }

  printEmployeeInformation(){
      console.log(this.employees.length)
      console.log(this.employees)
  }

}

const accounting = new Department("Accounting")
accounting.describe()

accounting.addEmployee("Tom")
accounting.addEmployee("Kitty")
accounting.addEmployee("Buddy")
accounting.addEmployee("Quinny")
accounting.addEmployee("MommyToad")

accounting.employees[2] = "Wendesday"


accounting.printEmployeeInformation()




