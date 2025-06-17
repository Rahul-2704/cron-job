const cron=require('node-cron');

const task=()=>{
    console.log('Running a scheduled task at:',new Date());
}

// runs task at every minute
cron.schedule("* * * * *",task); 