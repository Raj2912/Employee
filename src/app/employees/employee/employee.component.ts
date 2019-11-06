import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { NgForm } from '@angular/forms';
import { MatDialog }  from  '@angular/material';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  id: String;

  constructor(private service: EmployeeService,
    private toastr: ToastrService, private dialogRef: MatDialog) { }

  ngOnInit() {
    this.resetForm();
    this.service.refreshlist();
    if (localStorage.getItem("emp") != undefined) {
      var emp = JSON.parse(localStorage.getItem("emp"));
      this.service.formData.name = emp.employee_name;
      this.service.formData.age = emp.employee_age;
      this.service.formData.salary = emp.employee_salary;
    }
  }

  resetForm(form?: NgForm) {
    if (form != null) form.resetForm();
    this.service.formData = {
      name: "",
      salary: "",
      age: ""
    };
  }


  insertRecord(form: NgForm) {
    this.service.postEmployee(form.value).subscribe(res => {
      this.toastr.success(" Record Inserted sucessfully", "Employee Registered");
      this.dialogRef.closeAll();
      this.resetForm(form);
      this.service.refreshlist();
    });
  }

  onSubmit(form: NgForm) {
    if (this.service.id == undefined) this.insertRecord(form);
    else this.updateRecord(form, this.service.id);
  }


  updateRecord(form: NgForm, id) {
    this.service.putEmployee(form.value, id).subscribe(res => {
      this.toastr.success(" Record Updated  Sucessfully", "Employee Registered");
      this.dialogRef.closeAll();
      localStorage.removeItem("emp");
      this.resetForm(form);
      this.service.refreshlist();
    });
  }

  close(){
    localStorage.removeItem("emp");
  }
}
