const generateForm=document.querySelector(".generate-form");
const imggallery=document.querySelector(".img-gallery");

const api ="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";

const updateimagecard=(imgDataArray) => {
    imgDataArray.forEach((imgobject, index) => {
        const imgcard =imggallery.querySelectorAll(".img-card")[index];
        const imgElement = imgcard.querySelector("img");
 });

}
//send a request tot he openai to generate images based on user inputs
const generateAiimages= async (userprompt,userimagequantity) => {
    try{
        const response = await fetch(`https://openrouter.ai/api/v1/chat/completions`, {
            method: "post",
            headers :{
                "Content-Type": "application/json",
                "Authorization":`Bearer ${api}`

            },
            body: JSON.stringify({
                prompt:userprompt,
                n: parseInt(userimagequantity),
                size:"512x512",
                response_format:"b64_json"

            })
 });
      
if(!response.ok) throw new Error("failde to generate images! Please try again")
const { data }  = await response.json(); // it gives the data from the response
updateimagecard([...data]);
}catch(error){
        alert(error.message)
    }
}
const handleFormSubmission= (e) => {
    e.preventDefault();

    //get user input and image quantity values from the form
    const userprompt=e.srcElement[0].value;
    const userimagequantity=e.srcElement[1].value;
    console.log(userprompt,userimagequantity);
    const imgcardmarkup= Array.from({length: userimagequantity}, () =>
        `   <div class="img-card loading">

        <img src="loader.svg" alt="img">
        <a href="#" class="downloade-btn">
            <img src="download.svg" alt="downloade icon">
        </a>
    </div>`
    
 ).join("");
imggallery.innerHTML=imgcardmarkup;
generateAiimages(userprompt,userimagequantity);
}
generateForm.addEventListener("submit",handleFormSubmission);
