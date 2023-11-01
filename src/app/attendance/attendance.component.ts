import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { StudentDataService } from 'src/shared/services/student-data.service';
import { IdData, StudentData } from 'src/shared/models/interface';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit{
  attendanceData: FormGroup = this.fb.group({});
  ids: IdData[] = [];
  studentData: StudentData[] = [];
  oneStudentData: StudentData[] = [];

  constructor(private http: HttpClient, private studentDataService: StudentDataService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.studentDataService.fetchSpecificDataFromAPI();
    this.getStudentIds()
    this.attendanceData = this.fb.group({
      id: [''],
      status: [''],
      date: ['']
    })
  }

  getStudentIds() {
    console.log(this.studentDataService.subject)
    this.studentDataService.subject.subscribe({
      next: (res) => {
        this.studentData = res;
        this.studentData.map((record) => {
          this.ids.push({'id': record.id, 'name': record.name})
        })
      }
    })
  }

  markAttendance(): void {
    const POST_DATA: StudentData = this.attendanceData.getRawValue();
    const ID: number = POST_DATA.id;

    this.getStudentData(ID);

    // this.oneStudentData.attendance.push(POST_DATA);
    console.log(this.oneStudentData);

    this.studentDataService.postAttendance(ID, POST_DATA).subscribe(
      {
        next: response => alert('Student added successfully!' + response),
        error: error => alert('error' + error)
      },
    );
  }

  getStudentData(id: number): void {
    this.studentDataService.fetchSpecificStudentFromAPI(id).subscribe(
      {
        next: (res) => {
          this.oneStudentData = res;
          console.log('oneStudentData', this.oneStudentData);
        },

        error: (err) => {
          console.error(err);
        }
    })
  }
}
