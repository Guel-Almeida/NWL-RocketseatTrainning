import {Request, Response} from 'express';
import db from '../database/connection';
import convertHoursToMinute from '../util/convertHoursToMinute';

interface schedule_item{
    week_day:number;
    from: string;
    to: string
}
export default class ClassController{


    async index (request:Request,response:Response){
        const filters = request.query;
        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string;

        if(!filters.week_day || !filters.subject || !filters.time){
            return response.status(404).json({
                error:"Missing filters to search classes"
            })
        }
        const timeInMinute = convertHoursToMinute(time);
        const classes = await db('classes')
            .whereExists(function(){
                this.select('class_schedule.*')
                .from('class_schedule')
                .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                .whereRaw('`class_schedule`.`week_day` = ??',[Number(week_day)])
                .whereRaw('`class_schedule`.`from` <= ??', [timeInMinute])
                .whereRaw('`class_schedule`.`to` > ??', [timeInMinute])
            })
            .where('classes.subject', '=', subject)
            .join('users','classes.user_id','=', 'users.id')
            .select(['classes.*', 'users.*'])


        console.log(classes)
            return response.json(classes);
    }
    async create (request:Request, response:Response){
        
        const {
            avatar,
            nome,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = request.body;
    
        const trx = await db.transaction()
       
      try{
        const insertedIds =  await trx('users').insert({
            
            avatar,
            nome,
            whatsapp,
            bio,
        });
        const user_id = insertedIds[0];
      const insertedCassesId = await trx('classes').insert({
           subject,
           cost,
           user_id,
       })
       const class_id = insertedCassesId[0]
    
       const classSchedule = schedule.map((schedule_item: schedule_item
        ) =>{
            
           return {
            class_id,
            week_day: schedule_item.week_day,
            from: convertHoursToMinute(schedule_item.from),
            to: convertHoursToMinute(schedule_item.to)
           };
       })
       await trx('class_schedule').insert(classSchedule)
       await trx.commit();
        return response.status(201).send()
    
      }catch(err){
          await trx.rollback();
        return response.status(400).json({
            error:"Unexpected error while creating new class"
        })
      }
     }
}