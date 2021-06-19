class DataHandler {
    static async getCats(amount, setupCatImgs) {
        const options = {
            method: "get",
            headers: {
                "x-api-key": "8208532c-3e0e-4ac0-bf77-bad8765d2c8d"
            }
        }

        let response;
        try {
            response = await fetch(`https://api.thecatapi.com/v1/images/search?mime_types=jpg&limit=${amount}&size=thumb`, options)
        }
        catch (e) {
            alert("Error loading Cat Data.\n" + e);
        }

        let catData;
        if (response.ok) catData = await response.json();
        else alert("Error: " + response.status);

        console.log(catData);

        return setupCatImgs(catData);
    }

    static async setupCatImgs(catData) {
        let imgs = [];

        for (let i = 0; i < catData.length; i++) {
            // Loads the image from url, then hide is since this function creates an HTML element.
            imgs.push(createImg(catData[i].url, `Cat image ${i}`));
            imgs[i].hide();
        }
        return imgs;
    }
}