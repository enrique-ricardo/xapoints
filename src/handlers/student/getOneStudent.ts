import express from 'express';
import { Student } from '../../model/types/student';
import {findOneStudent} from '../../model/services/studentServices';

async function getOneStudent(req: express.Request, res: express.Response){
    const studentId = req.params.id_student;
    findOneStudent(studentId, (err: Error, result:Student)=>{
        if(err){
            res.status(404).json({"message": err.message});
        }
        res.status(200).json(result);
    })
}

export {getOneStudent};