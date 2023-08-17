import React, {useState} from 'react';
import Button from "../../component/ui/Button";
import UploadService from "../../service/upload/uploadService";
import DatabaseService from "../../service/database/databaseService";

function NewProduct(props) {
    const [products, setProducts] = useState({});
    const [file, setFile] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        // 제품 사진을 업로드 후 URL 획득
        const uploader = new UploadService();
        const dbService = new DatabaseService();
        uploader.upload(file)
            .then(url => {
                dbService.setProduct(products,url);
            });

        // Firebase에 새로운 제품 등록
    };
    const handleChange = (e) => {
        const {name, value, files} = e.target;
        console.log(files);
        if (name === 'file') {
            setFile(files && files[0]);
            return;
        }
        setProducts((products) => ({...products, [name]: value, files}));
    };
    return (
        <section>
            {file && <img src={URL.createObjectURL(file)} alt="upload File"/>}

            <form onSubmit={handleSubmit}>
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
                <Button text={'제품 등록'}/>
            </form>
        </section>
    );
}

export default NewProduct;