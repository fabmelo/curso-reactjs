import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import './style.css';

export default class Main extends Component {

    state = {
        products: [],
        productsInfo: {},
        page: 1
    }

    // Ciclo de Vida: Assim que o component é mostrado em tela
    componentDidMount() {
        this.loadProducts();
    }

    loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`);
        const { docs, ...productsInfo } = response.data;
        this.setState({ products: docs, productsInfo, page });
    }

    prevPage = () => {
        // capturo do estado
        const {page} = this.state;

        // se for a primeira página termina por ai
        if(page === 1) return;

        // atribui o valor da próxima página
        const pageNumber = page - 1;

        // chama o método que lista os itens
        this.loadProducts(pageNumber); 
    }

    nextPage = () => {
        // capturo do estado
        const {page, productsInfo} = this.state;

        // se for a ultima página termina por ai
        if(page === productsInfo.pages) return;

        // atribui o valor da próxima página
        const pageNumber = page + 1;

        // chama o método que lista os itens
        this.loadProducts(pageNumber);        
    }

    render() {

        const { products, productsInfo, page } = this.state;

        return (
            <div className="product-list">
                {
                    products.map(product => (
                        <article key={product._id}>
                            <strong>{product.title}</strong>
                            <p>{product.description}</p>
                            <Link className="botao" to={`products/${product._id}`}>Acessar</Link>
                        </article>
                    ))
                }
                <div className="actions">
                    <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                    <p>{page} de {productsInfo.pages} Páginas</p>
                    <button disabled={page === productsInfo.pages} onClick={this.nextPage}>Próximo</button>
                </div>
            </div>
        );
    }
}