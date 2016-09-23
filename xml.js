//Adapted from SIT203 Practical 3, accessed 12/08/2016
function loadXMLDoc(dname) {
    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
    }
    else {
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.open("GET", dname, false);
    xhttp.send("");
    return xhttp.responseXML;
}

//Made function more modular to suit any given xml, xsl and output node
function displayResult(xmlFilePath, xslFilePath, node) {
    if (typeof xmlFilePath != 'string') {
        throw "Incorrect type for path of xml file";
    }
    if (typeof xslFilePath != 'string') {
        throw "Incorrect type for path of xsl file";
    }

    var element = null;
    if (typeof node == 'Element') {
        element = node;
    }
    else if (typeof node == 'string') {
        element = document.getElementById(node);
    }
    else {
        throw "Incorrect type for xml output node";
    }

    xml = loadXMLDoc(xmlFilePath);
    xsl = loadXMLDoc(xslFilePath);
    // code for IE
    if (window.ActiveXObject) {
        ex = xml.transformNode(xsl);
        element.innerHTML = ex;
    }
    // code for Mozilla, Firefox, Opera, etc.
    else if (document.implementation && document.implementation.createDocument) {
        xsltProcessor = new XSLTProcessor();
        xsltProcessor.importStylesheet(xsl);
        resultDocument = xsltProcessor.transformToFragment(xml, document);
        element.appendChild(resultDocument);
    }
}