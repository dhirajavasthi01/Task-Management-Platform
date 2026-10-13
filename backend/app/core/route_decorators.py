from fastapi import APIRouter, status


def post_created(router: APIRouter, path: str, **kwargs):
    return router.post(
        path,
        status_code=status.HTTP_201_CREATED,
        **kwargs
    )

