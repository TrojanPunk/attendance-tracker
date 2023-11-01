import { AttendanceComponent } from "src/app/attendance/attendance.component";

export interface StudentData {
    id: number;
    name: string;
    number: number;
    email: string;
    attendance : AttendanceDetails[]
}

export interface AttendanceDetails {
    status: string;
    date: Date;
}

export interface StudentFormData {
    id: number;
    name: string;
    number: number;
    email: string;
}

export interface IdData {
    id: number;
    name: string;
}

export interface AttendanceFormData {
    id: number;
    status: string;
    date: Date;
}