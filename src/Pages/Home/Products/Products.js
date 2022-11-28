import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import BookModal from '../../Dashboard/BookModal/BookModal';
import ProductsList from '../ProductsList/ProductsList';

const Products = () => {
    const { categories } = useLoaderData();

    const [modalVal, setModalVal] = useState([]);

    const url = `http://localhost:5000/products?category=${categories}`

    const { data: category = [] } = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            const res = await fetch(url);
            const data = await res.json();
            return data
        }
    })

    return (
        <div>

            <h2 className='text-3xl font-bold my-10 mx-4'>Showing categories: <span className='text-red-500'>{categories}</span> </h2>

            <div className='flex justify-center'>
                <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4'>
                    {
                        category.map(product =>

                            <ProductsList key={product._id} product={product}
                                setModalVal={setModalVal}></ProductsList>
                        )
                    }
                </div>
            </div>

            <BookModal modalVal={modalVal}></BookModal>
        </div>
    );
};

export default Products;