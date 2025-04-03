FROM node:14
WORKDIR /app
# Wykorzystanie cache – kopiujemy najpierw pliki package.json
COPY angular-ecommerce/package.json ./
RUN npm install

# Kopiujemy resztę plików aplikacji
COPY angular-ecommerce/ ./
RUN npm run build --prod

# Instalacja serwera do serwowania statycznych plików
RUN npm install -g serve

EXPOSE 4200
CMD ["serve", "-s", "dist/angular-ecommerce", "-l", "4200"]
