import { Injectable } from '@angular/core';

import { Student } from '../model/student';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs: AngularFirestore ) {}


  //Add Student
  addStudent(student: Student)
  {
    student.id=this.afs.createId();
    return this.afs.collection('/Students').add(student);

  }

  //Get all Student
  getAllStudents()
  {
    return this.afs.collection('/Students').snapshotChanges();

  }

  //delete Student
  deleteStudent(student:Student)
  {
    return this.afs.doc('/Students/' + student.id).delete();
  }

  //update Student
  updateStudent(student:Student)
  {
    this.deleteStudent(student);
    this.addStudent(student);
  }

}
