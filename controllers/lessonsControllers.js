const db = require("../db");
const Validator = require("../utils/Validation");
const CreateArrayDate = require("../utils/utils");
class lessonsController {

  async createLessons(req, res) {
    try {
      const { teacherIds, title, days, firstDate, lessonsCount, lastDate } =
        req.body;
        Validator.TeacherIds(teacherIds.join(','))
      const arrayDate = [];
      if (lastDate && lessonsCount)
        throw {
          error: "в запросе существуют одновременно",
          lastDate,
          lessonsCount,
        };
      if (lastDate)
      {
        Validator.Date(firstDate+","+lastDate)
        arrayDate = CreateArrayDate(firstDate + "," + lastDate,days, 300);
      }
    else
    {
        Validator.Date(firstDate)
        let tempLastDate = new Date(firstDate)
        tempLastDate.setDate(tempLastDate.getDate() +365)
        lastDate=tempLastDate.toISOString().slice(0,10)
        arrayDate = CreateArrayDate(firstDate + "," + lastDate,days, lessonsCount);
    }
    const arrayId=[];
    for(let i=0;i<arrayDate.length;++i)
    {
        const id = await db.query(`INSERT INTO lessons (date,title) values ( '${arrayDate[i]}' , '${title}' ) RETURNING id`)
        for(let j=0;j<teacherIds.length;++j)
        {
            const teacher = await db.query(`INSERT INTO lesson_teachers (lesson_id,teacher_id) values ( '${id.rows[0].id}' , '${teacherIds[j]}' ) `)
        }
        arrayId.push(id.rows[0].id)
    }
    res.status(200).json(arrayId);        
    } catch (e) {
      console.log(e);
      res.status(400).json(e);
    }
  }
}
module.exports = new lessonsController();
