from sqlalchemy import Column, Integer, String, Text, CheckConstraint, DateTime, func
from .database import Base


class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    portugues = Column(Text, nullable=False)
    ingles = Column(Text, nullable=False)
    tipo = Column(String(10), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    __table_args__ = (
        CheckConstraint("tipo IN ('palavra', 'frase')", name="tipo_check"),
    )
