const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');


let ready = false;
let imagesLoaded =0;
let totalImages = 0;
let photoArray = '';


//Unsplash API

const count = 10;
const apiKey = 'Td8-gSdKHgmyeItZAZCCP-qIle84YMZMysS81kR8wv8';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//check if all images were loaded

function imageLoaded()
{
    imagesLoaded++;
    if(imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

// helper function to set attributes on DOM elements

function setAtrributes(element , attributes)
{
    for(const key in attributes) {
        element.setAttribute(key , attributes[key]);
    }
}



// create elements for links and photos , add that to Dom

function displayPhotos()
{
    imagesLoaded = 0;
    totalImages = photoArray.length;

    photoArray.forEach((photo) => {
        //create <a></a> to link to unsplash 
        const item = document.createElement('a');
        // item.setAttribute('href' , photo.links.html);
        // item.setAttribute('target', '_blank');
          setAtrributes(item , {
              href : photo.links.html,
              target : '_blank',
          });
        //create <img> for photo
        const img = document.createElement('img');
        // img.setAttribute('src' , photo.urls.regular);
        // img.setAttribute('alt' ,photo.alt_description );
        // img.setAttribute('title' , photo.alt_description);
           setAtrributes(img , {
               src : photo.urls.regular,
               alt : photo.alt_description,
               title : photo.alt_description,
           });
           // event listener  check when earch is finished loading
           img.addEventListener('load' , imageLoaded);
        //put <img> inside <a></a> , then put both inside image conrtainer
        item.appendChild(img);
        imageContainer.appendChild(item); 

    });
        
    
}


//get phots from unsplash API

async function getPhotos()
{
    try{
       const response = await fetch(apiUrl);
       photoArray = await response.json();
       
       displayPhotos();
       
       
    } catch (error) {
        //catch error here
    }
}

//check to see if scrolling near bottom of page , load more photos

window.addEventListener('scroll' , () =>
{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight-1000 && ready)
    {
        ready = false;
        getPhotos();
    }
});

//on load

getPhotos();