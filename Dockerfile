FROM python:3.12-slim-bookworm

WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends nodejs \
    && rm -rf /var/lib/apt/lists/*

COPY backend/requirements.txt backend/requirements.txt
RUN pip install --no-cache-dir -r backend/requirements.txt

COPY pytest.ini pytest.ini
COPY backend/ backend/
COPY public/package.json public/package.json
COPY public/ssr-bridge.mjs public/ssr-bridge.mjs

EXPOSE 8000

CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload", "--reload-dir", "backend", "--app-dir", "."]
