const ALBUM_URL = "https://photoslibrary.googleapis.com/v1/albums";

$(document).ready(function()
{
    GetAlbum();
});

function GetAlbum()
{
    $.ajax (
    {
        url: ALBUM_URL
        auth_uri: $.getJson("../resources/credentials.json", function(data)
        {
            console.log(data["web"]["auth_uri"]);
            return data["web"]["auth_uri"];
        })
    }).then(function(data)
    {
        console.log(data);
    });
}