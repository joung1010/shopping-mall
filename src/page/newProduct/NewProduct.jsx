import React, {useState} from 'react';
import Button from "../../component/ui/Button";
import UploadService from "../../service/upload/uploadService";
import DatabaseService from "../../service/database/databaseService";
import {useMutation, useQueryClient} from "@tanstack/react-query";

const dbService = new DatabaseService();

function NewProduct(props) {
    const [products, setProducts] = useState({});
    const [file, setFile] = useState();
    const [isUploading, setIsUploading] = useState(false);
    const [success, setSuccess] = useState();
    const queryClient = useQueryClient();
    const addProduct = useMutation(
        {
            mutationFn: ({products, url}) => dbService.setProduct(products, url),
            onSuccess: () => queryClient.invalidateQueries(['products']),/*기본적인 해동을 정의*/
        });

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsUploading(true);
        // 제품 사진을 업로드 후 URL 획득
        const uploader = new UploadService();
        uploader.upload(file)
            .then(url => {
                addProduct.mutate({products, url}, {
                    onSuccess: () => {
                        setSuccess('성공적으로 제품이 추가되었습니다.');
                        setTimeout(() => {
                            setSuccess(null);
                        }, 4000);
                    }
                });/*mutate 함수를 호출하는 시점에서도 특정 결과에 따른 행동을 정의할 수 있다.*/
            })
            .finally(() => setIsUploading(false));

        // Firebase에 새로운 제품 등록
    };
    const handleChange = (e) => {
        const {name, value, files} = e.target;
        if (name === 'file') {
            setFile(files && files[0]);
            return;
        }
        setProducts((products) => ({...products, [name]: value, files}));
    };
    return (
        <section className='w-full text-center'>
            <h2 className='text-2xl font-bold my-4'>새로운 제품 등록</h2>
            {success && <p className='my-2'>✅{success}</p>}
            {file && <img className='w-96 m-auto mb-2' src={URL.createObjectURL(file)} alt="upload File"/>}
            <form className='flex flex-col px-12' onSubmit={handleSubmit}>
                <input type="file" accept='image/*' name='file' required onChange={handleChange}/>
                <input type="text" name='title' value={products.title ?? ''} placeholder='제품명' required
                       onChange={handleChange}/>
                <input type="number" name='price' value={products.price ?? ''} placeholder='가격' required
                       onChange={handleChange}/>
                <input type="text" name='category' value={products.category ?? ''} placeholder='카테고리' required
                       onChange={handleChange}/>
                <input type="text" name='description' value={products.description ?? ''} placeholder='설명' required
                       onChange={handleChange}/>
                <input type="text" name='options' value={products.options ?? ''} placeholder='옵션들은 콤마(,)로 구분' required
                       onChange={handleChange}/>
                <Button text={isUploading ? '업로드중...' : '제품 등록'}
                        isLoading={isUploading}
                        disabled={isUploading}
                />
            </form>
        </section>
    );
}

export default NewProduct;