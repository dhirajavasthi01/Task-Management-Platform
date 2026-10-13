from sqlalchemy.orm import Session
from sqlalchemy import select, delete
from app.models.task import Task
from app.schemas.task import TaskCreate, TaskUpdate


def save_task(db: Session, task_data: TaskCreate):
    task_dict = task_data.model_dump()
    task = Task(**task_dict)
    db.add(task)
    db.commit()
    db.refresh(task)
    return task

def get_all_tasks(db:Session):
   select_tasks = select(Task)
   result = db.execute(select_tasks)
   return result.scalars().all()

def get_task(db:Session, id:int):
    select_task = select(Task).where(Task.id == id)
    result = db.execute(select_task)
    return result.scalar_one_or_none()
    
    
def update_task(db:Session, id:int, task_data: TaskUpdate):
     task = get_task(db, id)
     task_dict = task_data.model_dump(exclude_unset=True)
     for key, value in task_dict.items():
         setattr(task,key, value)   
     db.commit()
     db.refresh(task)
     return task


def delete_task(db: Session, task: Task):
    db.delete(task)
    db.commit()
    return True

    

    

    
# tasks = []
# next_task_id = 1
# def save_task(task_data):
#     global next_task_id
#     task_data["id"] = next_task_id 
#     next_task_id += 1
#     tasks.append([task_data])
#     return task_data


# def get_all_tasks():
#     return tasks