var imgDir = "../img/scrapbook/images/";
var texDir = "../img/scrapbook/textures/";
var images = [];
var texts = [];
var fonts = [];
var textures = [];
// Pages is a list of objects, where every object is a page
// in this object it holds all image indexes to be used on the page,
// the page's background color, text to add to the page with text font,
// and (eventually) textures to overlay on the background.
var pages = [];
var pageIndex = 0;

// Eventually this will be replaced with a random color generator
var backColors = [
    "rgb(230, 110, 140)",
    "rgb(140, 230, 180)",
    "rgb(66, 194, 245)",
    "rgb(160, 150, 200)",
    "rgb(240, 211, 117)",
    "rgb(204, 143, 219)",
    "rgb(107, 176, 104)",
    "rgb(148, 101, 87)",
    "rgb(130, 65, 78)"];

// The maximum number of layout possibilities for two layouts
var MAX_DUB_LAYOUTS = 3;
var MAX_TRIP_LAYOUTS = 3;

$(document).ready(function()
{
    GetImages();
    GetJSONData();
    $("#leftBtn").click(function()
        {
            PrevPage()
        });
    $("#rightBtn").click(function()
        {
            NextPage()
        });
});

function GetJSONData()
{
    $.getJSON("../scripts/scrapbook.json", function(data) {
        // Load all the texts
        for (var i = 0; i < data["fillTexts"].length; i++)
        {
            texts.push(data["fillTexts"][i])
        }

        // Load all the fonts
        for (var i = 0; i < data["fonts"].length; i++)
        {
            fonts.push(data["fonts"][i]);
        }
    }).fail(function() {
        texts.push("Joey is great and all but he's a bad programmer.");
        console.log("We were unable to load all of the JSON data");
    });
}

function GetImages()
{
    console.log("Getting Images...");
    $.ajax({
        url : imgDir,
        success: function (data) {
            $(data).find("a").attr("href", function (i, val) {
                console.log(val);
                if( val.match(/\.(jpg)$/) ) {
                    images.push(val);
                }
            });

            console.log("Images Loaded");

            GetTextures();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("Status: " + textStatus);
            console.log("Error Thrown: " + errorThrown);
        }
    });
}

function GetTextures()
{
    $.ajax({
        url : texDir,
        success: function (data) {
            $(data).find("a").attr("href", function (i, val) {
                console.log(val);
                if (val.match(/\.(png)$/) ) {
                    textures.push(val);
                }
            });

            console.log("Textures Loaded");

            GeneratePages();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("Status: " + textStatus);
            console.log("Error Thrown: " + errorThrown);
        }
    });
}

function GeneratePages()
{
    GenerateFront();

    // Create all pages in between the two covers
    var i = 0;

    var flip = false;

    while (i < images.length)
    {
        var layoutMax = 0;
        var layoutType = "";
        var imagesInserted = 0;
        // We wanna alternate triple and double layouts
        if (flip)
        {
            layoutMax = MAX_TRIP_LAYOUTS;
            layoutType = "triple";
            imagesInserted = 3;
        }
        else
        {
            layoutMax = MAX_DUB_LAYOUTS;
            layoutType = "double"
            imagesInserted = 2;
        }
        var layout = GetRandomInt(layoutMax);
        pages.push(new Page(images.slice(i, i + imagesInserted), layoutType, backColors[GetRandomInt(backColors.length)], layout));
        i = i + imagesInserted;

        flip = !flip;
    }

    pageIndex = 0;

    GenerateBack();

    ShowPage();
}

function GenerateFront()
{
    pages.push(new Page(
        "IMG_3023.jpg",
        1,
        "rgb(60, 90, 133)",
        "front"
        ));
}

function GenerateBack()
{
    pages.push(new Page(
        "",
        0,
        "rgb(60, 90, 133)",
        "back"
        ));
}

function ShowPage()
{
    var page = pages[pageIndex];

    $("#grid").empty();

    if (page.layout === "front")
    {
        $("#page").css({
            "background-color": page.color,
            "background-image": ""
        });

        var borderColor = "rgb(147, 201, 151)";

        var img = $("<img />").attr({
            "src": imgDir + page.images,
            "class": "cover page-img"
        });
        img.css({
            "background-color": borderColor,
            "padding": "1vw"
        });
        $("#grid").append(img);

        var text = $("<p />").addClass("cover-text");
        text.css("font-family", "Lobster");

        text.html("Joey and C'lee<br>08/25/18 - " + GetToday());
        $("#grid").append(text);
    }
    else if (page.layout === "back")
    {
        $("#page").css({
            "background-color": page.color,
            "background-image": ""
        });

        var borderColor = "rgb(147, 201, 151)";

        var text = $("<p />").addClass("cover-text");
        text.css("font-family", "Lobster");

        text.html("And there's so much more to come...");
        $("#grid").append(text);
    }
    else
    {
        $("#page").css({
            "background-color": page.color,
            "background-image": "url("+ texDir + page.texture +")",
            "background-repeat": "repeat"
        });

        var borderColor = TranslateColor(page.color, -15);

        for (var i = 0; i < page.images.length; i++)
        {
            var img = $("<img />").attr({
                "src": imgDir + page.images[i],
                "class": "page-img "+ page.imageCount +"-" + i + "-" + page.layout,
            });
            // This is gonna set little backgrounds onto the smaller images using
            // the powers of MATH
            if (page.imageCount === "double" && page.layout != 2 && i - page.layout != 0)
            {
                img.css("background-color", borderColor);
                img.css("padding", "1vw");
            }
            $("#grid").append(img);
        }

        if (page.imageCount === "double" && page.layout != 2 || page.imageCount === "triple" && page.layout === 2)
        {
            var text = $("<p />").addClass(page.imageCount + "-text-" + page.layout + " text");
            text.css("font-family", page.font);
            text.html(page.text);
            $("#grid").append(text);
        }
    }
}

function NextPage()
{
    pageIndex++;
    ShowPage();
    if (pageIndex === pages.length - 1)
    {
        $("#rightBtn").css("display", "none");
    }
    if (pageIndex === 1)
    {
        $("#leftBtn").css("display", "block");
    }
}

function PrevPage()
{
    pageIndex--;
    ShowPage();
    if (pageIndex === 0)
    {
        $("#leftBtn").css("display", "none");
    }
    if (pageIndex === pages.length - 2)
    {
        $("#rightBtn").css("display", "block");
    }
}

/////////////////////////
///                   ///
/// UTILITY FUNCTIONS ///
///                   ///
/////////////////////////

// Gets a random int between 0 and the added max
function GetRandomInt(max)
{
    return Math.floor(Math.random() * Math.floor(max));
}

// Translates the rgb values of the rgb color
// variable by the trans variable
function TranslateColor(color, trans)
{
    rgb = color.replace(/[^\d,]/g, '').split(',');
    for (var i = 0; i < rgb.length; i++)
    {
        // We have to convert from string to int, and then back to string
        rgb[i] = (parseInt(rgb[i]) + trans).toString();
    }
    return "rgb(" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ")";
}

function GetToday()
{
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yy = today.getFullYear().toString().substring(2,4);

    return mm + "/" + dd + "/" + yy;
}

class Page
{
    images;
    imageCount;
    color;
    layout;
    text = "";
    font = "";
    texture = "";

    constructor(images, imageCount, color, layout)
    {
        this.images = images;
        this.imageCount = imageCount;
        this.color = color;
        this.layout = layout;
        if (imageCount === "double" && layout != 2 || imageCount === "triple" && layout === 2)
        {
            this.text = texts.splice(GetRandomInt(texts.length), 1);
            this.font = fonts[GetRandomInt(fonts.length)];
        }
        this.texture = textures[GetRandomInt(textures.length)];
    }
}

/*****************************************
 ** Everything below we'll try to get working once
 ** we can pull stuff from Google photos.
const ALBUM_URL = "https://photos.app.goo.gl/KnzRQntV87agE3Fu6";

const config =
{
    headers:
    {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Methods": "GET"
    }
};

$(document).ready(function()
{
    GetAlbum();
});

async function GetAlbum()
{

    // const reponse = await axios.get(ALBUM_URL, config);
    // console.log(response.data.headers["header1"]);
    // console.log(response.data);

    // axios.get(ALBUM_URL, config)
    //     .then((response) =>
    //         {
    //             console.log(response.data);
    //             console.log(response.status);
    //             console.log(response.statusText);
    //             console.log(response.headers);
    //             console.log(response.config);
    //         })
    //     .catch((error) =>
    //         {
    //             // console.log(error.headers);
    //             console.log(error);
    //         });

    const xhr = new XMLHttpRequest();
    xhr.open("GET", ALBUM_URL);
    xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:8000");
    // xhr.setRequestHeader("Access-Control-Allow-Origin", "https://portfolio.josephdavidbishop.com");

    xhr.onreadystatechange = function(data)
    {
        console.log(data);
        console.log(xhr.responseText);
    }

    xhr.send();

    // const http = new XMLHttpRequest();
    // http.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:8000");
    // http.open("GET", ALBUM_URL);
    // http.send();

    // http.onreadystatechange = (e)=>
    // {
    //     console.log(e);
    //     console.log(http.responseText);
    // }
}
*/