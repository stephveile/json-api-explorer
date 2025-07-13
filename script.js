
// Variables used for the fetch from API
const fetchButton = document.getElementById("fetchButton");
const postList = document.getElementById("postList");
const error = document.getElementById("error");
let postId = 45;

// Variable used for the post from form
const postForm = document.querySelector(".postForm");

// Code block for the loading icon
document.onreadystatechange = () => {
    var state = document.readyState
    if (state == 'interactive') {
        domcument.getElementbyID("postList").style.visibility="hidden";
    } else if (state == "complete") {
        setTimeout(() => {
            document.getElementById("interactive");
            document.getElementById("load").style.visibility="hidden";
            document.getElementById("postList").style.visiblity="visible";
        },1000);
    }
}

// Code block to fetch the data from the API and post to the web page
// Event listener that waits for the fetch button to be clicked
fetchButton.addEventListener("click", () => {
    // Fetching the data fromt he API
    fetch("https://jsonplaceholder.typicode.com/posts")
    // Taking the data from the API and converting it to JSON format
    .then((response) => {
        return(response.json());
    })
    // Taking the JSON (object) data and posting it to the web page
    .then((json) => {
        // Using template literals and a simple calculation to get the id from the object. I used array index to do this, although it might be cool to do it with a random number generator or something if I had more time.
        postList.innerHTML = `
        <p>Title: ${json[postId-1].title}</p>
        <p>Body: ${json[postId-1].body}</p>
        `;
    })
    // Catching and logging errors to the console
    .catch((error) => {
        postList.innerHTML = `
        <p>"Error fetching the data. ${error}</p>
        `;
        console.error("Error fetching the data.", error);
    });
});

// Code block to pull user input and post it to the web page
// Event listener to wait for the submit button to be clicked
postForm.addEventListener('submit', event => {
    // This prevents the page from automatically refreshing. I got this from a video but I am not sure how to make this work without this piece so I left it in. It is nice that it doesn't clear the input boxes right away, but will if I refresh the page.
    event.preventDefault();
    // This saves all the inputs in the form to one variable, as there are separate input boxes in the form
    const formData = new FormData(postForm);
    // This takes the data and ensure it's in the same order that the form originally had it and makes it iterable
    const data = new URLSearchParams(formData);

    // This acts as the post to the API (although nothing is actually posting to the API)
    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: data
    })
    // This converts the inputs to JSON format
    .then((response) => {
        return(response.json());
    })
    // This takes the JSON data and dispalys it on the web page
    .then((json) => {
        postList.innerHTML = `
        <p>Title: ${json.title}</p>
        <p>Body: ${json.body}</p>
        `;
    })
    // this catches and logs errors to the console
    .catch((error) => {
        postList.innerHTML = `
        <p>"Error posting the data. ${error}</p>
        `;
        console.error("Error posting the data.", error);
    });
});

