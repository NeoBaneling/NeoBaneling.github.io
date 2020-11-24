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
    }).then(function(data)
    {
        console.log(data);
    });
}