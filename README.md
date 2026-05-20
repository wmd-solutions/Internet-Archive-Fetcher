# Internet Archive Lister & Dumper / Internet Archive Listázó

A lightweight, asynchronous web application designed to parse, fetch, and display files from multiple Internet Archive items in a clean, sortable, and responsive dashboard. Originally configured to list large gaming archives (such as Xbox 360 dumps, DLCs, and updates), it can be easily adapted for any archive collection.

Egy könnyűsúlyú, aszinkron webes alkalmazás, amely arra lett tervezve, hogy az `archive.org` gyűjtemények adatait automatikusan lekérje, kiszűrje és egy letisztult, rendezhető felületen jelenítse meg. Eredetileg Xbox 360 játékarchívumok, DLC-k és frissítések listázására készült, de tetszőleges gyűjteményhez adaptálható.

## 🌍 Language / Nyelv

- [English](#-english-version "null")

- [Magyar](#-magyar-verzio "null")

## 🇬🇧 English Version

### ✨ Features

- **Dynamic PHP Core:** Automatically reads and parses an input file (`archive.txt`) containing Internet Archive URLs or identifiers line by line.

- **Asynchronous Fetching:** Utilizes the official Archive.org Metadata API (`https://archive.org/metadata/`) via native JavaScript async/await to load data independently for each item without blocking the page load.

- **Smart Filtering:** Automatically excludes system-generated files (e.g., `_archive.torrent`, `_files.xml`, `_meta.sqlite`, thumbnails, `.thumbs` directories) to display only the relevant contents.

- **Dual CDN Server Links:** Automatically extracts and provides direct download links for both Server 1 (`d1`) and Server 2 (`d2`) CDN nodes for each file.

- **Torrent Detection:** Identifies if a main item torrent file exists and provides explicit download buttons right in the item header.

- **Client-side Sorting:** Features a robust table sorting engine (supporting both strings and numbers) with safe Base64 encoding/decoding (`btoa`/`atob`) to prevent HTML parsing errors caused by special characters in file names.

- **Modern UI:** Built using Bootstrap 5 and FontAwesome 6 for a fully responsive, clean layout with loading spinners for visual feedback.

### 📁 Project Structure

- `index.php`: The main entry point. Reads the source text file and generates the structural HTML grid.

- `archive_dumper.js`: The frontend engine. Handles API communication, item parsing, filtering, UI rendering, and table sorting.

- `archive.txt`: The text file containing target Internet Archive item URLs or identifiers (one per line).

### 🚀 Getting Started

#### Prerequisites

- A web server running **PHP 7.4 or higher** (Apache, Nginx, or a local server like XAMPP/Laragon).

#### Installation & Setup

1. Clone this repository or download the source files into your web server's root directory.

2. Edit `archive.txt` and populate it with your desired Internet Archive item URLs or identifiers. *Example format:*
   
   ```
   [https://archive.org/details/example_archive_id_1](https://archive.org/details/example_archive_id_1)
   example_archive_id_2
   [https://archive.org/download/example_archive_id_3](https://archive.org/download/example_archive_id_3)
   ```

3. Open the directory through your browser (e.g., `http://localhost/archive-lister/index.php`).

## 🇭🇺 Magyar Verzió

### ✨ Funkciók

- **Dinamikus PHP váz:** Automatikusan beolvassa és soronként feldolgozza az `archive.txt` fájlban megadott Internet Archive linkeket vagy egyedi azonosítókat.

- **Aszinkron adatlekérés:** A hivatalos Archive.org Metadata API-t (`https://archive.org/metadata/`) használja natív JavaScript async/await hívásokkal, így a gyűjtemények adatai egymástól függetlenül, a háttérben töltődnek be, elkerülve az oldal fagyását.

- **Intelligens fájlszűrés:** Automatikusan kiszűri a rendszer által generált felesleges metaadatokat (pl. `_archive.torrent`, `_files.xml`, `_meta.sqlite`, bélyegképek, `.thumbs` könyvtárak), így a felhasználó csak a valós tartalmat látja.

- **Dupla CDN szerverelérés:** Minden fájlhoz kinyeri és megjeleníti mind az elsődleges (`d1`), mind a másodlagos (`d2`) szerver (Szerver1 és Szerver2) közvetlen letöltési linkjeit.

- **Torrent felismerés:** Ha az archívumhoz tartozik gyűjtő-torrent fájl, azt kiemelt helyen, közvetlenül az adott blokk fejlécében jeleníti meg.

- **Kliensoldali rendezés:** Beépített táblázatrendező motor (szöveges és numerikus támogatással). Az adatok összehasonlításához biztonságos Base64 (btoa/atob) kódolást használ, ami megvédi a rendszert a fájlnevekben előforduló speciális karakterek vagy ékezetek okozta renderelési hibáktól.

- **Modern felület:** Bootstrap 5 és FontAwesome 6 alapú reszponzív dizájn töltésjelzőkkel (spinner) ellátva a kiváló felhasználói élményért.

### 📁 Projekt felépítése

- `index.php`: A fő belépési pont. Beolvassa a szöveges adatforrást és létrehozza a HTML keretet a ciklusok segítségével.

- `archive_dumper.js`: A kliensoldali motor. Ez felel az API kommunikációért, a szűrésért, a felület dinamikus felépítéséért és a táblázat rendezéséért.

- `archive.txt`: A listázandó Internet Archive gyűjtemények linkjeit vagy azonosítóit tartalmazó szöveges fájl (soronként egy darab).

### 🚀 Telepítés és használat

#### Követelmények

- **PHP 7.4 vagy újabb** verziót futtató webszerver (Apache, Nginx, vagy lokális környezet mint pl. XAMPP, Laragon).

#### Beállítás lépései

1. Másold a projekt fájljait a webszervered gyökérkönyvtárába (vagy egy almappába).

2. Nyisd meg az `archive.txt` fájlt, és írd bele a megjeleníteni kívánt archive.org linkeket vagy azonosítókat. *Példa formátum:*
   
   ```
   [https://archive.org/details/microsoft_xbox360_a_part1](https://archive.org/details/microsoft_xbox360_a_part1)
   microsoft_xbox360_a_part2
   [https://archive.org/download/mx360gc-xbla-x360-ztm](https://archive.org/download/mx360gc-xbla-x360-ztm)
   ```

3. Nyisd meg a projektet a böngésződben (pl. `http://localhost/archive-lister/index.php`).

## 🛠️ Built With / Felhasznált technológiák

- **PHP** (Backend / File I/O)

- **JavaScript (ES6+)** (Async Fetch, DOM Manipulation)

- **Bootstrap 5** (Responsive Layout & Styles)

- **FontAwesome 6** (Icons)

- **Internet Archive API** (Data Source)

# 
