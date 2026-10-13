from fastapi import FastAPI
from app.api.health import router as health_router
from app.api.tasks import router as task_create
app = FastAPI()

app.include_router(health_router)
app.include_router(task_create)

@app.get("/")
def read_root():
    return {"Hello": "World"}
