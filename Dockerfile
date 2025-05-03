FROM node:22 AS frontend

WORKDIR /usr/src/app
COPY frontend/package*.json .
RUN --mount=type=cache,target=/root/.npm npm install

COPY frontend .
CMD ["npm", "run", "build"]

FROM python:3.12 AS backend

WORKDIR /usr/src/app

COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY backend .

COPY --from=frontend /usr/src/app/dist static

CMD ["flask", "run", "--host", "0.0.0.0"]