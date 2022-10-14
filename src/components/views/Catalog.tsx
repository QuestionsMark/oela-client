import catalog from '../../images/catalog.webp';

export const Catalog = () => {
    return (
        <main className="main catalog">
            <h2 className="catalog__title">Zapraszamy do katalogu</h2>
            <a href="https://heyzine.com/flip-book/ad228bb913#page/1" target="_blank" rel="noreferrer" className="catalog__link">
                <img src={catalog} alt="catalog icon" className="img catalog__img" />
            </a>
        </main>
    );
};