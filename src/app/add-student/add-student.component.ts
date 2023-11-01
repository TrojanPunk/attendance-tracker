import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { StudentData } from 'src/shared/models/interface';
import { StudentDataService } from 'src/shared/services/student-data.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {
  studentData: FormGroup = this.fb.group({});

  constructor(private http: HttpClient, private fb: FormBuilder, private studentDataService: StudentDataService) {
    // this.studentData = new FormGroup({
    //   'id': new FormControl(),
    //   'name': new FormControl(),
    //   'email': new FormControl(),
    //   'number': new FormControl()
    // });
  }

  ngOnInit(): void {
    this.studentData = this.fb.group({
      id: [''],
      name: [''],
      email: [''],
      number: ['']
    })
  }

  addStudent(): void {
    const POST_DATA: StudentData = this.studentData.getRawValue();
    console.log(POST_DATA)
    this.studentDataService.postFormData(POST_DATA).subscribe(
      {
        next: response => alert('Student added successfully!' + response),
        error: error => alert('error' + error)
      },
    );
  }
}