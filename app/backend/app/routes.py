import random
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import delete

from . import models, schemas
from .database import get_db

router = APIRouter(prefix="/api")


@router.post("/words", response_model=schemas.ItemOut, status_code=201)
def add_word(payload: schemas.ItemCreate, db: Session = Depends(get_db)):
    payload.tipo = "palavra"
    return _create_item(payload, db)


@router.post("/phrases", response_model=schemas.ItemOut, status_code=201)
def add_phrase(payload: schemas.ItemCreate, db: Session = Depends(get_db)):
    payload.tipo = "frase"
    return _create_item(payload, db)


@router.post("/items", response_model=schemas.ItemOut, status_code=201)
def add_item(payload: schemas.ItemCreate, db: Session = Depends(get_db)):
    return _create_item(payload, db)


def _create_item(payload: schemas.ItemCreate, db: Session):
    item = models.Item(
        portugues=payload.portugues.strip(),
        ingles=payload.ingles.strip(),
        tipo=payload.tipo,
    )
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.get("/items", response_model=list[schemas.ItemOut])
def list_items(db: Session = Depends(get_db)):
    return db.query(models.Item).order_by(models.Item.created_at.desc()).all()


@router.get("/practice", response_model=list[schemas.PracticeItem])
def get_practice_items(db: Session = Depends(get_db)):
    items = db.query(models.Item).all()
    random.shuffle(items)
    return items


@router.post("/verify", response_model=schemas.VerifyResponse)
def verify_answer(payload: schemas.VerifyRequest, db: Session = Depends(get_db)):
    item = db.query(models.Item).filter(models.Item.id == payload.item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item não encontrado")
    correto = payload.resposta == item.ingles
    return schemas.VerifyResponse(correto=correto, resposta_correta=item.ingles)


@router.put("/items/{item_id}", response_model=schemas.ItemOut)
def update_item(item_id: int, payload: schemas.ItemUpdate, db: Session = Depends(get_db)):
    item = db.query(models.Item).filter(models.Item.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item não encontrado")
    data = payload.dict(exclude_unset=True)
    for key, value in data.items():
        setattr(item, key, value)
    db.commit()
    db.refresh(item)
    return item


@router.delete("/items/{item_id}", status_code=204)
def delete_item(item_id: int, db: Session = Depends(get_db)):
    item = db.query(models.Item).filter(models.Item.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item não encontrado")
    db.delete(item)
    db.commit()
    return None


@router.delete("/items", status_code=204)
def clear_all(db: Session = Depends(get_db)):
    db.execute(delete(models.Item))
    db.commit()
    return None
