import {Student} from "../types/student";
import {db} from "../../config";
import {OkPacket, RowDataPacket} from "mysql2";

function createStudent(student: Student, callback: Function){
    const queryString = "INSERT INTO student (name, first_surname, second_surname, email_personal, email_activa, phone_number, zip_code, prom, activa_points_balance ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
  
    db.query(
      queryString,
      [student.name, student.firstSurname, student.secondSurname, student.personalEmailAddress, student.activaEmailAddress, student.phoneNumber, student.zipCode, student.prom, student.activaPointsBalance],
      (err, result) => {
        if (err) {callback(err, null)};
        
        const insertId = (<OkPacket> result).insertId;
        callback(null, insertId);
      }
    );
  };

function findAllStudents(callback:Function){
  const queryString = "SELECT id, name, first_surname, second_surname, email_personal, email_activa, phone_number, zip_code FROM student";
  db.query(queryString, (err, result)=>{
    if(err) callback(err, null);

    const students = result;
    callback(null, students);
  } )
}

function findOneStudent(id: string, callback: Function){
 
  const queryString = "SELECT id, name, first_surname, second_surname, email_personal, email_activa, phone_number, zip_code FROM student WHERE id = ?";
  db.query(queryString, [id], (err, result)=>{
    if(err){ callback(err, null)};
    
    const studentFound: Student = (<RowDataPacket>result)[0];
   
    callback(null, studentFound);
  })
}

function deleteOneStudent(id: string, callback: Function){
  const queryString = "DELETE FROM student WHERE id = ?";
  db.query(queryString, [id], (err, result)=>{
    if(err){ callback(err, null)};
    
    const studentDeleted:String = "deleted succesfull";
   
    callback(null, studentDeleted);
  })
}

function putOneStudent(id: string, student: Student, callback: Function){

    const queryString = "UPDATE student SET name=?, first_surname=?, second_surname=?, email_personal=?, email_activa=?, phone_number=?, zip_code=? WHERE id=?";
    db.query(queryString, [student.name, student.firstSurname, student.secondSurname, student.personalEmailAddress, student.activaEmailAddress, student.phoneNumber, student.zipCode, id],
      (err, result)=>{
        if(err){ callback(err, null)};
        
        const studentUpdated:String = "update succesfull";
       
        callback(null, studentUpdated);
      })
  }

export {createStudent, findAllStudents, findOneStudent, deleteOneStudent, putOneStudent};