from app.schemas.task import TaskCreate, TaskUpdate
from sqlalchemy.orm import Session
from app.repositories.task_repository import save_task, get_all_tasks, get_task, update_task, delete_task
from fastapi import HTTPException

def create_task_service(db: Session, task: TaskCreate):
    return save_task(db, task)

def get_all_tasks_service(db: Session):
    return get_all_tasks(db)

def get_task_service(db:Session, id:int):
    task = get_task(db, id)
    if task is None:
        raise HTTPException(status_code=404, detail="Item not found")  
    return  get_task(db, id)

def update_task_service(db:Session, id:int, task_data: TaskUpdate):
    task = get_task(db, id)
    if task is None:
        raise HTTPException(status_code=404, detail="Item not found")  
    return update_task(db, id, task_data)

def delete_task_service(db:Session, id: int):
    task = get_task(db, id)
    if task is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return delete_task(db,task)