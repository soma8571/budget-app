Projekt név: budget-app
Készítés dátuma: June of 2023

Ez az első projektem MERN (Mongo - Express - React - Node) stackben, mely leginkább tanulási célokat szolgált.

Az applikáció egy egyszerű, alapfunkciókkal ellátott, pénzügyek követését lehetővé tévő program, mely a következő címen érhető el: https://budget.hrcpayouts.com/

Alapvetően autentikációhoz kötött a használata, de lehetőség van kipróbálni egy teszt felhasználóval is.
(Felhasználó: TesztUser23, Jelszó: tesztElek)

A program fő funkciói:
----------------------
- Regisztráció/Belépés
- Pénzügyi elem felvétele
- Pénzügyi tételek rendezett megjelenítése
- A tételek szűrése típus, kategória és dátum szerint
- Tétel törlése

A kliensprogram egy single page react alkalmazás, mely a különböző funkciók használatakor API hívások segítségével adatokat kér le, küld vagy töröl. 
A kliensprogram a felhasználó belépését követően lekéri az adott felhasználó összes pénzügyi tételét. A különböző szűrők alkalmazása során a kliensoldali programnak nem kell újabb kéréseket küldeni a szerver felé, hanem az előzőleg lekért teljes adatszetten hajtja végre a szűrést és megjeleníti az adatokat.  
A szerver API egy Amazon EC2-s példányon fut és egy MongoDB adatbázissal kommunikál a háttérben. A szerver API és a kliens közti adatcsere biztonságos https kapcsolaton keresztül zajlik. 

A kliensoldalon használt egyéb könyvtárak:
------------------------------------------
- react-router-dom
- axios
- react-cookie
- material-ui (csak részlegesen)

A szerveroldalon használt egyéb könyvtárak:
-------------------------------------------
- express
- cors
- bcrypt
- jsonwebtoken
- mongoose
- dotenv


Kapcsolat: tamas.somloi@gmail.com

