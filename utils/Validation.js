class Validation {
  static Keys(obj, ...arg) {
    const newObj = { ...obj };
    arg.forEach((el) => {
      if (newObj[el] === "") throw { error: "пустое поле " + el };
      delete newObj[el];
    });
    const key = Object.keys(newObj);
    if (key.length) throw { error: "в запросе есть лишнии ключи", key };
  }

  static Date(date) {
    if (!date) return;
    const newDate = date.split(",");
    if (newDate.length > 2) throw { error: "слишком много дат" };
    if (newDate[0][4] !== "-" || newDate[0][7] !== "-")
      throw { error: "некоректный формат даты 4 7 " };

    const date1 = new Date(newDate[0]);
    if (date1 == "Invalid Date") throw { error: "некоректный формат даты" };

    if (newDate.length === 2) {
      if (newDate[1][4] !== "-" || newDate[1][7] !== "-")
        throw { error: "некоректный формат даты" };
      const date2 = new Date(newDate[1]);
      if (date2 == "Invalid Date") throw { error: "некоректный формат даты" };
      if (date1 >= date2) throw { error: "неверный порядок дат" };
    }


  }
  static TeacherIds(id) {
    if (!id) return;
    const newId = id.split(",");
    //console.log(newId)
    newId.forEach((el) => {
      if (!Number.isInteger(Number(el)) || el === "")
        throw { error: "некоректный id учителя" };
    });
  }
  static Status(status) {
    if (!status) return;
    if (
      isNaN(Number(status)) ||
      Number(status) > 1 ||
      Number(status) < 0 ||
      !Number.isInteger(Number(status))
    )
      throw { error: "неверный статус занятия" };
      
  }
  static StudentsCount(count) {
    if (!count) return;
    const newCount = count.split(",");
    if (newCount.length > 2) throw { error: "слишком много перечислений" };
    if (!Number.isInteger(Number(newCount[0])))
      throw { error: "количество студентов не число" };
    if (newCount.length === 2) {
      if (!Number.isInteger(Number(newCount[1])))
        throw { error: "второй параметр количества студентов не число" };
    }
  }
  static Int(nom) {
    if (!nom) return;
    if(!Number.isInteger(Number(nom)))
    throw { error: "пришло не число" };
  if(Number(nom)<=0)
  throw { error: "число меньше или равно 0" };
  }
}
module.exports = Validation;
