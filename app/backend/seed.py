"""
Popula o banco com alguns exemplos iniciais.
Rode com: docker compose exec backend python seed.py
"""
from app.database import SessionLocal, engine, Base
from app import models

Base.metadata.create_all(bind=engine)

exemplos = [
    ("Olá", "Hello", "palavra"),
    ("Bom dia", "Good morning", "palavra"),
    ("Tchau", "Goodbye", "palavra"),
    ("Casa", "House", "palavra"),
    ("Como você está?", "How are you?", "frase"),
    ("Qual é o seu nome?", "What is your name?", "frase"),
    ("Prazer em conhecê-lo", "Nice to meet you", "frase"),
]

db = SessionLocal()
try:
    if db.query(models.Item).count() == 0:
        for pt, en, tipo in exemplos:
            db.add(models.Item(portugues=pt, ingles=en, tipo=tipo))
        db.commit()
        print(f"{len(exemplos)} itens inseridos.")
    else:
        print("Banco já contém itens, seed não aplicado.")
finally:
    db.close()
