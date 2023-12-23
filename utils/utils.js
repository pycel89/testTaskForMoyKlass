function CreateArrayDate(inputDate,days,count)
{
    const newDate=inputDate.split(",")
    const starDate = new Date(newDate[0]);
    const lastDate = new Date(newDate[1]);
    const day = starDate.getDay();
    const array = days;
    const lessonsCount = count;
    let counter = 0;
    let ferstDay = 0;
    let ferstDayIndex = 0;
    for (let i = 0; i < array.length; ++i)
      if (day <= array[i]) {
        ferstDay = array[i];
        ferstDayIndex = i;
        ++counter;
        break;
      }
    const arrayDate = [];
    const ferstDate = new Date(starDate.setDate(starDate.getDate() + ferstDay - day));
    arrayDate.push(ferstDate);
    for (let i = ferstDayIndex + 1; i <= array.length; ++i) {
      if (lessonsCount) if (counter >= lessonsCount) break;
      counter++;
      if (i === array.length) {
        const tempDate = new Date(
          starDate.setDate(starDate.getDate() + 7 - array[i - 1] + array[0])
        );
        if (lastDate) if (tempDate > lastDate) break;
        arrayDate.push(tempDate);
        break;
      }
      const tempDate = new Date(starDate.setDate(starDate.getDate() + array[i] - array[i - 1]));
      if (lastDate) if (tempDate > lastDate) break;
      arrayDate.push(tempDate);
    }
    for (;;) {
      let flag = false;
      if (lessonsCount) if (counter >= lessonsCount) break;

      for (let i = 1; i <= array.length; ++i) {
        if (lessonsCount)
          if (counter >= lessonsCount) {
            flag = true;
            break;
          }

        counter++;
        if (i === array.length) {
          const tempDate = new Date(
            starDate.setDate(starDate.getDate() + 7 - array[i - 1] + array[0])
          );
          if (lastDate)
            if (tempDate > lastDate) {
              flag = true;
              break;
            }

          arrayDate.push(tempDate);
          break;
        }
        const tempDate = new Date(starDate.setDate(starDate.getDate() + array[i] - array[i - 1]));
        if (lastDate)
          if (tempDate > lastDate) {
            flag = true;
            break;
          }
        arrayDate.push(tempDate);
      }

      if (flag) break;
    }
    return arrayDate.map((el)=>{return el.toISOString().slice(0,10) })
    //return arrayDate


}
module.exports = CreateArrayDate