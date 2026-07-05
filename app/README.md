# Prática de Inglês

Aplicação web pessoal para praticar vocabulário e frases em inglês, com verificação automática de tradução.

## Stack

- **Backend**: FastAPI + SQLAlchemy
- **Frontend**: Next.js + Tailwind CSS
- **Banco de dados**: PostgreSQL
- **Orquestração**: Docker Compose

## Como rodar

### Pré-requisitos
- Docker e Docker Compose instalados

### Passos

1. Entre na pasta do projeto:
   ```bash
   cd app
   ```

2. Suba os serviços:
   ```bash
   docker compose up --build
   ```

3. (Opcional) Popule o banco com alguns exemplos iniciais:
   ```bash
   docker compose exec backend python seed.py
   ```

4. Acesse:
   - Frontend: http://localhost:3000
   - Backend (docs interativas): http://localhost:8000/docs

Para parar tudo: `docker compose down` (adicione `-v` para também apagar os dados do banco).

## Rodando sem Docker (desenvolvimento local)

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
export DATABASE_URL=postgresql://postgres:postgres@localhost:5432/pratica_ingles
uvicorn app.main:app --reload
```
Você precisa de um PostgreSQL rodando localmente (ou aponte `DATABASE_URL` para um banco existente).

### Frontend
```bash
cd frontend
npm install
export NEXT_PUBLIC_API_URL=http://localhost:8000
npm run dev
```

## Estrutura do projeto

```
app/
├── backend/
│   ├── app/
│   │   ├── main.py       # ponto de entrada FastAPI
│   │   ├── models.py     # modelo SQLAlchemy (tabela items)
│   │   ├── schemas.py    # schemas Pydantic
│   │   ├── routes.py     # rotas da API
│   │   └── database.py   # conexão com o banco
│   ├── seed.py            # dados de exemplo
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── app/
│   │   ├── page.js              # página principal (3 abas)
│   │   ├── layout.js
│   │   ├── lib/api.js           # cliente HTTP para o backend
│   │   ├── components/
│   │   │   ├── AddForm.js
│   │   │   ├── Practice.js
│   │   │   ├── Stats.js
│   │   │   └── ItemList.js
│   │   └── styles/globals.css
│   ├── package.json
│   └── Dockerfile
└── docker-compose.yml
```

## Endpoints da API

| Método | Rota               | Descrição                              |
|--------|---------------------|-----------------------------------------|
| POST   | `/api/words`         | Adiciona uma palavra                    |
| POST   | `/api/phrases`       | Adiciona uma frase                      |
| POST   | `/api/items`         | Adiciona um item (palavra ou frase)     |
| GET    | `/api/items`         | Lista todos os itens                    |
| GET    | `/api/practice`      | Retorna itens embaralhados para prática |
| POST   | `/api/verify`        | Verifica a resposta de um item          |
| PUT    | `/api/items/{id}`    | Edita um item                           |
| DELETE | `/api/items/{id}`    | Remove um item                          |
| DELETE | `/api/items`         | Apaga todos os dados                    |

## Regras de verificação

A verificação é **case sensitive** e exige correspondência exata, incluindo espaços e pontuação (por exemplo, `"Hello"` ≠ `"hello"`, e `"Good morning!"` ≠ `"Good morning"`).

## Próximos passos sugeridos

- Autenticação, caso queira usar em mais de um dispositivo
- Estatísticas históricas (não só da sessão atual)
- Modo de repetição espaçada (spaced repetition) para os itens mais errados
