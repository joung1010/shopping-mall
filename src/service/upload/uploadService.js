import axios from "axios";

class UploadService  {
    #cloudName;
    #presetName;
    #api;
    constructor() {
        this.#cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME ;
        this.#presetName = process.env.REACT_APP_CLOUDINARY_PRESET_NAME ;
        this.#api =  axios.create({
            baseURL: `${process.env.REACT_APP_CLOUDINARY_BASE_URL}`
        });
    }

    async upload(file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", this.#presetName);

        const response = await this.#api.post(`${this.#cloudName}/image/upload`,formData);
        return response.data.url;
    }
}

export default UploadService;