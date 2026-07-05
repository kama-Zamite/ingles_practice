from datetime import datetime
from typing import Literal, Optional
from pydantic import BaseModel


class ItemBase(BaseModel):
    portugues: str
    ingles: str
    tipo: Literal["palavra", "frase"]


class ItemCreate(ItemBase):
    pass


class ItemUpdate(BaseModel):
    portugues: Optional[str] = None
    ingles: Optional[str] = None
    tipo: Optional[Literal["palavra", "frase"]] = None


class ItemOut(ItemBase):
    id: int
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class PracticeItem(BaseModel):
    id: int
    portugues: str
    tipo: str


class VerifyRequest(BaseModel):
    item_id: int
    resposta: str


class VerifyResponse(BaseModel):
    correto: bool
    resposta_correta: str
