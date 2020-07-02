/**
 * Sourced from w3schools
 * https://www.w3schools.com/howto/howto_js_filter_elements.asp
 **/

var dropdownActive;
hideDropdown();

filterSelection("all")
function filterSelection(c)
{
    var x, i;
    x = document.getElementsByClassName("canvas");
    if (c == "all") c = "";
    // Add the "show" class (display:block) to the filtered elements,
    // and remove the "show" class from the elements that are not selected
    for (i = 0; i < x.length; i++)
    {
        w3RemoveClass(x[i], "show");
        if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
    }
}

// Show filtered elements
function w3AddClass(element, name)
{
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++)
    {
        if (arr1.indexOf(arr2[i]) == -1)
        {
            element.className += " " + arr2[i];
        }
    }
}

// Hide elements that are not selected
function w3RemoveClass(element, name)
{
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++)
    {
        while (arr1.indexOf(arr2[i]) > -1)
        {
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
      }
    element.className = arr1.join(" ");
}

function showDropdown()
{
    var btnContainer = document.getElementById("filterContainer");
    var btns = btnContainer.getElementsByClassName("button");
    for (var i = 0; i < btns.length; i++)
    {
        showButton(btns[i]);
    }
    var filterHex = document.getElementById("filterHex");
    filterHex.style = 'transform:rotate(30deg)';
    dropdownActive = true;
}

function hideDropdown()
{
    var btnContainer = document.getElementById("filterContainer");
    var btns = btnContainer.getElementsByClassName("button");
    for (var i = 0; i < btns.length; i++)
    {
        hideButton(btns[i]);
    }
    var filterHex = document.getElementById("filterHex");
    filterHex.style = 'transform:rotate(0deg)';
    dropdownActive = false;
}

function toggleDropdown()
{
    dropdownActive = !dropdownActive;
    if (dropdownActive)
    {
        showDropdown();
    }
    else
    {
        hideDropdown();
    }
}

function showButton(button)
{
    button.className = button.className.replace(" invisible", "");
    button.className = button.className.replace(" visible", "");
    button.className += " visible";
}

function hideButton(button)
{
    button.className = button.className.replace(" invisible", "");
    button.className = button.className.replace(" visible", "");
    button.className += " invisible";
}

// Add active class to the current control button (highlight it)
var btnContainer = document.getElementById("filterContainer");
var btns = btnContainer.getElementsByClassName("button");
for (var i = 0; i < btns.length; i++)
{
    btns[i].addEventListener("click", function()
    {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
    });
}