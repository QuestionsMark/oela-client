<div id="top"></div>

[![Contributors][contributors-shield]][contributors-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<br />
<div align="center">
  <a href="https://oela.pl">
    <img src="./readme/logo.png" alt="oela.pl logo" width="200" height="200">
  </a>

<h1 align="center">oela.pl</h1>
  <p align="center">
    Nie wiesz jaki prezent wybrać rodzinie, znajomym? Nie wiesz co ich najbardziej zadowoli na święta, ślub czy może urodziny? Oela.pl to witryna internetowa, na której z pewnością znajdziesz fajny podarek na każdą okację. Sam zobacz co oferujemy! 
    <a href="https://oela.pl">oela.pl</a>
    <br />
    <br />
  </p>
</div>

[![Typescript][typescript]][typescript-url]
[![React][react.js]][react-url]
[![Reactrouter][reactrouter]][reactrouter-url]
[![Sass][sass]][sass-url]
[![Axios][axios]][axios-url]
[![Dropzone][dropzone]][dropzone-url]
[![Reactpopup][reactpopup]][reactpopup-url]

<details>
  <summary>Spis treści</summary>
  <ol>
    <li>
      <a href="#o-projekcie">O projekcie</a>
    </li>
    <li>
      <a href="#jak-zacząć">Jak zacząć</a>
    </li>
  </ol>
</details>

## O projekcie

### Strona główna

![home]
<br />

![about-us]

### Nowości

![news]

### Obrazy

![pictures]

### Kolekcje

![collections]
<br />

![collections-page]

### Produkty

![products]
<br />

![products-page]

### Kontakt

![contact]

## Jak zacząć

1. Sklonuj repozytorium
   ```sh
   git clone https://github.com/QuestionsMark/oela-client.git
   ```
2. Przejdź do katalogu projektu
   ```sh
   cd oela-client
   ```
3. Zainstaluj wszystkie zależności
   ```sh
   npm install
   ```
4. Uzupełnij plik konfiguracyjny `src/config.ts`
   ```js
   export const HOST_ADDRESS =
     process.env.REACT_APP_API_URL ?? "http://localhost:3001";
   export const LOCAL_STORAGE_PREFIX = "oela-";
   ```

## Do zobaczenia na stronie!

[oela.pl][oela-url]

<p align="right">(<a href="#top">back to top</a>)</p>

[oela-url]: https://oela.pl
[contributors-shield]: https://img.shields.io/github/contributors/QuestionsMark/oela-client.svg?style=for-the-badge
[contributors-url]: https://github.com/QuestionsMark/oela-client/graphs/contributors
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/s%C5%82awomir-dziurman-75464b205/
[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[sass]: https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white
[sass-url]: https://sass-lang.com/
[axios]: https://img.shields.io/badge/axios-20232A?style=for-the-badge&logo=axios&logoColor=1D80AB
[axios-url]: https://axios-http.com/docs/intro
[dropzone]: https://img.shields.io/badge/react%20dropzone-20232A?style=for-the-badge&logo=reactdropzone&logoColor=1D80AB
[dropzone-url]: https://react-dropzone.js.org/
[typescript]: https://img.shields.io/badge/typescript-20232A?style=for-the-badge&logo=typescript&logoColor=3178c6
[typescript-url]: https://www.typescriptlang.org/
[reactrouter]: https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white
[reactrouter-url]: https://reactrouter.com/
[reactpopup]: https://img.shields.io/badge/reactjs%20popup-20232A?style=for-the-badge&logo=reactjs-popup&logoColor=fff
[reactpopup-url]: https://react-popup.elazizi.com/
[home]: readme/home.PNG
[about-us]: readme/about-us.PNG
[news]: readme/news.PNG
[pictures]: readme/pictures.PNG
[collections]: readme/collections.PNG
[collections-page]: readme/collections-page.PNG
[products]: readme/products.PNG
[products-page]: readme/products-page.PNG
[contact]: readme/contact.PNG
