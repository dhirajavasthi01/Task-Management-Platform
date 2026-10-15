from fastapi import FastAPI
from app.api.health import router as health_router
from app.api.tasks import router as task_create
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(task_create)

@app.get("/")
def read_root():
    return {"Hello": "World"}
