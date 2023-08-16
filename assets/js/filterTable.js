function filterTable(e) {
    for (var t = e.target.value.toUpperCase(), o = document.querySelector("#myTable").rows, l = 0; l < o.length; l++) {
        for (var a = o[l].cells, s = !1, n = 0; n < a.length; n++) {
            o[l].cells[n].textContent.toUpperCase().indexOf(t) > -1 && (s = !0)
        }
        o[l].style.display = !0 === s ? "" : "none"
    }
}

document.querySelector("#search-field").addEventListener("keyup", filterTable, !1)