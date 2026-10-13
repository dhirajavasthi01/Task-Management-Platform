
from fastapi import APIRouter, Depends , status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.task import TaskCreate, TaskResponse, TaskUpdate
from app.services.task_service import (
    create_task_service,
    get_all_tasks_service,
    get_task_service,
    update_task_service,
    delete_task_service
)
from app.core.route_decorators import post_created

router = APIRouter()


@post_created(router, "/api/v1/tasks", response_model=TaskResponse)
def create_task(
    task: TaskCreate,
    db: Session = Depends(get_db),
):
    return create_task_service(db, task)

@router.get("/api/v1/tasks", response_model=list[TaskResponse])
def get_all_tasks(
    db: Session = Depends(get_db),
):
  return get_all_tasks_service(db)

@router.get("/api/v1/tasks/{id}", response_model=TaskResponse)
def get_task(id:int,db: Session = Depends(get_db)):
    return get_task_service(db, id)

@router.patch("/api/v1/tasks/{id}", response_model=TaskResponse)
def update_task_route(id: int, task_data:TaskUpdate, db: Session = Depends(get_db)):
    return update_task_service(db, id, task_data)

@router.delete("/api/v1/tasks/{id}", status_code=status.HTTP_204_NO_CONTENT,)
def delete_task(id: int, db: Session = Depends(get_db)):
    return delete_task_service(db, id)