import { Component } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { Student } from '../../model/student';
import { DataService } from '../../shared/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  stuedntList: Student[] = [];
  studentObj: Student = {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    mobile: ''
  };
  id: string = '';
  first_name: string = '';
  last_name: string = '';
  email: string = '';
  mobile: string = '';

  constructor(private auth: AuthService, private data: DataService,private router:Router) { }

  register() {
    this.auth.logout();
    
  }

  ngOnInit(): void {
    this.getAllStudents();
  }

  getAllStudents() {
    this.data.getAllStudents().subscribe(res => {
      this.stuedntList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })

    }, err => {
      alert('Error while feetching the data');

    })
  }

  //Reset Form
  resetForm() {
    this.id = '';
    this.first_name = '';
    this.last_name = '';
    this.email = '';
    this.mobile = '';

  }

  addStudent() {
    if (this.first_name == '' || this.last_name == '' || this.email == '' || this.mobile == '') {
      alert('Fill all input fields');
      return;
    }
    this.studentObj.id = '';
    this.studentObj.email = this.email;
    this.studentObj.first_name = this.first_name;
    this.studentObj.last_name = this.last_name;
    this.studentObj.mobile = this.mobile;

    this.data.addStudent(this.studentObj);
    this.resetForm();



  }

  updateStudent() {

  }

  deleteStudent(student: Student) {
    if (window.confirm('Are you sure you want to delete ' + student.first_name + ' ' + student.last_name + ' ?')) {
      this.data.deleteStudent(student);
    }

  }

}
