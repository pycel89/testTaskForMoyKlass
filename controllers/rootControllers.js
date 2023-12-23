const db = require("../db");
const Validator = require("../utils/Validation");
class RootController {
  async Get(req, res) {
    try {
      const arrayQuery = [];

      Validator.Keys(
        req.query,
        "date",
        "page",
        "lessonsPerPage",
        "status",
        "teacherIds",
        "studentsCount"
      );
      Validator.Date(req.query.date)
      Validator.Status(req.query.status)
      Validator.TeacherIds(req.query.teacherIds)
      Validator.StudentsCount(req.query.studentsCount)
      Validator.Int(req.query.page)
      Validator.Int(req.query.lessonsPerPage)
      const limit = req.query.lessonsPerPage||5
      const offset = (req.query.page-1)*limit||0
      if (req.query.date) {
        const newDate = req.query.date.split(",");

        if (newDate.length === 1) arrayQuery.push(`date = '${newDate[0]}'`);

        if (newDate.length === 2) {

          arrayQuery.push(`date >= '${newDate[0]}' AND date <= '${newDate[1]}' `);
        }
      }
      if (req.query.status) arrayQuery.push(` status=${req.query.status} `);
      if(req.query.teacherIds)
      arrayQuery.push(
    " id  IN (SELECT lesson_id FROM lesson_teachers WHERE "+req.query.teacherIds.split(",").map((el)=>"teacher_id="+el).reduce((acc,val)=>acc+=" OR "+val)+")")

    if (req.query.studentsCount) {
        const newStudentsCount = req.query.studentsCount.split(",");
        if (newStudentsCount.length === 1) arrayQuery.push(` id  IN (SELECT lesson_id FROM lesson_students GROUP BY lesson_id HAVING COUNT(lesson_id) = ${newStudentsCount[0]}`);

        if (newStudentsCount.length === 2) {
          arrayQuery.push(` id  IN (SELECT lesson_id FROM lesson_students GROUP BY lesson_id HAVING COUNT(lesson_id) >${newStudentsCount[0]} AND COUNT(lesson_id) <${newStudentsCount[1]}) `);
        }
      }
      if(arrayQuery.length===0)
       throw { error: "запрос отсуствует" };
      const sql = "SELECT * FROM lessons WHERE "+arrayQuery.join(" AND ")+` ORDER BY id LIMIT ${limit} OFFSET ${offset}`;
      const firstQuery = await db.query(sql)
      const result=[];
      for(let i=0;i<firstQuery.rows.length;++i)
      {
        const students =  await db.query(`SELECT id,name,visit FROM students INNER JOIN lesson_students ON lesson_students.student_id = students.id WHERE lesson_id = ${firstQuery.rows[i].id}`)
        const teachers =  await db.query(`SELECT id,name FROM teachers INNER JOIN lesson_teachers ON lesson_teachers.teacher_id = teachers.id WHERE lesson_id = ${firstQuery.rows[i].id}`)
        const obj = {...firstQuery.rows[i],
          visitCount:students.rows.filter((el)=>el.visit).length
          ,students:[...students.rows],
          teachers:[...teachers.rows]
        }
        result.push(obj)
      }
      res.status(200).json(result);
    } catch (e) {
      console.log(e);
      res.status(400).json(e);
    }
  }
}
module.exports = new RootController();
