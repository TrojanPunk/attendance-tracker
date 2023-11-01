import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { StudentDataService } from 'src/shared/services/student-data.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

interface AssignAttendance {
  date: string;
  status: string;
}

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements AfterViewInit {
  displayedColumns: string[] = ['date', 'status'];
  allAttendance: AssignAttendance[] = [];
  STUDENT_ID: string | null = '';
  dataSource = new MatTableDataSource<AssignAttendance>(this.allAttendance);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.getStudentId()
    console.log(this.STUDENT_ID)

    this.studentDataService.fetchSpecificStudentFromAPI(Number(this.STUDENT_ID)!).subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource.data = res.attendance;
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        console.log('Call completed!');
      }
    });
  }

  constructor(private studentDataService: StudentDataService, private activatedRoute: ActivatedRoute) { }

  getStudentId(): void {
    this.activatedRoute.paramMap.subscribe((params:ParamMap) => {
      console.log(params.get('id'));
      this.STUDENT_ID = params.get('id');
    });
  }

  // getAttendanceData(dateArr: any, presentArr: any): StudentAttendanceData[] {
  //   if (dateArr.length === presentArr.length) {
  //     return dateArr.map((date: string, index: number) => {
  //       const attendanceObj = {
  //         date,
  //         isPresent: presentArr[index] === 'Present'
  //       };
  //       console.error('attendanceObj', attendanceObj)
  //       return attendanceObj;
  //     });
  //   }
  //   else {
  //     return [];
  //   }
  // } 
}

interface StudentAttendanceData {
  date: string;
  present: boolean;
}