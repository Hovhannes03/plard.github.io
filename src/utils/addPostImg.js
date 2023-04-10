import ImageUploading from "react-images-uploading";
import "../components/proc.css"

export default function AddPostImg({images, setImages}) {
  const maxNumber = 1;
  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };

  return (
    <div >
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
        acceptType={["svg"]}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemove,
          isDragging,
          dragProps
        }) => (
          <div className="upload_post_image-wrapper">
            <button 
              style={images !== "" ? {display: "none"} : {backgroundColor: "gray"}}
              onClick={onImageUpload}
              {...dragProps}
            >
              +
            </button>
            {imageList.map((image, index) => (
              <div key={index+1} className="post-img">
                <img src={image.data_url} alt=""  />
                <button className="deleteImg" onClick={() => {
                  onImageRemove(index)
                  // setRemove(!remove)
                  setImages("")
                }}
                >
                  X
                </button>
                
                <div className="image-item__btn-wrapper">
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
}