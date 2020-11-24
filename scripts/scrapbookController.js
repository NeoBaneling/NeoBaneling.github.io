// const axios = require('axios');
const ALBUM_URL = "https://photos.app.goo.gl/KnzRQntV87agE3Fu6";

$(document).ready(function()
{
    GetAlbum();
});

async function GetAlbum()
{

    try
    {
        const response = await axios.get(ALBUM_URL);
        console.log(response.data);
    }
    catch (error)
    {
        console.error(error);
    }
}