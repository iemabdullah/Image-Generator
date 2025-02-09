// Function to generate or regenerate the image
function generateImage() {
    const prompt = document.getElementById("promptInput").value.trim();
    if (!prompt) {
        alert("Please enter a prompt.");
        return;
    }
    displayImage(prompt);
}

function regenerateImage() {
    const prompt = document.getElementById("promptInput").value.trim();
    if (!prompt) {
        alert("Please enter a prompt.");
        return;
    }
    displayImage(prompt, true);
}

// Helper function to display the image with loading animation
function displayImage(prompt, isRegenerate = false) {
    const timestamp = new Date().getTime(); // Unique timestamp to prevent caching
    const imageUrl = `https://text-image.codiify.us.kg/?text=${encodeURIComponent(prompt)}&t=${timestamp}`;
    
    const imageElement = document.getElementById("generatedImage");
    const spinner = document.getElementById("loadingSpinner");
    const regenerateButton = document.getElementById("regenerateButton");
    const downloadButton = document.getElementById("downloadButton");

    // Show the loading spinner and hide the image, buttons
    spinner.style.display = "block";
    regenerateButton.style.display = "none";
    downloadButton.style.display = "none";

    // **Reset Image Source (for instant update)**
    if (isRegenerate) {
        imageElement.src = "";  // Clear old image before loading new one
    }

    // Load the image and hide the spinner when it's ready
    imageElement.onload = () => {
        spinner.style.display = "none";
        imageElement.style.display = "block";
        regenerateButton.style.display = "inline-block";
        downloadButton.style.display = "inline-block";
    };

    // Set the new image source
    imageElement.src = imageUrl;
}

// Function to download the generated image
function downloadImage() {
    const imageElement = document.getElementById("generatedImage");
    const imageUrl = imageElement.src;

    if (!imageUrl) {
        alert("No image to download.");
        return;
    }

    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "generated_image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
