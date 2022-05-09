const getFormDataFromObject = object => Object.keys(object).reduce((formData, key) => {
    if(key === 'images'){
        return addImages(object[key], formData);
    }else{
        formData.append(key, object[key])
    }
    return formData;
}, new FormData());

const addImages = (images, formData) => {
    images.forEach((img, index) => {
      formData.append(`image${index}`, img);
    })
    return formData
  };

export default getFormDataFromObject