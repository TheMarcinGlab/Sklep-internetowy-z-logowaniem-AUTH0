# Używamy obrazu z Node.js
FROM node:14

# Ustawiamy katalog roboczy
WORKDIR /app

# Kopiujemy pliki package.json i package-lock.json do katalogu roboczego
COPY angular-ecommerce/package*.json ./

# Instalujemy zależności
RUN npm install

# Kopiujemy resztę plików aplikacji do katalogu roboczego
COPY angular-ecommerce/ .

# Budujemy aplikację
RUN npm run build --prod

# Serwujemy aplikację używając serwera statycznego
RUN npm install -g serve
CMD ["serve", "-s", "dist/angular-ecommerce", "-l", "4200"]

# Eksponujemy port na zewnątrz
EXPOSE 4200
