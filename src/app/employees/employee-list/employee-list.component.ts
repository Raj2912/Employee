import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material';
import { EmployeeComponent } from '../employee/employee.component';
;

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(private service: EmployeeService,
    private toastr: ToastrService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.service.refreshlist();
  }

  openDialog(emp, type) {
    if (type == 'create') {
      localStorage.removeItem("emp");
    } else {
      this.service.id = emp.id;
      localStorage.setItem("emp", JSON.stringify(emp));
    }
    this.dialog.open(EmployeeComponent);
  }

  populateForm(emp) {
    this.service.formData.name = emp.employee_name;
    this.service.formData.salary = emp.employee_salary;
    this.service.formData.age = emp.employee_age;
    this.service.id = emp.id
  }

  onDelete(id: number) {
    if (confirm("Are you sure to delete this record")) {
      this.service.deleteEmployee(id).subscribe(res => {
        this.service.refreshlist()
        this.toastr.warning("Deleted Sucessfully", "Employee Registered");
        this.dialog.closeAll();
      })
    }
  }
}
